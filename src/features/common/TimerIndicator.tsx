import { useEffect, useState } from "react";

export interface TimerIndicatorProps {
    secondsToShow: number;
}

export const TimerIndicator = ({ secondsToShow }: TimerIndicatorProps) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(
            () => {
                setProgress((prev) => (prev > 0 ? prev - 1 : 100));
            },
            (secondsToShow * 1000) / 100,
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-800 h-4 w-full relative overflow-hidden">
            <div
                className="bg-blue-900 h-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </div>
    );
};
