import type {Drink} from "./drinks.ts";
import type {Bartender} from "./bartenders.ts";

export interface Message {
    content: string;
    sendingBartender?: Bartender;
    drink?: Drink;
}

export interface Conversation {
    conversationId: string;
    messages: Message[];
}