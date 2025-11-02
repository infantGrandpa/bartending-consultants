import {Card, Heading, Inset} from "@radix-ui/themes";
import {useBartender} from "../providers/BartenderProvider.tsx";
import BartenderDataList from "./BartenderDataList.tsx";

export default function BartenderDetails() {
    const {selectedBartender} = useBartender();

    const placeholderImageUrl: string = "https://placehold.co/574x861/030712/white?text=Choose+a+Bartender&font=roboto"
    const imageUrl: string = selectedBartender?.profile.imagePath ?? placeholderImageUrl;


    return (
        <Card>
            <Inset clip="padding-box" side="top" pb="current">
                <img
                    src={imageUrl}
                    alt={`${selectedBartender?.profile.displayName} Bartender`}
                    style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        backgroundColor: "var(--gray-5)",
                    }}
                />
            </Inset>
            <Heading as="h3" size="4">{selectedBartender?.profile.displayName}</Heading>
            <BartenderDataList />
        </Card>
    );
}