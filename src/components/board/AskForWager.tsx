import { AskingForDailyDoubleWager } from "../../api/player-round-status";
import { SubmittingWagerActive } from "../../api/round";
import { useEffect, useState } from "react";
import { number } from "zod";
import { buttonStyles } from "../../styles/button";
import { textField } from "../../styles/text-field";
import { Slider } from "radix-ui";
import { slider } from "../../styles/slider";

export const AskForWager = ({ category, submitWager, maxWager }: SubmittingWagerActive) => {
    const [wager, setWager] = useState("");
    const [wagerNumber, setWagerNumber] = useState(0);

    return (
        <div
            className={
                "fixed z-20 inset-8 m-auto w-64 h-min rounded-md shadow-md border-jeopardy-dark border-2 text-slate-200 flex flex-col"
            }
        >
            <h3
                className={
                    "text-center font-bold text-lg text-white bg-jeopardy rounded-t-[inherit] p-2 uppercase"
                }
            >
                Daily Double <br /> {category}
            </h3>
            <div className="p-3 flex flex-col gap-3 bg-jeopardy-light">
                <div className={"text-sm uppercase font-bold"}>Enter Your Wager Below</div>

                <p className={"text-xs italic"}>You can wager up to ${maxWager}.</p>

                <input
                    type={"number"}
                    min={0}
                    max={maxWager}
                    onChange={(event) => {
                        const newAmount = number({ coerce: true })
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
                    className={textField.input()}
                />
                <Slider.Root
                    value={[wagerNumber]}
                    max={maxWager}
                    step={100}
                    onValueChange={(event) => {
                        const amount = event[0] ?? 0;

                        setWager(amount.toString());
                        setWagerNumber(amount);
                    }}
                    className={slider.root()}
                >
                    <Slider.Track className={slider.track()}>
                        <Slider.Range className={slider.range()} />
                    </Slider.Track>
                    <Slider.Thumb className={slider.thumb()} />
                </Slider.Root>
            </div>

            <button
                className={buttonStyles({ class: "rounded-t-none py-3", colors: "dark" })}
                onClick={() => {
                    submitWager(wagerNumber);
                }}
            >
                Wager ${wagerNumber}
            </button>
        </div>
    );
};
