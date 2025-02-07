import { OpponentHasDailyDouble } from "../../api/player-round-status";

export const OpponentHasDailyDoubleComponent = ({
    category,
    playerWithDailyDouble,
    wager,
    clue,
}: OpponentHasDailyDouble) => (
    <div className={"absolute inset-0 bg-blue-800 z-50 flex px-[5%] py-[25%] flex-col gap-4"}>
        <h2 className={"font-black text-6xl lg:text-7xl text-center mb-5"}>Daily Double!</h2>
        <p>
            {playerWithDailyDouble} has found a daily double in the category <b>{category}</b>.
        </p>

        {wager ? (
            <div className={"mt-3"}>
                {playerWithDailyDouble} has wagered <b>${wager}</b>.<br />
                <p className={"p-2 font-semibold border rounded-md shadow-md border-slate-400 my-3 italic"}>
                    {clue}
                </p>
            </div>
        ) : (
            <div>{playerWithDailyDouble} is making their wager...</div>
        )}
    </div>
);
