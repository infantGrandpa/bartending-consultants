import BartenderSelection from "./bartenders/BartenderSelection.tsx";
import ApiKeysCard from "./settings/ApiKeysCard.tsx";
import {Box, Flex} from "@radix-ui/themes";
import BartenderCard from "./bartenders/BartenderCard.tsx";
import DrinkDetails from "./DrinkDetails.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" pl="4" justify="between" style={{
            borderLeft: "solid 1px rgba(128,128,128,0.25)"
        }}>
            <Box>
                <BartenderSelection />
                <BartenderCard />
            </Box>
            <DrinkDetails />
            <ApiKeysCard />
        </Flex>
    );
}