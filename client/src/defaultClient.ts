import { ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import resolvers from '@/resolvers';


const PROD = process.env.APP_ENV === 'production';
const PROTOCOL = PROD ? 'https://api.' : 'http://api.';
const HOST = process.env.APP_HOST || 'localhost';
const PORT = PROD ? process.env.APP_DEV_PORT : 80;
const uri = PROTOCOL + HOST + ':' + PORT;

export default (ssr = false) => {

    const cache = new InMemoryCache();

    const apiLink = new HttpLink({uri});

    const apiLinkAuth = setContext((_, { headers }) => {
        const token = !ssr ? localStorage.getItem('AUTH_TOKEN') : '';
        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const stateLink = withClientState({
        cache,
        resolvers,
    });

    // if (!ssr) {
    //     if (typeof window !== undefined) {
    //         const state = (window as any).__APOLLO_STATE__;
    //         if (state) {
    //             cache.restore(state.defaultClient)
    //         }
    //     }
    // }

    return new ApolloClient({
        cache,
        connectToDevTools: PROD,
        link: ApolloLink.from([
            stateLink,
            apiLinkAuth.concat(apiLink),
        ]),
        // ...(ssr ? {ssrMode: true} : {ssrForceFetchDelay: 100}),
    });
};
