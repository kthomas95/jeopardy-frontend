import { useEffect, useState } from "react";
import { useSetYearRangeMutation } from "../../__generated__/set-year-range.generated";
import { Slider } from "@heroui/react";

export interface YearRangeSliderProps {
    yearRange: number[];
}

export const valuesOutOfSync = (a: number[], b: number[]) => a[0] !== b[0] || a[1] !== b[1];

export const YearRangeSlider = ({ yearRange }: YearRangeSliderProps) => {
    const [localRangeState, setLocalRangeState] = useState<number | number[]>(yearRange);
    const [response, setYearRange] = useSetYearRangeMutation();

    function updateLocalValueWithRemoteValue() {
        if (Array.isArray(localRangeState) && valuesOutOfSync(yearRange, localRangeState as number[])) {
            setLocalRangeState(yearRange);
        }
    }

    useEffect(updateLocalValueWithRemoteValue, [yearRange[0], yearRange[1]]);

    return (
        <div className={"flex flex-col pt-5 px-2"}>
            <Slider
                label="Year Range"
                value={localRangeState}
                minValue={1984}
                maxValue={2025}
                step={1}
                onChange={(value) => setLocalRangeState(value)}
                onChangeEnd={(value) => {
                    const val = value as number[];
                    setLocalRangeState(val);

                    if (valuesOutOfSync(val, yearRange)) {
                        setYearRange({ yearRange: val });
                    }
                }}
            />
        </div>
    );
};
