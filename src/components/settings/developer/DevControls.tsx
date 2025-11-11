import {Flex, Switch, Text} from "@radix-ui/themes";
import {useDevSettings} from "../../../providers/DevSettingsProvider";


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
            <Text as="label" size="3" color={isDevMode ? undefined : "gray" }>
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={useDummyMessages}
                        onClick={() => saveUseDummyMessages(!useDummyMessages)}
                        disabled={!isDevMode}
                    />
                    Use Dummy Messages
                </Flex>
            </Text>
            <Text as="label" size="3" color={isDevMode ? undefined : "gray" }>
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={playDummyAudio}
                        onClick={() => savePlayDummyAudio(!playDummyAudio)}
                        disabled={!isDevMode}
                    />
                    Play Dummy Audio
                </Flex>
            </Text>

        </Flex>
    )
}