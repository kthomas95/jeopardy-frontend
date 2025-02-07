import { Player } from "./player";
import { ActiveRound, getActiveRound } from "./round";
import { PlayingGame } from "../graphql/graphql-types";
import { MakeMove } from "./useGetGameDateFromServer";
import { GameLogItem } from "./game-log";
import { List, Maybe } from "purify-ts";
import { ActiveFinalJeopardyStatus, FinalJeopardyStatus, getActiveFinalJeopardy } from "./final-jeopardy";
import { PlayerStatus } from "./player-status";
import { make } from "wonka";

export interface PlayerView {
    players: Player[];
    status: PlayerStatus;
    log: GameLogItem[];
}

export const loadPlayerViewFromStateString = (game: PlayingGame): PlayerView =>
    JSON.parse(game.stateString) as PlayerView;

export interface ActivePlayerView {
    players: Player[];
    round: Maybe<ActiveRound>;
    finalJeopardy: Maybe<ActiveFinalJeopardyStatus>;
    log: GameLogItem[];
}

export const getActivePlayerView = (view: PlayerView, makeMove: MakeMove): ActivePlayerView => ({
    log: view.log,
    round: Maybe.of(view.status)
        .filter((x) => "categories" in x)
        .map((x) => getActiveRound(x, makeMove)),
    finalJeopardy: Maybe.of(view.status)
        .filter((x): x is FinalJeopardyStatus => !("categories" in x))
        .map(getActiveFinalJeopardy(makeMove)),
    players: view.players,
});
