import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { JoinGameButton } from "./JoinGameButton";
import { ResetGameButton } from "./ResetGameButton";
import { SetUsername } from "../account/SetUsername";
import { YearRangeSlider } from "./YearRangeSlider";
import { buttonStyles } from "../../styles/button";
import { useFinalizePlayersMutation } from "../../__generated__/finalize-players.generated";
import { ManageCategories } from "./ManageCategories";
import { Highscores } from "../highscores/Highscores";
import React from "react";
import { GameHistory } from "../highscores/GameHistory";
import { Link } from "@tanstack/react-router";
import { Badge, Button, MantineColor } from "@mantine/core";
import { PendingGamePlayerView } from "../../graphql/graphql-types";
import { ManageGameStyle } from "./ManageGameStyle";

export const FinalizePlayers = () => {
    const [, finalizePlayersMutation] = useFinalizePlayersMutation();
    return <Button onClick={() => finalizePlayersMutation({})}>Finalize Players</Button>;
};

export const ManagePendingGame = ({ pendingGame }: { pendingGame: PendingGamePlayerView }) => {
    const name = useAtomValue(UserAtom) ?? "";

    const names = pendingGame.players.map((x) => x.playerName);

    const canJoin = !names.includes(name);

    if (Array.isArray(pendingGame.pendingCategories))
        return <ManageCategories categories={pendingGame.pendingCategories} />;

    return (
        <div className="p-3 min-h-dvh">
            <SetUsername />

            <div className="p-5 bg-slate-700/50 rounded-md shadow-md my-10 mx-3">
                <h4 className="text-lg font-bold">Current Players</h4>
                <div className="flex gap-3 p-5">
                    {names.map((player, index) => (
                        <Badge
                            color={
                                (["cyan", "violet", "pink", "teal", "lime", "blue"] as MantineColor[])[index]
                            }
                        >
                            {player}
                        </Badge>
                    ))}
                </div>

                <ManageGameStyle style={pendingGame.gameStyle} />

                <YearRangeSlider yearRange={pendingGame.yearRange} />

                <div className="flex gap-3 p-3">
                    {canJoin ? <JoinGameButton /> : <FinalizePlayers />}
                    <hr className={"ml-auto"} />
                    <ResetGameButton />
                </div>
            </div>

            <hr className={"my-4 mx-5 opacity-50"} />

            <div className="p-5 flex flex-col">
                <Highscores />
                <Link to={"/history"} className={"my-3 italic inline-flex text-sm px-2  ml-auto underline"}>
                    Full Game History
                </Link>
            </div>
        </div>
    );
};
