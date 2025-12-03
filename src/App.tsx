import {ApiKeyProvider} from "./providers/ApiKeyProvider.tsx";
import "@radix-ui/themes/styles.css";
import {Container, Theme} from "@radix-ui/themes";
import {BartenderProvider} from "./providers/BartenderProvider.tsx";
import {DevSettingsProvider} from "./providers/DevSettingsProvider.tsx";
import {ConversationProvider} from "./providers/ConversationProvider.tsx";
import {BrowserRouter, Route, Routes} from "react-router";
import SelectionPage from "./components/SelectionPage.tsx";
import ChatPage from "./components/ChatPage.tsx";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%"
               panelBackground="translucent">
            <BrowserRouter>
                <DevSettingsProvider>
                    <ApiKeyProvider>
                        <BartenderProvider>
                            <ConversationProvider>
                                <Container p={{initial: "3", md: "6"}}>
                                    <Routes>
                                        <Route path="/" element={<SelectionPage/>}/>
                                        <Route path="/chat" element={<ChatPage/>}/>
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
