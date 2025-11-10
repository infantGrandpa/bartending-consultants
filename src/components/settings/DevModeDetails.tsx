import {Table} from "@radix-ui/themes";
import {useApiKeys} from "../../providers/ApiKeyProvider.tsx";
import {useDevSettings} from "../../providers/DevSettingsProvider.tsx";


export default function DevModeDetails() {
    const {isDevMode} = useDevSettings();
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
