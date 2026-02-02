export interface SelectClue {
    type: "SelectClue";
    row: number;
    column: number;
}

export interface Buzz {
    type: "Buzz";
}

export interface ShowAnswer {
    type: "ShowAnswer";
}

export interface DailyDoubleWager {
    type: "DailyDoubleWager";
    amount: number;
}

export interface FinalJeopardyWager {
    type: "FinalJeopardyWager";
    amount: number;
}

export interface FinalJeopardyAnswer {
    type: "FinalJeopardyAnswer";
    answer: string;
}

export interface VerifyAnswer {
    type: "VerifyAnswer";
    isCorrect: boolean;
    isNeutral: boolean;
}

export interface Stump {
    type: "Stump";
}

export interface NoIdea {
    type: "NoIdea";
}

export interface ProvideAnswer {
    type: "ProvideAnswer";
    answer: string;
}

export type GameMove =
    | SelectClue
    | Buzz
    | ShowAnswer
    | DailyDoubleWager
    | FinalJeopardyWager
    | FinalJeopardyAnswer
    | VerifyAnswer
    | Stump
    | NoIdea
    | ProvideAnswer;

export interface MoveFromFrontend {
    move: GameMove;
    playerGameId: string;
}

export type SendMove = (move: GameMove) => void;
