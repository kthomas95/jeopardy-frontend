import { ActiveClue } from "../../api/round";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { Maybe } from "purify-ts";
import { FaHeart } from "react-icons/fa";

const Clue = ({ clue }: { clue: Maybe<ActiveClue> }) =>
    clue
        .map(({ aboutToBeShown, canSelect, hint, moneyAmount }) => (
            <button
                onClick={canSelect.extract()}
                disabled={canSelect.isNothing() ?? true}
                className={flattenStrings([
                    moneyAmount ? "" : "opacity-0",
                    aboutToBeShown ? "bg-slate-200 text-jeopardy" : "bg-jeopardy/80",
                    "text-blue-100 font-black text-xl shadow-md rounded-md flex center",
                ])}
            >
                {moneyAmount}
            </button>
        ))
        .orDefault(
            <div
                className={"flex center text-4xl text-jeopardy/70 bg-jeopardy/20 rounded-md shadow-md"}
            ></div>,
        );

export const DisplayClues = ({ clues }: { clues: Maybe<ActiveClue>[][] }) =>
    clues.map((clueRow, rowIndex) => (
        <>
            {clueRow.map((clue, columnIndex) => {
                return (
                    <Clue key={clue.map((x) => x.hint).orDefault(`${rowIndex}${columnIndex}`)} clue={clue} />
                );
            })}
        </>
    ));
