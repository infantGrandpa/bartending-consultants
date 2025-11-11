import {Card, DataList, Heading} from "@radix-ui/themes";
import {useConversation} from "../providers/ConversationProvider.tsx";
import type {Drink, Ingredient} from "../types/drinks.ts";


export default function DrinkDetails() {
    const {getMostRecentDrink} = useConversation();

    const currentDrink: Drink | undefined = getMostRecentDrink();

    if (!currentDrink) {
        return;
    }

    return (
        <Card style={{
            width: "100%"
        }}>
            <Heading as="h3" size="4" mb="2">{currentDrink.name}</Heading>
            <Heading as="h4" size="3">Ingredients</Heading>
            <DataList.Root size="1" my="2" style={{gap:"0.5rem"}}>
                {currentDrink.ingredients.map((thisIngredient: Ingredient, index: number) => (
                    <DataList.Item key={index}>
                        <DataList.Label minWidth="12rem">{thisIngredient.ingredient}</DataList.Label>
                        <DataList.Value>{thisIngredient.amount}</DataList.Value>
                    </DataList.Item>
                ))}
            </DataList.Root>
            <Heading as="h4" size="3">Instructions</Heading>
            <ol>
                {currentDrink.instructions.map((thisStep: string, index: number) => (
                    <li key={index}>{thisStep}</li>
                ))}
            </ol>
        </Card>
    )
}