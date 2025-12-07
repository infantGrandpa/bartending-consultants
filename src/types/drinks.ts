export type Drink = {
    //If you change this, make sure to update ExampleResponseSchema!!!
    name: string;
    ingredients: Ingredient[];
    instructions: string[];
}

export type Ingredient = {
    ingredient: string;
    amount: string;
}

export async function copyDrinkToClipboard(drink: Drink): Promise<string> {
    const ingredientsList = drink.ingredients
        .map(ingredientItem => `${ingredientItem.amount} ${ingredientItem.ingredient}`)
        .join('\n');

    const instructionsList = drink.instructions
        .map((instructionStep, instructionIndex) => `${instructionIndex + 1}. ${instructionStep}`)
        .join('\n');

    const formattedDrinkText = `${drink.name}\n\nIngredients:\n${ingredientsList}\n\nInstructions:\n${instructionsList}`;

    await navigator.clipboard.writeText(formattedDrinkText);
    return formattedDrinkText;
}