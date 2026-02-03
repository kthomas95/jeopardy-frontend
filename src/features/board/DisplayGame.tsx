import { GameLog } from "./gamelog/GameLog";
import { DisplayPlayers } from "./DisplayPlayers";
import { DisplayFinalJeopardy } from "./DisplayFinalJeopardy";
import { DisplayRound } from "./DisplayRound";
import { PlayerView } from "../../graphql/graphql-types";
import { useActiveGame, useGameStatus } from "../game/active-game-context";
import { cn, Separator } from "@heroui/react";

export const DisplayGameSummary = () => {
    const status = useGameStatus();

    return status
        .filter((x) => x.__typename === "Over")
        .map(({ winner, fjSummaries, fj }) => (
            <div className={"flex grow bg-jeopardy-dark items-center justify-center p-4"}>
                <div className={"flex flex-col text-center"}>
                    <div className={"text-2xl"}>
                        <span className={"font-black"}>{winner}</span> has won!
                    </div>
                    <div className={"rounded-md ring-1 p-4 ring-gray-300/30 my-4 mx-1"}>
                        <div className={"text-sm opacity-80"}>{fj.hint}</div>
                        <Separator className="bg-gray-300/30 my-3" />
                        {/* <hr className={"text-gray-300/30 my-3"} /> */}
                        <div className={"font-bold"}>{fj.answer}</div>
                    </div>
                    <div className={"p-2 flex gap-4 my-5 justify-center"}>
                        {fjSummaries.map(({ name, amountWagered, providedAnswer, wasCorrect }) => (
                            <div className={"flex flex-col border border-gray-400/30 rounded-md"}>
                                <div className={"font-black text-sm border-b border-gray-400/30 p-2"}>
                                    {name}
                                </div>
                                <div className={"p-1 italic font-bold"}>${amountWagered}</div>
                                <div
                                    className={cn(
                                        "italic p-1.5 text-sm",
                                        wasCorrect ? "text-emerald-600" : "text-red-500",
                                    )}
                                >
                                    {providedAnswer ? providedAnswer : "No Answer Provided"}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))
        .extractNullable();
};

export const DisplayGame = () => {
    return (
        <div className={"bg-slate-800 text-slate-100 h-dvh w-dvw overflow-hidden flex flex-col"}>
            <DisplayRound />

            <DisplayFinalJeopardy />

            <DisplayGameSummary />

            {/*<hr className={"mt-auto text-slate-200/40"} />*/}
            <div className={"min-h-52 flex flex-col"}>
                <DisplayPlayers />
                <GameLog />
            </div>
        </div>
    );
};
