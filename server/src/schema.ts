import { generate }from 'shortid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Context } from ".";

// import {gql} from 'apollo-server';

export const typeDefs = `
type User {
  id: ID!
  email: String!
  password: String!
  token: String!
  createdAt: Int!
  admin: Boolean
}

type Mutation {
  Login(email: String!, password: String!): String!
  Register(email: String!, password: String!, repeat: String!): String!
  MakeAdmin(email: String!, admin: String!): Boolean!
}
`;

export const resolvers = {
  Mutation: {
    async Login(_: any, {email, password}: {email: string, password: string}, {driver}: Context) {
      try {
        const session = driver.session();

        let result = await session.run(`
          MATCH (user:User { email: $email })
          RETURN user.password as hash
        `, {email});

        
        if (!result.records[0]) {
          return new Error('Incorrect email or password');
        }           
        
        const {hash}= result.records[0].toObject() as any;
        
        if (!await bcrypt.compare(password, hash)) {
          return new Error('Incorrect email or password');    
        }

        const token = await jwt.sign({email}, process.env.JWT_SECRET || 'shh... its a very tewwible secret!!!');

        let saveResult = await session.run(`
          MATCH (user:User { email: $email })
          SET user.token=$token
          RETURN user.token as token
        `, {email, token}); 

        if (saveResult.records[0].has('token')) {
          return token
        }
        
        throw new Error('error logging in user');

      } catch (err) { 
        console.error(err)
        return err;
      }
    },
    async Register(_: any, {email, password, repeat}: {email: string, password: string, repeat: string}, {driver}: Context) {
      try {
        const session = driver.session();

        let result = await session.run(`
          MATCH (user:User { email: $email })
          RETURN user
        `, {email});

        if (result.records[0]) {
          return new Error('email address already in use');
        }

        if (password !== repeat) {
          return new Error('passwords do not match');
        } 

        const hash = await bcrypt.hash(password, 10);

        const token = await jwt.sign({email}, process.env.JWT_SECRET || 'shh... its a very tewwible secret!!!');

        const id = generate();

        const saveResult = await session.run(`
          CREATE (user:User { id: $id, email: $email, password: $hash, token: $token, admin: false })
          CREATE CONSTRAINT ON (user:User) ASSERT user.id IS UNIQUE
          CREATE CONSTRAINT ON (user:User) ASSERT user.email IS UNIQUE
          CREATE CONSTRAINT ON (user:User) ASSERT exists(user.id)
          CREATE CONSTRAINT ON (user:User) ASSERT exists(user.email)
          CREATE CONSTRAINT ON (user:User) ASSERT exists(user.password) 
          RETURN user.token as token
        `, { id, email, hash, token }); 

        if (saveResult.records[0].has('token')) {
          return (saveResult.records[0].toObject() as any).token
        }
        
        console.error(saveResult);

        throw new Error('error registering new user');

      } catch (err) { 
        console.error(err)
        return err;
      }
    },
    async MakeAdmin(_: any, {email, admin}: {email: string, admin: string}, {driver}: Context) {
      try {
        const session = driver.session();

        let isAdmin = await session.run(`
          MATCH (user:User { email: $admin })
          RETURN user.admin as admin
        `, {admin});

        if (!(isAdmin.records[0].toObject() as any).admin) {
          return new Error(`you dont have permission to make ${email} and admin`);
        }

        let saveResult = await session.run(`
          MATCH (user:User { email: $email })
          SET user.admin=true
          RETURN user.admin as admin
        `, {email}); 

        if (saveResult.records[0]) {
          const {admin} = saveResult.records[0].toObject() as any;
          return admin;
        }
        
        throw new Error(`error making ${email} an admin`);

      } catch (err) { 
        console.error(err)
        return err;
      }
    }, 
  },
};

