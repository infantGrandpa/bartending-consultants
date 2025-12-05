import {createContext, type ReactNode, useContext, useState} from "react";
import type {Drink} from "../types/drinks.ts";

interface SidebarContextType {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    currentDrink: Drink | undefined;
    setCurrentDrink: (drink: Drink | undefined) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function MessageSidebarProvider({children}: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [currentDrink, setCurrentDrink] = useState<Drink | undefined>(undefined)


    return (
        <SidebarContext.Provider
            value={{
                isSidebarOpen: isSidebarOpen,
                openSidebar: () => setIsSidebarOpen(true),
                closeSidebar: () => setIsSidebarOpen(false),
                currentDrink,
                setCurrentDrink
            }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useMessageSidebar() {
    const context: SidebarContextType | undefined = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a MessageSidebarProvider');
    }
    return context;
}