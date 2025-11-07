import MessageLog from "./MessageLog.tsx";
import MessageInput from "./MessageInput.tsx";
import {Em, Flex, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useState} from "react";
import {getSystemPrompt, DrinkResponseSchema} from "../../utils/bartenders.ts";
import {addResponseToConversation, createConversation} from "../../api/openai.ts";
import {stripMarkdownFromString} from "../../utils/utils.ts";
import {useApiKeys} from "../../hooks/useApiKeys.tsx";

export interface Message {
    sender: string;
    content: string;
    senderIsUser: boolean;
}

export default function MessagingPanel() {
    const {selectedBartender} = useBartender();
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messageLog, setMessageLog] = useState<Message[]>([]);

    const {openaiKey} = useApiKeys();

    const initializeConversation = async (message: string)=> {
        if (!selectedBartender) {
            return;
        }

        console.log("Conversation ID not set. Creating a new conversation...");
        const systemPrompt = getSystemPrompt(selectedBartender);
        const newConversationId = await createConversation(
            systemPrompt,
            message,
            selectedBartender.key,
            openaiKey
        );
        setConversationId(newConversationId);
    }

    const addMessageToLog = (message: Message)=> {
        setMessageLog((previousMessages: Message[]) => [
            ...previousMessages,
            message
        ]);
    }

    const handleSendMessage = async (messageContent: string)=> {
        if (!selectedBartender) {
            throw new Error("Please select a bartender.")
        }

        if (!conversationId) {
            await initializeConversation(messageContent);
        }

        //TODO: Figure out a way to not require a second check (TypeScript is cranky without it)
        if (!conversationId) {
            throw new Error("Unexpected error: Conversation ID is still null after initializing conversation.")
        }

        addMessageToLog({sender: "You", content: messageContent, senderIsUser: true});

        const responseString: string = await addResponseToConversation(messageContent, conversationId, openaiKey);
        const response: typeof DrinkResponseSchema = JSON.parse(responseString);
        let reply = response.message;
        reply = stripMarkdownFromString(reply)

        //TODO: Speak Message

        addMessageToLog({sender: selectedBartender.profile.displayName, content: reply, senderIsUser: false});
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