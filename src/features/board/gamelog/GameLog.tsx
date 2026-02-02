import { Button, Modal } from "@heroui/react";
import { useActiveGame } from "../../../api/active-game-context";
import { DisplayFullHistory } from "./DisplayFullHistory";
import { DisplayLastGameLogItem } from "./DisplayLastGameLogItem";

export const GameLog = () => {
    const log = useActiveGame().log;
    const reversedLog = log.toReversed();

    return (
        <Modal>
            <Button
                className="col-span-6 p-2 flex  h-full shadow-none border-none whitespace-normal h-full min-h-0"
                fullWidth
                variant=""
            >
                <div className="w-full h-full grid">
                    <DisplayLastGameLogItem log={log} />
                </div>
            </Button>
            <DisplayFullHistory log={reversedLog} />
        </Modal>
    );
};
