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
        <div className={"h-dvh flex flex-col p-2 gap-4"}>
            <div className="font-semibold">{selectedCategories}/12 Categories Selected</div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-3 overflow-y-scroll">
                {categories.map(({ date, title, isSelected }) => (
                    <Button
                        key={title}
                        onPress={() => toggleCategory({ date, title })}
                        variant={isSelected ? "primary" : "tertiary"}
                        className={cn(
                            "h-24 py-4 gap-2 flex flex-col whitespace-normal",
                        )}
                        fullWidth
                    >
                        <div>{title}</div>
                        <div className="text-xs italic opacity-80">{date}</div>
                    </Button>
                ))}
            </div>
        </div>
    );
};
