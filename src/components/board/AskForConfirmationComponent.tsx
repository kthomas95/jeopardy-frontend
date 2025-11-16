import { AskForConfirmation } from "../../api/player-round-status";
import { buttonStyles } from "../../styles/button";
import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";

export const AskForConfirmationComponent = () => {
    const status = useRound().status;

    const askForConfirmation = isTypename(status, "AskForConfirmation");

    const { makeMove } = useActiveGame();

    if (!askForConfirmation) return null;

    const { actualAnswer, canGoNeutral } = askForConfirmation;

    const isIncorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: false });
    const isCorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: true, isNeutral: false });
    const isNeutral = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: true });

    return (
        <div
            className={
                "absolute z-20 inset-16 h-min m-auto border-2 border-jeopardy-dark  bg-jeopardy shadow-2xl  rounded-md flex flex-col"
            }
        >
            <div className={"text-slate-100 font-semibold text-xl p-6 uppercase text-center"}>
                {actualAnswer}
            </div>
            <div className="grid grid-flow-col h-14">
                <button
                    onClick={isIncorrect}
                    className={buttonStyles({ colors: "error", rounded: "none", class: "rounded-bl-md" })}
                >
                    Wrong Answer
                </button>
                <button
                    onClick={isCorrect}
                    className={buttonStyles({
                        colors: "success",
                        rounded: "none",
                        class: "last:rounded-br-md",
                    })}
                >
                    Correct Answer
                </button>
                {/*{isNeutral*/}
                {/*    .map((x) => (*/}
                {/*        <button*/}
                {/*            onClick={x}*/}
                {/*            className={buttonStyles({*/}
                {/*                class: "rounded-br-md",*/}
                {/*                rounded: "none",*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            Ambigious*/}
                {/*        </button>*/}
                {/*    ))*/}
                {/*    .extract()}*/}
            </div>
        </div>
    );
};
