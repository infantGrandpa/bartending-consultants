import {Flex, Text} from "@radix-ui/themes";


export default function RecordingIndicator() {
    return (
        <Flex direction="column" m="4" justify="center" align="center" minHeight="200px">
            <i className={`fa-solid fa-microphone fa-fade fa-2xl`}></i>
            <Text as="p" mt="5" align="center">Listening...</Text>
        </Flex>
    );
}