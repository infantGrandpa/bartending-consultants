import {Flex, IconButton} from "@radix-ui/themes";
import {useState} from "react";
import MessageTextInput from "./MessageTextInput.tsx";
import Settings from "../settings/Settings.tsx";
import MessageAudioInput from "./MessageAudioInput.tsx";


export default function MessagingControls() {
    const [useMicrophone, setUseMicrophone] = useState<boolean>(true);

    const handleToggleInputMode = () => {
        setUseMicrophone(!useMicrophone);
    }

    return (
        <Flex position="fixed" gap="2" p="3" bottom="0" left="0" width="100%" direction="column">
            {!useMicrophone && <MessageTextInput
                onSendMessage={async () => console.log("Message Sent")}
            />}

            <Flex direction="row" justify="between" align="end" width="100%">
                <Settings/>
                {useMicrophone && <MessageAudioInput />}

                <IconButton onMouseDown={handleToggleInputMode}>
                    <i className={useMicrophone ? 'fa-regular fa-keyboard' : 'fa-solid fa-microphone'}
                       style={{color: "var(--gray-3)"}}></i>
                </IconButton>
            </Flex>
        </Flex>
    )
}