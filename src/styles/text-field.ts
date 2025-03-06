import { cva } from "cva";

export const textField = {
    input: cva({
        base: "rounded-md shadow-md px-4 py-1 bg-slate-200 text-slate-800 focus:ring-4 caret-current",
    }),
    inputGroup: {
        input: cva({ base: "absolute inset-0 z-10 h-full w-full bg-transparent pl-12" }),
        icon: cva({ base: "absolute inset-y-0 left-4 m-auto" }),
        wrapper: cva({ base: "relative flex *:h-full *:focus-visible:ring-0" }),
    },
    group: {
        wrapper: cva({
            base: "grid auto-cols-auto grid-cols-1 grid-flow-col items-center colors-light focus-within:outline-none rounded-md shadow-sm focus-within:ring-2",
        }),
        input: cva({
            base: "bg-transparent pl-8 first:pl-2 z-10 focus:outline-none row-start-1 col-start-1",
        }),
        icon: cva({ base: "mx-2 opacity-80 colors-light row-start-1 col-start-1" }),
        button: cva({ base: "shrink-0 z-10" }),
    },
};
