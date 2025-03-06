import { useCreateGameMutation } from "../../__generated__/create-game.generated";
import { buttonStyles } from "../../styles/button";

export interface CreateGameButtonProps {}

export const CreateGameButton = ({}: CreateGameButtonProps) => {
    const [createGameResponse, createGame] = useCreateGameMutation();

    return (
        <button className={buttonStyles({ colors: "success" })} onClick={() => createGame({})}>
            Start Game
        </button>
    );
};
