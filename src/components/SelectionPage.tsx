import {Flex} from "@radix-ui/themes";
import {bartenders} from "../types/bartenders.ts";
import BartenderCard from "./bartenders/BartenderCard.tsx";

export default function SelectionPage() {
    return (
        <Flex>
            {Object.values(bartenders).map((thisBartender) => (
                <BartenderCard key={thisBartender.key} bartender={thisBartender}></BartenderCard>
            ))}

        </Flex>
    )
}