import {createContext, useContext, useState, type ReactNode, useEffect} from 'react';

interface DevSettingsContextValue {
    isDevMode: boolean;
    saveIsDevMode: (value: boolean) => void;
    useDummyMessages: boolean;
    saveUseDummyMessages: (value: boolean) => void;
    playDummyAudio: boolean;
    savePlayDummyAudio: (value: boolean) => void;
}

const DevSettingsContext = createContext<DevSettingsContextValue | undefined>(undefined);

export function DevSettingsProvider({children}: {children: ReactNode}) {
    const [isDevMode, setIsDevMode] = useState<boolean>(false);
    const [useDummyMessages, setUseDummyMessages] = useState<boolean>(true);
    const [playDummyAudio, setPlayDummyAudio] = useState<boolean>(true);

    useEffect(() => {
        const storedDevMode: string = localStorage.getItem("isDevMode") || String(false);
        const storedDummyMessages: string = localStorage.getItem("useDummyMessages") || String(true);
        const storedDummyAudio: string = localStorage.getItem("playDummyAudio") || String(true);

        setIsDevMode(storedDevMode === "true");
        setUseDummyMessages(storedDummyMessages === "true");
        setPlayDummyAudio(storedDummyAudio === "true");
    }, []);

    const saveIsDevMode = (newIsDevMode: boolean) => {
        localStorage.setItem("isDevMode", String(newIsDevMode));
        setIsDevMode(newIsDevMode);
    }

    const saveUseDummyMessages = (newUseDummyMessages: boolean) => {
        localStorage.setItem("useDummyMessages", String(newUseDummyMessages));
        setUseDummyMessages(newUseDummyMessages);
        console.log(`Set useDummyMessages to: ${newUseDummyMessages}`)
    }

    const savePlayDummyAudio = (newPlayDummyAudio: boolean) => {
        localStorage.setItem("playDummyAudio", String(newPlayDummyAudio));
        setPlayDummyAudio(newPlayDummyAudio);
    }

    return (
        <DevSettingsContext.Provider value={{
            isDevMode,
            saveIsDevMode,
            useDummyMessages,
            saveUseDummyMessages,
            playDummyAudio,
            savePlayDummyAudio
        }}>
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