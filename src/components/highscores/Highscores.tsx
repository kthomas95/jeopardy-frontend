import React from "react";
import { useGetHighscoresSubscription } from "../../__generated__/get-highscores.generated";

export const Highscores = () => {
    const highscores = useGetHighscoresSubscription()[0].data?.getHighscores ?? [];

    const [gold, silver, bronze, ...rest] = highscores;

    return (
        <div className={"flex flex-col gap-2 bg-slate-800 text-slate-200"}>
            <h4 className={"font-bold"}>Highscores</h4>
            <div className="grid grid-cols-3 gap-3">
                {gold && (
                    <div className="bg-amber-500 p-3 shadow-md rounded-md flex gap-2 items-center justify-between">
                        <div className={"font-black"}>{gold.playerName}</div>
                        <div className="text-sm">${gold.amount}</div>
                    </div>
                )}
                {silver && (
                    <div className="bg-slate-500 p-3 shadow-md rounded-md flex gap-2 items-center justify-between">
                        <div className={"font-black"}>{silver.playerName}</div>
                        <div className="text-sm">${silver.amount}</div>
                    </div>
                )}
                {bronze && (
                    <div className="bg-amber-800 p-3 shadow-md rounded-md flex gap-2 items-center justify-between">
                        <div className={"font-black"}>{bronze.playerName}</div>
                        <div className="text-sm">${bronze.amount}</div>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-[max-content_max-content] col-gap-6 gap-x-7 gap-y-3 p-3 text-sm italic">
                {rest.map(({ amount, playerName }) => (
                    <React.Fragment key={playerName}>
                        <div>${amount}</div>
                        <div className="">{playerName}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
