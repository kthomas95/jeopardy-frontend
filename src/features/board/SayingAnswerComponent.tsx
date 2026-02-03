import { useToggle, useVibrate } from "react-use";
import { useLayoutEffect } from "react";
import { useActiveGame, useRound } from "../game/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Button } from "@heroui/react";

export const RenderStringWithNewLines = ({ item, className }: { item: string; className?: string }) =>
    item.split("\n").map((x) => (
        <div key={x} className={className}>
            {x}
        </div>
    ));

export const SayingAnswerComponent = () => {

    const status = useRound().status;
    const { makeMove } = useActiveGame();

    const sayingAnswer = isTypename(status, "SayingAnswer");

    if (!sayingAnswer) return null;

    const { question } = sayingAnswer;

    const showAnswer = () => makeMove({ type: "ShowAnswer" });

    return (
        <>
            <div className={"absolute inset-0 z-20 bg-emerald-700 flex flex-col"}>

                <div
                    className={
                        "mt-auto mx-8 text-center h-min text-white p-3 flex flex-col gap-4 rounded-lg"
                    }
                >
                    <h4 className={"font-black text-xl uppercase"}>
                        {question.category} - ${question.moneyAmount}
                    </h4>
                    <p className={"p-1 uppercase"}>
                        <RenderStringWithNewLines item={question.hint} />
                    </p>

                    {/* Do not use HeroUI button for this, styles too unreliable on green background.*/}
                </div >
                <button onClick={showAnswer} className="mt-auto text-emerald-900 mx-8 mb-12 ring-2 font-semibold tracking-wide text-sm ring-emerald-900/40 p-5 rounded-lg">
                    Click Here When You've Stated Your Answer
                </button>
            </div>
        </>
    );
};
