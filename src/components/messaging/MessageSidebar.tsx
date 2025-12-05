import {Box, Card, Flex, IconButton} from "@radix-ui/themes";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";


export default function MessageSidebar() {
    const {closeSidebar} = useMessageSidebar();

    return (
        <Box
            position="fixed"
            height="100%"
            width="80%"
            top="0"
            right="0"
            style={{
                zIndex: "2"
            }}>
            <Card style={{height: "100%"}}>
                <Flex direction="row" width="100%">
                    <IconButton variant="ghost" onClick={closeSidebar}>
                        <i className="fa-solid fa-martini-glass"></i>
                    </IconButton>

                </Flex>
            </Card>

        </Box>
    )
}