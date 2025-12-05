import {Avatar, DataList, Flex, Heading, Text} from "@radix-ui/themes";
import type {Drink, Ingredient} from "../types/drinks.ts";

interface Props {
    drink: Drink;
}

export default function DrinkDetails({drink}: Props) {
    if (!drink) {
        return;
    }

    return (
        <>
            <Flex direction="row" gap="2" pb="2">
                <Heading as="h3" size="5" mb="2">{drink.name}</Heading>
                <Avatar variant="solid" size="5" fallback={drink.name.charAt(0)} />
            </Flex>

            <Heading as="h4" size="3">Ingredients</Heading>
            <DataList.Root size="1" my="1" style={{rowGap: "var(--space-2)", width: "100%"}}>
                {drink.ingredients.map((thisIngredient: Ingredient, index: number) => (
                    <DataList.Item key={index} style={{display: "flex"}}>
                        <DataList.Label style={{flexGrow: "1"}}>{thisIngredient.ingredient}</DataList.Label>
                        <DataList.Value>{thisIngredient.amount}</DataList.Value>
                    </DataList.Item>
                ))}
            </DataList.Root>

            <Heading as="h4" size="3" mt="5">Instructions</Heading>
            <ol style={{fontSize: "var(--font-size-2)", paddingLeft: "var(--space-4)", marginTop: "var(--space-2)"}}>
                {drink.instructions.map((thisStep: string, index: number) => (
                    <li key={index}><Text size="2">{thisStep}</Text></li>
                ))}
            </ol>
        </>
    )
}