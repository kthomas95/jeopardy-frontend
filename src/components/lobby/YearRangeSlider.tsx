import { useEffect, useState } from "react";
import { useSetYearRangeMutation } from "../../__generated__/set-year-range.generated";
import { Slider } from "radix-ui";
import { RangeSlider } from "@mantine/core";

export interface YearRangeSliderProps {
    yearRange: number[];
}

export const valuesOutOfSync = (a: number[], b: number[]) => a[0] !== b[0] || a[1] !== b[1];

export const YearRangeSlider = ({ yearRange }: YearRangeSliderProps) => {
    const [localRangeState, setLocalRangeState] = useState(yearRange);
    const [response, setYearRange] = useSetYearRangeMutation();

    // const valuesOutOfSync = () => yearRange[0] !== localRangeState[0] || yearRange[1] !== localRangeState[1];

    function updateLocalValueWithRemoteValue() {
        if (valuesOutOfSync(yearRange, localRangeState)) {
            setLocalRangeState(yearRange);
        }
    }

    useEffect(updateLocalValueWithRemoteValue, [yearRange[0], yearRange[1]]);

    return (
        <div className={"flex flex-col pt-5"}>
            <RangeSlider
                value={localRangeState as [number, number]}
                min={1984}
                max={2025}
                minRange={0}
                labelAlwaysOn
                onChange={setLocalRangeState}
                onChangeEnd={(value) => {
                    setLocalRangeState(value);

                    if (valuesOutOfSync(value, yearRange)) {
                        setYearRange({ yearRange: value });
                    }
                }}
            />
        </div>
    );
};
