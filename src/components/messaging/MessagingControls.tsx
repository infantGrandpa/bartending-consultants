import {Box, Card, Flex, IconButton} from "@radix-ui/themes";
import {useState} from "react";
import MessageTextInput from "./MessageTextInput.tsx";
import Settings from "../settings/Settings.tsx";
import SpeechToTextInput from "./SpeechToTextInput.tsx";

interface Props {
    onSendMessage: (message: string) => Promise<void>
}

export default function MessagingControls({onSendMessage}:Props) {
    const [useMicrophone, setUseMicrophone] = useState<boolean>(true);

    const handleToggleInputMode = () => {
        setUseMicrophone(!useMicrophone);
    }

    const handleSendMessage = async (message: string) => {
        await onSendMessage(message);
    }

    //TODO: Remove the border radius on the bottom card.
    // For some reason, using bottom border radius styles on the card doesn't affect it.
    // I even set up CSS styles with !important on both the card and the card's ::before element.
    // No idea what's causing this.
    return (
        <Box position="fixed" bottom="0" left="0" width="100%">
            <Card>
                <Flex gap="2" direction="column"
                      style={{zIndex: "1"}}>

                    {!useMicrophone &&
                        <MessageTextInput onSendMessage={async (msg) => handleSendMessage(msg)}/>
                    }

                    <Flex direction="row" justify="between" align="end" width="100%">
                        <Settings/>
                        {useMicrophone &&
                            <SpeechToTextInput onRecognizedText={async (msg) => handleSendMessage(msg)}/>
                        }

                        <IconButton onMouseDown={handleToggleInputMode}>
                            <i className={useMicrophone ? 'fa-regular fa-keyboard' : 'fa-solid fa-microphone'}
                               style={{color: "var(--gray-3)"}}></i>
                        </IconButton>
                    </Flex>
                </Flex>
            </Card>
        </Box>
    )
}