import { useAtomValue } from "jotai";
import { UserAtom } from "../account/user-atom";
import { TimerIndicator } from "../common/TimerIndicator";
import { RenderStringWithNewLines } from "./SayingAnswerComponent";
import { useActiveGame, useRound } from "../game/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Button } from "@heroui/react";

export const CanBuzzComponent = () => {
    const username = useAtomValue(UserAtom);

    const status = useRound().status;

    const { makeMove } = useActiveGame();

    const canBuzz = isTypename(status, "CanBuzz");

    if (!canBuzz) return null;

    const { question } = canBuzz;

    const buzz = () => makeMove({ type: "Buzz" });

    const noIdea = () => makeMove({ type: "NoIdea" });

    return (
        <div
            className={"absolute z-20 inset-0 flex flex-col"}
        >
            <Button
                onPress={buzz}
                className={"grow flex flex-col gap-2 h-auto w-full whitespace-normal bg-jeopardy text-white rounded-none data-[hover=true]:bg-jeopardy-light/80"}
            >
                <h4 className={"font-black text-lg"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <div className={"font-medium text-sm"}>{question.categoryDate}</div>
                <div className={"text-lg uppercase font-bold mt-5"}>
                    <RenderStringWithNewLines item={question.hint} />
                </div>
            </Button>
            <TimerIndicator secondsToShow={10} />
            <button
                onClick={noIdea}
                className="py-4 uppercase font-black text-xl bg-red-700 text-white rounded-none active:!scale-100"

            >
                No Idea
            </button>
        </div>
    );
};
