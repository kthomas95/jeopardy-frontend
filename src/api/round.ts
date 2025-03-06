import { PlayerViewCategory } from "./category";
import { Clue, ClueOption, QuestionWithoutAnswer } from "./clue";
import { CanBuzz, PlayerRoundStatus } from "./player-round-status";
import { Maybe, Nothing } from "purify-ts";
import { MakeMove } from "./useGetGameDateFromServer";
import { make } from "wonka";

export interface Round {
    type: "PlayerRoundView";
    categories: [
        PlayerViewCategory,
        PlayerViewCategory,
        PlayerViewCategory,
        PlayerViewCategory,
        PlayerViewCategory,
        PlayerViewCategory,
    ];
    availableClues: ClueOption[][];
    status: PlayerRoundStatus;
}

export interface ActiveClue extends Clue {
    canSelect: Maybe<() => void>;
}

export interface CanBuzzActive {
    noIdea: () => void;
    buzz: () => void;
    question: QuestionWithoutAnswer;
}

export interface AskForConfirmationActive {
    actualAnswer: string;
    isCorrect: () => void;
    isIncorrect: () => void;
    isNeutral: Maybe<() => void>;
}

export interface SayingAnswerActive {
    question: QuestionWithoutAnswer;
    showAnswer: () => void;
}

export interface SubmittingWagerActive {
    submitWager: (amount: number) => void;
    category: string;
    maxWager: number;
}

export interface ActiveRound {
    categories: Round["categories"];
    status: PlayerRoundStatus;
    availableClues: Maybe<ActiveClue>[][];
    canBuzz: Maybe<CanBuzzActive>;
    askForConfirmation: Maybe<AskForConfirmationActive>;
    sayingAnswer: Maybe<SayingAnswerActive>;
    dailyDouble: Maybe<SubmittingWagerActive>;
}

export const getActiveRound = (round: Round, makeMove: MakeMove): ActiveRound => {
    const status = Maybe.of(round.status);

    return {
        categories: round.categories,
        status: round.status,
        availableClues: round.availableClues.map((clueRow, rowIndex) =>
            clueRow.map((clue, columnIndex) =>
                Maybe.fromNullable(clue).map((clue) => ({
                    ...clue,
                    canSelect: status
                        .filter((x) => x.type === "SelectingClue")
                        .filter(() => !!clue?.moneyAmount)
                        .map(
                            () => () =>
                                makeMove({
                                    type: "SelectClue",
                                    row: rowIndex,
                                    column: columnIndex,
                                }),
                        ),
                })),
            ),
        ),
        canBuzz: status
            .filter((x) => x.type === "CanBuzz")
            .map(({ question }) => ({
                buzz: () => makeMove({ type: "Buzz" }),
                noIdea: () => makeMove({ type: "NoIdea" }),
                question,
            })),
        askForConfirmation: status
            .filter((x) => x.type === "AskForConfirmation")
            .map(
                ({ actualAnswer, canGoNeutral }): AskForConfirmationActive => ({
                    actualAnswer,
                    isCorrect: () => makeMove({ type: "VerifyAnswer", isCorrect: true, isNeutral: false }),
                    isIncorrect: () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: false }),
                    isNeutral: Maybe.of(() =>
                        makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: true }),
                    ).filter(() => canGoNeutral),
                }),
            ),
        sayingAnswer: status
            .filter((x) => x.type === "SayingAnswer")
            .map(({ question }) => ({
                showAnswer: () => makeMove({ type: "ShowAnswer" }),
                question,
            })),
        dailyDouble: status
            .filter((x) => x.type === "AskingForDailyDoubleWager")
            .map(({ category, maxWager }) => ({
                category,
                submitWager: (amount) => makeMove({ type: "DailyDoubleWager", amount }),
                maxWager,
            })),
    };
};
