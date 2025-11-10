import {Dialog, IconButton} from "@radix-ui/themes";
import ApiKeysCard from "./ApiKeysCard.tsx";

export default function Settings() {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <IconButton variant="soft">
                    <i className="fa-solid fa-gear"></i>
                </IconButton>
            </Dialog.Trigger>


            <Dialog.Content maxWidth="500px">
                <Dialog.Title>Settings</Dialog.Title>
                <ApiKeysCard />
            </Dialog.Content>
        </Dialog.Root>
    )
}