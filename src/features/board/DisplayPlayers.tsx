import { cn } from "@heroui/react";
import { useActiveGame } from "../game/active-game-context";

export const DisplayPlayers = () => {
    const players = useActiveGame().players;
    return (
        <div
            className={
                "grid player grid-flow-row grid-cols-3 p-2 gap-2 md:h-16 items-end col-span-6 text-white"
            }
        >
            {players.map((player) => (
                <div
                    className={cn(
                        player.hasNoIdea ? "!bg-yellow-300/30" : "",
                        player.wasWrong ? "!bg-red-400/20" : "",
                        player.isBuzzing ? "!bg-slate-200 !text-slate-900" : "",
                        player.fjStatus ? "ring-2" : null,
                        player.greenRing ? "bg-emerald-600" : null,
                        player.redRing ? "bg-yellow-400/30" : null,
                        player.fjStatus?.waitingOnYou === true ? "ring-red-400" : null,
                        player.fjStatus?.waitingOnYou === false ? "ring-emerald-500" : null,
                        "relative bg-jeopardy/70 min-h-0 h-full rounded-md align-end shadow-2xl p-1 gap-2 lg:gap-0 lg:p-3 flex items-center justify-evenly",
                    )}
                >
                    <h4 className={"flex items-center gap-3 font-black md:text-lg uppercase"}>
                        {player.name}
                    </h4>

                    <div
                        className={cn(
                            "font-black",
                            player.moneyAmount < 0 ? "text-red-500" : "",
                        )}
                    >
                        ${player.moneyAmount}
                    </div>
                </div>
            ))}
        </div>
    );
};
