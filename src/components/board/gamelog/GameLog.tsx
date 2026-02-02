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
                className="col-span-6 grid relative p-2 bg-transparent shadow-none border-none whitespace-normal h-auto min-h-0"
                fullWidth
            >
                <div className="w-full h-full">
                    <DisplayLastGameLogItem log={log} />
                </div>
            </Button>
            <DisplayFullHistory log={reversedLog} />
        </Modal>
    );
};
