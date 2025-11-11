import {createContext, type ReactNode, useContext, useState} from "react";
import type {Conversation, Message} from "../types/conversations.ts";
import type {Drink} from "../types/drinks.ts";

interface ConversationContextValue {
    conversation: Conversation;
    setConversationId: (conversationId: string) => void;
    addMessage: (message: Message) => void;
    clearConversation: () => void;
    getMostRecentDrink: () => Drink | undefined;
}

const ConversationContext= createContext<ConversationContextValue | undefined>(undefined);

const defaultConversation: Conversation = {
    conversationId: "",
    messages: []
}

export function ConversationProvider({children}: { children: ReactNode }) {
    const [conversation, setConversation] = useState<Conversation>(defaultConversation);

    const setConversationId = (conversationId: string) => {
        setConversation(previousConversation => ({...previousConversation, conversationId}))
    };

    const addMessage = (message: Message) => {
        setConversation(previousConversation => ({
            ...previousConversation,
            messages: [...previousConversation.messages, message]
        }));
    };

    const clearConversation = () => {
        setConversation(defaultConversation);
    }

    const getMostRecentDrink = (): Drink | undefined => {
        for (let i = conversation.messages.length - 1; i >= 0; i--) {
            if (conversation.messages[i].drink) {
                return conversation.messages[i].drink;
            }
        }
        return undefined;
    };

    return (
        <ConversationContext.Provider value={{
            conversation,
            setConversationId,
            addMessage,
            clearConversation,
            getMostRecentDrink
        }}>
            {children}
        </ConversationContext.Provider>
    )
}

export function useConversation() {
    const context = useContext(ConversationContext);
    if (context === undefined) {
        throw new Error('useConversation must be used within a ConversationProvider.')
    }
    return context;
}