import {createContext, useContext, useState, useEffect, type ReactNode} from "react";

interface ApiKeyContextType {
    openaiKey: string;
    elevenLabsKey: string;
    setOpenaiKey: (key: string) => void;
    setElevenLabsKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
    const [openaiKey, setOpenaiKey] = useState("");
    const [elevenLabsKey, setElevenLabsKey] = useState("");

    useEffect(() => {
        const storedOpenAI = localStorage.getItem("openaiApiKey") || "";
        const storedEleven = localStorage.getItem("elevenLabsApiKey") || "";

        setOpenaiKey(storedOpenAI);
        setElevenLabsKey(storedEleven);
    }, []);

    useEffect(() => {
        if (openaiKey) localStorage.setItem("openaiApiKey", openaiKey);
        if (elevenLabsKey) localStorage.setItem("elevenLabsApiKey", elevenLabsKey);
    }, [openaiKey, elevenLabsKey]);

    return (
        <ApiKeyContext.Provider value={{ openaiKey, elevenLabsKey, setOpenaiKey, setElevenLabsKey }}>
            {children}
        </ApiKeyContext.Provider>
    );
};

export const useApiKeys = () => {
    const context: ApiKeyContextType | undefined = useContext(ApiKeyContext);
    if (!context) throw new Error("useApiKeys must be used within an ApiKeyProvider");
    return context;
};
