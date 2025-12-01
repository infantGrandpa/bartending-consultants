import MessagingPanel from "./messaging/MessagingPanel.tsx";
import Sidebar from "./Sidebar.tsx";
import {Grid} from "@radix-ui/themes";


export default function ChatPage() {
    return (
        <Grid columns="3" gap="4" p="6" height="100vh">
            <MessagingPanel/>
            <Sidebar/>
        </Grid>
    )
}