export default function MessageInput() {
    return (
        <div className="mb-4 relative">
            <input
                type="text"
                id="messageInput"
                className="w-full bg-gray-800 text-white p-4 pr-12 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="Type your message here..."
            />
            <button
                id="sendButton"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
            >
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </div>
    );
}