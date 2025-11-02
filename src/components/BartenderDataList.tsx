import {DataList} from "@radix-ui/themes";
import {useBartender} from "../providers/BartenderProvider.tsx";

export default function BartenderDataList() {
    const {selectedBartender} = useBartender();

    return (
        <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Name</DataList.Label>
                <DataList.Value>{selectedBartender?.profile.firstName}</DataList.Value>
            </DataList.Item>

        </DataList.Root>
    )
}