import { createRootRoute, Outlet, RootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootWrapper,
});

function RootWrapper() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
