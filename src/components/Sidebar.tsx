import PersonalitySelection from "./PersonalitySelection";
import ApiKeysPanel from "./ApiKeys";
import {Flex} from "@radix-ui/themes";
import BartenderDetails from "./BartenderDetails.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" m="4">
            <PersonalitySelection />
            <BartenderDetails />
            <ApiKeysPanel />
        </Flex>
    );
}