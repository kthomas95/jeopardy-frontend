import { CanBuzz } from "../../api/player-round-status";
import { SendMove } from "../../api/game-move";
import { buttonStyles } from "../../styles/button";
import { CanBuzzActive } from "../../api/round";
import { useToggle, useVibrate } from "react-use";
import { useEffect, useLayoutEffect } from "react";

export const CanBuzzComponent = ({ buzz, stump, question }: CanBuzzActive) => {
    return (
        <>
            <button
                onClick={buzz}
                className={"absolute z-20 inset-0 flex flex-col gap-5 center p-5 bg-blue-700 text-white"}
            >
                <h4 className={"mb-2 font-black text-lg"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <div className={"text-lg uppercase font-bold"}>{question.hint}</div>
            </button>
            <button
                onClick={stump}
                className={buttonStyles({ className: "absolute bottom-4 inset-x-4 z-50", colors: "error" })}
            >
                No One Knows!
            </button>
        </>
    );
};
