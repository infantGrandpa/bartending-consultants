import {createContext, type ReactNode, useContext, useEffect, useState} from "react";

interface ApiKeyContextType {
    openaiKey: string;
    elevenLabsKey: string;
    azureKeys: AzureSttKeys;
    saveApiKeys: (openaiKey: string, elevenLabsKey: string, azureKeys: AzureSttKeys) => void;
    clearApiKeys: () => void;
    areKeysSaved: () => boolean;
}

export interface AzureSttKeys {
    speechKey: string;
    region: string;
    endpoint: string;
}

export const defaultAzureKeys: AzureSttKeys = {speechKey: "", region: "", endpoint: ""}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({children}: { children: ReactNode }) => {
    const [openaiKey, setOpenaiKey] = useState<string>("");
    const [elevenLabsKey, setElevenLabsKey] = useState<string>("");
    const [azureKeys, setAzureKeys] = useState<AzureSttKeys>(defaultAzureKeys);

    useEffect(() => {
        const storedOpenAI = localStorage.getItem("openaiApiKey") || "";
        const storedEleven = localStorage.getItem("elevenLabsApiKey") || "";

        const storedAzureKeys = {
            speechKey: localStorage.getItem("azureSpeechKey") || "",
            region: localStorage.getItem("azureRegion") || "",
            endpoint: localStorage.getItem("azureEndpoint") || ""
        }

        setOpenaiKey(storedOpenAI);
        setElevenLabsKey(storedEleven);
        setAzureKeys(storedAzureKeys);
    }, []);

    const saveApiKeys = (newOpenAiKey: string, newElevenLabsKey: string, newAzureKeys: AzureSttKeys) => {
        if (newOpenAiKey) {
            localStorage.setItem("openaiApiKey", openaiKey);
            setOpenaiKey(newOpenAiKey);
        }

        if (newElevenLabsKey) {
            localStorage.setItem("elevenLabsApiKey", newElevenLabsKey);
            setElevenLabsKey(newElevenLabsKey);
        }

        if (newAzureKeys.speechKey && newAzureKeys.endpoint && newAzureKeys.region) {
            localStorage.setItem("azureSpeechKey", newAzureKeys.speechKey);
            localStorage.setItem("azureRegion", newAzureKeys.region);
            localStorage.setItem("azureEndpoint", newAzureKeys.endpoint);
            setAzureKeys(newAzureKeys);
        }
    }

    const clearApiKeys = () => {
        localStorage.removeItem("openaiApiKey");
        localStorage.removeItem("elevenLabsApiKey");

        localStorage.removeItem("azureSpeechKey");
        localStorage.removeItem("azureRegion");
        localStorage.removeItem("azureEndpoint");

        setOpenaiKey("");
        setElevenLabsKey("");
        setAzureKeys(defaultAzureKeys);
    }

    const areKeysSaved = () => {
        return Boolean(openaiKey && elevenLabsKey && azureKeys.speechKey && azureKeys.region && azureKeys.endpoint);
    }

    useEffect(() => {
        if (openaiKey) localStorage.setItem("openaiApiKey", openaiKey);
        if (elevenLabsKey) localStorage.setItem("elevenLabsApiKey", elevenLabsKey);
    }, [openaiKey, elevenLabsKey]);

    return (
        <ApiKeyContext.Provider
            value={{openaiKey, elevenLabsKey, azureKeys, saveApiKeys, clearApiKeys, areKeysSaved}}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKeys = () => {
    const context: ApiKeyContextType | undefined = useContext(ApiKeyContext);
    if (!context) throw new Error("useApiKeys must be used within an ApiKeyProvider");
    return context;
};
