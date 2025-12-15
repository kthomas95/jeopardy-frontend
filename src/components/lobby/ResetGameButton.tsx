import { useResetGameMutation } from "../../__generated__/reset-game.generated";
import { buttonStyles } from "../../styles/button";
import { Button } from "@mantine/core";

export const ResetGameButton = () => {
    const [resetGameResponse, resetGameMutation] = useResetGameMutation();

    function resetGame() {
        resetGameMutation({});
    }

    return (
        <Button color={"red"} onClick={resetGame} className={"shrink-0"}>
            Reset Game
        </Button>
    );
};
