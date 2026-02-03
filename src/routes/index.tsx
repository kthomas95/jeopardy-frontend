import { createFileRoute } from "@tanstack/react-router";
import { RetrieveAndRenderGameComponent } from "../features/lobby/RetrieveAndRenderGameComponent";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
    return (
        <div className="flex flex-col h-dvh">
            <RetrieveAndRenderGameComponent />
        </div>
    );
}
