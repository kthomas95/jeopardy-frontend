import { GameStyle } from "../../graphql/graphql-types";
import { FC } from "react";
import { useSetGameStyleMutation } from "../../__generated__/set-game-style.generated";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

interface ManageGameStyleProps {
    style: GameStyle;
}

const segmentedData = [
    { value: GameStyle.Manual, label: "Manual", description: "Type in your responses." },
    { value: GameStyle.StandardFastest, label: "Standard", description: "First to buzz gets to provide answer." },
];

export const ManageGameStyle: FC<ManageGameStyleProps> = ({ style }) => {
    const [, sendMutation] = useSetGameStyleMutation();

    function updateGameStyle(gameStyle: GameStyle) {
        sendMutation({ gameStyle });
    }

    return (
        <RadioGroup
            orientation="horizontal"
            value={style}
            onChange={(val) => updateGameStyle(val as GameStyle)}
            className="gap-4 mx-auto"
        >
            {segmentedData.map(({ description, label, value }) => (
                <Radio key={value} value={value}>
                    <Radio.Control>
                        <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                        <Label>{label}</Label>
                        <Description>{description}</Description>
                    </Radio.Content>

                </Radio>
            ))}
        </RadioGroup>
    );
};
