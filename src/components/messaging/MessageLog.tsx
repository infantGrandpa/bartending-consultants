import {Flex, ScrollArea} from "@radix-ui/themes";
import Message from "./Message.tsx";

export default function MessageLog() {
    const numberOfMessages: number = 15;

    return (
        <ScrollArea scrollbars="vertical">
            <Flex direction="column" gap="3">
                {Array.from({ length: numberOfMessages }).map((_, index) => (
                    <Message message={"Hello my name is Kevin"} sender={"Kevin"} onLeftSide={index % 2 === 0}/>
                ))}
            </Flex>
        </ScrollArea>
    );
}