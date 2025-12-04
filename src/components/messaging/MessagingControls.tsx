import {Flex, IconButton} from "@radix-ui/themes";
import {useState} from "react";
import MessageInput from "./MessageInput.tsx";


export default function MessagingControls() {
    const [useMicrophone, setUseMicrophone] = useState<boolean>(true);

    const handleToggleInputMode = () => {
        setUseMicrophone(!useMicrophone);
    }

    return (
        <Flex position="fixed" gap="2" p="3" bottom="0" left="0" width="100%" direction="column">
            {!useMicrophone && <MessageInput
                onSendMessage={async () => console.log("Message Sent")}
            />}

            <Flex direction="row" justify="between" align="end" width="100%">
                <IconButton variant="soft">
                    <i className="fa-solid fa-gear"></i>
                </IconButton>
                {useMicrophone &&
                    <IconButton radius="full" variant="solid"
                                style={{
                                    color: "var(--gray-3)",
                                    ...(useMicrophone && {width: "64px", height: "64px"})
                                }}
                                onClick={() => console.log("Pretend we sent a message using STT.")}
                    >
                        <i className="fa-solid fa-microphone fa-xl"></i>
                    </IconButton>
                }

                <IconButton onMouseDown={handleToggleInputMode}>
                    <i className={useMicrophone ? 'fa-regular fa-keyboard' : 'fa-solid fa-microphone'}
                       style={{color: "var(--gray-3)"}}></i>
                </IconButton>
            </Flex>
        </Flex>
    )
}