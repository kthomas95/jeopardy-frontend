import { cn, Button } from "@heroui/react";
import { Maybe } from "purify-ts";
import { AvailableCluesPropsFragment } from "../../__generated__/get-active-game.generated";
import { useActiveGame, useRound } from "../game/active-game-context";
import { motion } from "framer-motion";
interface ClueSquareProps {
    clue: Maybe<AvailableCluesPropsFragment>;
    selectClue: Maybe<() => void>;
}

const Clue = ({ clue, selectClue }: ClueSquareProps) => {
    return clue
        .map(({ aboutToBeShown, hint, moneyAmount, category }) => (
            <Button
                // layoutId={`${category}${moneyAmount}`}
                onPress={selectClue.extract()}
                isDisabled={selectClue.isNothing() ?? true}
                className={cn(
                    moneyAmount ? "" : "opacity-0",
                    aboutToBeShown ? "bg-slate-200 text-jeopardy" : "bg-jeopardy/80",
                    "text-blue-100 !font-black text-xl shadow-md rounded-md flex center h-full w-full",
                )}
            >
                {moneyAmount}
            </Button>
        ))
        .orDefault(
            <div
                className={"flex center text-4xl text-jeopardy/70 bg-jeopardy/20 rounded-md shadow-md"}
            ></div>,
        );
};

export const DisplayClues = ({ clues }: { clues: (AvailableCluesPropsFragment | null)[][] }) => {
    const { makeMove } = useActiveGame();

    const round = useRound();

    const selectClue = Maybe.of((row: number, column: number) => {
        makeMove({ type: "SelectClue", row, column });
    }).filter(() => round.status.__typename === "SelectingClue");

    return clues.map((clueRow, rowIndex) => (
        <>
            {clueRow.map((_clue, columnIndex) => {
                const clue = Maybe.fromNullable(_clue);
                return (
                    <Clue
                        selectClue={selectClue.map((func) => () => func(rowIndex, columnIndex))}
                        key={`{rowIndex}${columnIndex}`}
                        clue={clue}
                    />
                );
            })}
        </>
    ));
};
