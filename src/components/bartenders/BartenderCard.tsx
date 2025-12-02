import {Box, Card, Flex, Heading, Inset, Text} from "@radix-ui/themes";
import BartenderDataList from "./BartenderDataList.tsx";
import type {Bartender} from "../../types/bartenders.ts";

interface Props {
    bartender: Bartender;
}

export default function BartenderCard({bartender}: Props) {
    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = bartender.profile.imagePath ?? placeholderImageUrl;

    return (
        <Card>
            <Flex>
                <Inset side="left" clip="padding-box" pr="current" style={{
                    minWidth: "35%"
                }}>
                    <img
                        src={imageUrl}
                        alt={`${bartender.profile.displayName} Bartender`}
                        style={{
                            objectFit: "cover",
                            height: "100%"
                        }}
                    />
                </Inset>
                <Box minWidth="65%">
                    <Heading as="h3" size="4">{bartender.profile.displayName}</Heading>
                    <BartenderDataList/>
                    <Text as="p" size="2" mt={"3"}>{bartender.profile.aboutMe}</Text>
                </Box>
            </Flex>
        </Card>
    );
}