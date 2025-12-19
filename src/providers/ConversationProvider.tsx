import {createContext, type ReactNode, useContext, useState} from "react";
import type {Conversation, Message} from "../types/conversations.ts";
import type {Drink} from "../types/drinks.ts";

interface ConversationContextValue {
    conversation: Conversation;
    setConversationId: (conversationId: string) => void;
    addMessage: (message: Message) => void;
    clearConversation: () => void;
    removeEmptyMessages: () => void;
    getMostRecentDrink: () => Drink | undefined;
    getAllDrinks: () => Drink[];
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

    // To show that we're waiting on a response from the API, we create a message with content set to null.
    // That way, we can create a skeleton to show feedback to the user.
    // Once that message comes in, we need to remove it. This was a nice quick and easy way to do so.
    const removeEmptyMessages = () => {
        setConversation(previousConversation => ({
            ...previousConversation,
            messages: previousConversation.messages.filter(message => message.content !== null)
        }));
    };

    const getMostRecentDrink = (): Drink | undefined => {
        for (let i = conversation.messages.length - 1; i >= 0; i--) {
            if (conversation.messages[i].drink) {
                return conversation.messages[i].drink;
            }
        }
        return undefined;
    };

    const getAllDrinks = (): Drink[] => {
        return conversation.messages
            .filter((message: Message) => message.drink !== undefined)
            .map((message: Message) => message.drink as Drink);
    };

    return (
        <ConversationContext.Provider value={{
            conversation,
            setConversationId,
            addMessage,
            clearConversation,
            removeEmptyMessages,
            getMostRecentDrink,
            getAllDrinks
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