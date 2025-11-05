import {DataList} from "@radix-ui/themes";
import {useBartender} from "../providers/BartenderProvider.tsx";

export default function BartenderDataList() {
    const {selectedBartender} = useBartender();

    const profile = selectedBartender?.profile;

    return (
        <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Name</DataList.Label>
                <DataList.Value>{profile?.firstName}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Age</DataList.Label>
                <DataList.Value>{profile?.age}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Hometown</DataList.Label>
                <DataList.Value>{profile?.hometown}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Pronouns</DataList.Label>
                <DataList.Value>{profile?.pronouns}</DataList.Value>
            </DataList.Item>
        </DataList.Root>
    )
}