import { Button } from "@heroui/react";
import { List, Maybe } from "purify-ts";
import { GameLogFragment, GameLog_Message_Fragment } from "../../../__generated__/get-active-game.generated";
import { useResetGameMutation } from "../../../__generated__/reset-game.generated";
import { renderTypenameUnion } from "../../../utils/unions";
import { CorrectResponseGameLogItem } from "./CorrectResponseGameLogItem";
import { IncorrectResponseGameLogItem } from "./IncorrectResponseGameLogItem";
import { ManualModeSummaryGameLogItem } from "./ManualModeSummaryGameLogItem";
import { StumpGameLogItem } from "./StumpGameLogItem";

export const DisplayLastGameLogItem = ({ log }: { log: GameLogFragment[] }) => {
    const lastItem = List.last(log);
    const [, resetGame] = useResetGameMutation();

    return lastItem
        .map(
            renderTypenameUnion({
                StumpAnswer: StumpGameLogItem,
                IncorrectResponse: IncorrectResponseGameLogItem,
                CorrectResponse: CorrectResponseGameLogItem,
                Message: ({ message }: GameLog_Message_Fragment) => (
                    <div className={"text-white flex center gap-4 h-full"}>
                        {message}
                        {Maybe.of(resetGame)
                            .filter(() => message.includes("over"))
                            .map((func) => (
                                <Button onPress={() => func({})}>
                                    Reset Game
                                </Button>
                            ))
                            .extract()}
                    </div>
                ),
                ManualModeSummary: ManualModeSummaryGameLogItem,
            }),
        )
        .extract();
};
