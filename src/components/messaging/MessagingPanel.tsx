import MessageArea from "./MessageArea.tsx";
import MessageInput from "./MessageInput.tsx";

export default function MessagingPanel() {
    return (
        <div className="p-4 col-span-2 flex flex-col h-full">
            <MessageArea />
            <MessageInput />
        </div>
    );
}