export interface Message {
    sender: string;
    content: string;
    senderIsUser: boolean;
}

export interface ConversationHistory {
    conversationId: string;
    messages: Message[];
}