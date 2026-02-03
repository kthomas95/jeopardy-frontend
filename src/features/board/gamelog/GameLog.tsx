import { Button, Modal } from "@heroui/react";
import { useActiveGame } from "../../game/active-game-context";
import { DisplayFullHistory } from "./DisplayFullHistory";
import { DisplayLastGameLogItem } from "./DisplayLastGameLogItem";

export const GameLog = () => {
    const log = useActiveGame().log;
    const reversedLog = log.toReversed();

    return (
        <Modal>
            <Modal.Trigger
                className="col-span-6 p-2 flex  h-full shadow-none border-none whitespace-normal h-full min-h-0"
            >
                <div className="w-full h-full grid">
                    <DisplayLastGameLogItem log={log} />
                </div>
            </Modal.Trigger>
            <DisplayFullHistory log={reversedLog} />
        </Modal>
    );
};
