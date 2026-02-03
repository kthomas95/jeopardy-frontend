import { GameLog_StumpAnswer_Fragment } from "../../../__generated__/get-active-game.generated";

export const StumpGameLogItem = ({ answer, hint }: GameLog_StumpAnswer_Fragment) => {
    return (
        <div
            className={"ring-2 ring-jeopardy/50 rounded-md shadow-md p-0.5 lg:p-1 flex flex-col gap-2 center text-center items-center justify-center"}
        >
            <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
            <div className={"font-light uppercase text-sm"}>{answer}</div>
        </div>
    );
};
