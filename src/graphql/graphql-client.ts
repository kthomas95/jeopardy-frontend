import { createClient as createWSClient, SubscribePayload } from "graphql-ws";
import { cacheExchange, createClient, fetchExchange, subscriptionExchange } from "urql";

const wsClient = createWSClient({
    url: "wss://api.jeopardy.website/subscriptions",
    // url: "ws://10.0.0.21:8080/subscriptions",

    on: {},
    retryAttempts: Infinity,
    shouldRetry: () => true,
    keepAlive: 100,
    connectionParams: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    // connectionParams: getHeaders(currentUser),
});

export const graphqlClient = createClient({
    // url: "http://10.0.0.21:8080/graphql",
    url: "https://api.jeopardy.website/graphql",
    fetchOptions: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    // fetchOptions: getHeaders(currentUser),
    exchanges: [
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription: (request) => {
                const input: SubscribePayload = {
                    ...request,
                    query: request.query || "",
                };
                return {
                    subscribe: (sink) => ({
                        unsubscribe: wsClient.subscribe(input, sink),
                    }),
                };
            },
        }),
    ],
});
