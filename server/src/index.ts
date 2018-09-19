
import { GraphQLServer } from 'graphql-yoga';
import { v1 as neo4j } from 'neo4j-driver';
import { Request } from 'express';
// @ts-ignore
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import { typeDefs, resolvers } from './schema';

const driver = neo4j.driver(
  process.env.NEO4J_URI!, 
  neo4j.auth.basic(process.env.NEO4J_USERNAME!, process.env.NEO4J_PASSWORD!));
  
const schema = makeAugmentedSchema({ typeDefs, resolvers });

const context = async (req: Request) => {
  let user;
  
  return {
    driver,
    req,
    user
  };
};

export type Context = {
  driver: neo4j.Session,
  req: Request,
  user: any
}  
  
const server = new GraphQLServer({ schema, context });
  
const options = { port: 4000 };

server.start(options).catch(err => console.error(err));

console.log('Server is running on localhost:' + options.port);