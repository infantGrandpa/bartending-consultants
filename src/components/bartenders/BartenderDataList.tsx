import {DataList} from "@radix-ui/themes";
import type {BartenderProfile} from "../../types/bartenders.ts";

interface Props {
    profile: BartenderProfile
}

export default function BartenderDataList({profile}: Props) {
    return (
        <DataList.Root size="1" mt="1" style={{gap: "0.5rem"}}>
            <DataList.Item>
                <DataList.Label>Name</DataList.Label>
                <DataList.Value>{profile.firstName}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Age</DataList.Label>
                <DataList.Value>{profile.age}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Hometown</DataList.Label>
                <DataList.Value>{profile.hometown}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>Pronouns</DataList.Label>
                <DataList.Value>{profile.pronouns}</DataList.Value>
            </DataList.Item>
        </DataList.Root>
    )
}