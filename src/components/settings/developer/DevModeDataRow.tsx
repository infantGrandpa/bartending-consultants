import {Table, Text} from "@radix-ui/themes";

interface Props {
    labelText: string;
    value: string;
}

export default function DevModeDataRow({labelText, value}: Props) {
    return (
        <Table.Row>
            <Table.RowHeaderCell>{labelText}</Table.RowHeaderCell>
            <Table.Cell>
                <Text wrap="nowrap" truncate={true}>
                    {value}
                </Text>
            </Table.Cell>
        </Table.Row>
    )
}