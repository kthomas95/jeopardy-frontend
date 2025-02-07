export interface StumpAnswer {
    type: "StumpAnswer";
    hint: string;
    answer: string;
}

export interface CorrectResponse {
    type: "CorrectResponse";
    hint: string;
    answer: string;
    amount: number;
    playerName: string;
}

export interface IncorrectResponse {
    type: "IncorrectResponse";
    amount: number;
    hint: string;
    playerName: string;
}

export interface GameLogMessage {
    type: "Message";
    message: string;
}

export type GameLogItem = StumpAnswer | CorrectResponse | IncorrectResponse | GameLogMessage;
