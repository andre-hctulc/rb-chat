"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { ChatMessageData } from "./chat-message.js";

export interface ChatContext {
    messages: ChatMessageData[];
    latestMessageId?: string;
}

export const ChatContext = createContext<ChatContext | null>(null);

export function useChatContext(): ChatContext {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("`useChatContext` must be used within a `ChatProvider`");
    }
    return context;
}

interface ChatContextProviderProps {
    children?: ReactNode;
    messages: ChatMessageData[];
}

export function ChatContextProvider({ children, messages }: ChatContextProviderProps) {
    const latestMessageId = messages[messages.length - 1]?.id;
    const context = useMemo(() => {
        return {
            messages,
            latestMessageId,
        };
    }, [messages, latestMessageId]);

    return <ChatContext.Provider value={context}>{children}</ChatContext.Provider>;
}
