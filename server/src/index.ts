
import { GraphQLServer } from 'graphql-yoga';
import { v1 as neo4j } from 'neo4j-driver';
import { Request } from 'express';
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import { typeDefs, resolvers } from './schema';

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://192.168.64.4:7687", 
  neo4j.auth.basic(process.env.NEO4J_USERNAME || 'neo4j', process.env.NEO4J_PASSWORD || 'neo4j'));
  
const schema = makeAugmentedSchema({ typeDefs, resolvers });

const context = async ({request}: {request: Request}) => {
  let user;

  if (request.headers.authorization) {
    const token = Array.isArray(request.headers.authorization)
      ? request.headers.authorization[0].split(' ')[1]
      : request.headers.authorization.split(' ')[1];

    if (token !== '') {
      let result = await driver.session().run(`
      MATCH (u:User { token: $token })
      RETURN u
      `, {token});
      
      if (result.records[0]) {
        const { u } = result.records[0].toObject() as any;
        user = u;
      }
    } else user = undefined
  }
  
  return {
    driver,
    req: request,
    user
  };
};

export type Context = {
  driver: neo4j.Driver,
  req: Request,
  user: any
}  
  
const server = new GraphQLServer({ schema, context });
  
const options = { port: 4000 };

server.start(options).catch(err => console.error(err));

console.log('Server is running on localhost:' + options.port);