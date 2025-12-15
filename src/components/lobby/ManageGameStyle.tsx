import { GameStyle } from "../../graphql/graphql-types";
import { FC } from "react";
import { SegmentedControl, SegmentedControlItem, Stack, Title } from "@mantine/core";
import { useSetGameStyleMutation } from "../../__generated__/set-game-style.generated";

interface ManageGameStyleProps {
    style: GameStyle;
}

const segmentedData: SegmentedControlItem[] = [
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
        <Stack pb={"xl"}>
            <Title order={5} size={"md"}>
                Game Style
            </Title>

            <SegmentedControl
                data={segmentedData}
                value={style}
                color={"blue"}
                // orientation={"vertical"}
                fullWidth
                onChange={(value) => updateGameStyle(value as GameStyle)}
            />
        </Stack>
    );
};
