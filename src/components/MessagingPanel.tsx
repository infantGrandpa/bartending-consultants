import MessageArea from "./MessageArea";
import MessageInput from "./MessageInput";

export default function MessagingPanel() {
    return (
        <div className="p-4 col-span-2 flex flex-col h-full">
            <MessageArea />
            <MessageInput />
        </div>
    );
}