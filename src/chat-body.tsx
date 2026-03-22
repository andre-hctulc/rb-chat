"use client";

import { type FC, useEffect, useRef } from "react";
import { useChatContext } from "./chat-context.js";
import { ChatMessage, type MessageComponent } from "./chat-message.js";
import { Placeholder } from "@dre44/react-base";
import { Button, Spinner } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

interface ChatBodyProps {
    className?: string;
    hasMore?: boolean;
    onLoadMore?: () => void;
    loading?: boolean;
    messageComponents?: MessageComponent[];
}

export const ChatBody: FC<ChatBodyProps> = ({
    className,
    loading,
    onLoadMore,
    hasMore,
    messageComponents,
}) => {
    const { messages, latestMessageId } = useChatContext();
    const root = useRef<HTMLDivElement>(null);
    const scrolledToTop = useRef(false);

    useEffect(() => {
        if (root.current) {
            if (scrolledToTop.current) {
                root.current.scroll({ top: root.current.scrollHeight, behavior: "smooth" });
            } else {
                root.current.scrollTop = root.current.scrollHeight;
            }
            scrolledToTop.current = true;
        }
    }, [latestMessageId]);

    return (
        <div
            ref={root}
            className={twMerge("RB_ChatBody flex flex-col grow p-4 gap-4 min-h-0 overflow-y-auto", className)}
        >
            {loading && (
                <Placeholder grow>
                    <Spinner />
                </Placeholder>
            )}
            {!loading && onLoadMore && hasMore && (
                <div className="flex justify-center">
                    <Button color="light" size="sm" onClick={onLoadMore}>
                        Load More
                    </Button>
                </div>
            )}
            <ol className="flex flex-col gap-6 md:gap-9">
                {!loading &&
                    messages.map((message) => {
                        return (
                            <li key={message.id} className={twMerge("flex flex-col")}>
                                <ChatMessage render={messageComponents} message={message} />
                            </li>
                        );
                    })}
            </ol>
        </div>
    );
};
