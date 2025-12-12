import {ApiKeyProvider} from "./providers/ApiKeyProvider.tsx";
import "@radix-ui/themes/styles.css";
import {Container, Theme} from "@radix-ui/themes";
import {BartenderProvider} from "./providers/BartenderProvider.tsx";
import {DevSettingsProvider} from "./providers/DevSettingsProvider.tsx";
import {ConversationProvider} from "./providers/ConversationProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SelectionPage from "./pages/SelectionPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import SetupPage from "./pages/SetupPage.tsx";

export default function App() {
    return (
        <Theme
            accentColor="gold"
            appearance="dark"
            grayColor="mauve"
            radius="medium"
            scaling="110%"
            panelBackground="translucent"
        >
            <BrowserRouter>
                <DevSettingsProvider>
                    <ApiKeyProvider>
                        <BartenderProvider>
                            <ConversationProvider>
                                <Container size={{initial: "1", sm: "3", md: "4"}} px="3">
                                    <Routes>
                                        <Route path="/" element={<SelectionPage/>}/>
                                        <Route path="/chat" element={<ChatPage/>}/>
                                        <Route path="/setup" element={<SetupPage/>}/>
                                    </Routes>
                                </Container>
                            </ConversationProvider>
                        </BartenderProvider>
                    </ApiKeyProvider>
                </DevSettingsProvider>
            </BrowserRouter>
        </Theme>
    );
}
