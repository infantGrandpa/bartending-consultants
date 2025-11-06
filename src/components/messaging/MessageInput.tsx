import {Flex, IconButton, TextArea} from "@radix-ui/themes";

export default function MessageInput() {
    //TODO: Setup messages to work.
    //TODO: Allow speech to text dictation

    return (
        <Flex style={{
            backgroundColor: "var(--color-surface)",
            border: "solid 1px var(--base-card-classic-border-color)",
            boxShadow: "inset 0 0 0 var(--text-field-border-width) var(--gray-a7)",
            color: "var(--gray-12)",
            borderRadius: "var(--radius-2)"
        }}>
            <TextArea placeholder="Type your message here..." variant="soft" resize="vertical" style={{
                backgroundColor: "initial",
                flexGrow: "1"
            }}></TextArea>
            <Flex direction="column" m="2" gap="2" justify="end">
                <IconButton variant="solid">
                    <i className="fa-solid fa-paper-plane"></i>
                </IconButton>
                <IconButton variant="outline">
                    <i className="fa-solid fa-microphone"></i>
                </IconButton>
            </Flex>
        </Flex>
    );
}