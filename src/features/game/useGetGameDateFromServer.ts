import { Either, Left, Maybe, Right } from "purify-ts";
import { useGetGameSubscription } from "../__generated__/get-game.generated";
import { useMakeMoveMutation } from "../__generated__/make-move.generated";
import { GameMove } from "./game-move";
import { useEffect, useMemo } from "react";
import {
    PlayerViewPropsFragment,
    useGetActiveGameSubscription,
} from "../__generated__/get-active-game.generated";
import { useGetPendingGameSubscription } from "../__generated__/get-lobby.generated";
import { GameContext } from "./active-game-context";
import { PendingGamePlayerView } from "../graphql/graphql-types";

export type MakeMove = (move: GameMove) => void;

export interface GameServerResponse {
    isLoading: boolean;
    activeGame: Maybe<GameContext>;
    pendingGame: Maybe<PendingGamePlayerView>;
}

export const useGetGameDateFromServer = (playerId: string): GameServerResponse => {
    const [{ data, fetching: fetchingGetGame }] = useGetGameSubscription({
        variables: { playerName: playerId },
    });
    const [{ data: game }] = useGetActiveGameSubscription({ variables: { playerName: playerId } });

    const [{ data: pendingGame, fetching: fetchingPendingGame }] = useGetPendingGameSubscription();
    const [makeMoveResponse, makeMoveMutation] = useMakeMoveMutation();

    const makeMove: MakeMove = (move) => {
        makeMoveMutation({ gameMoveString: JSON.stringify(move), playerName: playerId });
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return {
        activeGame: useMemo(
            () => Maybe.fromNullable(game?.getPlayingGame).map((x) => ({ ...x, makeMove })),
            [game],
        ),
        pendingGame: useMemo(() => Maybe.fromNullable(pendingGame?.getPendingGame), [pendingGame]),
        isLoading: fetchingPendingGame || fetchingGetGame,
    };
};
