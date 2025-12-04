import {Card, Text} from "@radix-ui/themes";
import type {Message} from "../../types/conversations.ts";


interface Props {
    message: Message
}

export default function MessageBubble({message}: Props) {
    const bartender = message.sendingBartender;

    const onLeftSide: boolean = Boolean(bartender);
    const sender: string = bartender ? bartender.profile.displayName : "You"

    return (
        <Card style={{minWidth: "40%", maxWidth: "60%", alignSelf: onLeftSide ? "start" : "end"}}>
            <Text as="div" size="2" weight="bold" align={onLeftSide ? "left" : "right"}>{sender}</Text>
            <Text as="div" size="2" color="gray" align={onLeftSide ? "left" : "right"}>{message.content}</Text>
        </Card>
    );
}