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