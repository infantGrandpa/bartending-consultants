import {Card, Flex, Heading, IconButton} from "@radix-ui/themes";
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
            <Card style={{padding: "8px"}}>
                <Flex direction="row" justify="between" align="center">
                    <IconButton variant="ghost" style={{paddingLeft: "8px"}}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </IconButton>
                    <Heading as="h1" size="5" style={{ lineHeight: "0" }}>
                        {selectedBartender ? selectedBartender.profile.displayName : "Nickname"}
                    </Heading>
                    <IconButton variant="ghost">
                        <i className="fa-solid fa-martini-glass"></i>
                    </IconButton>
                </Flex>
            </Card>
            <Flex position="fixed" justify="between" align="end" p="3" bottom="0" left="0" width="100%">
                <IconButton variant="soft">
                    <i className="fa-solid fa-gear"></i>
                </IconButton>
                <IconButton radius="full" variant="solid" style={{width: "64px", height: "64px"}}>
                    <i className="fa-solid fa-microphone"></i>
                </IconButton>
                <IconButton>
                    <i className="fa-regular fa-keyboard"></i>
                </IconButton>
            </Flex>
        </>
    );
}