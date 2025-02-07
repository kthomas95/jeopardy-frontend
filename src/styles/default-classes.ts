export type AddedStyles = string | ((styles: string) => string) | undefined;

export const withDefaults = (a: string) => (b: string) => `${a} ${b}`;

export const getStyles = (defaults: string, provided: AddedStyles): string => {
    if (!provided) return defaults;
    if (typeof provided === "string") return withDefaults(defaults)(provided);
    return provided(defaults);
};
