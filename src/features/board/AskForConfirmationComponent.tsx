import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Button, Modal } from "@heroui/react";
import { ImCheckmark, ImCross } from "react-icons/im";

export const AskForConfirmationComponent = () => {
    const status = useRound().status;

    const askForConfirmation = isTypename(status, "AskForConfirmation");

    const { makeMove } = useActiveGame();

    if (!askForConfirmation) return null;

    const { actualAnswer, canGoNeutral, providedAnswer, question } = askForConfirmation;

    const isIncorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: false });
    const isCorrect = () => makeMove({ type: "VerifyAnswer", isCorrect: true, isNeutral: false });
    const isNeutral = () => makeMove({ type: "VerifyAnswer", isCorrect: false, isNeutral: true });

    return (
        <Modal isOpen={true}>
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="text-center">
                                {question.category} - ${question.moneyAmount}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="items-center gap-6">
                            <p className="text-center text-lg">{question.hint}</p>

                            {providedAnswer ? (
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 p-4 rounded-md w-full">
                                    <div className="font-bold text-right">Your Answer:</div>
                                    <div className="">{providedAnswer}</div>
                                    <div className="font-bold text-right">Actual Answer:</div>
                                    <div className="">{actualAnswer}</div>
                                </div>
                            ) : (
                                <div className={"font-semibold text-xl p-6 uppercase text-center"}>
                                    {actualAnswer}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="flex gap-4 w-full justify-center">
                                <Button
                                    onPress={isIncorrect}
                                    size="lg"
                                    className="flex-1 max-w-[200px] bg-red-600 text-white"
                                >
                                    <ImCross /> Wrong
                                </Button>
                                <Button
                                    onPress={isCorrect}
                                    size="lg"
                                    className="flex-1 max-w-[200px] bg-emerald-600 text-white"
                                >
                                    <ImCheckmark /> Correct
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
