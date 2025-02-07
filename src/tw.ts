/** Joins a list of classes, removing undefineds and trimming any whitespace. */
export const tw = (...classes: (string | undefined | boolean)[]) => classes.filter((v) => v).join(" ");
