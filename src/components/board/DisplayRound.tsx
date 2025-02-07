import { ActiveRound } from "../../api/round";
import { DisplayCategories } from "./DisplayCategories";
import { DisplayClues } from "./DisplayClues";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { displayColors } from "../../styles/colors";
import { renderMaybe } from "../../utils/render-maybe";
import { CanBuzzComponent } from "./CanBuzzComponent";
import { SayingAnswerComponent } from "./SayingAnswerComponent";
import { AskForConfirmationComponent } from "./AskForConfirmationComponent";
import { AskForWager } from "./AskForWager";
import { Maybe } from "purify-ts";
import { OpponentIsBuzzingComponent } from "./OpponentIsBuzzingComponent";
import { OpponentHasDailyDouble } from "../../api/player-round-status";
import { OpponentHasDailyDoubleComponent } from "./OpponentHasDailyDoubleComponent";

export const DisplayRound = ({ round }: { round: ActiveRound }) => (
    <div className={"min-h-0 grid grid-cols-6 p-2 gap-2 relative h-full"}>
        <DisplayCategories categories={round.categories} />
        <DisplayClues clues={round.availableClues} />

        {round.status.type === "SelectingClue" ? (
            <div
                className={flattenStrings([
                    displayColors({ color: "success" }),
                    "col-span-6 w-max ml-auto rounded-md text-sm italic shadow-md py-1 px-4 flex center",
                ])}
            >
                You Have Control of the Board
            </div>
        ) : (
            <div
                className={flattenStrings([
                    displayColors({ color: "neutral" }),
                    "text-sm col-span-6 rounded-md shadow-md ml-auto w-max flex center py-1 px-4 italic",
                ])}
            >
                {round.status.type === "Waiting" && round.status.message}
            </div>
        )}

        {renderMaybe(
            Maybe.of(round.status).filter((x) => x.type === "OpponentIsBuzzing"),
            OpponentIsBuzzingComponent,
        )}

        {renderMaybe(round.canBuzz, CanBuzzComponent)}
        {renderMaybe(round.sayingAnswer, SayingAnswerComponent)}
        {renderMaybe(round.askForConfirmation, AskForConfirmationComponent)}
        {renderMaybe(round.dailyDouble, AskForWager)}
        {renderMaybe(
            Maybe.of(round.status).filter((x) => x.type === "OpponentHasDailyDouble"),
            OpponentHasDailyDoubleComponent,
        )}
    </div>
);
