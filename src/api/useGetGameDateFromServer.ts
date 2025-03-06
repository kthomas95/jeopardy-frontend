import { Either, Left, Maybe, Right } from "purify-ts";
import { useGetGameSubscription } from "../__generated__/get-game.generated";
import { PendingGamePlayer, PlayingGame } from "../graphql/graphql-types";
import {
    ActivePlayerView,
    getActivePlayerView,
    loadPlayerViewFromStateString,
    PlayerView,
} from "./player-view";
import { useMakeMoveMutation } from "../__generated__/make-move.generated";
import { GameMove } from "./game-move";
import { useEffect, useMemo } from "react";
import { useGetActiveGameSubscription } from "../__generated__/get-active-game.generated";
import { useGetPendingGameSubscription } from "../__generated__/get-lobby.generated";

export type MakeMove = (move: GameMove) => void;

export interface GameServerResponse {
    activeGame: Maybe<ActivePlayerView>;
    pendingGame: Maybe<PendingGamePlayer>;
}

export const useGetGameDateFromServer = (playerId: string): GameServerResponse => {
    const [{ data }] = useGetGameSubscription({ variables: { playerName: playerId } });
    const [{ data: game }] = useGetActiveGameSubscription({ variables: { playerName: playerId } });

    const [{ data: pendingGame }] = useGetPendingGameSubscription();
    const [makeMoveResponse, makeMoveMutation] = useMakeMoveMutation();

    const makeMove: MakeMove = (move) => {
        makeMoveMutation({ gameMoveString: JSON.stringify(move), playerName: playerId });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return {
        activeGame: useMemo(
            () =>
                Maybe.fromNullable(game?.getPlayingGame)
                    .map(loadPlayerViewFromStateString)
                    .map((view) => getActivePlayerView(view, makeMove)),
            [game],
        ),
        pendingGame: useMemo(() => Maybe.fromNullable(pendingGame?.getPendingGame), [pendingGame]),
    };
};
