import { QuestionWithoutAnswer } from "./clue";

export interface Waiting {
    type: "Waiting";
    message: string;
}

export interface OpponentIsBuzzing {
    type: "OpponentIsBuzzing";
    question: QuestionWithoutAnswer;
    playerBuzzing: string;
    opponentIsLookingAtAnswer: boolean;
}

export interface SayingAnswer {
    type: "SayingAnswer";
    question: QuestionWithoutAnswer;
}

export interface SelectingClue {
    type: "SelectingClue";
}

export interface CanBuzz {
    type: "CanBuzz";
    question: QuestionWithoutAnswer;
}

export interface AskForConfirmation {
    type: "AskForConfirmation";
    actualAnswer: string;
}

export interface AskingForDailyDoubleWager {
    type: "AskingForDailyDoubleWager";
    category: string;
    maxWager: number;
}

export interface OpponentHasDailyDouble {
    type: "OpponentHasDailyDouble";
    category: string;
    wager?: number;
    playerWithDailyDouble: string;
    clue: string;
}

export type PlayerRoundStatus =
    | SelectingClue
    | SayingAnswer
    | CanBuzz
    | Waiting
    | AskForConfirmation
    | AskingForDailyDoubleWager
    | OpponentIsBuzzing
    | OpponentHasDailyDouble;
