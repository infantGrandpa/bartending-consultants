import BartenderSelection from "./bartenders/BartenderSelection.tsx";
import ApiKeysCard from "./settings/ApiKeysCard.tsx";
import {Box, Flex} from "@radix-ui/themes";
import BartenderCard from "./bartenders/BartenderCard.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" pr="4" justify="between" style={{
            borderRight: "solid 1px rgba(128,128,128,0.25)"
        }}>
            <Box>
                <BartenderSelection />
                <BartenderCard />
            </Box>
            <ApiKeysCard />
        </Flex>
    );
}