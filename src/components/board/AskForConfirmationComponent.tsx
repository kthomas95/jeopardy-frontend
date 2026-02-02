import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Button } from "@heroui/react";
import { ImCheckmark, ImCross } from "react-icons/im";

export const AskForConfirmationComponent = () => {
    const status = useRound().status;

    const askForConfirmation = isTypename(status, "AskForConfirmation");

    const { makeMove } = useActiveGame();

    if (!askForConfirmation) return null;

    const { actualAnswer, canGoNeutral, providedAnswer, question } = askForConfirmation;

    const isIncorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: false });
    const isCorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: true, isNeutral: false });
    const isNeutral = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: true });

    return (
        <div className="absolute z-20 inset-0 border-jeopardy-dark bg-jeopardy flex flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4">
                <h3 className="text-center text-xl font-bold text-white">
                    {question.category} - ${question.moneyAmount}
                </h3>
                <p className="text-white text-center">{question.hint}</p>

                {providedAnswer ? (
                    <div className="grid grid-cols-2 gap-4 bg-white/10 p-4 rounded-md">
                        <div className="text-white font-bold">Your Answer: </div>
                        <div className="text-white">{providedAnswer}</div>
                        <div className="text-white font-bold">Actual Answer: </div>
                        <div className="text-white">{actualAnswer}</div>
                    </div>
                ) : (
                    <div className={"text-slate-100 font-semibold text-xl p-6 uppercase text-center"}>
                        {actualAnswer}
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        onPress={isIncorrect}
                        className="bg-red-600 text-white"
                        size="lg"
                    >
                        <ImCross /> Wrong Answer
                    </Button>
                    <Button onPress={isCorrect} size="lg" className="bg-emerald-600 text-white">
                        <ImCheckmark /> Correct Answer
                    </Button>
                </div>
            </div>
        </div>
    );
};
