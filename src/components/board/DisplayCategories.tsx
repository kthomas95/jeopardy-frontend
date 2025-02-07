import { PlayerViewCategory } from "../../api/category";

export const DisplayCategories = ({ categories }: { categories: PlayerViewCategory[] }) => (
    <>
        {categories.map((category) => (
            <div
                key={category.title}
                className={
                    "text-xs text-overflow-ellipsis min-w-0  lg:text-sm tracking-tight text-center rounded-md shadow-md flex center p-0.5 lg:p-1 bg-blue-700/80 text-blue-100 font-semibold flex-col"
                }
            >
                {category.title}
                <div className={"text-xs"}>{category.date}</div>
            </div>
        ))}
    </>
);
