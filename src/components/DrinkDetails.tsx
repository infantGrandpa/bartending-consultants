import {Avatar, DataList, Flex, Heading, Text} from "@radix-ui/themes";
import {useConversation} from "../providers/ConversationProvider.tsx";
import type {Drink, Ingredient} from "../types/drinks.ts";


export default function DrinkDetails() {
    const {getMostRecentDrink} = useConversation();

    const currentDrink: Drink | undefined = getMostRecentDrink();

    if (!currentDrink) {
        return;
    }

    return (
        <>
            <Flex direction="row" gap="2" pb="2">
                <Heading as="h3" size="5" mb="2">{currentDrink.name}</Heading>
                <Avatar variant="solid" size="5" fallback={currentDrink.name.charAt(0)} />
            </Flex>

            <Heading as="h4" size="3">Ingredients</Heading>
            <DataList.Root size="1" my="1" style={{rowGap: "var(--space-2)", width: "100%"}}>
                {currentDrink.ingredients.map((thisIngredient: Ingredient, index: number) => (
                    <DataList.Item key={index}>
                        <DataList.Label minWidth="12rem">{thisIngredient.ingredient}</DataList.Label>
                        <DataList.Value>{thisIngredient.amount}</DataList.Value>
                    </DataList.Item>
                ))}
            </DataList.Root>

            <Heading as="h4" size="3" mt="5">Instructions</Heading>
            <ol style={{fontSize: "var(--font-size-2)", paddingLeft: "var(--space-4)", marginTop: "var(--space-2)"}}>
                {currentDrink.instructions.map((thisStep: string, index: number) => (
                    <li key={index}><Text size="2">{thisStep}</Text></li>
                ))}
            </ol>
        </>
    )
}