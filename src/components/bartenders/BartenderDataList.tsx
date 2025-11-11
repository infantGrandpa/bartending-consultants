import {DataList} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";

export default function BartenderDataList() {
    const {selectedBartender} = useBartender();

    const profile = selectedBartender?.profile;

    return (
        <DataList.Root size="1" mt="1" style={{gap: "0.5rem"}}>
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