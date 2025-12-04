import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useEffect} from "react";
import {getSystemPrompt} from "../../types/bartenders.ts";
import {addResponseToConversation, createConversation} from "../../api/openai.ts";
import {stripMarkdownFromString} from "../../utils/utils.ts";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import type {ResponseSchema} from "../../types/responseSchema.ts";
import {speakMessage} from "../../api/elevenLabs.ts";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";
import type {Drink} from "../../types/drinks.ts";
import {useConversation} from "../../providers/ConversationProvider.tsx";
import MessageHeader from "./MessageHeader.tsx";
import MessagingControls from "./MessagingControls.tsx";


export default function MessagingPanel() {
    const {selectedBartender} = useBartender();
    const {conversation, setConversationId, addMessage, clearConversation} = useConversation();
    const {openaiKey, elevenLabsKey} = useApiKeys();
    const {settings} = useDevSettings()

    useEffect(() => {
        clearConversation();
    }, [selectedBartender]);

    const initializeConversation = async (message: string): Promise<string> => {
        if (!selectedBartender) {
            throw new Error("No bartender selected.");
        }

        const systemPrompt = getSystemPrompt(selectedBartender);
        const newConversationId = await createConversation(
            systemPrompt,
            message,
            selectedBartender.key,
            openaiKey,
            settings.useDummyMessages
        );
        setConversationId(newConversationId);

        return newConversationId;
    }

    const sendMessage = async (message: string, conversation: string) => {
        const responseString: string = await addResponseToConversation(
            message,
            conversation,
            openaiKey,
            settings.useDummyMessages
        );
        const response: ResponseSchema = JSON.parse(responseString);
        let reply: string = response.message;
        reply = stripMarkdownFromString(reply)

        const drink: Drink = response.drink;

        return {reply, drink};

    }

    const speakReply = async (reply: string) => {
        if (settings.playDummyAudio) {
            console.log(`Pretend we read this out loud: ${reply}`);
            return;
        }

        if (selectedBartender?.elevenLabsVoiceId) {
            await speakMessage(reply, selectedBartender.elevenLabsVoiceId, elevenLabsKey);
        } else {
            console.log(`Unable to Speak Message: No ElevenLabs voice ID for selected Bartender (${selectedBartender?.profile.displayName}).`)
        }
    }

    const handleSendMessage = async (messageContent: string) => {
        if (!selectedBartender) {
            throw new Error("Please select a bartender.")
        }

        let activeConversationId = conversation.conversationId;
        if (!activeConversationId) {
            activeConversationId = await initializeConversation(messageContent);
        }

        addMessage({sender: "You", content: messageContent, senderIsUser: true})

        const {reply, drink} = await sendMessage(messageContent, activeConversationId);

        await speakReply(reply);

        addMessage({sender: selectedBartender.profile.displayName, content: reply, senderIsUser: false, drink: drink})
    }

    return (
        <>
            <MessageHeader headerText={selectedBartender ? selectedBartender.profile.displayName : "Nickname"} />
            <MessagingControls onSendMessage={handleSendMessage}/>
        </>
    );
}