import { useActiveGame, useRound } from "../../api/active-game-context";
import { Button, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";

export const CanProvideManualAnswer = () => {
    const [answerValue, setAnswerValue] = useState("");
    const round = useRound();

    const { makeMove } = useActiveGame();

    const status = round.status;

    if (status.__typename === "CanProvideManualAnswer")
        return (
            <div className={"absolute inset-0 bg-jeopardy-dark flex center flex-col"}>
                <Title size={32} p={"md"} ta={"center"}>
                    {status.question.category} - ${status.question.moneyAmount}
                </Title>

                <Text p={"sm"}>{status.question.hint}</Text>

                <Button.Group>
                    <TextInput
                        value={answerValue}
                        onChange={(e) => setAnswerValue(e.target.value)}
                        placeholder={"Answer"}
                        variant={"default"}
                        color={"white"}
                        wrapperProps={{ color: "white" }}
                        classNames={{ input: "!rounded-r-none" }}
                    />
                    <Button
                        disabled={answerValue === ""}
                        onClick={() => {
                            makeMove({ type: "ProvideAnswer", answer: answerValue });
                            setAnswerValue("");
                        }}
                    >
                        Submit Answer
                    </Button>
                </Button.Group>

                <Button
                    color={"red"}
                    fullWidth
                    onClick={() => makeMove({ type: "NoIdea" })}
                    pos={"absolute"}
                    bottom={0}
                    h={64}
                    size={"xl"}
                    disabled={answerValue !== ""}
                    classNames={{ root: "!rounded-t-none disabled:opacity-0" }}
                >
                    NO IDEA
                </Button>
            </div>
        );

    return null;
};
