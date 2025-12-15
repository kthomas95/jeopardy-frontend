import { buttonStyles } from "../../styles/button";
import { useActiveGame, useRound } from "../../api/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Badge, Box, Button, Center, Grid, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
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
        <Center p={"md"} dir={"col"} className={"absolute z-20 inset-0 border-jeopardy-dark  bg-jeopardy"}>
            <Stack align={"center"}>
                <Title ta={"center"}>
                    {question.category} - ${question.moneyAmount}
                </Title>
                <Text>{question.hint}</Text>

                {providedAnswer ? (
                    <SimpleGrid cols={2} verticalSpacing={0} spacing={"md"} bdrs={"md"}>
                        <Box>Your Answer: </Box>
                        <Box>{providedAnswer}</Box>
                        <Box>Actual Answer: </Box>
                        <Box>{actualAnswer}</Box>
                    </SimpleGrid>
                ) : (
                    <div className={"text-slate-100 font-semibold text-xl p-6 uppercase text-center"}>
                        {actualAnswer}
                    </div>
                )}

                <Button.Group ta={"center"}>
                    <Button
                        onClick={isIncorrect}
                        leftSection={<ImCross />}
                        color={"red"}
                        size={"lg"}
                        // className={buttonStyles({ colors: "error", rounded: "none", class: "rounded-bl-md" })}
                    >
                        Wrong Answer
                    </Button>
                    <Button onClick={isCorrect} size="lg" color={"green"} leftSection={<ImCheckmark />}>
                        Correct Answer
                    </Button>
                </Button.Group>
                {/*{isNeutral*/}
                {/*    .map((x) => (*/}
                {/*        <button*/}
                {/*            onClick={x}*/}
                {/*            className={buttonStyles({*/}
                {/*                class: "rounded-br-md",*/}
                {/*                rounded: "none",*/}
                {/*            })}*/}
                {/*        >*/}
                {/*            Ambigious*/}
                {/*        </button>*/}
                {/*    ))*/}
                {/*    .extract()}*/}
            </Stack>
        </Center>
    );
};
