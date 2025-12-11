import type {Bartender} from "./bartenders.ts";

export const genericPrompts: string[] = [
    "What spirits do you like?",
    "Do you like smoky, sour, fruity, or other flavors?",
    "Do you want something light, balanced, or spirit-forward?",
    "What kind of mood are you in tonight?",
    "Are you looking for something new or familiar?",
    "Tell me about the last drink you loved.",
    "What flavors do you hate?"
]

export function getRandomGenericUserPrompts(promptsToGet: number): string[] {
    return getRandomPromptsFromArray(genericPrompts, promptsToGet);
}

export function getRandomBartenderUserPrompts(bartender: Bartender, promptsToGet: number): string[] | null {
    if (!bartender.customPrompts) {
        return null;
    }

    return getRandomPromptsFromArray(bartender.customPrompts, promptsToGet);
}

function getRandomPromptsFromArray(array: string[], promptsToGet: number): string[] {
    const shuffledPrompts: string[] = [...array].sort(() => Math.random() - 0.5);
    return shuffledPrompts.slice(0, promptsToGet);
}