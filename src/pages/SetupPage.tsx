import ApiKeysSetup from "../components/settings/ApiKeysSetup.tsx";
import Header from "../components/blocks/Header.tsx";

export default function SetupPage() {
    return (
        <>
            <Header headerText="Enter API Keys"/>
            <ApiKeysSetup/>
        </>

    )
}