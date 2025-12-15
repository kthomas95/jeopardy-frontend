import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./styles/tailwind.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Provider } from "urql";
import { graphqlClient } from "./graphql/graphql-client";
import { createStore, Provider as JotaiProvider } from "jotai";
import { MantineProvider } from "@mantine/core";

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        // <StrictMode>
        <JotaiProvider>
            <MantineProvider>
                <Provider value={graphqlClient}>
                    <RouterProvider router={router} />
                </Provider>
            </MantineProvider>
        </JotaiProvider>,
        // </StrictMode>,
    );
}
