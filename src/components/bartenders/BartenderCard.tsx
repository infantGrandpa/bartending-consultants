import {Box, Card, Flex, Heading, Inset, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import BartenderDataList from "./BartenderDataList.tsx";

export default function BartenderCard() {
    const {selectedBartender} = useBartender();

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = selectedBartender?.profile.imagePath ?? placeholderImageUrl;

    //TODO: Fix bug where the image disappears on small screens
    return (
        <Card>
            <Flex>
                <Inset side="left" clip="padding-box" pr="current">
                    <img
                        src={imageUrl}
                        alt={`${selectedBartender?.profile.displayName} Bartender`}
                        style={{
                            objectFit: "cover",
                            height: "100%"
                        }}
                    />
                </Inset>
                <Box minWidth="350px">
                    <Heading as="h3" size="4">{selectedBartender?.profile.displayName}</Heading>
                    <BartenderDataList/>
                    <Text as="p" size="2" mt={"3"}>{selectedBartender?.profile.aboutMe}</Text>
                </Box>
            </Flex>
        </Card>
    );
}