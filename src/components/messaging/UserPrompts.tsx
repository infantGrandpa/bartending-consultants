import {Avatar, Badge, Flex, Text} from "@radix-ui/themes";
import {getRandomUserPrompts} from "../../types/userPrompts.ts";
import type {Bartender} from "../../types/bartenders.ts";

interface Props {
    bartender: Bartender;
}

export default function UserPrompts({bartender}: Props) {
    const userPrompts = getRandomUserPrompts(3);

    return (
        <Flex direction="column" justify="between" align="center" gap="4" p="3">
            <Avatar
                src={bartender.profile.imagePath}
                fallback={bartender.profile.firstName.charAt(0)}
                size="8"
                radius="full"
            />
            {userPrompts.map((thisPrompt: string, index: number)=> (
                <Badge key={index} size="3" variant="soft" radius="large" asChild>
                    <Text wrap="wrap" align="center">{thisPrompt}</Text>
                </Badge>
            ))}
        </Flex>
    );
}