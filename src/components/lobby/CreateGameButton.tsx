import { useCreateGameMutation } from "../../__generated__/create-game.generated";
import { Button } from "@heroui/react";

export interface CreateGameButtonProps { }

export const CreateGameButton = ({ }: CreateGameButtonProps) => {
    const [createGameResponse, createGame] = useCreateGameMutation();

    return (
        <Button className="bg-emerald-600 text-white" onPress={() => createGame({})}>
            Start Game
        </Button>
    );
};
