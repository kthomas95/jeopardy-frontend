import { cva } from "cva";

export const buttonStyles = cva({
    base: "py-1 px-2 font-semibold text-sm shadow-md flex center",
    variants: {
        colors: {
            primary: "bg-sky-400 hover:bg-sky-300 text-sky-950",
            error: "bg-red-400 hover:bg-red-300 text-red-950",
            success: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950",
            dark: "bg-slate-800 text-slate-200 ring ring-slate-600 hover:bg-slate-700",
            outline: "border border-slate-950/40 text-slate-900 bg-slate-900/20",
        },
        rounded: {
            normal: "rounded-md",
            none: "",
        },
        direction: {
            horizontal: "",
            vertical: "flex-col",
        },
    },
    defaultVariants: {
        colors: "primary",
        rounded: "normal",
        direction: "horizontal",
    },
});
