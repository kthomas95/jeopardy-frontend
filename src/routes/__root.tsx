import { createRootRoute, Outlet, RootRoute, ScrollRestoration } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootWrapper,
});

function RootWrapper() {
    return (
        <div>
            <ScrollRestoration />
            <Outlet />
        </div>
    );
}
