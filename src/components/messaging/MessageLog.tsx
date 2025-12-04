import {Flex, ScrollArea} from "@radix-ui/themes";
import MessageBubble from "./MessageBubble.tsx";
import type {Conversation, Message} from "../../types/conversations.ts";

interface Props {
    conversation: Conversation
}

export default function MessageLog({conversation}:Props) {
    return (
        <ScrollArea scrollbars="vertical" mt="9" style={{height: "700px"}}>
            <Flex direction="column" gap="3">
                {conversation.messages.map((thisMessage: Message, index) => (
                    <MessageBubble message={thisMessage} key={index}/>
                ))}
            </Flex>
        </ScrollArea>
    );
}