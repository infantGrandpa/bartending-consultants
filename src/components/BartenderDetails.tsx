import {Card, Heading, Inset} from "@radix-ui/themes";
import {usePersonality} from "../providers/PersonalityProvider.tsx";

export default function BartenderDetails() {
    const {selectedPersonality} = usePersonality();

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = selectedPersonality?.imagePath ?? placeholderImageUrl;


    return (
        <Card>
            <Inset clip="padding-box" side="top" pb="current">
                <img
                    src={imageUrl}
                    alt={`${selectedPersonality?.displayName} Bartender`}
                    style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        backgroundColor: "var(--gray-5)",
                    }}
                />
            </Inset>
            <Heading as="h3" size="4">{selectedPersonality?.displayName}</Heading>
        </Card>
    );
}