//TODO: Figure out a way we can do this without passing the API key around
async function sendOpenAiRequest(endpoint: string, jsonBody: any, openaiKey: string) {
    const requestUrl = `https://api.openai.com/v1/${endpoint}`
    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify(jsonBody)
    });

    const data = await response.json()

    if (!response.ok) {
        console.error(data);
        throw new Error(`Request failed: ${data.error?.message || "Unknown error"}`);
    }

    return data
}

export async function createConversation(systemPrompt: string, userMessage: string, personalityKey: string, openAiKey: string, useDummyMessages: boolean) {
    const requestBody = {
        metadata: {personality: personalityKey},
        items: [
            {
                type: 'message',
                role: 'system',
                content: systemPrompt
            },
            {
                type: 'message',
                role: 'user',
                content: userMessage
            }
        ]
    }

    let conversation;
    if (useDummyMessages) {
        conversation = {id: "123456"}
        console.log(`DEV MODE: Dummy Conversation created.`);
    } else {
        conversation = await sendOpenAiRequest('conversations', requestBody, openAiKey);
    }
    return conversation.id;
}

export async function addResponseToConversation(message: string, conversationId: string, openAiKey: string, useDummyMessages: boolean) {
    if (useDummyMessages) {
        console.log('DEV MODE: Generating mock response...');
        return generateMockResponse(message);
    }

    const requestBody = {
        model: 'gpt-4.1',
        conversation: conversationId,
        input: message
    }

    const data = await sendOpenAiRequest('responses', requestBody, openAiKey)
    return data.output[0].content[0].text;
}

function generateMockResponse(message: string) {
    const mockReplies = [
        {
            "message": "Ah, the Negroni — a classic Italian aperitivo that's equal parts bitter, sweet, and smooth. It’s a no-fuss drink that balances gin’s botanical punch with the orange warmth of Campari and the deep sweetness of vermouth. Stirred, never shaken, and best sipped slowly over a large cube.",
            "drink": {
                "name": "Negroni",
                "ingredients": [
                    {"ingredient": "Gin", "amount": "1 oz"},
                    {"ingredient": "Campari", "amount": "1 oz"},
                    {"ingredient": "Sweet Vermouth", "amount": "1 oz"}
                ],
                "instructions": [
                    "Add gin, Campari, and sweet vermouth to a mixing glass filled with ice.",
                    "Stir for about 30 seconds until well chilled.",
                    "Strain into a rocks glass over a large ice cube.",
                    "Garnish with an orange peel, expressed over the drink."
                ]
            }
        },
        {
            "message": "The Mojito is Cuba in a glass — light, minty, and refreshing with just enough rum to keep things interesting. Perfect for summer afternoons, it’s a drink that tastes like a vacation when done right: bright lime, cooling mint, and effervescent sparkle.",
            "drink": {
                "name": "Mojito",
                "ingredients": [
                    {"ingredient": "White Rum", "amount": "2 oz"},
                    {"ingredient": "Fresh Lime Juice", "amount": "1 oz"},
                    {"ingredient": "Sugar", "amount": "2 tsp"},
                    {"ingredient": "Fresh Mint Leaves", "amount": "6-8 leaves"},
                    {"ingredient": "Club Soda", "amount": "Top up"}
                ],
                "instructions": [
                    "Muddle mint leaves and sugar with lime juice in a glass.",
                    "Add rum and fill the glass with ice.",
                    "Top with club soda and gently stir to mix.",
                    "Garnish with a sprig of mint and a lime wheel."
                ]
            }
        },
        {
            "message": "The Espresso Martini — the only acceptable way to combine caffeine and alcohol. Born in the ‘80s, it’s smooth, rich, and a little dangerous. The velvety crema on top is pure elegance, while the hit of espresso keeps you sharp through the night.",
            "drink": {
                "name": "Espresso Martini",
                "ingredients": [
                    {"ingredient": "Vodka", "amount": "2 oz"},
                    {"ingredient": "Coffee Liqueur", "amount": "1/2 oz"},
                    {"ingredient": "Freshly Brewed Espresso", "amount": "1 oz"},
                    {"ingredient": "Simple Syrup", "amount": "1/4 oz"}
                ],
                "instructions": [
                    "Add vodka, coffee liqueur, espresso, and simple syrup to a shaker filled with ice.",
                    "Shake hard for 15–20 seconds to create a frothy texture.",
                    "Strain into a chilled coupe or martini glass.",
                    "Garnish with three coffee beans on top."
                ]
            }
        },
        {
            "message": "Smoky, bold, and a bit mysterious — the Mezcal Paloma is the wilder cousin of the classic tequila version. Mezcal adds earthy depth that pairs beautifully with grapefruit’s tart sweetness. It’s an easy sipper with personality and a bit of fire.",
            "drink": {
                "name": "Mezcal Paloma",
                "ingredients": [
                    {"ingredient": "Mezcal", "amount": "2 oz"},
                    {"ingredient": "Fresh Grapefruit Juice", "amount": "2 oz"},
                    {"ingredient": "Lime Juice", "amount": "1/2 oz"},
                    {"ingredient": "Agave Syrup", "amount": "1/2 oz"},
                    {"ingredient": "Club Soda", "amount": "Top up"},
                    {"ingredient": "Salt", "amount": "Pinch (for rim)"}
                ],
                "instructions": [
                    "Rim a highball glass with salt.",
                    "Add mezcal, grapefruit juice, lime juice, and agave syrup to a shaker with ice.",
                    "Shake briefly and strain into the prepared glass over fresh ice.",
                    "Top with club soda and stir gently.",
                    "Garnish with a grapefruit wedge."
                ]
            }
        },
        {
            "message": "The Hot Buttered Rum is an old-school winter warmer that feels like wrapping yourself in a blanket by the fire. It’s rich, buttery, and full of spice — a nostalgic favorite when the weather turns cold. Best made with a dark, full-bodied rum.",
            "drink": {
                "name": "Hot Buttered Rum",
                "ingredients": [
                    {"ingredient": "Dark Rum", "amount": "2 oz"},
                    {"ingredient": "Unsalted Butter", "amount": "1 tbsp"},
                    {"ingredient": "Brown Sugar", "amount": "1 tsp"},
                    {"ingredient": "Ground Cinnamon", "amount": "Pinch"},
                    {"ingredient": "Ground Nutmeg", "amount": "Pinch"},
                    {"ingredient": "Hot Water", "amount": "4 oz"}
                ],
                "instructions": [
                    "Combine butter, brown sugar, cinnamon, and nutmeg in a mug.",
                    "Pour in rum and top with hot water.",
                    "Stir until butter is melted and ingredients are combined.",
                    "Garnish with a cinnamon stick or grated nutmeg."
                ]
            }
        },
        {
            "message": "You want a drink with a bit of backbone, then. Something timeless, just like me—been around, seen it all, no nonsense. Let’s do a Manhattan. Matches me: strong, classic, no frills, but unforgettable. Brett, try not to mess this one up—the last time you made a stirred drink, the ice did more work than you.",
            "drink": {
                "name": "The Lennox Manhattan",
                "ingredients": [
                    {
                        "ingredient": "Rye whiskey",
                        "amount": "2 oz"
                    },
                    {
                        "ingredient": "Sweet vermouth",
                        "amount": "1 oz"
                    },
                    {
                        "ingredient": "Angostura bitters",
                        "amount": "2 dashes"
                    }
                ],
                "instructions": [
                    "Add all ingredients to a mixing glass with ice.",
                    "Stir well until very cold, about 30 seconds—longer than Brett’s attention span.",
                    "Strain into a chilled coupe or martini glass.",
                    "Garnish with a brandied cherry, none of that neon rubbish."
                ]
            }
        }
    ]


    const mockIndex = message.length % mockReplies.length;
    return JSON.stringify(mockReplies[mockIndex], null, 2);
}