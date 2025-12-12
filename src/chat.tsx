import clsx from "clsx";
import type { CSSProperties, FC } from "react";
import { ChatFooter } from "./chat-footer.js";
import { ChatBody } from "./chat-body.js";
import { ChatHeader } from "./chat-header.js";
import { ChatContextProvider } from "./chat-context.js";
import { type PropsOf } from "@dre44/react-base";

type ProviderPropagateProps = Pick<PropsOf<typeof ChatContextProvider>, "messages">;
type HeaderPropagateProps = Pick<PropsOf<typeof ChatHeader>, "title" | "headerText">;
type BodyPropagateProps = Pick<
    PropsOf<typeof ChatBody>,
    "onLoadMore" | "hasMore" | "loading" | "messageComponents"
>;
type FooterPropagateProps = Pick<
    PropsOf<typeof ChatFooter>,
    "placeholder" | "onSend" | "loading" | "disabled" | "sendAction"
>;

interface ChatProps
    extends ProviderPropagateProps,
        HeaderPropagateProps,
        BodyPropagateProps,
        FooterPropagateProps {
    className?: string;
    style?: CSSProperties;
    /**
     * @default true
     */
    fullHeight?: boolean;
}

export const Chat: FC<ChatProps> = ({
    className,
    title,
    placeholder,
    headerText,
    onSend,
    onLoadMore,
    hasMore,
    loading,
    messages,
    sendAction,
    messageComponents,
    fullHeight,
}) => {
    return (
        <div className={clsx("flex flex-col gap-2 min-h-0", fullHeight !== false && "h-full", className)}>
            <ChatContextProvider messages={messages}>
                <ChatHeader className="" title={title} headerText={headerText} />
                <ChatBody
                    className=""
                    onLoadMore={onLoadMore}
                    hasMore={hasMore}
                    loading={loading}
                    messageComponents={messageComponents}
                />
                <ChatFooter sendAction={sendAction} className="" onSend={onSend} placeholder={placeholder} />
            </ChatContextProvider>
        </div>
    );
};
