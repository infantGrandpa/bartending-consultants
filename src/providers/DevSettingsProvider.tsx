import {createContext, useContext, useState, type ReactNode, useEffect} from 'react';

interface DevSettingsContextValue {
    isDevMode: boolean;
    saveIsDevMode: (value: boolean) => void;
}

const DevSettingsContext = createContext<DevSettingsContextValue | undefined>(undefined);

export function DevSettingsProvider({children}: {children: ReactNode}) {
    const [isDevMode, setIsDevMode] = useState<boolean>(false);

    useEffect(() => {
        const storedDevMode: string = localStorage.getItem("isDevMode") || String(false);
        setIsDevMode(storedDevMode === "true");
    }, []);

    const saveIsDevMode = (newIsDevMode: boolean) => {
        localStorage.setItem("isDevMode", String(newIsDevMode));
        setIsDevMode(newIsDevMode);
    }

    return (
        <DevSettingsContext.Provider value={{isDevMode, saveIsDevMode}}>
            {children}
        </DevSettingsContext.Provider>
    );
}

export function useDevSettings() {
    const context = useContext(DevSettingsContext);
    if (context === undefined) {
        throw new Error('useDevSettings must be used within a DevSettingsProvider');
    }
    return context;
}