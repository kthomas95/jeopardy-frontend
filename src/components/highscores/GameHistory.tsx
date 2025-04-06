import { useGetRecentGamesSubscription } from "../../__generated__/get-recent-games.generated";
import dayjs from "dayjs";
import React from "react";
import { Link } from "@tanstack/react-router";

export const GameHistory = () => {
    const recentGame = (useGetRecentGamesSubscription()[0].data?.getRecentGames ?? []).toReversed();

    return (
        <>
            <div className="flex justify-between">
                <h5 className={"font-bold mb-3"}>Recent Games</h5>
                <Link to={"/"}>Return Home</Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {recentGame.map((game) => (
                    <div className={"bg-sky-600/30 p-3 rounded-md shadow-xl"}>
                        <h4 className={"font-black mb-3"}>
                            {dayjs.unix(game.epochTime).format("YYYY-MM-DD HH:mm A")}
                        </h4>
                        {game.players.map(({ money, name }) => (
                            <div className={"flex gap-3"}>
                                <b>{name}</b>
                                <span>${money}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};
