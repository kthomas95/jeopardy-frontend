import { buttonStyles } from "../../styles/button";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { TimerIndicator } from "../common/TimerIndicator";
import { RenderStringWithNewLines } from "./SayingAnswerComponent";
import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { motion } from "framer-motion";

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
        <motion.div
            layoutId={`${question.category}${question.moneyAmount}`}
            className={"absolute z-20 inset-0 flex flex-col"}
        >
            <button
                onClick={buzz}
                className={"grow flex flex-col gap-2 center p-5 bg-jeopardy-light text-white"}
            >
                <h4 className={"font-black text-lg"}>
                    {question.category} - ${question.moneyAmount}
                </h4>
                <div className={"font-medium text-sm"}>{question.categoryDate}</div>
                <div className={"text-lg uppercase font-bold mt-5"}>
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
        </motion.div>
    );
};
