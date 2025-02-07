import { MakeMove } from "./useGetGameDateFromServer";
import { unwrapUnion } from "../utils/unions";

export interface AskingForFinalWager {
    type: "AskingForWager";
    category: string;
    maxWager: number;
}

export interface AskingForFinalAnswer {
    type: "AskingForAnswer";
    category: string;
    clue: string;
}

export interface AskingForFinalConfirmation {
    type: "AskingForConfirmation";
    actualAnswer: string;
    providedAnswer: string;
}

export interface FinalJeopardyWaiting {
    type: "Waiting";
}

export type FinalJeopardyStatus =
    | AskingForFinalAnswer
    | AskingForFinalConfirmation
    | AskingForFinalWager
    | FinalJeopardyWaiting;

export interface ActiveAskingForFinalWager extends AskingForFinalWager {
    submitWager: (amount: number) => void;
}

export interface ActiveAskingForFinalAnswer extends AskingForFinalAnswer {
    submitAnswer: (answer: string) => void;
}

export interface ActiveAskingForFinalConfirmation extends AskingForFinalConfirmation {
    submitConfirmation: (isCorrect: boolean) => void;
}

export type ActiveFinalJeopardyStatus =
    | ActiveAskingForFinalWager
    | ActiveAskingForFinalAnswer
    | ActiveAskingForFinalConfirmation
    | FinalJeopardyWaiting;

export const getActiveFinalJeopardy =
    (makeMove: MakeMove) =>
    (props: FinalJeopardyStatus): ActiveFinalJeopardyStatus =>
        unwrapUnion<FinalJeopardyStatus, ActiveFinalJeopardyStatus>({
            Waiting: (x) => x,
            AskingForWager: (x): ActiveAskingForFinalWager => ({
                ...x,
                submitWager: (amount) =>
                    makeMove({
                        type: "FinalJeopardyWager",
                        amount,
                    }),
            }),
            AskingForConfirmation: (x): ActiveAskingForFinalConfirmation => ({
                ...x,
                submitConfirmation: (isCorrect) =>
                    makeMove({
                        type: "VerifyAnswer",
                        isCorrect,
                    }),
            }),
            AskingForAnswer: (x): ActiveAskingForFinalAnswer => ({
                ...x,
                submitAnswer: (answer) =>
                    makeMove({
                        type: "FinalJeopardyAnswer",
                        answer,
                    }),
            }),
        })(props);
