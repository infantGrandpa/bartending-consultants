import {Card, Heading} from "@radix-ui/themes";
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
            <ul>
                {currentDrink.ingredients.map((thisIngredient: Ingredient, index: number) => (
                    <li key={index}>{thisIngredient.amount} {thisIngredient.ingredient}</li>
                ))}
            </ul>
            <Heading as="h4" size="3">Instructions</Heading>
            <ol>
                {currentDrink.instructions.map((thisStep: string, index: number) => (
                    <li key={index}>{thisStep}</li>
                ))}
            </ol>
        </Card>
    )
}