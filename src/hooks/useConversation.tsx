import {useState} from "react";
import {getSystemPrompt} from "../utils/bartenders.ts";
import {addResponseToConversation, createConversation} from "../api/openai.ts";
import {stripMarkdownFromString} from "../utils/utils.ts";
import {useBartender} from "../providers/BartenderProvider.tsx";


export function useConversation() {
    const [conversationId, setConversationId] = useState<string>("");
    const {selectedBartender} = useBartender();
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [drink, setDrink] = useState<any | null>(null);

    const sendMessage = async (message: string)=> {
        if (!selectedBartender) throw new Error("No personality selected.");

        if (!conversationId) {
            console.log(`No conversation ID found. Creating a new conversation...`);
            const systemPrompt = getSystemPrompt(selectedBartender);
            const newId: string = await createConversation(systemPrompt, message, selectedBartender.key);
            setConversationId(newId);
        }

        setMessages((prev) => [...prev, { sender: "You", text: message }]);
        const responseString = await addResponseToConversation(message, conversationId);
        const response = JSON.parse(responseString);

        const reply = stripMarkdownFromString(response.message);
        setMessages((prev) => [...prev, { sender: selectedBartender?.profile.displayName, text: reply }]);
        setDrink(response.drink);

        //TODO: Speak text
    }

    return { sendMessage, messages, drink };
}