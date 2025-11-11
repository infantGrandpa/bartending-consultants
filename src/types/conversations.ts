import type {Drink} from "./drinks.ts";

export interface Message {
    sender: string;
    content: string;
    senderIsUser: boolean;
    drink?: Drink;
}

export interface Conversation {
    conversationId: string;
    messages: Message[];
}