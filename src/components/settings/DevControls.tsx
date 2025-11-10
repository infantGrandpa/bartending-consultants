import {Flex, Switch, Text} from "@radix-ui/themes";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";


export default function DevControls() {
    const {
        isDevMode,
        saveIsDevMode,
        useDummyMessages,
        saveUseDummyMessages,
        playDummyAudio,
        savePlayDummyAudio
    } = useDevSettings();

    return (
        <Flex direction="column" gap="3" p="3">
            <Text as="label" size="3">
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={isDevMode}
                        onClick={() => saveIsDevMode(!isDevMode)}
                    />
                    Dev Mode
                </Flex>
            </Text>
            {isDevMode &&
                <>
                    <Text as="label" size="3">
                        <Flex gap="2">
                            <Switch
                                size="2"
                                checked={useDummyMessages}
                                onClick={() => saveUseDummyMessages(!useDummyMessages)}
                            />
                            Use Dummy Messages
                        </Flex>
                    </Text>
                    <Text as="label" size="3">
                        <Flex gap="2">
                            <Switch
                                size="2"
                                checked={playDummyAudio}
                                onClick={() => savePlayDummyAudio(!playDummyAudio)}
                            />
                            Play Dummy Audio
                        </Flex>
                    </Text>
                </>
            }
        </Flex>
    )
}