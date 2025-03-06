import { createFileRoute } from "@tanstack/react-router";
import { SetUsername } from "../components/account/SetUsername";
import { RetrieveAndRenderGameComponent } from "../components/lobby/RetrieveAndRenderGameComponent";
import { useToggle, useVibrate } from "react-use";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    return (
        <div className="flex flex-col text-slate-200 bg-slate-800 min-h-dvh">
            <RetrieveAndRenderGameComponent />
        </div>
    );
}
