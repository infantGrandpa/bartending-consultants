import MessageArea from "./MessageArea.tsx";
import MessageInput from "./MessageInput.tsx";
import {Container} from "@radix-ui/themes";
import {useBartender} from "../../providers/BartenderProvider.tsx";

export default function MessagingPanel() {
    const {selectedBartender} = useBartender();

    const handleSendMessage = async (message: string)=> {
        if (!selectedBartender) {
            throw new Error("Please select a bartender.")
        }

        console.log(`Bartender Selected: ${selectedBartender.profile.displayName}`)
        console.log(`Message: ${message}`)
    }

    return (
        <Container gridColumn="span 2">
            <MessageArea />
            <MessageInput onSendMessage={handleSendMessage}/>
        </Container>
    );
}