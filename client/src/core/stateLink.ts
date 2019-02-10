import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

const getToken = () => !!window && window.localStorage
        ? ''
        : window.localStorage.getItem('TOKEN') || '';

const setToken = (value: string) => !!window && window.localStorage
    ? window.localStorage.setItem('TOKEN', value)
    : undefined;

const typeDefs = `
type Mutation {
    setAUTH(token: String!): String!
}`;

const resolvers = {
    Mutation: {
        setTOKEN: (_: undefined, {token}: {token: string}, {cache}: {cache: InMemoryCache}) => {
            if (typeof token !== 'string') {
                throw new Error('jwt token must be a string');
            }

            cache.writeData({data: {
                AUTH: {
                    __typename: 'AUTH',
                    token,
                },
            }});

            return setToken(token);
        },
    },
};

export default (cache: InMemoryCache) => withClientState({
    cache,
    typeDefs,
    resolvers,
    defaults: {
        AUTH: {
            __typename: 'AUTH',
            token: getToken(),
        },
    },
});
