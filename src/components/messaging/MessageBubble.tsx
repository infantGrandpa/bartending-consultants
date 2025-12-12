import {Avatar, Button, Card, Flex, Text} from "@radix-ui/themes";
import type {Message} from "../../types/conversations.ts";
import type {Bartender} from "../../types/bartenders.ts";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";


interface Props {
    message: Message
}

export default function MessageBubble({message}: Props) {
    const {openSidebar, setCurrentDrink} = useMessageSidebar();
    const bartender: Bartender | undefined = message.sendingBartender;

    const onLeftSide: boolean = Boolean(bartender);

    const openSidebarOnDrink = () => {
        setCurrentDrink(message.drink);
        openSidebar();
    }

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
            <Flex direction="column" gap="2" align="end">
                <Card>
                    <Text as="div" size="2" color="gray" align={onLeftSide ? "left" : "right"}>{message.content}</Text>
                </Card>
                {message.drink ?
                    <Button size={"1"} variant="soft" style={{width: "fit-content"}}
                            onClick={() => openSidebarOnDrink()}>
                        {message.drink.name}
                        <i className="fa-solid fa-chevron-right fa-xs"></i>
                    </Button> : null
                }
            </Flex>
        </Flex>
    );
}