import {Avatar, Card, Flex, Heading, Text} from "@radix-ui/themes";
import type {Bartender} from "../../types/bartenders.ts";

interface Props {
    bartender: Bartender;
}

export default function BartenderCard({bartender}: Props) {
    const profile = bartender.profile;

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = profile.imagePath ?? placeholderImageUrl;


    return (
        <Card>
            <Flex direction="column">
                <Flex direction="row" gap="3">
                    <Avatar size="7" radius="small" src={imageUrl} fallback={profile.firstName.charAt(0)}/>
                    <Flex direction="column" gap="1">
                        <Heading as="h3" size="5">{profile.displayName}</Heading>
                        <Text size="1">{profile.firstName}, {profile.age}</Text>
                        <Text size="1">{profile.hometown}</Text>
                        <Text size="1">{profile.pronouns}</Text>
                    </Flex>
                </Flex>
                <Text as="p" size="2" mt={"3"}>{profile.aboutMe}</Text>
            </Flex>
        </Card>
    );
}