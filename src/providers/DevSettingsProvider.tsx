import {createContext, useContext, useState, type ReactNode} from 'react';

interface DevSettingsContextValue {
    isDevMode: boolean;
    setIsDevMode: (value: boolean) => void;
}

const DevSettingsContext = createContext<DevSettingsContextValue | undefined>(undefined);

export function DevSettingsProvider({children}: {children: ReactNode}) {
    const [isDevMode, setIsDevMode] = useState<boolean>(false);

    return (
        <DevSettingsContext.Provider value={{isDevMode, setIsDevMode}}>
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