import { GameLog_CorrectResponse_Fragment } from "../../../__generated__/get-active-game.generated";

export const CorrectResponseGameLogItem = ({ amount, answer, hint, playerName }: GameLog_CorrectResponse_Fragment) => (
    <div
        className={
            "h-full w-full ring-2 ring-emerald-600 bg-emerald-600/0 rounded-md shadow-md p-0.5 lg:p-1 flex flex-col gap-2 justify-center items-center text-center"
        }
    >
        <div className={"font-semibold text-sm uppercase line-clamp-2"}>{hint}</div>
        <div className={"font-light"}>
            {playerName} correctly guessed{" "}
            <span className={"font-bold uppercase text-emerald-700"}>{answer}</span>, earning ${amount}.
        </div>
    </div>
);
