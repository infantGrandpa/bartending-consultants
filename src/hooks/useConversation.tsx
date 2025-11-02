import {useState} from "react";
import {getSystemPrompt} from "../utils/bartenders.ts";
import {addResponseToConversation, createConversation} from "../api/openai.ts";
import {stripMarkdownFromString} from "../utils/utils.ts";


export function useConversation() {
    const [conversationId, setConversationId] = useState<string>("");
    const [personality, setPersonality] = useState<any | null>(null);
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [drink, setDrink] = useState<any | null>(null);

    //TODO: Change personality

    const sendMessage = async (message: string)=> {
        if (!personality) throw new Error("No personality selected.");

        if (!conversationId) {
            console.log(`No conversation ID found. Creating a new conversation...`);
            const systemPrompt = getSystemPrompt(personality);
            const newId: string = await createConversation(systemPrompt, message, personality.key);
            setConversationId(newId);
        }

        setMessages((prev) => [...prev, { sender: "You", text: message }]);
        const responseString = await addResponseToConversation(message, conversationId);
        const response = JSON.parse(responseString);

        const reply = stripMarkdownFromString(response.message);
        setMessages((prev) => [...prev, { sender: personality.displayName, text: reply }]);
        setDrink(response.drink);

        //TODO: Speak text
    }

    return { personality, sendMessage, messages, drink };
}