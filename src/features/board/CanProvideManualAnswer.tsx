import { useActiveGame, useRound } from "../../api/active-game-context";
import { Button, Input, Modal } from "@heroui/react";
import { useState } from "react";

export const CanProvideManualAnswer = () => {
    const [answerValue, setAnswerValue] = useState("");
    const round = useRound();

    const { makeMove } = useActiveGame();

    const status = round.status;

    if (status.__typename === "CanProvideManualAnswer")
        return (
            <Modal isOpen={true}>
                <Modal.Backdrop />
                <Modal.Container placement="center">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="text-center">
                                {status.question.category} - ${status.question.moneyAmount}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="items-center">
                            <p className="text-default-foreground mb-4 p-2 text-center">{status.question.hint}</p>

                            <Input
                                value={answerValue}
                                onChange={(e) => setAnswerValue(e.target.value)}
                                placeholder={"Type your answer..."}
                                className="max-w-md"
                                size="lg"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="flex flex-col gap-2 w-full">
                                <Button
                                    isDisabled={answerValue === ""}
                                    onPress={() => {
                                        makeMove({ type: "ProvideAnswer", answer: answerValue });
                                        setAnswerValue("");
                                    }}
                                    fullWidth
                                    className="bg-blue-600 text-white"
                                >
                                    Submit Answer
                                </Button>
                                <Button
                                    onPress={() => makeMove({ type: "NoIdea" })}
                                    className="bg-red-600/20 text-red-200"
                                    fullWidth
                                >
                                    No Idea
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal>
        );

    return null;
};
