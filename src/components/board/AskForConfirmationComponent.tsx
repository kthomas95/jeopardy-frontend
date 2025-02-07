import { AskForConfirmation } from "../../api/player-round-status";
import { buttonStyles } from "../../styles/button";
import { AskForConfirmationActive } from "../../api/round";

export const AskForConfirmationComponent = ({
    actualAnswer,
    isCorrect,
    isIncorrect,
}: AskForConfirmationActive) => (
    <div
        className={
            "absolute z-20 inset-16 h-min m-auto bg-blue-700 shadow-2xl ring-slate-700 rounded-md  ring-4 p-4 flex flex-col gap-4"
        }
    >
        <div className={"text-slate-100 font-semibold text-xl uppercase text-center"}>{actualAnswer}</div>
        <div className="flex gap-3 justify-around">
            <button onClick={isIncorrect} className={buttonStyles({ colors: "error" })}>
                Wrong Answer
            </button>
            <button onClick={isCorrect} className={buttonStyles({ colors: "success" })}>
                Correct Answer
            </button>
        </div>
    </div>
);
