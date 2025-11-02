import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/MessagingPanel";
import {ApiKeyProvider} from "./hooks/useApiKeys.tsx";
import "@radix-ui/themes/styles.css";
import {Grid, Theme} from "@radix-ui/themes";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%"
               panelBackground="translucent">
            <ApiKeyProvider>
                <Grid columns="3" gap="3">
                    <Sidebar/>
                    <MessagingPanel/>
                </Grid>
            </ApiKeyProvider>
        </Theme>
    );
}
