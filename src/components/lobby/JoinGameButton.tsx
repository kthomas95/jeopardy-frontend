import { useJoinGameMutation } from "../../__generated__/join-game.generated";
import { useAtomValue } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { buttonStyles } from "../../styles/button";

export const JoinGameButton = () => {
    const [joinGameResponse, joinGameMutation] = useJoinGameMutation();
    const playerName = useAtomValue(UserAtom) ?? "";

    return (
        <button className={buttonStyles()} onClick={() => joinGameMutation({ playerName })}>
            Join Game
        </button>
    );
};
