import { SayingAnswerActive } from "../../api/round";
import { useToggle, useVibrate } from "react-use";
import { useLayoutEffect } from "react";
import { buttonStyles } from "../../styles/button";

export const SayingAnswerComponent = ({ question, showAnswer }: SayingAnswerActive) => {
    const [isBuzzing, setIsBuzzing] = useToggle(false);

    useLayoutEffect(() => {
        setIsBuzzing(true);
    }, []);

    useVibrate(isBuzzing, [50, 50, 50, 50, 50, 50, 50, 50, 50], false);

    return (
        <>
            <div className={"absolute inset-0 z-20 bg-emerald-600"} />
            <div
                className={
                    "absolute z-30 inset-16 m-auto h-min bg-slate-600 text-white p-3 shadow-2xl ring-slate-800 ring-4 flex flex-col gap-4 rounded-lg"
                }
            >
                <h4 className={"font-black uppercase"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <p className={"p-1 text-lg"}>{question.hint}</p>
                <button onClick={showAnswer} className={buttonStyles({ colors: "dark" })}>
                    Click Here When You've Stated Your Answer
                </button>
            </div>
        </>
    );
};
