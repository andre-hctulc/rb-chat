import { Toolbar } from "@dre44/react-base";
import { collapse } from "@dre44/util/objects";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { CSSProperties, FC } from "react";

export type MessageType = "incoming" | "outgoing";

/**
 * Return `undefined` to enable default rendering.
 */
export type MessageComponent = FC<Omit<ChatMessageProps, "render">> & {
    renders?: (message: ChatMessageData) => boolean;
};

export interface ChatMessageData {
    id: string;
    direction: MessageType;
    type: string;
    // style
    style?: CSSProperties;
    className?: string;
    // content
    textContent?: string;
    files?: File[];
    data?: any;
    date?: Date;
    refs?: any[];
}

interface ChatMessageProps {
    className?: string;
    style?: CSSProperties;
    message: ChatMessageData;
    render?: MessageComponent[];
}

export const ChatMessage: FC<ChatMessageProps> = ({ render, ...props }) => {
    const { className, message, style } = props;

    if (render) {
        const Message = render.find((r) => r.renders?.(message)) || render.find((r) => !r.renders);
        if (Message) {
            return <Message {...props} />;
        }
    }

    const directionClasses = collapse(message.direction, {
        incoming: "bg-primary/10 self-start",
        outgoing: "bg-secondary/10 self-end",
    });

    // Default MessageComponent
    return (
        <div
            className={twMerge(
                "RB_ChatMessage rounded-lg p-4 max-w-[70%] min-w-[55%]",
                directionClasses,
                className
            )}
            style={{ ...style, ...message.style }}
        >
            <p className="max-h-[500px] overflow-y-auto">{message.textContent}</p>
            <Toolbar className=" justify-end">
                <span className="text-xs text-t3 truncate">{message.id}</span>
                {!!message.date && (
                    <span className="truncate text-sm text-t2">{message.date.toLocaleTimeString()}</span>
                )}
            </Toolbar>
        </div>
    );
};
