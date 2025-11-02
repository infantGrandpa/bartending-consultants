import {PERSONALITIES} from "../utils/personalities.ts";
import {Button, Flex} from "@radix-ui/themes";
import {usePersonality} from "../providers/PersonalityProvider.tsx";

export default function PersonalitySelection() {
    const {selectedPersonality, setSelectedPersonality} = usePersonality();

    const handleSelect = (key: string | keyof typeof PERSONALITIES) => {
        const convertedKey: keyof typeof PERSONALITIES = key as keyof typeof PERSONALITIES;
        setSelectedPersonality(PERSONALITIES[convertedKey]);
    };

    return (
        <Flex justify="between" gap="3">
            {Object.values(PERSONALITIES).map((p) => (
                <Button
                    key={p.key}
                    onClick={() => handleSelect(p.key)}
                    data-personality={p.key}
                    variant={p == selectedPersonality ? "solid" : "outline"}
                >
                    {p.displayName}
                </Button>
            ))}
        </Flex>
    );
}
