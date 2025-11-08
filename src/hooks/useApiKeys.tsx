import {createContext, useContext, useState, useEffect, type ReactNode} from "react";

interface ApiKeyContextType {
    openaiKey: string;
    elevenLabsKey: string;
    setOpenaiKey: (key: string) => void;
    setElevenLabsKey: (key: string) => void;
    saveApiKeys: (openaiKey: string, elevenLabsKey: string) => void;
    clearApiKeys: () => void;
    areKeysSaved: boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({children}: { children: ReactNode }) => {
    const [openaiKey, setOpenaiKey] = useState<string>("");
    const [elevenLabsKey, setElevenLabsKey] = useState<string>("");
    const [areKeysSaved, setAreKeysSaved] = useState<boolean>(false);


    useEffect(() => {
        const storedOpenAI = localStorage.getItem("openaiApiKey") || "";
        const storedEleven = localStorage.getItem("elevenLabsApiKey") || "";

        setOpenaiKey(storedOpenAI);
        setElevenLabsKey(storedEleven);
        setAreKeysSaved(Boolean(storedOpenAI && storedEleven))
    }, []);

    useEffect(() => {
        console.log(`openaiKey: ${openaiKey}`);
        console.log(`elevenLabsKey: ${elevenLabsKey}`);
    }, [openaiKey, elevenLabsKey]);

    const saveApiKeys = (newOpenAiKey: string, newElevenLabsKey: string) => {
        console.log("Saving API Keys...");
        if (newOpenAiKey) {
            localStorage.setItem("openaiApiKey", openaiKey);
            setOpenaiKey(newOpenAiKey);
        }

        if (newElevenLabsKey) {
            localStorage.setItem("elevenLabsApiKey", newElevenLabsKey);
            setElevenLabsKey(newElevenLabsKey);
        }

        setAreKeysSaved(true);
        console.log(`OpenAI Key: ${openaiKey}`);
        console.log(`ElevenLabs Key: ${elevenLabsKey}`);
    }

    const clearApiKeys = () => {
        console.log("Clearing API Keys...")
        localStorage.removeItem("openaiApiKey");
        localStorage.removeItem("elevenLabsApiKey");

        setOpenaiKey("");
        setElevenLabsKey("");

        setAreKeysSaved(false);
    }

    useEffect(() => {
        if (openaiKey) localStorage.setItem("openaiApiKey", openaiKey);
        if (elevenLabsKey) localStorage.setItem("elevenLabsApiKey", elevenLabsKey);
    }, [openaiKey, elevenLabsKey]);

    return (
        <ApiKeyContext.Provider
            value={{openaiKey, elevenLabsKey, setOpenaiKey, setElevenLabsKey, saveApiKeys, clearApiKeys, areKeysSaved}}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKeys = () => {
    const context: ApiKeyContextType | undefined = useContext(ApiKeyContext);
    if (!context) throw new Error("useApiKeys must be used within an ApiKeyProvider");
    return context;
};
