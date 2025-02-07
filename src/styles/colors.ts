import { cva } from "cva";

export const displayColors = cva({
    base: "",
    variants: {
        color: {
            primary: "bg-sky-600/40",
            error: "bg-red-500",
            success: "bg-emerald-600/30",
            neutral: "bg-slate-900",
        },
    },
});
