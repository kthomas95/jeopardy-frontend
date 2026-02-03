import { useAtomValue } from "jotai";
import { UserAtom } from "../account/user-atom";
import { JoinGameButton } from "./JoinGameButton";
import { ResetGameButton } from "./ResetGameButton";
import { SetUsername } from "../account/SetUsername";
import { YearRangeSlider } from "./YearRangeSlider";
import { useFinalizePlayersMutation } from "../../__generated__/finalize-players.generated";
import { ManageCategories } from "./ManageCategories";
import { Highscores } from "../highscores/Highscores";
import React from "react";
import { Link } from "@tanstack/react-router";
import { Chip, Button, Card, Separator, Header } from "@heroui/react";
import { PendingGamePlayerView } from "../../graphql/graphql-types";
import { ManageGameStyle } from "./ManageGameStyle";

export const FinalizePlayers = () => {
    const [, finalizePlayersMutation] = useFinalizePlayersMutation();
    return <Button className="bg-emerald-700 hover:bg-emerald-600" onPress={() => finalizePlayersMutation({})}>
        Start Game
    </Button>;
};

export const ManagePendingGame = ({ pendingGame }: { pendingGame: PendingGamePlayerView }) => {
    const name = useAtomValue(UserAtom) ?? "";

    const names = pendingGame.players.map((x) => x.playerName);

    const canJoin = !names.includes(name);

    if (Array.isArray(pendingGame.pendingCategories))
        return <ManageCategories categories={pendingGame.pendingCategories} />;

    return (
        <div className="p-3 flex flex-col">
            <SetUsername />

            <Card className="my-3">
                <Card.Header>
                    <Card.Title>
                        <div className="text-lg">

                            Start New Game
                        </div>
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <Separator className="mb-3" />
                    <h4 className="font-bold pb-3 text-sm">Current Players</h4>
                    {names.length === 0 ? <div className="text-xs italic h-8 opacity-80">No Players Yet</div> :
                        <div className="flex gap-3 flex-wrap min-h-8">
                            {names.map((player, index) => (
                                <Chip
                                    key={player}
                                    color={
                                        (["accent", "success", "secondary", "success", "warning", "danger"] as const)[
                                        index % 6
                                        ] as any
                                    }
                                >
                                    {player}
                                </Chip>
                            ))}
                        </div>}

                    <Separator className="my-5" />

                    <ManageGameStyle style={pendingGame.gameStyle} />

                    <Separator className="my-5" />

                    <YearRangeSlider yearRange={pendingGame.yearRange} />

                </Card.Content>
                <Card.Footer className="mt-5">
                    <ResetGameButton />
                    <hr className={"ml-auto"} />
                    {canJoin ? <JoinGameButton /> : <FinalizePlayers />}

                </Card.Footer>
            </Card>

            <hr className={"my-4 mx-5 opacity-50"} />

            <div className="p-5 flex flex-col">
                <Highscores />
                <Link to={"/history"} className={"my-3 italic inline-flex text-sm px-2  ml-auto underline"}>
                    Full Game History
                </Link>
            </div>
        </div >
    );
};
