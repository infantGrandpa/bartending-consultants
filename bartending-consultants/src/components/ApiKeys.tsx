import { useState, useEffect } from "react";

export default function ApiKeysPanel() {
    const [openaiKey, setOpenaiKey] = useState("");
    const [elevenLabsKey, setElevenLabsKey] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const storedOpenAI = localStorage.getItem("openaiApiKey") || "";
        const storedEleven = localStorage.getItem("elevenLabsApiKey") || "";

        if (storedOpenAI || storedEleven) {
            setOpenaiKey(storedOpenAI);
            setElevenLabsKey(storedEleven);
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, []);

    const handleSave = () => {
        if (openaiKey) localStorage.setItem("openaiApiKey", openaiKey);
        if (elevenLabsKey) localStorage.setItem("elevenLabsApiKey", elevenLabsKey);
        setIsVisible(false);
    };

    const handleClear = () => {
        localStorage.removeItem("openaiApiKey");
        localStorage.removeItem("elevenLabsApiKey");
        setOpenaiKey("");
        setElevenLabsKey("");
        setIsVisible(true);
    };

    return (
        <div className="mt-8">
            {isVisible && (
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">API Key Setup</h2>
                    <p className="text-gray-400 mb-4">
                        Enter your API keys. They’ll be stored locally in your browser.
                    </p>

                    <label htmlFor="openaiApiKeyInput" className="block mb-1">
                        OpenAI API Key
                    </label>
                    <input
                        type="password"
                        id="openaiApiKeyInput"
                        className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
                        placeholder="sk-..."
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                    />

                    <label htmlFor="elevenLabsApiKeyInput" className="block mb-1">
                        ElevenLabs API Key
                    </label>
                    <input
                        type="password"
                        id="elevenLabsApiKeyInput"
                        className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
                        placeholder="sk_..."
                        value={elevenLabsKey}
                        onChange={(e) => setElevenLabsKey(e.target.value)}
                    />

                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold w-full"
                    >
                        Save API Keys
                    </button>
                </div>
            )}

            {!isVisible && (
                <button
                    onClick={handleClear}
                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm w-full"
                >
                    Clear Stored API Keys
                </button>
            )}
        </div>
    );
}
