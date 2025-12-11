import {Avatar, Badge, Flex, Quote, Text} from "@radix-ui/themes";
import {getRandomBartenderUserPrompts, getRandomGenericUserPrompts} from "../../types/userPrompts.ts";
import type {Bartender} from "../../types/bartenders.ts";

interface Props {
    bartender: Bartender;
}

export default function UserPrompts({bartender}: Props) {
    const bartenderPrompts = getRandomBartenderUserPrompts( bartender, 1);

    const userPromptCount = bartenderPrompts ? 2 : 3;
    const userPrompts = getRandomGenericUserPrompts(userPromptCount);
    return (
        <Flex direction="column" justify="between" align="center" gap="4" p="3">
            <Avatar
                src={bartender.profile.imagePath}
                fallback={bartender.profile.firstName.charAt(0)}
                size="8"
                radius="full"
            />
            {bartenderPrompts && bartenderPrompts.map((thisPrompt: string, index: number)=> (
                <Text size="3" key={index} align="center">
                    <Quote>{thisPrompt}</Quote>
                </Text>
            ))}


            {userPrompts.map((thisPrompt: string, index: number)=> (
                <Badge key={index} size="3" variant="soft" radius="large" asChild>
                    <Text wrap="wrap" align="center">{thisPrompt}</Text>
                </Badge>
            ))}
        </Flex>
    );
}