import { createFileRoute } from "@tanstack/react-router";
import { Highscores } from "../features/highscores/Highscores";

export const Route = createFileRoute("/highscores")({
    component: Highscores,
});
