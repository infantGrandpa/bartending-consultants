import {Card, Flex, Text} from "@radix-ui/themes";
import type {Message} from "../../types/conversations.ts";
import type {Bartender} from "../../types/bartenders.ts";


interface Props {
    message: Message
}

export default function MessageBubble({message}: Props) {
    const bartender: Bartender | undefined = message.sendingBartender;

    const onLeftSide: boolean = Boolean(bartender);

    return (
        <Flex
            direction="row"
            gap="2"
            minWidth={"40%"}
            maxWidth={{initial: "80%", md: "60%"}}
            style={{alignSelf: onLeftSide ? "start" : "end"}}
            justify={"end"}
        >
            <Card>
                <Text as="div" size="2" color="gray" align={onLeftSide ? "left" : "right"}>{message.content}</Text>
            </Card>
        </Flex>
    );
}