import { createFileRoute } from "@tanstack/react-router";
import { SetUsername } from "../components/account/SetUsername";
import { RetrieveAndRenderGameComponent } from "../components/lobby/RetrieveAndRenderGameComponent";
import { useToggle, useVibrate } from "react-use";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    return (
        <div className="flex flex-col">
            <RetrieveAndRenderGameComponent />
        </div>
    );
}
