import { GameStyle } from "../../graphql/graphql-types";
import { FC } from "react";
import { useSetGameStyleMutation } from "../../__generated__/set-game-style.generated";
import { Tab, TabList, Tabs } from "@heroui/react";

interface ManageGameStyleProps {
    style: GameStyle;
}

const segmentedData = [
    { value: GameStyle.Manual, label: "Manual" },
    { value: GameStyle.StandardFastest, label: "Standard" },
    // { value: GameStyle.StandardRandom, label: "Standard - Random" },
    // { value: GameStyle.StandardLowest, label: "Standard - Lowest" },
];

export const ManageGameStyle: FC<ManageGameStyleProps> = ({ style }) => {
    const [response, sendMutation] = useSetGameStyleMutation();

    function updateGameStyle(gameStyle: GameStyle) {
        sendMutation({ gameStyle });
    }

    return (
        <div className="pb-5">
            <h5 className="font-bold text-md mb-2">Game Style</h5>

            <Tabs
                aria-label="Game Style"
                selectedKey={style}
                onSelectionChange={(key) => updateGameStyle(key as GameStyle)}
                fullWidth
            >
                <TabList className="flex w-full" items={segmentedData}>
                    {(item) => (
                        <Tab id={item.value} className="flex-1 text-center py-2 cursor-pointer data-[selected=true]:border-b-2 data-[selected=true]:border-primary data-[selected=true]:text-primary">
                            {item.label}
                        </Tab>
                    )}
                </TabList>
            </Tabs>
        </div>
    );
};
