import BartenderSelection from "./bartenders/BartenderSelection.tsx";
import {Box, Flex} from "@radix-ui/themes";
import BartenderCard from "./bartenders/BartenderCard.tsx";
import DrinkDetails from "./DrinkDetails.tsx";
import Settings from "./settings/Settings.tsx";

export default function Sidebar() {
    return (
        <Flex direction="column" pl="4" justify="between" align="end" style={{
            borderLeft: "solid 1px rgba(128,128,128,0.25)"
        }}>
            <Box>
                <BartenderSelection />
                <BartenderCard />
            </Box>
            <DrinkDetails />
            <Settings />
        </Flex>
    );
}