import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/messaging/MessagingPanel.tsx";
import {ApiKeyProvider} from "./hooks/useApiKeys.tsx";
import "@radix-ui/themes/styles.css";
import {Grid, Theme} from "@radix-ui/themes";
import {BartenderProvider} from "./providers/BartenderProvider.tsx";
import {Background} from "./components/Background.tsx";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%"
               panelBackground="translucent">
            <ApiKeyProvider>
                <BartenderProvider>
                    <Background />
                    <Grid columns="3" gap="4" p="6" height="100vh">
                        <Sidebar/>
                        <MessagingPanel/>
                    </Grid>
                </BartenderProvider>
            </ApiKeyProvider>
        </Theme>
    );
}
