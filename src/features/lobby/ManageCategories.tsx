import { useToggleCategoryMutation } from "../../__generated__/toggle-category.generated";
import { useCreateGameMutation } from "../../__generated__/create-game.generated";
import { cn, Button } from "@heroui/react";
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
                    <Button
                        key={title}
                        onPress={() => toggleCategory({ date, title })}
                        className={cn(
                            "h-22 h-auto py-4 gap-2 flex flex-col items-center justify-center rounded-md transition-colors whitespace-normal",
                            isSelected ? "bg-sky-500 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600",
                        )}
                    >
                        <div>{title}</div>
                        <div>{date}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
};
