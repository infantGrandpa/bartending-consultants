import {Flex, Table} from "@radix-ui/themes";
import {useApiKeys} from "../../../providers/ApiKeyProvider.tsx";
import {useDevSettings} from "../../../providers/DevSettingsProvider.tsx";
import DevModeDataRow from "./DevModeDataRow.tsx";


export default function DevModeDetails() {
    const {settings} = useDevSettings();
    const {openaiKey, elevenLabsKey, azureKeys} = useApiKeys();

    if (!settings.showVariableTable) {
        return;
    }

    return (
        <Flex direction="column" gap="3">
            <Table.Root variant="surface" layout="fixed" size="1">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Variable</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <DevModeDataRow labelText={"Use Dummy Messages"} value={String(settings.useDummyMessages)} />
                    <DevModeDataRow labelText={"Play Dummy Audio"} value={String(settings.playDummyAudio)} />
                    <DevModeDataRow labelText={"Use Dummy Speech to Text"} value={String(settings.useDummyStt)} />
                    <DevModeDataRow labelText={"Open AI API Key"} value={openaiKey} />
                    <DevModeDataRow labelText={"ElevenLabs API Key"} value={elevenLabsKey} />
                    <DevModeDataRow labelText={"Azure Speech Key"} value={azureKeys.speechKey} />
                    <DevModeDataRow labelText={"Azure Region"} value={azureKeys.region} />
                    <DevModeDataRow labelText={"Azure Endpoint"} value={azureKeys.endpoint} />
                </Table.Body>
            </Table.Root>
        </Flex>
    )
}
