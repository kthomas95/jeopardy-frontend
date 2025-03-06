import { createFileRoute } from "@tanstack/react-router";
import { DisplayGame } from "../components/board/DisplayGame";
import { useValentineGameSubscription } from "../__generated__/valentine-subscription.generated";
import { useMemo } from "react";
import { getActivePlayerView, loadPlayerViewFromStateString } from "../api/player-view";
import { Maybe } from "purify-ts";
import { useMakeMoveMutation } from "../__generated__/make-move.generated";
import { MakeMove } from "../api/useGetGameDateFromServer";
import { useValentinesMoveMutation } from "../__generated__/make-valentines-move.generated";

export const Route = createFileRoute("/valentine")({
    component: RouteComponent,
});

function RouteComponent() {
    const stateString = useValentineGameSubscription()[0].data?.getValentinesDayGame;
    const [makeMoveResponse, makeMoveMutation] = useValentinesMoveMutation();

    const makeMove: MakeMove = (move) => {
        makeMoveMutation({ moveString: JSON.stringify(move) });
    };

    const activeGame = useMemo(
        () =>
            Maybe.fromNullable(stateString)
                .map(loadPlayerViewFromStateString)
                .map((view) => getActivePlayerView(view, makeMove)),
        [stateString],
    );

    return activeGame.map((game) => <DisplayGame {...game} />).orDefault(<div>Loading</div>);
}
