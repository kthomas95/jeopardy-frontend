import { useState } from "react";
import { z } from "zod";
import { useActiveGame, useRound } from "../game/active-game-context";
import { isTypename } from "./OpponentIsBuzzingComponent";
import { Button, Input, Modal, Slider } from "@heroui/react";

export const AskForWager = () => {
    const [wager, setWager] = useState("0");
    const [wagerNumber, setWagerNumber] = useState(0);

    const status = useRound().status;
    const { makeMove } = useActiveGame();

    const askForWager = isTypename(status, "AskingForDailyDoubleWager");

    if (!askForWager) return null;

    const { category, maxWager } = askForWager;

    const submitWager = (value: number) => {
        makeMove({ type: "DailyDoubleWager", amount: value });
        setWager("");
        setWagerNumber(0);
    };

    return (
        <Modal
            isOpen={true}

        // className={
        //     "fixed z-20 inset-8 m-auto w-64 h-min rounded-md shadow-md border-jeopardy-dark border-2 text-slate-200 flex flex-col"
        // }
        >
            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Heading className="uppercase font-black tracking-loose text-center">
                                Daily Double - {category}
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="p-3 flex flex-col gap-3">
                                <div className={"text-sm uppercase font-bold"}>Enter Your Wager Below</div>

                                <p className={"text-xs italic"}>You can wager up to ${maxWager}.</p>

                                <Input
                                    type="number"
                                    min={0}
                                    max={maxWager}
                                    onChange={(event) => {
                                        const newAmount = z.coerce.number()
                                            .nonnegative()
                                            .nullable()
                                            .catch(null)
                                            .parse(event.target.value);

                                        setWager(event.target.value);

                                        if (newAmount !== null) {
                                            setWagerNumber(newAmount);
                                        }
                                    }}
                                    value={wager}
                                />

                                <Slider
                                    aria-label="Wager Amount"
                                    value={wagerNumber}
                                    maxValue={maxWager}
                                    step={100}
                                    onChange={(value) => {
                                        const amount = Array.isArray(value) ? value[0] : value;
                                        if (amount !== undefined) {
                                            setWager(amount.toString());
                                            setWagerNumber(amount);
                                        }
                                    }}
                                >
                                    <Slider.Track>
                                        <Slider.Fill />
                                        <Slider.Thumb />
                                    </Slider.Track>
                                </Slider>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="py-3"
                                fullWidth
                                onPress={() => {
                                    submitWager(wagerNumber);
                                }}
                            >
                                Wager ${wagerNumber}
                            </Button>

                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
