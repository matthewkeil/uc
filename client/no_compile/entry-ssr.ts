import Vue from 'vue';
// @ts-ignore - no .d.ts file
import ApolloSSR from 'vue-apollo/ssr';
import Main from './main';
import App from './App.vue';

export default () => new Promise((resolve, reject) => {
    const { app, router, store, apolloProvider } = Main(true);

    router.push((context as any).url);

    router.onReady(() => {
        const matchedComponents = router.getMatchedComponents()

        // no matched routes
        if (!matchedComponents.length) {
            reject({ code: 404 });
        }

        let js = '';

        // Call preFetch hooks on components matched by the route.
        // A preFetch hook dispatches a store action and returns a Promise,
        // which is resolved when the action is complete and store state has been
        // updated.
        // Vuex Store prefetch
        // Apollo prefetch
        // This will prefetch all the Apollo queries in the whole app
        // Inject the Vuex state and the Apollo cache on the page.
        // This will prevent unnecessary queries.
        
        // Vuex
        Promise.all(matchedComponents.map((component) => {
            return component.asyncData && component.asyncData({
                store,
                route: router.currentRoute,
            });
        })
        .then(() => ApolloSSR.prefetchAll(apolloProvider, [App, ...matchedComponents], {
            store,
            route: router.currentRoute,
        })
        .then(() => {
            js += `window.__INITIAL_STATE__=${JSON.stringify(store.state)};`;

            js += ApolloSSR.exportStates(apolloProvider);

            resolve({
                app,
                js,
            });
        })
        .catch(reject)));
    });
});
