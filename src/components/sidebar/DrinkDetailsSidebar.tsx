import {Box, Button, Flex, IconButton} from "@radix-ui/themes";
import DrinkDetails from "./DrinkDetails.tsx";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";
import {useConversation} from "../../providers/ConversationProvider.tsx";
import {useEffect, useState} from "react";
import {type Drink} from "../../types/drinks.ts";
import CopyDrinkButton from "./CopyDrinkButton.tsx";

interface Props {
    showCloseButton?: boolean;
}

export default function DrinkDetailsSidebar({showCloseButton = true}: Props) {
    const {isSidebarOpen, closeSidebar, currentDrink, setCurrentDrink} = useMessageSidebar();
    const {conversation, getMostRecentDrink, getAllDrinks} = useConversation();
    const [isFirstDrink, setIsFirstDrink] = useState<boolean>();
    const [isLastDrink, setIsLastDrink] = useState<boolean>();

    useEffect(() => {
        if (currentDrink) {
            return;
        }

        setCurrentDrink(getMostRecentDrink())
    }, [isSidebarOpen]);

    useEffect(() => {
        const allDrinks: Drink[] = getAllDrinks();
        const currentDrinkIndex: number = allDrinks.findIndex((drink: Drink) => drink === currentDrink);
        setIsFirstDrink(currentDrinkIndex === 0);
        setIsLastDrink(currentDrinkIndex === allDrinks.length - 1 || currentDrinkIndex === -1);
    }, [conversation, currentDrink]);

    const handlePreviousDrink = () => {
        const allDrinks: Drink[] = getAllDrinks();
        const currentDrinkIndex: number = allDrinks.findIndex((drink: Drink) => drink === currentDrink);

        if (currentDrinkIndex > 0) {
            setCurrentDrink(allDrinks[currentDrinkIndex - 1]);
        }
    }

    const handleNextDrink = () => {
        const allDrinks: Drink[] = getAllDrinks();
        const currentDrinkIndex: number = allDrinks.findIndex((drink: Drink) => drink === currentDrink);

        if (currentDrinkIndex !== -1 && currentDrinkIndex < allDrinks.length - 1) {
            setCurrentDrink(allDrinks[currentDrinkIndex + 1]);
        }
    }

    return (
        <Flex direction="column" justify="between" minHeight="75vh">
            <Flex direction="row" width="100%" justify={showCloseButton ? "between": "end"} align="center" pb="4">
                {showCloseButton &&
                    <IconButton variant="ghost" onClick={closeSidebar}>
                        <i className="fa-solid fa-martini-glass"></i>
                    </IconButton>
                }
                <CopyDrinkButton drink={currentDrink}/>
            </Flex>
            <Box style={{flexGrow: "1"}}>
                {currentDrink && <DrinkDetails drink={currentDrink}/>}
            </Box>
            <Flex direction="row" gap="9" justify="between">
                <Button size="2" variant="soft" onMouseDown={handlePreviousDrink} disabled={isFirstDrink}>
                    <i className="fa-solid fa-chevron-left"></i>Previous
                </Button>
                <Button size="2" variant="soft" onMouseDown={handleNextDrink} disabled={isLastDrink}>
                    Next<i className="fa-solid fa-chevron-right"></i>
                </Button>
            </Flex>
        </Flex>
    )
}