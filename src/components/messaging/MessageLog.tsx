import {Flex, ScrollArea} from "@radix-ui/themes";
import MessageBubble from "./MessageBubble.tsx";
import type {Message} from "../../types/conversations.ts";

interface Props {
    messages: Message[]
}

export default function MessageLog({messages}:Props) {
    //TODO: Change this scroll area to be the entire page; everything else should be static
    // This way we don't have to deal with the weirdness of 2 scrollbars when things go wrong.
    // For example, the Messages themselves would be scrollable, but the Input would be sticky at the bottom.
    // Take inspo from ChatGPT and Claude
    return (
        <ScrollArea scrollbars="vertical" style={{height: "700px"}}>
            <Flex direction="column" gap="3">
                {messages.map((thisMessage, index) => (
                    <MessageBubble
                        message={thisMessage.content}
                        sender={thisMessage.sender}
                        onLeftSide={!thisMessage.senderIsUser}
                        key={index}
                    />
                ))}
            </Flex>
        </ScrollArea>
    );
}