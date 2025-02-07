import { createFileRoute } from "@tanstack/react-router";
import { Highscores } from "../components/highscores/Highscores";

export const Route = createFileRoute("/highscores")({
    component: Highscores,
});
