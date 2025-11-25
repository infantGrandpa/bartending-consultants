import {Flex} from "@radix-ui/themes";
import {useDevSettings} from "../../../providers/DevSettingsProvider";
import {LabelledSwitch} from "../../blocks/LabelledSwitch.tsx";


export default function DevControls() {
    const {settings, updateSetting} = useDevSettings();

    return (
        <Flex direction="column" gap="3" p="3">
            <LabelledSwitch
                checked={settings.isDevMode}
                onCheckedChange={() => updateSetting('isDevMode', !settings.isDevMode)}
                label={"Enable Dev Mode"}
            />
            <LabelledSwitch
                checked={settings.useDummyMessages}
                onCheckedChange={() => updateSetting('useDummyMessages', !settings.useDummyMessages)}
                label={"Use Dummy Messages"}
                disabled={!settings.isDevMode}
            />
            <LabelledSwitch
                checked={settings.playDummyAudio}
                onCheckedChange={() => updateSetting('playDummyAudio', !settings.playDummyAudio)}
                label={"Play Dummy Audio"}
                disabled={!settings.isDevMode}
            />
            <LabelledSwitch
                checked={settings.showVariableTable}
                onCheckedChange={() => updateSetting('showVariableTable', !settings.showVariableTable)}
                label={"Show Variable Table"}
                disabled={!settings.isDevMode}
            />
            <LabelledSwitch
                checked={settings.useDummyStt}
                onCheckedChange={() => updateSetting('useDummyStt', !settings.useDummyStt)}
                label={"Use Dummy Speech to Text"}
                disabled={!settings.isDevMode}
            />
        </Flex>
    )
}