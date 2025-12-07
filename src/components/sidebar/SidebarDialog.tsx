import {Dialog, IconButton, VisuallyHidden} from "@radix-ui/themes";
import {useMessageSidebar} from "../../providers/MessageSidebarProvider.tsx";
import DrinkDetailsSidebar from "./DrinkDetailsSidebar.tsx";


export default function SidebarDialog() {
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

                <DrinkDetailsSidebar />
            </Dialog.Content>
        </Dialog.Root>
    )
}