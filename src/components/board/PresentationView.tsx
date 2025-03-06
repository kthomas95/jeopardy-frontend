import { Player } from "../../api/player";
import { PlayerViewCategory } from "../../api/category";
import { renderUnion } from "../../utils/unions";
import { DisplayCategories } from "./DisplayCategories";
import { DisplayPlayers } from "./DisplayPlayers";
import { Clue } from "../../api/clue";
import { Maybe } from "purify-ts";
import { motion } from "framer-motion";
import { flattenStrings } from "../../utils/string/flatten-strings";

export interface PresentationViewProps {
    players: Player[];
    status: PresentationStatus;
}

export interface RoundPresentationView {
    type: "RoundPresentationView";
    board: number[][];
    controlOfBoard: string;
    categories: PlayerViewCategory[];
    currentClue: Clue | null;
}

export interface FinalJeopardyPresentationView {
    type: "FinalJeopardyPresentationView";
    category: string;
    clue?: string;
    answer?: string;
}

export type PresentationStatus = RoundPresentationView | FinalJeopardyPresentationView;

const RenderPresentationRound = ({
    board,
    categories,
    controlOfBoard,
    currentClue,
}: RoundPresentationView) => (
    <div className={"grid grid-cols-6 gap-3 p-6 grid-rows-6 h-full min-h-0"}>
        <DisplayCategories categories={categories} />

        {Maybe.fromNullable(currentClue)
            .filter((x) => !x.aboutToBeShown)
            .map((clue) => (
                <motion.div
                    layoutId={`${clue.moneyAmount}`}
                    className={
                        "bg-blue-700 fixed inset-16 m-auto shadow-2xl border-sky-900 border-2 rounded-md p-4 flex center font-bold uppercase text-2xl"
                    }
                >
                    {clue?.hint}
                </motion.div>
            ))
            .extract()}

        {board.map((row) =>
            row.map((clue, categoryIndex) => (
                <motion.div
                    layoutId={`${categories[categoryIndex]?.title}${clue}`}
                    className={flattenStrings([
                        "bg-blue-700 disabled:opacity-50 text-blue-100 font-bold text-xl shadow-md rounded-md flex center",
                    ])}
                >
                    {clue}
                </motion.div>
            )),
        )}
    </div>
);

const RenderFinalJeopardy = ({ answer, category, clue }: FinalJeopardyPresentationView) => (
    <div className={"bg-blue-700 m-3 p-3 shadow-md rounded-md flex gap-5 flex-col center"}>
        <div className={"font-bold uppercase text-4xl"}>{category}</div>
        <div className={"text-2xl"}>{clue}</div>
        <div className={"text-xl"}>{answer}</div>
    </div>
);

export const PresentationView = ({ players, status }: PresentationViewProps) => (
    <div
        className={
            "bg-slate-800 h-screen min-h-0 text-slate-200 grid grid-cols-1 grid-rows-[1fr_max-content]"
        }
    >
        {renderUnion<PresentationStatus>({
            FinalJeopardyPresentationView: RenderFinalJeopardy,
            RoundPresentationView: RenderPresentationRound,
        })(status)}
        <div className="px-4 pb-6">{/*<DisplayPlayers players={players} />*/}</div>
    </div>
);
