import { Progress } from "radix-ui";
import { useEffect, useState } from "react";
import { prerender } from "react-dom/static";

export interface TimerIndicatorProps {
    secondsToShow: number;
}

export const TimerIndicator = ({ secondsToShow }: TimerIndicatorProps) => {
    const [progress, setProgress] = useState(1000);
    const percentage = progress / 10;

    useEffect(() => {
        const interval = setInterval(
            () => {
                setProgress((prev) => (prev > 0 ? prev - 1 : 100));
            },
            (secondsToShow * 1000) / 1000,
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-800">
            <Progress.Root
                className="relative overflow-hidden h-4 w-full bg-inherit"
                style={{ width: `${percentage}%` }}
                value={percentage}
            >
                <Progress.Indicator
                    className="bg-rose-900 size-full"
                    style={{ transform: `translateX(-${100 - percentage}%)` }}
                />
            </Progress.Root>
        </div>
    );
};
