import { ComponentType, JSX } from "react";
import LibraryManagedAttributes = JSX.LibraryManagedAttributes;

export interface HasType<T extends string = string> {
    type: T;
}

export type EvolverFunction<T extends HasType, O> = {
    [K in T["type"]]: (item: T & HasType<K>) => O;
};
export const unwrapUnion =
    <T extends { type: string }, R>(evolver: EvolverFunction<T, R>) =>
    (item: T): R => {
        const func = evolver[item.type];
        if (!func) {
            throw Error("unwrapUnion could not find a function in provided object.");
        }
        return func(item);
    };

export const renderUnion =
    <T extends HasType>(components: {
        [K in T["type"]]: ComponentType<T>;
    }) =>
    (item: T) => {
        const Component = components[item.type as keyof typeof components] as ComponentType<T>;

        if (!Component) {
            throw Error("Warning: in renderUnion(), component was not found.");
        }

        return <Component {...(item as any)} />;
    };
