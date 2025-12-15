import { createFileRoute } from "@tanstack/react-router";
import { SetUsernameForm } from "../components/account/SetUsername";

export const Route = createFileRoute("/name")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <SetUsernameForm />
        </div>
    );
}
