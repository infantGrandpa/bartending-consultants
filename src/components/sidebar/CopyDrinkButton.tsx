import {IconButton, Popover, Text} from "@radix-ui/themes";
import {copyDrinkToClipboard, type Drink} from "../../types/drinks.ts";
import {useState} from "react";

interface Props {
    drink: Drink | undefined;
}

export default function CopyDrinkButton({drink}: Props) {
    const [drinkWasCopied, setDrinkWasCopied] = useState<boolean>(false);

    const handleCopyDrink = async () => {
        if (!drink) {
            return;
        }
        await copyDrinkToClipboard(drink);
        setDrinkWasCopied(true);

        setTimeout(() => {
            setDrinkWasCopied(false);
        }, 1500)
    }

    return (
        <Popover.Root open={drinkWasCopied}>
            <Popover.Trigger>
                <IconButton variant="ghost" disabled={!drink} onMouseDown={handleCopyDrink}>
                    <i className="fa-solid fa-clone"></i>
                </IconButton>
            </Popover.Trigger>
            <Popover.Content size="1">
                <Text as="p" size="1">Copied to Clipboard!</Text>
            </Popover.Content>
        </Popover.Root>
    )
}