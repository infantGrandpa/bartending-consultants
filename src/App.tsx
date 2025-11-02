// src/components/App.tsx
import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/MessagingPanel";
import {ApiKeyProvider} from "./hooks/useApiKeys.tsx";

export default function App() {
    return (
        <ApiKeyProvider>
            <div className="grid grid-cols-3 min-h-screen">
                <Sidebar />
                <MessagingPanel />
            </div>
        </ApiKeyProvider>
    );
}
