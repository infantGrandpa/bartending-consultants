import {Dialog, Flex, IconButton, VisuallyHidden} from "@radix-ui/themes";
import DrinkDetails from "../DrinkDetails.tsx";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";
import {useConversation} from "../../providers/ConversationProvider.tsx";
import {useEffect, useState} from "react";
import type {Drink} from "../../types/drinks.ts";

export default function MessageSidebar() {
    const {isSidebarOpen, openSidebar, closeSidebar, currentDrink, setCurrentDrink} = useMessageSidebar();
    const {conversation, getMostRecentDrink, getAllDrinks} = useConversation();
    const [isFirstDrink, setIsFirstDrink] = useState<boolean>();
    const [isLastDrink, setIsLastDrink] = useState<boolean>();

    useEffect(() => {
        if (currentDrink) {
            return;
        }

        setCurrentDrink(getMostRecentDrink())
    }, []);

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
        <Dialog.Root open={isSidebarOpen}>
            <Dialog.Trigger>
                <IconButton variant="ghost" onClick={openSidebar}>
                    <i className="fa-solid fa-martini-glass"></i>
                </IconButton>
            </Dialog.Trigger>

            <Dialog.Content
                width="90%"
                height="100%"
                style={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    padding: "var(--space-4)"
                }}
                aria-describedby={undefined}
                onPointerDownOutside={closeSidebar}
            >
                <VisuallyHidden>
                    <Dialog.Title>
                        Drink Details
                    </Dialog.Title>
                </VisuallyHidden>

                <Flex direction="row" width="100%" justify="between" align="center" pb="2">
                    <Dialog.Close>
                        <IconButton variant="ghost" onClick={closeSidebar}>
                            <i className="fa-solid fa-martini-glass"></i>
                        </IconButton>
                    </Dialog.Close>
                    <Flex direction="row" gap="2">
                        <IconButton size="1" variant="soft" onClick={handlePreviousDrink}  disabled={isFirstDrink}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </IconButton>
                        <IconButton size="1" variant="soft" onClick={handleNextDrink} disabled={isLastDrink}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </IconButton>
                    </Flex>
                </Flex>
                {currentDrink && <DrinkDetails drink={currentDrink}/>}
            </Dialog.Content>
        </Dialog.Root>
    )
}