import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/messaging/MessagingPanel.tsx";
import {ApiKeyProvider} from "./hooks/useApiKeys.tsx";
import "@radix-ui/themes/styles.css";
import {Grid, Theme} from "@radix-ui/themes";
import {BartenderProvider} from "./providers/BartenderProvider.tsx";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%"
               panelBackground="translucent">
            <ApiKeyProvider>
                <BartenderProvider>
                    <Grid columns="3" gap="3">
                        <Sidebar/>
                        <MessagingPanel/>
                    </Grid>
                </BartenderProvider>
            </ApiKeyProvider>
        </Theme>
    );
}
