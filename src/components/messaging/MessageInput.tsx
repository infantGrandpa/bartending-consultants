import {Flex, IconButton, TextArea} from "@radix-ui/themes";
import {useState} from "react";
import {useBartender} from "../../providers/BartenderProvider.tsx";
import SpeechToTextInput from "./SpeechToTextInput.tsx";

interface Props {
    onSendMessage: (message: string) => Promise<void>;
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

    //TODO: Allow speech to text dictation
    //TODO: Change the Input to be sticky
    //TODO: Add some feedback to explain they need to choose a bartender?

    return (
        <Flex className="input-box">
            <TextArea
                placeholder="Type your message here..."
                variant="soft"
                resize="vertical"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendButtonClick();
                    }
                }}
                style={{
                    backgroundColor: "initial",
                    flexGrow: "1",
                    minHeight: "96.8px"
                }}
            />
            <Flex direction="column" m="2" gap="2" justify="end">
                <IconButton
                    variant="solid"
                    onClick={handleSendButtonClick}
                    disabled={(!selectedBartender) || (message.trim().length === 0)}
                >
                    <i className="fa-solid fa-paper-plane"></i>
                </IconButton>
                <SpeechToTextInput />
            </Flex>
        </Flex>
    );
}