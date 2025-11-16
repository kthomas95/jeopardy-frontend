import { useToggle, useVibrate } from "react-use";
import { useLayoutEffect } from "react";
import { buttonStyles } from "../../styles/button";
import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";

export const RenderStringWithNewLines = ({ item, className }: { item: string; className?: string }) =>
    item.split("\n").map((x) => (
        <div key={x} className={className}>
            {x}
        </div>
    ));

export const SayingAnswerComponent = () => {
    const [isBuzzing, setIsBuzzing] = useToggle(false);

    useLayoutEffect(() => {
        setIsBuzzing(true);
    }, []);

    useVibrate(isBuzzing, [50, 50, 50, 50, 50, 50, 50, 50, 50], false);

    const status = useRound().status;
    const { makeMove } = useActiveGame();

    const sayingAnswer = isTypename(status, "SayingAnswer");

    if (!sayingAnswer) return null;

    const { question } = sayingAnswer;

    const showAnswer = () => makeMove({ type: "ShowAnswer" });

    return (
        <>
            <div className={"absolute inset-0 z-20 bg-emerald-700"} />
            <div
                className={
                    "absolute z-30 inset-16 m-auto h-min text-white p-3 flex flex-col gap-4 rounded-lg"
                }
            >
                <h4 className={"font-black text-xl uppercase"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <p className={"p-1 uppercase"}>
                    <RenderStringWithNewLines item={question.hint} />
                </p>
                <button onClick={showAnswer} className={buttonStyles({ colors: "outline", class: "" })}>
                    Click Here When You've Stated Your Answer
                </button>
            </div>
        </>
    );
};
