import { CanBuzz } from "../../api/player-round-status";
import { SendMove } from "../../api/game-move";
import { buttonStyles } from "../../styles/button";
import { CanBuzzActive } from "../../api/round";
import { useToggle, useVibrate } from "react-use";
import { useEffect, useLayoutEffect } from "react";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { TimerIndicator } from "../common/TimerIndicator";
import { RenderStringWithNewLines } from "./SayingAnswerComponent";

export const CanBuzzComponent = ({ buzz, noIdea, question }: CanBuzzActive) => {
    const username = useAtomValue(UserAtom);

    return (
        <div className={"absolute z-20 inset-0 flex flex-col"}>
            <button
                onClick={buzz}
                className={"grow flex flex-col gap-5 center p-5 bg-jeopardy-light text-white"}
            >
                <h4 className={"mb-2 font-black text-lg"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <div className={"text-lg uppercase font-bold"}>
                    <RenderStringWithNewLines item={question.hint} />
                </div>
            </button>
            <TimerIndicator secondsToShow={10} />
            <button
                onClick={noIdea}
                className={buttonStyles({
                    className: "!py-4 uppercase !font-black !text-xl",
                    colors: "error",
                    rounded: "none",
                })}
            >
                No Idea
            </button>
        </div>
    );
};
