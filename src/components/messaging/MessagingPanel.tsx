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
import MessagingControls from "./MessagingControls.tsx";
import MessageLog from "./MessageLog.tsx";
import Header from "../blocks/Header.tsx";
import {Box, Grid, IconButton} from "@radix-ui/themes";
import {useNavigate} from "react-router";
import SidebarDialog from "../sidebar/SidebarDialog.tsx";
import DrinkDetailsSidebar from "../sidebar/DrinkDetailsSidebar.tsx";
import UserPrompts from "./UserPrompts.tsx";


export default function MessagingPanel() {
    const {selectedBartender, setSelectedBartender} = useBartender();
    const {conversation, setConversationId, addMessage, clearConversation} = useConversation();
    const {openaiKey, elevenLabsKey} = useApiKeys();
    const {settings} = useDevSettings()
    let navigate = useNavigate();

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

        addMessage({content: messageContent})

        const {reply, drink} = await sendMessage(messageContent, activeConversationId);

        await speakReply(reply);

        addMessage({content: reply, sendingBartender: selectedBartender, drink: drink})
    }

    const handleReturn = () => {
        setSelectedBartender(null);
        navigate("/");
    }

    //TODO: figure out how tf to hide the sidebar dialog without breaking everything or it looking like shit

    return (
        <>
            <Header
                leftSlot={<IconButton onClick={handleReturn} variant="ghost" style={{paddingLeft: "8px"}}>
                    <i className="fa-solid fa-chevron-left"></i>
                </IconButton>}
                headerText={selectedBartender ? selectedBartender.profile.displayName : "Nickname"}
                rightSlot={<SidebarDialog/>}
            />

            <Grid columns={{initial: "8", md: "12"}} gap="4">
                <Box style={{gridColumn: "span 8"}}>
                    {conversation.messages.length === 0 ? <UserPrompts/> : <MessageLog conversation={conversation}/>}
                </Box>
                <Box display={{initial: "none", md: "block"}} style={{gridColumn: "span 4"}}>
                    <Box pl="4" position="sticky"
                         style={{insetBlockStart: "82px", borderLeft: "1px solid var(--gray-6)"}}
                    >
                        <DrinkDetailsSidebar showCloseButton={false}/>
                    </Box>
                </Box>
            </Grid>
            <MessagingControls onSendMessage={handleSendMessage}/>
        </>
    );
}