import MessageLog from "./MessageLog.tsx";
import MessageInput from "./MessageInput.tsx";
import {Em, Flex, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useState} from "react";
import {getSystemPrompt} from "../../utils/bartenders.ts";
import {createConversation} from "../../api/openai.ts";

export interface Message {
    sender: string;
    content: string;
    senderIsUser: boolean;
}

export default function MessagingPanel() {
    const {selectedBartender} = useBartender();
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messageLog, setMessageLog] = useState<Message[]>([]);

    const handleSendMessage = async (message: string)=> {
        if (!selectedBartender) {
            throw new Error("Please select a bartender.")
        }

        if (!conversationId) {
            console.log("Conversation ID not set. Creating a new conversation...");
            const systemPrompt = getSystemPrompt(selectedBartender);
            const newConversationId = await createConversation(
                systemPrompt,
                message,
                selectedBartender.key
            );
            setConversationId(newConversationId);
        }

        setMessageLog((previousMessages: Message[]) => [
            ...previousMessages,
            { sender: 'You', content: message, senderIsUser: true }
        ]);

        console.log(`Bartender Selected: ${selectedBartender.profile.displayName}`)
        console.log(`Message: ${message}`)
    }

    return (
        <Flex direction="column" gridColumn="span 2" justify="end">
            <MessageLog messages={messageLog}/>
            <Flex direction="column">
                <MessageInput onSendMessage={handleSendMessage}/>
                <Text as="p" size={"1"} align="right" style={{
                    paddingTop: "0.25rem",
                    color: "gray",
                    fontSize: "0.7rem"
                }}>
                    <Em>ID: {conversationId}</Em>
                </Text>
            </Flex>
        </Flex>
    );
}