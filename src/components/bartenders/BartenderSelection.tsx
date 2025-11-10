import {bartenders} from "../../utils/bartenders.ts";
import {Button, Flex} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";

export default function BartenderSelection() {
    const {selectedBartender, setSelectedBartender} = useBartender();

    const handleSelect = (key: string | keyof typeof bartenders) => {
        const convertedKey: keyof typeof bartenders = key as keyof typeof bartenders;
        setSelectedBartender(bartenders[convertedKey]);
    };

    return (
        <Flex justify="between" gap="3" mb="4">
            {Object.values(bartenders).map((p) => (
                <Button
                    key={p.key}
                    onClick={() => handleSelect(p.key)}
                    data-personality={p.key}
                    variant={p == selectedBartender ? "solid" : "outline"}
                >
                    {p.profile.displayName}
                </Button>
            ))}
        </Flex>
    );
}
