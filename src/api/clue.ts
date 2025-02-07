export type ClueOption = Clue | null;

export interface QuestionWithoutAnswer {
    hint: string;
    category: string;
    moneyAmount: number;
}

export interface Clue {
    moneyAmount: number;
    hint?: string;
    aboutToBeShown: boolean;
}
