export type Drink = {
    name: string;
    ingredients: [
        {
            ingredient: string;
            amount: string;
        }
    ]
    instructions: [
        {
            step: string;
        }
    ];
}