import { renderUnion, unwrapUnion } from "../../utils/unions";
import { ReactNode, useState } from "react";
import { buttonStyles } from "../../styles/button";
import { number } from "zod";
import { useActiveGame, useGameStatus } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import {
    FinalJeopardyProps_AskingForAnswer_Fragment,
    FinalJeopardyProps_AskingForConfirmation_Fragment,
    FinalJeopardyProps_AskingForWager_Fragment,
} from "../../__generated__/get-active-game.generated";

const AskingForAnswerComponent = ({ category, clue }: FinalJeopardyProps_AskingForAnswer_Fragment) => {
    const { makeMove } = useActiveGame();

    const [answer, setAnswer] = useState("");

    const submitAnswer = (answer: string) => {
        makeMove({ type: "FinalJeopardyAnswer", answer });
    };

    return (
        <div className={"flex grow bg-jeopardy-dark justify-center items-center text-white p-4"}>
            <div className={"flex flex-col gap-2"}>
                <div className={"font-bold"}>{category}</div>
                {clue}

                <div className={"flex flex-col gap-2"}>
                    <input
                        type={"text"}
                        className={"bg-slate-200 text-slate-800 pl-2 py-0.5 shadow-md rounded-md"}
                        value={answer}
                        placeholder={"Enter Your Answer Here"}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button className={buttonStyles()} onClick={() => submitAnswer(answer)}>
                        Submit Answer
                    </button>
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
            <div className="grid grid-cols-2 gap-3">
                <button
                    className={buttonStyles({ colors: "success" })}
                    onClick={() => submitConfirmation(true)}
                >
                    Correct
                </button>
                <button
                    className={buttonStyles({ colors: "error" })}
                    onClick={() => submitConfirmation(false)}
                >
                    Incorrect
                </button>
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
            <div className={"flex flex-col gap-2"}>
                <div>How much would you like to wager?</div>
                <input
                    type={"number"}
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                    className={"pl-2 bg-slate-200 text-slate-800 rounded-md shadow-md"}
                />
                <button
                    className={buttonStyles({ colors: "primary" })}
                    type={"submit"}
                    onClick={() => {
                        const newAmount = number({ coerce: true })
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
                </button>
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
