import {DataList} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";

export default function BartenderDataList() {
    const {selectedBartender} = useBartender();

    const profile = selectedBartender?.profile;

    //TODO: Figure out how to make the gap between each item smaller
    return (
        <DataList.Root size="1">
            <DataList.Item>
                <DataList.Label>Name</DataList.Label>
                <DataList.Value>{profile?.firstName}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Age</DataList.Label>
                <DataList.Value>{profile?.age}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Hometown</DataList.Label>
                <DataList.Value>{profile?.hometown}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Pronouns</DataList.Label>
                <DataList.Value>{profile?.pronouns}</DataList.Value>
            </DataList.Item>
        </DataList.Root>
    )
}