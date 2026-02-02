import { DisplayCategories } from "./DisplayCategories";
import { DisplayClues } from "./DisplayClues";
import { cn } from "@heroui/react";
import { CanBuzzComponent } from "./CanBuzzComponent";
import { SayingAnswerComponent } from "./SayingAnswerComponent";
import { AskForConfirmationComponent } from "./AskForConfirmationComponent";
import { AskForWager } from "./AskForWager";
import { OpponentIsBuzzingComponent } from "./OpponentIsBuzzingComponent";
import { useGameStatus } from "../../api/active-game-context";
import { OpponentHasDailyDoubleComponent } from "./OpponentHasDailyDoubleComponent";
import { CanProvideManualAnswer } from "./CanProvideManualAnswer";

export const DisplayRound = () => {
    const round = useGameStatus()
        .filter((x) => x.__typename === "Round")
        .map((x) => x.status)
        .extract();

    if (!round) return null;

    return (
        <div
            className={
                "min-h-0 grid grid-cols-6 grid-rows-[repeat(6,1fr)_min-content] p-1 gap-1 lg:p-2 lg:gap-2 relative h-full"
            }
        >
            <DisplayCategories categories={round.categories} />
            <DisplayClues clues={round.availableClues} />

            {round.status.__typename === "SelectingClue" ? (
                <div
                    className={cn(
                        "bg-emerald-600 text-emerald-50",
                        "col-span-6 h-6 font-bold w-max ml-auto rounded-md text-sm italic shadow-md py-1 px-4 flex center",
                    )}
                >
                    You Have Control of the Board
                </div>
            ) : (
                <div
                    className={cn(
                        "bg-gray-100 text-gray-800",
                        "text-sm col-span-6 h-6 rounded-md shadow-md ml-auto w-max flex center py-1 px-4 italic",
                    )}
                >
                    {round.status.__typename === "Waiting" && round.status.message}
                </div>
            )}

            <OpponentIsBuzzingComponent />
            <CanBuzzComponent />
            <SayingAnswerComponent />
            <AskForConfirmationComponent />
            <AskForWager />
            <OpponentHasDailyDoubleComponent />
            <CanProvideManualAnswer />
        </div>
    );
};
