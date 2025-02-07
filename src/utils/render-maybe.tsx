import { JSX } from "react";
import { Maybe } from "purify-ts";

export const renderMaybe = <T,>(
    item: Maybe<T>,
    Component: (props: T) => JSX.Element,
): JSX.Element | undefined =>
    item.map((props) => <Component {...(props as T & JSX.IntrinsicAttributes)} />).extract();
