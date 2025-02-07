import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { CreateGameButton } from "./CreateGameButton";
import { JoinGameButton } from "./JoinGameButton";
import { ResetGameButton } from "./ResetGameButton";
import { SetUsername } from "../account/SetUsername";
import { GameNotStarted } from "../../graphql/graphql-types";

export const ManagePendingGame = ({ pendingGame }: { pendingGame: GameNotStarted }) => {
    const name = useAtomValue(UserAtom) ?? "";

    const names = pendingGame.players.map((x) => x.playerName);

    const canJoin = !names.includes(name);

    return (
        <div className="p-3 bg-slate-800 text-slate-200 h-dvh">
            <SetUsername />

            <div className="p-5 bg-slate-700/50 rounded-md shadow-md my-10 mx-3">
                <h4 className="text-lg font-bold">Current Players</h4>
                <div className="flex gap-3 p-5">
                    {names.map((player) => (
                        <div className={"shadow-lg rounded-md px-1 py-0.5 bg-sky-600/30"}>{player}</div>
                    ))}
                </div>

                <div className="flex gap-3 p-3">
                    {canJoin ? <JoinGameButton /> : <CreateGameButton />}
                    <hr className={"ml-auto"} />
                    <ResetGameButton />
                </div>
            </div>
        </div>
    );
};
