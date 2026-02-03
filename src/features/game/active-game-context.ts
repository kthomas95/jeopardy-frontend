import { createContext, useContext } from "react";
import { PlayerViewPropsFragment, RoundViewPropsFragment } from "../../__generated__/get-active-game.generated";
import { Maybe } from "purify-ts";
import { MakeMove } from "./useGetGameDateFromServer";

export interface GameContext extends PlayerViewPropsFragment {
    makeMove: MakeMove;
}

export const activeGameContext = createContext<GameContext | null>(null);

export const useActiveGameOrNull = () => useContext(activeGameContext);

export const useActiveGame = () => {
    const value = useContext(activeGameContext);
    if (!value) throw Error("No active game context");
    else return value;
};

export const useCreateGameContext = () => {};

export const useGameStatus = () => Maybe.fromNullable(useActiveGame().status);

export const useRound = (): RoundViewPropsFragment =>
    useGameStatus()
        .filter((x) => x.__typename === "Round")
        .map((x) => x.status)
        .unsafeCoerce();
