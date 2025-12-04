import {Flex, IconButton} from "@radix-ui/themes";
import {useState} from "react";
import MessageInput from "./MessageInput.tsx";


export default function MessagingControls() {
    const [useMicrophone, setUseMicrophone] = useState<boolean>(true);

    const handleSwitchToKeyboard =() => {
        setUseMicrophone(false);
    }

    const handleSwitchToMicrophone = () => {
        setUseMicrophone(true);
    }

    if (!useMicrophone) {
        return <MessageInput
            onSendMessage={async () => console.log("Message Sent")}
            onMicrophoneClick={() => handleSwitchToMicrophone()}
        />
    }

    return (
        <Flex position="fixed" justify="between" align="end" p="3" bottom="0" left="0" width="100%">
            <IconButton variant="soft">
                <i className="fa-solid fa-gear"></i>
            </IconButton>
            <IconButton radius="full" variant="solid"
                        style={{
                            color: "var(--gray-3)", width: "64px", height: "64px"
                        }}>
                <i className="fa-solid fa-microphone fa-xl"></i>
            </IconButton>
            <IconButton onClick={handleSwitchToKeyboard}>
                <i className="fa-regular fa-keyboard" style={{color: "var(--gray-3)"}}></i>
            </IconButton>
        </Flex>
    )
}