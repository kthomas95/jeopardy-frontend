import { OpponentIsBuzzing } from "../../api/player-round-status";
import { flattenStrings } from "../../utils/string/flatten-strings";

export const OpponentIsBuzzingComponent = ({
    playerBuzzing,
    question,
    opponentIsLookingAtAnswer,
}: OpponentIsBuzzing) => (
    <div
        className={flattenStrings([
            opponentIsLookingAtAnswer ? "bg-amber-500" : "bg-red-600",
            "absolute inset-0 z-10 flex gap-5 flex-col center text-white p-5",
        ])}
    >
        <div className={"text-3xl"}>
            <b>{playerBuzzing}</b> is{" "}
            {opponentIsLookingAtAnswer ? "verifying their answer" : "saying their answer"}.
        </div>
        <div>
            {question.category} - ${question.moneyAmount}
        </div>
        <div>{question.hint}</div>
    </div>
);
