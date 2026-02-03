import { Separator } from "@heroui/react";
import { GameLog_IncorrectResponse_Fragment } from "../../../__generated__/get-active-game.generated";

export const IncorrectResponseGameLogItem = ({
    hint,
    playerName,
    amount,
    actualAnswerIfDailyDouble,
}: GameLog_IncorrectResponse_Fragment) => (
    <div
        className={
            "h-full ring-2 ring-red-500/50 bg-red-300/10 rounded-md shadow-md p-0.5 lg:p-1 text-white flex flex-col w-full gap-2 items-center text-center justify-center"
        }
    >
        <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
        {actualAnswerIfDailyDouble && (
            <div className={"bg-emerald-700 w-max mx-auto p-1 rounded-md shadow-md text-sm"}>
                {actualAnswerIfDailyDouble}
            </div>
        )}
        <div className={"font-light"}>
            <b className={"font-black"}>{playerName}</b> provided an incorrect response, losing ${amount}.
        </div>
    </div>
);
