import { useResetGameMutation } from "../../__generated__/reset-game.generated";
import { buttonStyles } from "../../styles/button";

export const ResetGameButton = () => {
    const [resetGameResponse, resetGameMutation] = useResetGameMutation();
    return (
        <button className={buttonStyles({ colors: "error" })} onClick={() => resetGameMutation({})}>
            Reset Game
        </button>
    );
};
