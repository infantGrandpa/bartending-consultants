import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/MessagingPanel";
import {ApiKeyProvider} from "./hooks/useApiKeys.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function App() {
    return (
        <Theme accentColor="violet" appearance="dark" grayColor="mauve" radius="large" scaling="110%">
            <ApiKeyProvider>
                <div className="grid grid-cols-3 min-h-screen">
                    <Sidebar/>
                    <MessagingPanel/>
                </div>
            </ApiKeyProvider>
        </Theme>
    );
}
