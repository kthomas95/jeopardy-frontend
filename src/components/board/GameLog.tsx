import { List, Maybe } from "purify-ts";
import { renderTypenameUnion, renderUnion, unwrapGQLUnion, unwrapUnion } from "../../utils/unions";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { useResetGameMutation } from "../../__generated__/reset-game.generated";
import { buttonStyles } from "../../styles/button";
import { ResetGameButton } from "../lobby/ResetGameButton";
import { useActiveGame } from "../../api/active-game-context";
import {
    GameLog_CorrectResponse_Fragment,
    GameLog_IncorrectResponse_Fragment,
    GameLog_ManualModeSummary_Fragment,
    GameLog_Message_Fragment,
    GameLog_StumpAnswer_Fragment,
    GameLogFragment,
} from "../../__generated__/get-active-game.generated";
import { Badge, Divider, Group, Menu, Stack, Text } from "@mantine/core";

const CorrectResponseComponent = ({ amount, answer, hint, playerName }: GameLog_CorrectResponse_Fragment) => (
    <div
        className={
            "h-full ring-2 ring-emerald-600 bg-emerald-600/0 rounded-md shadow-md p-0.5 lg:p-1 flex flex-col w-full gap-2 justify-center"
        }
    >
        <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
        <div className={"font-light"}>
            {playerName} correctly guessed{" "}
            <span className={"font-bold uppercase text-emerald-700"}>{answer}</span>, earning ${amount}.
        </div>
    </div>
);

const IncorrectResponseComponent = ({
    hint,
    playerName,
    amount,
    actualAnswerIfDailyDouble,
}: GameLog_IncorrectResponse_Fragment) => (
    <div
        className={
            "h-full ring-2 ring-red-500/50 bg-red-300/10 rounded-md shadow-md p-0.5 lg:p-1 text-white flex flex-col w-full gap-1 justify-center"
        }
    >
        <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
        {actualAnswerIfDailyDouble && (
            <div className={"bg-emerald-700 w-max mx-auto p-1 rounded-md shadow-md text-sm"}>
                {actualAnswerIfDailyDouble}
            </div>
        )}
        <div className={"font-light"}>
            <b className={"font-black"}>{playerName}</b> provided an incorrect response, losing ${amount}.
        </div>
    </div>
);
const StumpComponent = ({ answer, hint }: GameLog_StumpAnswer_Fragment) => {
    return (
        <div
            className={"ring-2 ring-jeopardy/50 rounded-md shadow-md p-0.5 lg:p-1 flex flex-col gap-2 center"}
        >
            <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
            <div className={"font-light uppercase text-sm"}>{answer}</div>
        </div>
    );
};

const DisplayLastGameLogItem = ({ log }: { log: GameLogFragment[] }) => {
    const lastItem = List.last(log);
    const [, resetGame] = useResetGameMutation();

    return lastItem
        .map(
            renderTypenameUnion({
                StumpAnswer: StumpComponent,
                IncorrectResponse: IncorrectResponseComponent,
                CorrectResponse: CorrectResponseComponent,
                Message: ({ message }: GameLog_Message_Fragment) => (
                    <div className={"text-white flex center gap-4 h-full"}>
                        {message}
                        {Maybe.of(resetGame)
                            .filter(() => message.includes("over"))
                            .map((func) => (
                                <button className={buttonStyles()} onClick={() => func({})}>
                                    Reset Game
                                </button>
                            ))
                            .extract()}
                    </div>
                ),
                ManualModeSummary: ({
                    hint,
                    answer,
                    playerSummary,
                    amount,
                }: GameLog_ManualModeSummary_Fragment) => (
                    <Stack gap={"sm"}>
                        <Text lh={"xs"} size={"sm"} fw={600}>
                            {hint}
                        </Text>
                        <Group justify={"center"} gap={"xs"}>
                            <Badge color="green" fw={900} variant={"light"}>
                                ${amount}
                            </Badge>
                            <Badge fw={900} variant={"dot"} color={"green"}>
                                {answer}
                            </Badge>
                        </Group>
                        <Divider opacity={".5"} />
                        <Group justify={"center"}>
                            {playerSummary.map((x) => (
                                <Badge
                                    color={
                                        typeof x?.verification === "boolean"
                                            ? x?.verification
                                                ? "green"
                                                : "red"
                                            : "gray"
                                    }
                                >
                                    {x.name}
                                    {x?.answer ? ` - ${x.answer}` : ""}
                                </Badge>
                            ))}
                        </Group>
                    </Stack>
                ),
            }),
        )
        .extract();
};

const DisplayFullHistory = ({ log, close }: { log: GameLogFragment[]; close: () => void }) => (
    <div
        className={
            "absolute inset-8 lg:inset-16 m-auto bg-slate-800 p-4 shadow-md rounded-md ring-slate-900 ring-4 z-10 overflow-y-auto flex flex-col gap-4 text-slate-300 text-left"
        }
        onClick={close}
    >
        {log.map((gameLogItem, index) => (
            <Fragment key={index}>
                {unwrapGQLUnion<GameLogFragment, ReactNode>({
                    CorrectResponse: ({ hint, playerName, answer, amount }) => (
                        <div>
                            <div className={"font-semibold text-sm uppercase"}>{hint}</div>
                            <div className={"text-sm"}>
                                {playerName}{" "}
                                <span className={"text-emerald-700 uppercase font-semibold"}>{answer}</span> $
                                {amount}
                            </div>
                        </div>
                    ),
                    IncorrectResponse: ({ hint, playerName, amount, actualAnswerIfDailyDouble }) => (
                        <div>
                            {actualAnswerIfDailyDouble && <div className={"font-black"}>Daily Double</div>}
                            <div className={"font-semibold text-sm uppercase"}>{hint}</div>
                            {actualAnswerIfDailyDouble && (
                                <div className={"text-emerald-600"}>{actualAnswerIfDailyDouble}</div>
                            )}
                            <div className={"text-sm text-red-500"}>
                                {playerName} -${amount}
                            </div>
                        </div>
                    ),
                    StumpAnswer: ({ hint, answer }) => (
                        <div>
                            <div className={"font-semibold text-sm uppercase"}>{hint}</div>
                            <div className={"text-sky-600 text-sm"}>{answer}</div>
                        </div>
                    ),
                    Message: ({ message }) => (
                        <div className={"rounded-md shadow-md border p-2 border-slate-500"}>{message}</div>
                    ),
                    ManualModeSummary: ({ hint, answer, amount, playerSummary }) => (
                        <Stack gap={"sm"}>
                            <Text lh={"xs"} size={"sm"} fw={600}>
                                {hint}
                            </Text>
                            <Badge fw={900} size={"sm"} variant={"dot"} color={"green"} ml={"auto"}>
                                {answer}
                            </Badge>
                            <Group>
                                <Text fw={900} size={"xs"}>
                                    ${amount}
                                </Text>
                                {playerSummary.map((x) => (
                                    <Badge
                                        color={
                                            typeof x?.verification === "boolean"
                                                ? x?.verification
                                                    ? "green"
                                                    : "red"
                                                : "gray"
                                        }
                                    >
                                        {x.name}
                                        {x?.answer ? ` - ${x.answer}` : ""}
                                    </Badge>
                                ))}
                            </Group>
                        </Stack>
                    ),
                })(gameLogItem)}
            </Fragment>
        ))}
        <ResetGameButton />
    </div>
);

export const GameLog = () => {
    const log = useActiveGame().log;
    const reversedLog = log.toReversed();

    const [isDisplayingFull, setIsDisplayingFull] = useToggle(false);

    return (
        <>
            {isDisplayingFull && (
                <DisplayFullHistory log={reversedLog} close={() => setIsDisplayingFull(false)} />
            )}

            <button
                className={"col-span-6 grid relative p-2 h-full"}
                onClick={() => setIsDisplayingFull(true)}
            >
                <DisplayLastGameLogItem log={log} />
            </button>
        </>
    );
};
