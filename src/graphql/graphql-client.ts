import { createClient as createWSClient, SubscribePayload } from "graphql-ws";
import { cacheExchange, createClient, fetchExchange, subscriptionExchange } from "urql";

const wsClient = createWSClient({
    url: "wss://api.jeopardy.website/subscriptions",

    on: {},
    retryAttempts: 50,
    shouldRetry: () => true,
    connectionParams: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
    // connectionParams: getHeaders(currentUser),
});

export const graphqlClient = createClient({
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
