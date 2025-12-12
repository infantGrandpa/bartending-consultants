import {AlertDialog, Button, Flex, IconButton, Text} from "@radix-ui/themes";
import type {Conversation} from "../../types/conversations.ts";

interface Props {
    onClear: () => void;
    conversation: Conversation;
}

export default function ExitChatAlert({onClear, conversation}: Props) {
    const handleExitOnEmptyConversation = () => {
        if (!conversation.conversationId || conversation.messages.length === 0) {
            onClear();
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <IconButton variant="ghost" style={{paddingLeft: "8px"}} onClick={handleExitOnEmptyConversation}>
                    <i className="fa-solid fa-chevron-left"></i>
                </IconButton>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Title>Clear Chat History</AlertDialog.Title>
                <AlertDialog.Description>
                    Returning to the bartender selection page will clear your chat and drink history.
                </AlertDialog.Description>
                <Text mt="2" as="p">This cannot be undone.</Text>
                <Flex direction="row" justify={{initial: "between", md: "end"}} gap="3" mt="4">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red" onClick={onClear}>
                            Clear History
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>

        </AlertDialog.Root>
    )
}