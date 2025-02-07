import { renderUnion, unwrapUnion } from "../../utils/unions";
import { ReactNode, useState } from "react";
import { buttonStyles } from "../../styles/button";
import {
    ActiveAskingForFinalAnswer,
    ActiveAskingForFinalConfirmation,
    ActiveAskingForFinalWager,
    AskingForFinalAnswer,
    AskingForFinalConfirmation,
    AskingForFinalWager,
    FinalJeopardyStatus,
} from "../../api/final-jeopardy";
import { number } from "zod";

const AskingForAnswerComponent = ({ category, clue, submitAnswer }: ActiveAskingForFinalAnswer) => {
    const [answer, setAnswer] = useState("");

    return (
        <div className={"shadow-2xl flex flex-col gap-2 rounded-lg bg-sky-700/20 p-4"}>
            <div>{category}</div>
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
    );
};

const AskingForConfirmationComponent = ({
    actualAnswer,
    providedAnswer,
    submitConfirmation,
}: ActiveAskingForFinalConfirmation) => (
    <div>
        <div>Your Answer: {providedAnswer}</div>
        <div>Actual Answer: {actualAnswer}</div>
        <div className="grid grid-cols-2 gap-3">
            <button className={buttonStyles({ colors: "success" })} onClick={() => submitConfirmation(true)}>
                Correct
            </button>
            <button className={buttonStyles({ colors: "error" })} onClick={() => submitConfirmation(false)}>
                Incorrect
            </button>
        </div>
    </div>
);

const AskingForWagerComponent = ({ category, submitWager }: ActiveAskingForFinalWager) => {
    const [amount, setAmount] = useState("");

    return (
        <div className={"shadow-2xl flex flex-col gap-2 rounded-lg bg-sky-700/20 p-4"}>
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

export const DisplayFinalJeopardy = (status: FinalJeopardyStatus) => (
    <div className={"h-full max-w-96 flex center mx-auto"}>
        {renderUnion<FinalJeopardyStatus>({
            AskingForAnswer: AskingForAnswerComponent,
            AskingForConfirmation: AskingForConfirmationComponent,
            AskingForWager: AskingForWagerComponent,
            Waiting: () => null,
        })(status)}
    </div>
);
