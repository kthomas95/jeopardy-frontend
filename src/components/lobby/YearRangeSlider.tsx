import { useEffect, useState } from "react";
import { Slider } from "radix-ui";
import { slider } from "../../styles/slider";
import { useSetYearRangeMutation } from "../../__generated__/set-year-range.generated";

export interface YearRangeSliderProps {
    yearRange: number[];
}

export const YearRangeSlider = ({ yearRange }: YearRangeSliderProps) => {
    const [localRangeState, setLocalRangeState] = useState(yearRange);
    const [response, setYearRange] = useSetYearRangeMutation();

    const valuesOutOfSync = () => yearRange[0] !== localRangeState[0] || yearRange[1] !== localRangeState[1];
    function updateLocalValueWithRemoteValue() {
        if (valuesOutOfSync()) {
            setLocalRangeState(yearRange);
        }
    }

    function updateRemoteValueWithLocalValue() {
        if (valuesOutOfSync()) {
            setYearRange({ yearRange: localRangeState });
        }
    }

    useEffect(updateLocalValueWithRemoteValue, [yearRange]);

    return (
        <div className={"flex flex-col"}>
            <h3 className={"font-semibold"}>Category Year Range</h3>

            <Slider.Root
                value={localRangeState}
                // max={maxWager}
                min={1984}
                max={2025}
                onValueCommit={updateRemoteValueWithLocalValue}
                onValueChange={(event) => {
                    setLocalRangeState(event);

                    // setWager(amount.toString());
                    // setWagerNumber(amount);
                }}
                className={slider.root({ class: "my-2" })}
            >
                <Slider.Track className={slider.track({ class: "my-3" })}>
                    <Slider.Range className={slider.range()} />
                </Slider.Track>
                <Slider.Thumb className={slider.thumb()}>
                    <div className={"-translate-x-1/2 translate-y-[75%]"}>{localRangeState[0]}</div>
                </Slider.Thumb>
                <Slider.Thumb className={slider.thumb()}>
                    <div className={"-translate-x-1/2 translate-y-[75%]"}>{localRangeState[1]}</div>
                </Slider.Thumb>
            </Slider.Root>
        </div>
    );
};
