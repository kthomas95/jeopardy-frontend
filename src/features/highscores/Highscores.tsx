import React from "react";
import { useGetHighscoresSubscription } from "../../__generated__/get-highscores.generated";

export const Highscores = () => {
    const _highscores = useGetHighscoresSubscription()[0].data?.getHighscores ?? [];

    const karyn = _highscores.find((x) => x.playerName === "Karyn");

    const highscores = _highscores
        .filter((x) => x.playerName !== "Karyn")
        .filter((x) => x.playerName !== "Steve")
        .map((x) => (x.playerName === "Kar" ? { ...x, amount: x.amount + (karyn?.amount ?? 0) } : x))
        .toSorted((a, b) => b.amount - a.amount);

    // const [gold, silver, bronze, ...rest] = highscores;
    const [...rest] = highscores;
    return (
        <div className={"flex flex-col gap-2"}>
            <h4 className={"font-bold"}>Highscores</h4>
            <div className="grid grid-cols-3 gap-3">
            </div>
            <div className="grid items-center grid-cols-[max-content_max-content_max-content] col-gap-6 gap-x-7 gap-y-3 p-3">
                {rest.map(({ amount, playerName, record }, index) => {
                    return (
                        <React.Fragment key={playerName}>
                            {/*<div className={"font-black"}>{index + 1}.</div>*/}
                            <div className="font-blackd text-slate-300 ">{playerName}</div>
                            <div className="text-sm italic">
                                {record.won}-{record.lost}
                            </div>
                            <div className={"tracking-tight font-black text-emerald-600"}>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    compactDisplay: "short",
                                    trailingZeroDisplay: "stripIfInteger",
                                }).format(amount >= 0 ? amount : 0)}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};
