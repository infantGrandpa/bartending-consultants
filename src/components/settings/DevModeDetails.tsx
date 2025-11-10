import {Table} from "@radix-ui/themes";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";


export default function DevModeDetails() {
    const {isDevMode, useDummyMessages, playDummyAudio} = useDevSettings();
    const {openaiKey, elevenLabsKey} = useApiKeys();

    return (
        <Table.Root variant="surface" layout="fixed" size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Variable</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.RowHeaderCell>Dev Mode</Table.RowHeaderCell>
                    <Table.Cell>{String(isDevMode)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.RowHeaderCell>Use Dummy Messages</Table.RowHeaderCell>
                    <Table.Cell>{String(useDummyMessages)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.RowHeaderCell>Play Dummy Audio</Table.RowHeaderCell>
                    <Table.Cell>{String(playDummyAudio)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.RowHeaderCell>OpenAI API Key</Table.RowHeaderCell>
                    <Table.Cell>{openaiKey}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.RowHeaderCell>ElevenLabs API Key</Table.RowHeaderCell>
                    <Table.Cell>{elevenLabsKey}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    )
}
