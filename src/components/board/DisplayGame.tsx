import { ActivePlayerView } from "../../api/player-view";
import { GameLog } from "./GameLog";
import { DisplayPlayers } from "./DisplayPlayers";
import { DisplayFinalJeopardy } from "./DisplayFinalJeopardy";
import { DisplayRound } from "./DisplayRound";

export const DisplayGame = ({ players, log, round, finalJeopardy }: ActivePlayerView) => {
    return (
        <div className={"bg-slate-800 text-slate-100 h-dvh w-dvw overflow-hidden flex flex-col"}>
            {round
                .map((x) => <DisplayRound round={x} />)
                .alt(finalJeopardy.map((x) => <DisplayFinalJeopardy {...x} />))
                .orDefault(<div>The game is over.</div>)}

            <hr className={"mt-auto text-slate-200/40"} />
            <div className={"h-56 flex flex-col overflow-hidden"}>
                <DisplayPlayers players={players} />
                <GameLog log={log} />
            </div>
        </div>
    );
};
