import {Avatar, Card, Flex, Text} from "@radix-ui/themes";
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
            maxWidth={{initial: "95%", md: "60%"}}
            style={{alignSelf: onLeftSide ? "start" : "end"}}
            justify={"end"}
        >
            {bartender ?
                <Avatar
                    src={bartender.profile.imagePath}
                    fallback={bartender.profile.firstName.charAt(0)}
                    radius="full"
                /> : null
            }
            <Card>
                <Text as="div" size="2" color="gray" align={onLeftSide ? "left" : "right"}>{message.content}</Text>
            </Card>
        </Flex>
    );
}