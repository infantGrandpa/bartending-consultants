import {Box, Card, Flex, Heading, Inset, Text} from "@radix-ui/themes";
import {useBartender} from "../providers/BartenderProvider.tsx";
import BartenderDataList from "./BartenderDataList.tsx";

export default function BartenderCard() {
    const {selectedBartender} = useBartender();

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = selectedBartender?.profile.imagePath ?? placeholderImageUrl;


    return (
        <Card>
            <Flex>
                <Inset side="left" clip="padding-box" pr="current">
                    <img
                        src={imageUrl}
                        alt={`${selectedBartender?.profile.displayName} Bartender`}
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <Box>
                    <Heading as="h3" size="4">{selectedBartender?.profile.displayName}</Heading>
                    <BartenderDataList/>
                    <Text as="p">{selectedBartender?.profile.aboutMe}</Text>
                </Box>
            </Flex>
        </Card>
    );
}