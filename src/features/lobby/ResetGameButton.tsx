import { useResetGameMutation } from "../../__generated__/reset-game.generated";
import { Button } from "@heroui/react";

export const ResetGameButton = () => {
    const [resetGameResponse, resetGameMutation] = useResetGameMutation();

    function resetGame() {
        resetGameMutation({});
    }

    return (
        <Button variant="danger-soft" onPress={resetGame}>
            Reset Game
        </Button>
    );
};
