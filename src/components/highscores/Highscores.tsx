import React from "react";
import { useGetHighscoresSubscription } from "../../__generated__/get-highscores.generated";
import { useGetRecentGamesSubscription } from "../../__generated__/get-recent-games.generated";

export const Highscores = () => {
    const highscores = useGetHighscoresSubscription()[0].data?.getHighscores ?? [];

    const placeholders = [
        { playerName: "Kyle", amount: 0 },
        { playerName: "Kaija", amount: 0 },
        { playerName: "Grady", amount: 0 },
    ];

    const recentGame = useGetRecentGamesSubscription()[0].data?.getRecentGames ?? [];

    return (
        <div className={"flex flex-col gap-2 p-4 bg-slate-800 text-slate-200 h-screen"}>
            <div className="grid grid-cols-[max-content_max-content] col-gap-6 gap-x-7 gap-y-3 bg-sky-600/30 p-3 rounded-md shadow-md">
                {(highscores?.length > 0 ? highscores : placeholders).map(({ amount, playerName }) => (
                    <React.Fragment key={playerName}>
                        <div>${amount}</div>
                        <div className="">{playerName}</div>
                    </React.Fragment>
                ))}
            </div>
            <hr className={"my-4 opacity-50"} />
            <h5 className={"font-bold"}>Recent Games</h5>
            <div className="flex gap-4">
                {recentGame.map((game) => (
                    <div className={"bg-sky-600/30 p-3 rounded-md shadow-xl"}>
                        <h4 className={"font-black mb-3"}>{game.date}</h4>
                        {game.players.map(({ money, name }) => (
                            <div>
                                {name} - ${money}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
