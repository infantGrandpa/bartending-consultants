import MessageArea from "./MessageArea.tsx";
import MessageInput from "./MessageInput.tsx";
import {Container} from "@radix-ui/themes";

export default function MessagingPanel() {
    return (
        <Container gridColumn="span 2">
            <MessageArea />
            <MessageInput />
        </div>
        </Container>
    );
}