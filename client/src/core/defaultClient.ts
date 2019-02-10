import { ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { ApolloLink } from 'apollo-link';

import buildStateLink from './stateLink';
import gql from 'graphql-tag';

const APP_ENV = process.env.APP_ENV || 'development';
const PROD = APP_ENV === 'production';
const PROTOCOL = PROD ? 'https://' : 'http://';


const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const uri = PROTOCOL + HOST + ':' + PORT;

export default (ssr = false) => {
    const cache = new InMemoryCache();

    const stateLink = buildStateLink(cache);

    const apiLink = new HttpLink({uri});

    const apiLinkAuth = setContext((_, { headers }) => {
        const {AUTH: {token}} = cache.readQuery({query: gql`{
            AUTH @client {
                token
            }
        }`});
        return {
            headers: {
                ...headers,
                Authorization: !!token || token === '' ? '' : `Bearer ${token}`,
            },
        };
    });

    const link = ApolloLink.from([
        stateLink,
        apiLinkAuth.concat(apiLink),
    ]);

    if (typeof window !== undefined) {
        if (window.hasOwnProperty('__APOLLO_STATE__')) {
            // SSR state transfer
            cache.restore((window as any).__APOLLO_STATE__.defaultClient);
        } else {
            // needed to get apollo-dev-tools to recognize client
            (window as any).__APOLLO_STATE__ = {booger: 'eater'};
        }
    }

    // #### need to make sure cache doesn't persist for changes
    // persistCache({
    //     cache,
    //     storage: window.localStorage,
    // });

    const client = new ApolloClient({
        cache,
        link,
        connectToDevTools: true,
        ...(ssr ? {ssrMode: true} : {ssrForceFetchDelay: 100}),
    });

    // @ts-ignore - bug in .d.ts file i think
    client.onResetStore(stateLink.writeDefaults);

    return client;
};
