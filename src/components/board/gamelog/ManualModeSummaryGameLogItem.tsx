import { Chip, Separator } from "@heroui/react";
import { GameLog_ManualModeSummary_Fragment } from "../../../__generated__/get-active-game.generated";

export const ManualModeSummaryGameLogItem = ({
    hint,
    answer,
    playerSummary,
    amount,
}: GameLog_ManualModeSummary_Fragment) => (
    <div className="flex flex-col gap-2">
        <p className="leading-tight text-sm font-semibold">
            {hint}
        </p>
        <div className="flex justify-center gap-2">
            <Chip color="success" variant="soft">
                ${amount}
            </Chip>
            <Chip color="success" variant="soft">
                {answer}
            </Chip>
        </div>
        <Separator className="opacity-50" />
        <div className="flex justify-center flex-wrap gap-1">
            {playerSummary.map((x) => (
                <Chip
                    key={x.name}
                    color={
                        typeof x?.verification === "boolean"
                            ? x?.verification
                                ? "success"
                                : "danger"
                            : "default"
                    }
                >
                    {x.name}
                    {x?.answer ? ` - ${x.answer}` : ""}
                </Chip>
            ))}
        </div>
    </div>
);
