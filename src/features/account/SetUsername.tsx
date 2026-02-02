import { useAtom } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { useState } from "react";
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { CgProfile } from "react-icons/cg";

export const SetUsernameForm = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");
    return (
        <div className={"shadow-md rounded-md m-3 w-max flex gap-2 p-2 bg-white"}>
            <Input
                type={"text"}
                value={username}
                placeholder={"Enter Your Name"}
                onChange={(e) => setUserName(e.target.value)}
                className="w-40"
            />
            <Button onPress={() => setName(username)}>
                Set Name
            </Button>
        </div>
    );
};

export const SetUsername = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <div className="flex items-center gap-2 ml-auto cursor-pointer">
                    <CgProfile />
                    {username || "Set Name"}
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <SetUsernameForm />
            </PopoverContent>
        </Popover>
    );
};
