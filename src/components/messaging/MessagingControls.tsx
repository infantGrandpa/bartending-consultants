import {Flex, IconButton} from "@radix-ui/themes";


export default function MessagingControls() {
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
            <IconButton>
                <i className="fa-regular fa-keyboard" style={{color: "var(--gray-3)"}}></i>
            </IconButton>
        </Flex>
    )
}