import MessagingPanel from "./messaging/MessagingPanel.tsx";
import Sidebar from "./Sidebar.tsx";
import {Box, Grid} from "@radix-ui/themes";


export default function ChatPage() {
    return (
        <Grid columns={{initial: "1", md: "3"}} gap="4">
            <MessagingPanel/>
            <Box display={{initial: "none", md: "block"}}>
                <Sidebar/>
            </Box>
        </Grid>
    )
}