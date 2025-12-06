import ApiKeysSetup from "../components/settings/ApiKeysSetup.tsx";
import {Box} from "@radix-ui/themes";
import Header from "../components/blocks/Header.tsx";

export default function SetupPage() {
    return (
        <>
            <Header headerText="Enter API Keys"/>
            <Box pt="9">
                <ApiKeysSetup/>
            </Box>
        </>

    )
}