import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';

interface DevSettings {
    isDevMode: boolean;
    useDummyMessages: boolean;
    playDummyAudio: boolean;
}

interface DevSettingsContextValue {
    settings: DevSettings;
    updateSetting: <K extends keyof DevSettings>(key: K, value: DevSettings[K]) => void;
}

const DevSettingsContext = createContext<DevSettingsContextValue | undefined>(undefined);

const defaultSettings: DevSettings = {
    isDevMode: false,
    useDummyMessages: false,
    playDummyAudio: false,
};

export function DevSettingsProvider({children}: { children: ReactNode }) {
    const [settings, setSettings] = useState<DevSettings>(defaultSettings);

    useEffect(() => {
        const storedSettings: DevSettings = {
            isDevMode: localStorage.getItem("isDevMode") === "true",
            useDummyMessages: localStorage.getItem("useDummyMessages") === "true",
            playDummyAudio: localStorage.getItem("playDummyAudio") === "true"
        }

        setSettings(storedSettings);
    }, []);

    const updateSetting = <K extends keyof DevSettings>(key: K, value: DevSettings[K]) => {
        localStorage.setItem(key, String(value));

        setSettings(previousSettings => {
            return {...previousSettings, [key]: value};
        })
    }

    // Ensure child settings are only true if dev mode is enabled
    const actualSettings: DevSettings = {
        isDevMode: settings.isDevMode,
        useDummyMessages: settings.isDevMode && settings.useDummyMessages,
        playDummyAudio: settings.isDevMode && settings.playDummyAudio
    }

    return (
        <DevSettingsContext.Provider value={{
            settings: actualSettings,
            updateSetting
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