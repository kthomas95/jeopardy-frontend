import { cva } from "class-variance-authority";

export const buttonStyles = cva("py-1 px-2 font-semibold text-sm rounded-md shadow-md", {
    variants: {
        colors: {
            primary: "bg-sky-400 hover:bg-sky-300 text-sky-950",
            error: "bg-red-400 hover:bg-red-300 text-red-950",
            success: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950",
            dark: "bg-slate-800 text-slate-200 hover:bg-slate-700",
        },
    },
    defaultVariants: {
        colors: "primary",
    },
});
