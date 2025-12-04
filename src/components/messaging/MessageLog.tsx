import {Box, Flex, ScrollArea} from "@radix-ui/themes";
import MessageBubble from "./MessageBubble.tsx";
import type {Conversation, Message} from "../../types/conversations.ts";
import {type RefObject, useEffect, useRef} from "react";

interface Props {
    conversation: Conversation
}

export default function MessageLog({conversation}: Props) {
    const messagesEndRef: RefObject<HTMLDivElement | null> = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [conversation.messages]);
    return (
        <Box my="9">
            <ScrollArea scrollbars="vertical" style={{height: "100%"}}>
                <Flex direction="column" gap="3">
                    {conversation.messages.map((thisMessage: Message, index) => (
                        <MessageBubble message={thisMessage} key={index}/>
                    ))}
                </Flex>
                <Box ref={messagesEndRef} width="100%" pb="5"/>
            </ScrollArea>
        </Box>
    );
}
