import {Dialog, Flex, IconButton, VisuallyHidden} from "@radix-ui/themes";
import DrinkDetails from "../DrinkDetails.tsx";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";


export default function MessageSidebar() {
    const {isSidebarOpen, openSidebar, closeSidebar} = useMessageSidebar();

    return (
        <Dialog.Root open={isSidebarOpen}>
            <Dialog.Trigger>
                <IconButton variant="ghost" onClick={openSidebar}>
                    <i className="fa-solid fa-martini-glass"></i>
                </IconButton>
            </Dialog.Trigger>

            <Dialog.Content
                width="90%"
                height="100%"
                style={{
                    position: "fixed",
                    top: "0",
                    right: "0",
                    padding: "var(--space-4)"
                }}
                aria-describedby={undefined}
                onPointerDownOutside={closeSidebar}
            >
                <VisuallyHidden>
                    <Dialog.Title>
                        Drink Details
                    </Dialog.Title>
                </VisuallyHidden>

                <Flex direction="row" width="100%" justify="between" align="center" pb="2">
                    <Dialog.Close>
                        <IconButton variant="ghost" onClick={closeSidebar}>
                            <i className="fa-solid fa-martini-glass"></i>
                        </IconButton>
                    </Dialog.Close>
                    <Flex direction="row" gap="2">
                        <IconButton size="1" variant="soft">
                            <i className="fa-solid fa-chevron-left"></i>
                        </IconButton>
                        <IconButton size="1" variant="soft">
                            <i className="fa-solid fa-chevron-right"></i>
                        </IconButton>
                    </Flex>
                </Flex>
                <DrinkDetails/>
            </Dialog.Content>
        </Dialog.Root>
    )
}