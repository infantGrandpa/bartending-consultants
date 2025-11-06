import MessageArea from "./MessageArea.tsx";
import MessageInput from "./MessageInput.tsx";
import {Container, Em, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useState} from "react";
import {getSystemPrompt} from "../../utils/bartenders.ts";
import {createConversation} from "../../api/openai.ts";

export default function MessagingPanel() {
    const {selectedBartender} = useBartender();
    const [conversationId, setConversationId] = useState<string | null>(null);

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

        console.log(`Bartender Selected: ${selectedBartender.profile.displayName}`)
        console.log(`Message: ${message}`)
    }

    return (
        <Container gridColumn="span 2">
            <MessageArea />
            <MessageInput onSendMessage={handleSendMessage}/>
            <Text as="p" size={"1"} align="right" style={{
                paddingTop: "0.25rem",
                color: "gray",
                fontSize: "0.7rem"
            }}><Em>ID: {conversationId}</Em></Text>
        </Container>
    );
}