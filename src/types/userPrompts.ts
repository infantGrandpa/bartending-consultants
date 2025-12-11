export const genericPrompts: string[] = [
    "What spirits do you like?",
    "Do you like smokey, sour, fruity, or other flavors?",
    "Do you want something light, balanced, or spirit-forward?",
    "What kind of mood are you in tonight?",
    "Are you looking for something new or familiar?",
    "Tell me about the last drink you loved.",
    "What flavors do you hate?"
]

export function getRandomUserPrompts(promptsToGet: number): string[] {
    const shuffledPrompts: string[] = [...genericPrompts].sort(() => Math.random() - 0.5);
    return shuffledPrompts.slice(0, promptsToGet);
}