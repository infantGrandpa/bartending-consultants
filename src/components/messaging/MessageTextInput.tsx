import {Flex, IconButton, TextArea} from "@radix-ui/themes";
import {type RefObject, useRef, useState} from "react";
import {useBartender} from "../../providers/BartenderProvider.tsx";

interface Props {
    onSendMessage: (message: string) => Promise<void>
}

export default function MessageTextInput({onSendMessage}: Props) {
    const [message, setMessage] = useState<string>("");
    const {selectedBartender} = useBartender();

    const textAreaRef: RefObject<HTMLTextAreaElement | null> = useRef<HTMLTextAreaElement>(null);

    const handleSendButtonClick = async () => {
        const trimmedMessage = message.trim();

        if (trimmedMessage === "") {
            return;
        }

        await onSendMessage(trimmedMessage);

        setMessage("");
    }

    const handleInputBoxChange = (inputValue: string) => {
        setMessage(inputValue);

        if (textAreaRef.current) {
            const textArea = textAreaRef.current;
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight + 'px';
        }

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
                    onChange={(e) => handleInputBoxChange(e.target.value)}
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