import PersonalitySelection from "./PersonalitySelection";
import ApiKeysPanel from "./ApiKeys";
import {Flex} from "@radix-ui/themes";

export default function Sidebar() {
    return (
        <Flex direction="column" m="4">
            <PersonalitySelection />
            <ApiKeysPanel />
        </Flex>
    );
}