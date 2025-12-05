import {createContext, type ReactNode, useContext, useState} from "react";

interface SidebarContextType {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>(
    {
        isSidebarOpen: false,
        openSidebar: () => {},
        closeSidebar: () => {}
    }
)

export function MessageSidebarProvider({children}: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const handleOpen = () => {
        console.log("Opening...");
        console.log(`isSidebarOpen: ${isSidebarOpen}`)
        setIsSidebarOpen(true);
    }

    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen: isSidebarOpen,
                openSidebar: () => handleOpen(),
                closeSidebar: () => setIsSidebarOpen(false)
            }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useMessageSidebar() {
    const context: SidebarContextType = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a MessageSidebarProvider');
    }
    return context;
}