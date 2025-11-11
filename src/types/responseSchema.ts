import type {Drink} from "./drinks.ts";

export type ResponseSchema = {
    //If you change this, make sure to update ExampleResponseSchema!!!
    message: string;
    drink: Drink;
};

// TODO: Figure out a way to automate generating this example.
export const ExampleResponseSchema = {
    // This MUST match ResponseSchema exactly. Don't forget to update it if you update ResponseSchema.
    message: "string",
    drink: {
        name: "string",
        ingredients: [
            {
                ingredient: "string",
                amount: "string"
            }
        ],
        instructions: ["string"]
    }
};
