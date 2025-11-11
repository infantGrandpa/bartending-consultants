import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/messaging/MessagingPanel.tsx";
import {ApiKeyProvider} from "./providers/ApiKeyProvider.tsx";
import "@radix-ui/themes/styles.css";
import {Grid, Theme} from "@radix-ui/themes";
import {BartenderProvider} from "./providers/BartenderProvider.tsx";
import {Background} from "./components/Background.tsx";
import {DevSettingsProvider} from "./providers/DevSettingsProvider.tsx";
import {ConversationProvider} from "./providers/ConversationProvider.tsx";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%"
               panelBackground="translucent">
            <DevSettingsProvider>
                <ApiKeyProvider>
                    <BartenderProvider>
                        <ConversationProvider>
                            <Background/>
                            <Grid columns="3" gap="4" p="6" height="100vh">
                                <MessagingPanel/>
                                <Sidebar/>
                            </Grid>
                        </ConversationProvider>
                    </BartenderProvider>
                </ApiKeyProvider>
            </DevSettingsProvider>
        </Theme>
    );
}
