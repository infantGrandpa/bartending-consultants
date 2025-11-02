import type {Bartender} from "../utils/bartenders.ts";
import {createContext, type ReactNode, useContext, useState} from "react";


interface BartenderContextType {
    selectedBartender: Bartender | null;
    setSelectedBartender: (personality: Bartender) => void;
}

const PersonalityContext = createContext<BartenderContextType | undefined>(undefined);

export function BartenderProvider({ children }: { children: ReactNode }) {
    const [selectedBartender, setSelectedBartender] = useState<Bartender | null>(null);

    return (
        <PersonalityContext.Provider value={{ selectedBartender: selectedBartender, setSelectedBartender: setSelectedBartender }}>
            {children}
        </PersonalityContext.Provider>
    );
}

export function useBartender() {
    const context = useContext(PersonalityContext);
    if (context === undefined) {
        throw new Error('usePersonality must be used within a PersonalityProvider');
    }
    return context;
}