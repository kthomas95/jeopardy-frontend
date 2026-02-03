import { createFileRoute } from "@tanstack/react-router";
import { GameHistory } from "../features/highscores/GameHistory";

export const Route = createFileRoute("/history")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className={"bg-slate-800 text-slate-200 p-4 min-h-dvh"}>
            <GameHistory />
        </div>
    );
}
