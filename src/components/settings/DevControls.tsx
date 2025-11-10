import {Flex, Switch, Text} from "@radix-ui/themes";
import {useState} from "react";


export default function DevControls() {
    const [isDevMode, setIsDevMode] = useState<boolean>(false);

    return (
        <Flex direction="column" gap="3" p="3">
            <Text as="label" size="3">
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={isDevMode}
                        onClick={() => setIsDevMode(!isDevMode)}
                    />
                    Dev Mode
                </Flex>
            </Text>
        </Flex>
    )
}