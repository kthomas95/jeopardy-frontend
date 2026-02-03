import { useAtomValue } from "jotai";
import { ManagePendingGame } from "./ManagePendingGame";
import { DisplayGame } from "../board/DisplayGame";
import { SetUsername, SetUsernameForm } from "../account/SetUsername";
import { cn, Form, Spinner } from "@heroui/react";
import { UserAtom } from "../account/user-atom";
import { useGetGameDateFromServer } from "../game/useGetGameDateFromServer";
import { activeGameContext } from "../game/active-game-context";

const cannotConnectToServer = (
    <div
        className={cn(
            "inset-0 absolute m-auto p-3 rounded-md shadow-2xl w-64 h-24 flex center text-lg font-semibold",
            "bg-sky-500 text-white",
        )}
    >
        Loading From Server...
    </div>
);

export const RetrieveAndRenderGameComponent = () => {
    const name = useAtomValue(UserAtom) ?? "";
    const serverResponse = useGetGameDateFromServer(name);

    if (name === "")
        return (
            <Form className="p-3 flex flex-col gap-3 max-w-64 mx-auto my-auto">
                <SetUsernameForm />
            </Form>
        );

    if (serverResponse.isLoading)
        return (
            <div className="flex h-[100dvh] justify-center items-center">
                <Spinner size="lg" />
            </div>
        );

    return serverResponse.activeGame
        .map((x) => (
            <activeGameContext.Provider value={x}>
                <DisplayGame />
            </activeGameContext.Provider>
        ))
        .alt(serverResponse.pendingGame.map((x) => <ManagePendingGame pendingGame={x} />))
        .orDefault(<div>We're Having Trouble Connecting To The Server</div>);
};
