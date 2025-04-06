import { Player } from "../../api/player";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { PlayerViewPlayer } from "../../api/player-view";
import { FaHeart } from "react-icons/fa";
import { animate } from "animejs";
import { useEffect } from "react";

export const DisplayPlayers = ({ players }: { players: PlayerViewPlayer[] }) => {
    // useEffect(() => {
    //     animate(".player", {
    //         // scale: [{ to: 1.25 }, { to: 1 }],
    //         loop: true,
    //         translateY: -10,
    //     });
    // }, []);

    return (
        <div className={"grid player grid-flow-col p-2 gap-2 md:h-16 items-end col-span-6 text-white"}>
            {players.map((player) => (
                <div
                    className={flattenStrings([
                        player.hasNoIdea ? "!bg-yellow-300/30" : "",
                        player.wasWrong ? "!bg-red-400/20" : "",
                        player.isBuzzing ? "!bg-slate-200 !text-slate-900" : "",
                        "bg-jeopardy/70 min-h-0 h-full rounded-md align-end shadow-2xl p-1 gap-2 lg:gap-0 lg:p-3 flex items-center justify-evenly",
                    ])}
                >
                    <h4 className={"flex items-center gap-3 font-black md:text-lg uppercase"}>
                        {player.name}
                    </h4>
                    {/*<hr className={"my-2 opacity-40 w-full hidden lg:block"} />*/}
                    <div
                        className={flattenStrings([
                            "font-black",
                            player.moneyAmount < 0 ? "text-red-500" : "",
                        ])}
                    >
                        ${player.moneyAmount}
                    </div>
                </div>
            ))}
        </div>
    );
};
