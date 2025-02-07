import { ActiveClue } from "../../api/round";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { Maybe } from "purify-ts";

const Clue = ({ clue }: { clue: Maybe<ActiveClue> }) =>
    clue
        .map(({ aboutToBeShown, canSelect, hint, moneyAmount }) => (
            <button
                onClick={canSelect.extract()}
                disabled={canSelect.isNothing() ?? true}
                className={flattenStrings([
                    moneyAmount ? "" : "opacity-0",
                    aboutToBeShown ? "bg-slate-200 text-blue-700" : "bg-blue-700/80",
                    "text-blue-100 font-bold text-xl shadow-md rounded-md fl.ex center",
                ])}
            >
                {moneyAmount}
            </button>
        ))
        .orDefault(<div />);

export const DisplayClues = ({ clues }: { clues: Maybe<ActiveClue>[][] }) =>
    clues.map((clueRow, rowIndex) => (
        <div className={"contents"}>
            {clueRow.map((clue, columnIndex) => {
                return (
                    <Clue key={clue.map((x) => x.hint).orDefault(`${rowIndex}${columnIndex}`)} clue={clue} />
                );
            })}
        </div>
    ));
