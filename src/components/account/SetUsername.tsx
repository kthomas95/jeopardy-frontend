import { useAtom } from "jotai";
import { UserAtom } from "../../atoms/user-atom";
import { useState } from "react";
import { buttonStyles } from "../../styles/button";
import { Dialog } from "radix-ui";
import { CgProfile } from "react-icons/cg";

export const SetUsernameForm = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");
    return (
        <div className={"shadow-md fixed rounded-md ring-sky-700 m-3 w-max flex focus-within:ring-4"}>
            <input
                type={"text"}
                className={"pl-2 focus:outline-none bg-slate-200 text-slate-700 rounded-l-[inherit]"}
                value={username}
                placeholder={"Enter Your Name"}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={() => setName(username)} className={buttonStyles({ class: "!rounded-l-none" })}>
                Set Name
            </button>
        </div>
    );
};

export const SetUsername = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");

    return (
        <Dialog.Root>
            <Dialog.Trigger className={"flex items-center gap-2 ml-auto"}>
                <CgProfile />
                {username}
            </Dialog.Trigger>
            <Dialog.Content className={""}>
                <SetUsernameForm />
            </Dialog.Content>
        </Dialog.Root>
    );
};
