import MessageLog from "./MessageLog.tsx";
import MessageInput from "./MessageInput.tsx";
import {Em, Flex, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useState} from "react";
import {getSystemPrompt} from "../../utils/bartenders.ts";
import {addResponseToConversation, createConversation} from "../../api/openai.ts";
import {stripMarkdownFromString} from "../../utils/utils.ts";
import {useApiKeys} from "../../hooks/useApiKeys.tsx";
import type {Drink, ResponseSchema} from "../../utils/responseSchema.ts";
import {speakMessage} from "../../api/elevenLabs.ts";

export interface Message {
    sender: string;
    content: string;
    senderIsUser: boolean;
}

export default function MessagingPanel() {
    const {selectedBartender} = useBartender();
    const [conversationId, setConversationId] = useState<string>("");
    const [messageLog, setMessageLog] = useState<Message[]>([]);

    const {openaiKey, elevenLabsKey} = useApiKeys();

    const initializeConversation = async (message: string): Promise<string> => {
        if (!selectedBartender) {
            throw new Error("No bartender selected.");
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

        return newConversationId;
    }

    const addMessageToLog = (message: Message)=> {
        setMessageLog((previousMessages: Message[]) => [
            ...previousMessages,
            message
        ]);
    }

    const sendMessage = async (message: string, conversation: string) => {
        const responseString: string = await addResponseToConversation(message, conversation, openaiKey);
        const response: ResponseSchema = JSON.parse(responseString);
        let reply: string = response.message;
        reply = stripMarkdownFromString(reply)

        const drink: Drink = response.drink;

        return {reply, drink};

    }

    const speakReply = async (reply: string) => {
        if (selectedBartender?.elevenLabsVoiceId) {
            await speakMessage(reply, selectedBartender.elevenLabsVoiceId, elevenLabsKey);
        } else {
            console.log(`Unable to Speak Message: No ElevenLabs voice ID for selected Bartender (${selectedBartender?.profile.displayName}).`)
        }
    }

    const handleSendMessage = async (messageContent: string)=> {
        if (!selectedBartender) {
            throw new Error("Please select a bartender.")
        }

        let activeConversationId = conversationId;
        if (!activeConversationId) {
            activeConversationId = await initializeConversation(messageContent);
        }

        addMessageToLog({sender: "You", content: messageContent, senderIsUser: true});

        const {reply, drink} = await sendMessage(messageContent, activeConversationId);

        await speakReply(reply);

        addMessageToLog({sender: selectedBartender.profile.displayName, content: reply, senderIsUser: false});
        addMessageToLog({sender: selectedBartender.profile.displayName, content: JSON.stringify(drink), senderIsUser: false})
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