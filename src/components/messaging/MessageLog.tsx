import {Flex, ScrollArea} from "@radix-ui/themes";
import Message from "./Message.tsx";

export default function MessageLog() {
    const numberOfMessages: number = 15;

    const sampleSenders: string[] = ["Captain America", "Black Widow", "Iron Man", "Thor"];
    const sampleMessages: string[] = [
        "Tony, I saw your browser history on the Stark Tower main computer. Really? 'How to be more humble'?",
        "So... who's going to tell Fury about the Quinjet?",
        "I may have accidentally told Pepper that Natasha has a crush on Bruce. My bad.",
        "FRIENDS! I have discovered this 'TikTok' and I believe I am now... what do you call it... 'viral'?",
        "Just found out Tony's been adding my name to his pizza delivery orders so he doesn't have to tip. FOR THREE YEARS.",
        "Thor left Mjolnir in the training room and now no one can move the bench press equipment",
        "Steve's been using my credit card to buy vintage baseball cards again",
        "I saw Steve and Nat holding hands in the movie theater last night 👀",
        "Okay which one of you replaced my shields with Captain Puerto Rico shields?? I know it was you, Stark.",
        "Thor's been telling everyone that WE were the ones who broke the Bifrost. THOR. YOU LITERALLY DESTROYED IT YOURSELF.",
        "I can't believe Cap doesn't know what 'Netflix and chill' means 😂",
        "Tony's walking around in a bathrobe calling himself 'Tony Stark: First of His Name, King of the Avengers'",
        "Why is there a scratched message on my shield that says 'Tony was here'?!",
        "For the last time Thor, Pop-Tarts are NOT a legitimate food group no matter how many you eat",
        "Bruce just rage-transformed because someone ate his yogurt from the fridge. It was me. Worth it."
    ];

    return (
        <ScrollArea scrollbars="vertical">
            <Flex direction="column" gap="3">
                {Array.from({ length: numberOfMessages }).map((_, index) => (
                    <Message
                        message={sampleMessages[index % sampleMessages.length]}
                        sender={sampleSenders[index % sampleSenders.length]}
                        onLeftSide={index % sampleSenders.length !== 0}
                        key={index}
                    />
                ))}
            </Flex>
        </ScrollArea>
    );
}