import { cva } from "class-variance-authority";

export const menu = {
    wrapper: cva("shadow-lg colors-light m-2 flex flex-col whitespace-nowrap rounded-md group-round z-10"),
    button: cva(
        "text-left focus:primary-3 p-3 h-12 flex items-center hover:neutral-1 disabled:hover:bg-inherit",
        {
            variants: {
                colors: {
                    primary:
                        "bg-inherit hover:bg-1 text-primary-600 hover:text-primary-700 focus:hover:primary-2",
                    error: "hover:bg-1 disabled:hover:text-error-600 text-error-600 focus:bg-1 focus:ring-2 ring-error-500",
                },
            },
        },
    ),
    header: cva("font-semibold p-3 h-12"),
    label: cva("p-3 h-12"),
    hr: cva("p-0 border-medium"),
};
