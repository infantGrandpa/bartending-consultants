import {AlertDialog, Button, Flex, IconButton} from "@radix-ui/themes";


export default function ExitChatAlert() {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <IconButton variant="ghost" style={{paddingLeft: "8px"}}>
                    <i className="fa-solid fa-chevron-left"></i>
                </IconButton>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
                <AlertDialog.Title>Clear Chat History</AlertDialog.Title>
                <AlertDialog.Description>
                    Returning to the bartender selection page will clear chat and drink history. This cannot be undone.
                </AlertDialog.Description>
                <Flex direction="row" justify="end" gap="3" mt="4">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red">
                            Clear History
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>

        </AlertDialog.Root>
    )
}