import {Badge, Flex, Text} from "@radix-ui/themes";
import {getRandomUserPrompts} from "../../types/userPrompts.ts";


export default function UserPrompts() {
    const userPrompts = getRandomUserPrompts(3);

    return (
        <Flex direction="column" justify="between" align="center" my="6" gap="5" p="3">
            {userPrompts.map((thisPrompt: string, index: number)=> (
                <Badge key={index} size="3" variant="soft" asChild>
                    <Text wrap="wrap" align="center">{thisPrompt}</Text>
                </Badge>
            ))}
        </Flex>
    );
}