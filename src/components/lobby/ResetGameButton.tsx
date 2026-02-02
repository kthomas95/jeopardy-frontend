import { useResetGameMutation } from "../../__generated__/reset-game.generated";
import { Button } from "@heroui/react";

export const ResetGameButton = () => {
    const [resetGameResponse, resetGameMutation] = useResetGameMutation();

    function resetGame() {
        resetGameMutation({});
    }

    return (
        <Button className="shrink-0 bg-red-600 text-white" onPress={resetGame}>
            Reset Game
        </Button>
    );
};
