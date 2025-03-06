import { cva } from "class-variance-authority";

/*@apply flex items-center h-6 md:h-8 truncate;*/

// .stat > * {
/*@apply flex center first:heading-xs first:md:heading-sm first:p-1 last:text-2xs  last:font-semibold last:text-color-light last:grow last:p-1;*/

export const stat = {
    wrapper: cva("flex gap-2 items-center h-6 md:h-8 truncate *:flex *:center"),
    first: cva("p-2 font-semibold"),
    second: cva("p-2 text-sm"),
};
