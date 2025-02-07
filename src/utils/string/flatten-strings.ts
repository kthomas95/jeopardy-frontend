import { isString } from "./is-string";

export const flattenStrings = (strings: Array<string | boolean | undefined | null>) =>
    strings.filter(isString).join(" ");
