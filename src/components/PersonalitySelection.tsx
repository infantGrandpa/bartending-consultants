import {PERSONALITIES, type Personality} from "../utils/personalities.ts";
import {useState} from "react";import {Button, Flex} from "@radix-ui/themes";

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
        <Flex justify="between" gap="3">
            {Object.values(PERSONALITIES).map((p) => (
                <Button
                    key={p.key}
                    onClick={() => handleSelect(p.key)}
                    data-personality={p.key}
                    variant={p.key == selectedKey ? "solid" : "outline"}
                >
                    {p.displayName}
                </Button>
            ))}
        </Flex>
    );
}
