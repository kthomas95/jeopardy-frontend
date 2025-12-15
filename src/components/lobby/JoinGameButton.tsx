import { useJoinGameMutation } from "../../__generated__/join-game.generated";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { buttonStyles } from "../../styles/button";
import { Button } from "@mantine/core";

export const JoinGameButton = () => {
    const [joinGameResponse, joinGameMutation] = useJoinGameMutation();
    const playerName = useAtomValue(UserAtom) ?? "";

    return <Button onClick={() => joinGameMutation({ playerName })}>Join Game</Button>;
};
