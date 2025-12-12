import MessagingPanel from "../components/messaging/MessagingPanel.tsx";
import {MessageSidebarProvider} from "../providers/MessageSidebarProvider.tsx";


export default function ChatPage() {
    return (
        <MessageSidebarProvider>
            <MessagingPanel/>
        </MessageSidebarProvider>
    )
}