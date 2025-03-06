import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Provider } from "urql";
import { graphqlClient } from "./graphql/graphql-client";
import { createStore, Provider as JotaiProvider } from "jotai";

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        // <StrictMode>
        <JotaiProvider>
            <Provider value={graphqlClient}>
                <RouterProvider router={router} />
            </Provider>
        </JotaiProvider>,
        // </StrictMode>,
    );
}
