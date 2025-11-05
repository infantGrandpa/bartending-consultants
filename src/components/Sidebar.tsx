import BartenderSelection from "./BartenderSelection.tsx";
import ApiKeysPanel from "./ApiKeys";
import {Flex} from "@radix-ui/themes";
import BartenderCard from "./BartenderCard.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" m="4">
            <BartenderSelection />
            <BartenderCard />
            <ApiKeysPanel />
        </Flex>
    );
}