// src/components/App.tsx
import Sidebar from "./components/Sidebar";
import MessagingPanel from "./components/MessagingPanel";

export default function App() {
    return (
        <div className="grid grid-cols-3 min-h-screen">
            <Sidebar />
            <MessagingPanel />
        </div>
    );
}
