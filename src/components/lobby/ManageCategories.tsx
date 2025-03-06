import { useToggleCategoryMutation } from "../../__generated__/toggle-category.generated";
import { useCreateGameMutation } from "../../__generated__/create-game.generated";
import { flattenStrings } from "../../utils/string/flatten-strings";
import { buttonStyles } from "../../styles/button";
import { PendingCategoryPlayer } from "../../graphql/graphql-types";

export interface ManageCategoriesProps {
    categories: PendingCategoryPlayer[];
}

export const ManageCategories = ({ categories }: ManageCategoriesProps) => {
    const [, toggleCategory] = useToggleCategoryMutation();

    const selectedCategories = categories.filter((x) => x.isSelected).length;

    return (
        <div className={"bg-slate-800 text-slate-200 h-dvh flex flex-col p-8 gap-5"}>
            <div className="font-semibold">{selectedCategories}/12 Categories Selected</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-3 overflow-y-scroll">
                {categories.map(({ date, title, isSelected }) => (
                    <button
                        className={flattenStrings([
                            "h-22 gap-2",
                            buttonStyles({ colors: isSelected ? "primary" : "dark", direction: "vertical" }),
                        ])}
                        onClick={() => toggleCategory({ date, title })}
                        key={title}
                    >
                        <div>{title}</div>
                        <div>{date}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
