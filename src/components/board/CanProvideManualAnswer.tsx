import { useActiveGame, useRound } from "../../api/active-game-context";
import { Button, Input } from "@heroui/react";
import { useState } from "react";

export const CanProvideManualAnswer = () => {
    const [answerValue, setAnswerValue] = useState("");
    const round = useRound();

    const { makeMove } = useActiveGame();

    const status = round.status;

    if (status.__typename === "CanProvideManualAnswer")
        return (
            <div className={"absolute inset-0 bg-jeopardy-dark flex center flex-col justify-center items-center p-4"}>
                <h2 className="text-2xl font-bold text-center text-white mb-4">
                    {status.question.category} - ${status.question.moneyAmount}
                </h2>

                <p className="text-white mb-4 p-2">{status.question.hint}</p>

                <div className="flex gap-2 mb-4 w-full max-w-md">
                    <Input
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                        placeholder={"Answer"}
                        className="flex-grow rounded-r-none"
                    />
                    <Button
                        isDisabled={answerValue === ""}
                        onPress={() => {
                            makeMove({ type: "ProvideAnswer", answer: answerValue });
                            setAnswerValue("");
                        }}
                    >
                        Submit Answer
                    </Button>
                </div>

                <Button
                    onPress={() => makeMove({ type: "NoIdea" })}
                    className="absolute bottom-0 h-16 rounded-t-none text-xl w-full bg-red-600 text-white"
                    isDisabled={answerValue !== ""}
                >
                    NO IDEA
                </Button>
            </div>
        );

    return null;
};
