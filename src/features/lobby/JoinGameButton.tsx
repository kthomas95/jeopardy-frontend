import { useJoinGameMutation } from "../../__generated__/join-game.generated";
import { useAtomValue } from "jotai";
import { UserAtom } from "../account/user-atom";
import { Button } from "@heroui/react";

export const JoinGameButton = () => {
    const [joinGameResponse, joinGameMutation] = useJoinGameMutation();
    const playerName = useAtomValue(UserAtom) ?? "";

    return <Button onPress={() => joinGameMutation({ playerName })}>Join Game</Button>;
};
