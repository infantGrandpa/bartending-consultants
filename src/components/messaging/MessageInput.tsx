import {Flex, IconButton, TextArea} from "@radix-ui/themes";
import {useState} from "react";
import {useBartender} from "../../providers/BartenderProvider.tsx";

interface Props {
    onSendMessage: (message: string) => Promise<void>
}

export default function MessageInput({onSendMessage}: Props) {
    const [message, setMessage] = useState<string>("");
    const {selectedBartender} = useBartender();

    const handleSendButtonClick = async () => {
        const trimmedMessage = message.trim();

        if (trimmedMessage === "") {
            return;
        }

        await onSendMessage(trimmedMessage);

        setMessage("");
    }

    //TODO: Don't clear message if you switch to microphone

    return (
            <Flex className="input-box">
                <TextArea
                    ref={textAreaRef}
                    placeholder="Type your message here..."
                    variant="soft"
                    resize="none"
                    value={message}
                    rows={1}
                    autoFocus={true}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendButtonClick();
                        }
                    }}
                    style={{
                        backgroundColor: "initial",
                        flexGrow: "1",
                        minHeight: "33px",
                        maxHeight: "123px",
                        borderRadius: "var(--radius-6)"
                    }}
                />
                <Flex direction="column" m="2" gap="2" justify="start">
                    <IconButton
                        variant="ghost"
                        onClick={handleSendButtonClick}
                        disabled={(!selectedBartender) || (message.trim().length === 0)}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </IconButton>
                </Flex>
            </Flex>
    );
}