import { Player } from "../../api/player";
import { flattenStrings } from "../../utils/string/flatten-strings";

export const DisplayPlayers = ({ players }: { players: Player[] }) => (
    <div className={"grid grid-flow-col min-h-0 p-2 gap-2 md:h-16 items-end col-span-6 text-white"}>
        {players.map((player) => (
            <div
                className={flattenStrings([
                    "bg-blue-700/70 min-h-0 h-full rounded-md shadow-2xl p-1 gap-6 lg:gap-0 lg:p-3 flex lg:flex-col center",
                ])}
            >
                <h4 className={"font-black text-lg uppercase"}>{player.name}</h4>
                {/*<hr className={"my-2 opacity-40 w-full hidden lg:block"} />*/}
                <div className={flattenStrings(["font-black", player.money < 0 ? "text-red-500" : ""])}>
                    ${player.money}
                </div>
            </div>
        ))}
    </div>
);
