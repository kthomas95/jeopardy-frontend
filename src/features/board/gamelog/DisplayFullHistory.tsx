import { Chip, Modal, Button } from "@heroui/react";
import { Fragment, ReactNode } from "react";
import { GameLogFragment } from "../../../__generated__/get-active-game.generated";
import { unwrapGQLUnion } from "../../../utils/unions";
import { ResetGameButton } from "../../lobby/ResetGameButton";

export const DisplayFullHistory = ({ log }: { log: GameLogFragment[] }) => (
    <Modal.Backdrop>
        <Modal.Container placement="center">
            <Modal.Dialog className="w-full max-w-3xl">
                <Modal.CloseTrigger />
                <Modal.Header>
                    <Modal.Heading className="text-xl font-bold">Game History</Modal.Heading>
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-4 p-4 text-left max-h-[80vh] overflow-y-auto">
                    {log.map((gameLogItem, index) => (
                        <Fragment key={index}>
                            {unwrapGQLUnion<GameLogFragment, ReactNode>({
                                CorrectResponse: ({ hint, playerName, answer, amount }) => (
                                    <div className="p-2 border-b border-white/10 last:border-0">
                                        <div className={"font-semibold text-sm uppercase text-muted-foreground mb-1"}>{hint}</div>
                                        <div className={"text-sm"}>
                                            <span className="font-bold">{playerName}</span>{" "}
                                            correctly answered{" "}
                                            <span className={"text-emerald-500 uppercase font-semibold"}>{answer}</span>{" "}
                                            earning ${amount}
                                        </div>
                                    </div>
                                ),
                                IncorrectResponse: ({ hint, playerName, amount, actualAnswerIfDailyDouble }) => (
                                    <div className="p-2 border-b border-white/10 last:border-0">
                                        {actualAnswerIfDailyDouble && <Chip size="sm" color="warning" className="mb-1">Daily Double</Chip>}
                                        <div className={"font-semibold text-sm uppercase text-muted-foreground mb-1"}>{hint}</div>
                                        {actualAnswerIfDailyDouble && (
                                            <div className={"text-emerald-500 font-bold text-sm mb-1"}>{actualAnswerIfDailyDouble}</div>
                                        )}
                                        <div className={"text-sm text-red-500"}>
                                            <span className="font-bold">{playerName}</span> lost ${amount}
                                        </div>
                                    </div>
                                ),
                                StumpAnswer: ({ hint, answer }) => (
                                    <div className="p-2 border-b border-white/10 last:border-0">
                                        <div className={"font-semibold text-sm uppercase text-muted-foreground mb-1"}>{hint}</div>
                                        <div className={"text-sky-500 text-sm font-bold"}>{answer}</div>
                                    </div>
                                ),
                                Message: ({ message }) => (
                                    <div className={"rounded-md bg-content2 p-3 text-sm italic text-center"}>{message}</div>
                                ),
                                ManualModeSummary: ({ hint, answer, amount, playerSummary }) => (
                                    <div className="p-2 border-b border-white/10 last:border-0 flex flex-col gap-2">
                                        <p className="leading-tight text-sm font-semibold text-muted-foreground">
                                            {hint}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <Chip size="sm" variant="soft" color="success">
                                                {answer}
                                            </Chip>
                                            <span className="font-bold text-xs">${amount}</span>
                                        </div>
                                        <div className="flex gap-2 items-center flex-wrap mt-1">
                                            {playerSummary.map((x) => (
                                                <Chip
                                                    key={x.name}
                                                    size="sm"
                                                    color={
                                                        typeof x?.verification === "boolean"
                                                            ? x?.verification
                                                                ? "success"
                                                                : "danger"
                                                            : "default"
                                                    }
                                                >
                                                    {x.name}
                                                    {x?.answer ? ` - ${x.answer}` : ""}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                ),
                            })(gameLogItem)}
                        </Fragment>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-between w-full items-center">
                        <ResetGameButton />
                    </div>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal.Container>
    </Modal.Backdrop>
);
