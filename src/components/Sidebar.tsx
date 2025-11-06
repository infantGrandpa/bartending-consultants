import BartenderSelection from "./bartenders/BartenderSelection.tsx";
import ApiKeysPanel from "./settings/ApiKeys.tsx";
import {Flex} from "@radix-ui/themes";
import BartenderCard from "./bartenders/BartenderCard.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" m="4">
            <BartenderSelection />
            <BartenderCard />
            <ApiKeysPanel />
        </Flex>
    );
}