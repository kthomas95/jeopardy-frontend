import { useState } from "react";
import { z } from "zod";
import { useActiveGame, useGameStatus } from "../game/active-game-context";
import {
    FinalJeopardyProps_AskingForAnswer_Fragment,
    FinalJeopardyProps_AskingForConfirmation_Fragment,
    FinalJeopardyProps_AskingForWager_Fragment,
} from "../../__generated__/get-active-game.generated";
import { Button, Input } from "@heroui/react";

const AskingForAnswerComponent = ({ category, clue }: FinalJeopardyProps_AskingForAnswer_Fragment) => {
    const { makeMove } = useActiveGame();

    const [answer, setAnswer] = useState("");

    const submitAnswer = (answer: string) => {
        makeMove({ type: "FinalJeopardyAnswer", answer });
    };

    return (
        <div className={"flex grow bg-jeopardy-dark justify-center items-center text-white p-4"}>
            <div className={"flex flex-col gap-2 w-full max-w-md"}>
                <div className={"font-bold"}>{category}</div>
                {clue}

                <div className={"flex flex-col gap-2"}>
                    <Input
                        type={"text"}
                        value={answer}
                        placeholder={"Enter Your Answer Here"}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <Button variant="tertiary" className="ml-auto" onPress={() => submitAnswer(answer)}>
                        Submit Answer
                    </Button>
                </div>
            </div>
        </div>
    );
};

const AskingForConfirmationComponent = ({
    actualAnswer,
    providedAnswer,
}: FinalJeopardyProps_AskingForConfirmation_Fragment) => {
    const { makeMove } = useActiveGame();

    const submitConfirmation = (value: boolean) =>
        makeMove({ type: "VerifyAnswer", isCorrect: value, isNeutral: false });

    return (
        <div
            className={
                "bg-jeopardy-dark grow p-4 flex justify-center flex-col items-center text-white shadow-md"
            }
        >
            <div>Your Answer: {providedAnswer}</div>
            <div>Actual Answer: {actualAnswer}</div>
            <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                    className="bg-emerald-600 text-white"
                    onPress={() => submitConfirmation(true)}
                >
                    Correct
                </Button>
                <Button
                    className="bg-red-700 text-white"
                    onPress={() => submitConfirmation(false)}
                >
                    Incorrect
                </Button>
            </div>
        </div>
    );
};

const AskingForWagerComponent = ({ category }: FinalJeopardyProps_AskingForWager_Fragment) => {
    const { makeMove } = useActiveGame();
    const [amount, setAmount] = useState("");

    const submitWager = (amount: number) => makeMove({ type: "FinalJeopardyWager", amount });

    return (
        <div
            className={"flex grow items-center justify-center flex-col gap-2 bg-jeopardy-dark text-white p-4"}
        >
            <div>
                The category is <b>{category}</b>
            </div>
            <div className={"flex flex-col gap-2 w-full max-w-md"}>
                <div>How much would you like to wager?</div>
                <Input
                    type={"number"}
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                />
                <Button
                    variant="tertiary"
                    type={"submit"}
                    className="ml-auto"
                    onPress={() => {
                        const newAmount = z.coerce.number()
                            .nonnegative()
                            .nullable()
                            .catch(null)
                            .parse(amount);

                        if (newAmount !== null) {
                            submitWager(newAmount);
                        }
                    }}
                >
                    Submit Wager
                </Button>
            </div>
        </div>
    );
};

export const DisplayFinalJeopardy = () => {
    const status = useGameStatus()
        .filter((x) => x.__typename === "FinalJeopardy")
        .map((x) => x.status)
        .extract();

    if (!status) return null;

    if (status.__typename === "AskingForAnswer") {
        return <AskingForAnswerComponent {...status} />;
    }

    if (status.__typename === "AskingForWager") {
        return <AskingForWagerComponent {...status} />;
    }

    if (status.__typename === "AskingForConfirmation") {
        return <AskingForConfirmationComponent {...status} />;
    }

    if (status.__typename === "FJWaiting") {
        return <div className={"grow bg-jeopardy-dark"} />;
    }

    return <div />;
};
