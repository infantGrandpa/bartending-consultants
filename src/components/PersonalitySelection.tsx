import {PERSONALITIES, type Personality} from "../utils/personalities.ts";
import {useState} from "react";

interface Props {
    onSelect?: (personality: Personality) => void;
}

export default function PersonalitySelection({onSelect}: Props) {
    const [selectedKey, setSelectedKey] = useState<string | null>(null);

    const handleSelect = (key: string | keyof typeof PERSONALITIES) => {
        const convertedKey: keyof typeof PERSONALITIES = key as keyof typeof PERSONALITIES;
        setSelectedKey(key);
        if (onSelect) onSelect(PERSONALITIES[convertedKey]);
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Choose Your Bartender:</h2>
            <div className="flex gap-4">
                {Object.values(PERSONALITIES).map((p) => (
                    <button
                        key={p.key}
                        onClick={() => handleSelect(p.key)}
                        data-personality={p.key}
                        className={`personality-button bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold flex-1 border-2 border-transparent ${
                            selectedKey === p.key
                                ? "border-blue-500"
                                : ""
                        }`}
                    >
                        {p.displayName}
                    </button>
                ))}
            </div>
        </div>
    );
}