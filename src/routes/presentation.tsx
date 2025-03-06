import { createFileRoute } from "@tanstack/react-router";
import { useGetPresentationViewSubscription } from "../__generated__/get-presentation-view.generated";
import { Maybe } from "purify-ts";
import { PresentationView, PresentationViewProps } from "../components/board/PresentationView";

export const Route = createFileRoute("/presentation")({
    component: RouteComponent,
});

function RouteComponent() {
    const presentationViewString = useGetPresentationViewSubscription()[0].data?.getPresentationView;

    return Maybe.fromNullable(presentationViewString)
        .map((x) => JSON.parse(x) as PresentationViewProps)
        .map((x) => <PresentationView {...x} />)
        .orDefault(
            <div className={"bg-slate-800 flex center font-black text-xl h-dvh text-slate-300 uppercase"}>
                Waiting On Game To Start
            </div>,
        );
}
