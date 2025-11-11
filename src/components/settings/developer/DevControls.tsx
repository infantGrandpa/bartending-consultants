import {Flex, Switch, Text} from "@radix-ui/themes";
import {useDevSettings} from "../../../providers/DevSettingsProvider";


export default function DevControls() {
    const {settings, updateSetting} = useDevSettings();

    return (
        <Flex direction="column" gap="3" p="3">
            <Text as="label" size="3">
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={settings.isDevMode}
                        onClick={() => updateSetting('isDevMode', !settings.isDevMode)}
                    />
                    Dev Mode
                </Flex>
            </Text>
            <Text as="label" size="3" color={settings.isDevMode ? undefined : "gray" }>
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={settings.useDummyMessages}
                        onClick={() => updateSetting('useDummyMessages', !settings.useDummyMessages)}
                        disabled={!settings.isDevMode}
                    />
                    Use Dummy Messages
                </Flex>
            </Text>
            <Text as="label" size="3" color={settings.isDevMode ? undefined : "gray" }>
                <Flex gap="2">
                    <Switch
                        size="2"
                        checked={settings.playDummyAudio}
                        onClick={() => updateSetting('playDummyAudio', !settings.playDummyAudio)}
                        disabled={!settings.isDevMode}
                    />
                    Play Dummy Audio
                </Flex>
            </Text>

        </Flex>
    )
}