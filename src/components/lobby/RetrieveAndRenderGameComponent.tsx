import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { useGetGameDateFromServer } from "../../api/useGetGameDateFromServer";
import { ManagePendingGame } from "./ManagePendingGame";
import { DisplayGame } from "../board/DisplayGame";
import { displayColors } from "../../styles/colors";
import { compose } from "cva";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { SetUsername, SetUsernameForm } from "../account/SetUsername";
import { activeGameContext } from "../../api/active-game-context";

const cannotConnectToServer = (
    <div
        className={flattenStrings([
            "inset-0 absolute m-auto p-3 rounded-md shadow-2xl w-64 h-24 flex center text-lg font-semibold",
            displayColors({ color: "primary" }),
        ])}
    >
        Loading From Server...
    </div>
);

export const RetrieveAndRenderGameComponent = () => {
    const name = useAtomValue(UserAtom) ?? "";
    const serverResponse = useGetGameDateFromServer(name);

    if (name === "")
        return (
            <div className="p-3">
                <SetUsernameForm />
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
