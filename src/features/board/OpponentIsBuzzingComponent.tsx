import { cn } from "@heroui/react";
import { useRound } from "../../api/active-game-context";

export const isTypename = <K extends T["__typename"], T extends { __typename: string }>(
    x: T,
    key: K,
): (T & { __typename: K }) | null => {
    if (x.__typename === key) return x as T & { __typename: K };
    else return null;
};

export const OpponentIsBuzzingComponent = () => {
    const status = useRound().status;

    const opponentIsBuzzing = isTypename(status, "OpponentIsBuzzing");

    if (!opponentIsBuzzing) return null;

    return (
        <div
            className={cn(
                opponentIsBuzzing.opponentIsLookingAtAnswer ? "bg-amber-500" : "bg-red-600",
                "absolute inset-0 z-10 flex gap-5 flex-col center text-white p-5",
            )}
        >
            <div className={"text-3xl"}>
                <b>{opponentIsBuzzing.playerBuzzing}</b> is{" "}
                {opponentIsBuzzing.opponentIsLookingAtAnswer
                    ? "verifying their answer"
                    : "saying their answer"}
                .
            </div>
            <div>
                {opponentIsBuzzing.question.category} - ${opponentIsBuzzing.question.moneyAmount}
            </div>
            <div>{opponentIsBuzzing.question.hint}</div>
        </div>
    );
};
