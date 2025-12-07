import {IconButton} from "@radix-ui/themes";
import {copyDrinkToClipboard, type Drink} from "../types/drinks.ts";

interface Props {
    drink: Drink | undefined;
}

export default function CopyDrinkButton({drink}: Props) {
    const handleCopyDrink = async () => {
        if (!drink) {
            return;
        }
        const output = await copyDrinkToClipboard(drink);
        console.log(output)
    }

    return (
        <IconButton variant="ghost" disabled={!drink} onMouseDown={handleCopyDrink}>
            <i className="fa-solid fa-clone"></i>
        </IconButton>
    )
}