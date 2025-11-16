import { PlayerViewCategory } from "../../graphql/graphql-types";

export const DisplayCategories = ({ categories }: { categories: PlayerViewCategory[] }) => (
    <>
        {categories.map((category) => (
            <div
                key={category.title}
                className={
                    "text-[8pt] uppercase overflow-ellipsis whitespace-break-spaces overflow-hidden min-w-0  lg:text-sm tracking-tighter text-center rounded-md shadow-md flex center p-0.5 lg:p-1 bg-jeopardy/80 text-blue-100 font-semibold flex-col"
                }
            >
                {category.title}
                <div className={"text-[8pt]"}>{category.date}</div>
            </div>
        ))}
    </>
);
