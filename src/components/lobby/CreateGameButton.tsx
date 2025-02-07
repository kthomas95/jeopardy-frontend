import { useCreateGameMutation } from "../../__generated__/create-game.generated";
import { buttonStyles } from "../../styles/button";

export const CreateGameButton = () => {
    const [createGameResponse, createGame] = useCreateGameMutation();

    return (
        <button className={buttonStyles({ colors: "success" })} onClick={() => createGame({})}>
            Start Game
        </button>
    );
};
