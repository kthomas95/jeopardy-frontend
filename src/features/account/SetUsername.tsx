import { useAtom } from "jotai";
import { UserAtom } from "./user-atom";
import { useState } from "react";
import { Button, Card, Form, Input, Modal, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { CgProfile } from "react-icons/cg";

export const SetUsernameForm = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");
    return (
        <>
            <Input
                type={"text"}
                value={username}
                placeholder={"Enter Your Name"}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full"
            />
            <Button type="submit" fullWidth onPress={() => setName(username)}>
                Set Name
            </Button>
        </>
    );
};

export const SetUsername = () => {
    const [name, setName] = useAtom(UserAtom);

    const [username, setUserName] = useState(name ?? "");

    return (
        <Modal>
            <Button variant="ghost" className="ml-auto">
                <CgProfile />
                <div>
                    {username || "Set Name"}
                </div>
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="center">
                    <Modal.Dialog>
                        <Modal.CloseTrigger />
                        <Modal.Body className="px-2 pt-7">
                            <Form className="flex flex-col gap-3">

                                <SetUsernameForm />
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop >
        </Modal >
    );
};
