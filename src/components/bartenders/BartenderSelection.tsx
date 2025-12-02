import {type Bartender, bartenders} from "../../types/bartenders.ts";
import {AlertDialog, Button, Flex, Text} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import {useState} from "react";
import {useConversation} from "../../providers/ConversationProvider.tsx";

export default function BartenderSelection() {
    const {selectedBartender, setSelectedBartender} = useBartender();
    const [pendingBartender, setPendingBartender] = useState<Bartender | null>(null)
    const {conversation} = useConversation()

    const handleSelect = (key: string | keyof typeof bartenders) => {
        const convertedKey: keyof typeof bartenders = key as keyof typeof bartenders;
        const bartender: Bartender =bartenders[convertedKey];

        if (selectedBartender === bartender) {
            return;
        }

        if (!selectedBartender || conversation.messages.length === 0) {
            setSelectedBartender(bartender);
            return;
        }


        setPendingBartender(bartender);
    };

    const handleConfirm = () => {
        if (pendingBartender) {
            setSelectedBartender(pendingBartender);
            setPendingBartender(null);
        }
    }

    const handleCancel = () => {
        setPendingBartender(null);
    }

    return (<>
            <AlertDialog.Root open={Boolean(pendingBartender)}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Erase Message History</AlertDialog.Title>
                    <AlertDialog.Description>
                        <Text>
                            Changing bartenders will erase your message history and drink information.
                        </Text>
                    </AlertDialog.Description>
                    <Text as="p" mt={"4"}>
                        You cannot undo this action.
                    </Text>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel onClick={handleCancel}>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={handleConfirm}>
                                Clear Message History
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

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
        </>
    );
}
