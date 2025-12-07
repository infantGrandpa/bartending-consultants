import {Avatar, Badge, Card, Flex, Heading, Text} from "@radix-ui/themes";
import type {Bartender} from "../../types/bartenders.ts";

interface Props {
    bartender: Bartender;
}

export default function BartenderCard({bartender}: Props) {
    const profile = bartender.profile;

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = profile.imagePath ?? placeholderImageUrl;


    return (
        <Card style={{flexGrow: "1"}}>
            <Flex direction="column" gap="3" height="100%">
                <Flex direction="row" gap="3">
                    <Avatar size="7" radius="small" src={imageUrl} fallback={profile.firstName.charAt(0)}/>
                    <Flex direction="column" height="100%" justify="between">
                        <Heading as="h3" size="5">{profile.displayName}</Heading>
                        <Flex direction="column" gap="1">
                            <Text size="1">{profile.firstName}, {profile.age}</Text>
                            <Text size="1">{profile.hometown}</Text>
                            <Text size="1">{profile.pronouns}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Text as="p" size="2" style={{flexGrow: "1"}}>{profile.aboutMe}</Text>
                <Flex direction="row" gap="2">
                    {bartender.descriptors?.map((descriptor, index) =>
                        <Badge key={index} color="gray">{descriptor}</Badge>
                    )}
                </Flex>
            </Flex>
        </Card>
    );
}