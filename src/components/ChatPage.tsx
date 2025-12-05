import MessagingPanel from "./messaging/MessagingPanel.tsx";
import Sidebar from "./Sidebar.tsx";
import {Box, Grid} from "@radix-ui/themes";
import {MessageSidebarProvider} from "../providers/MessageSidebarProvider.tsx";


export default function ChatPage() {
    return (
        <Grid columns={{initial: "1", md: "3"}} gap="4">
            <MessageSidebarProvider>
                <MessagingPanel/>
                <Box display={{initial: "none", md: "block"}}>
                    <Sidebar/>
                </Box>
            </MessageSidebarProvider>
        </Grid>
    )
}