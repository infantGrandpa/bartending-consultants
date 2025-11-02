import type {Personality} from "../utils/personalities.ts";
import {createContext, type ReactNode, useContext, useState} from "react";


interface PersonalityContextType {
    selectedPersonality: Personality | null;
    setSelectedPersonality: (personality: Personality) => void;
}

const PersonalityContext = createContext<PersonalityContextType | undefined>(undefined);

export function PersonalityProvider({ children }: { children: ReactNode }) {
    const [selectedPersonality, setSelectedPersonality] = useState<Personality | null>(null);

    return (
        <PersonalityContext.Provider value={{ selectedPersonality, setSelectedPersonality }}>
            {children}
        </PersonalityContext.Provider>
    );
}

export function usePersonality() {
    const context = useContext(PersonalityContext);
    if (context === undefined) {
        throw new Error('usePersonality must be used within a PersonalityProvider');
    }
    return context;
}