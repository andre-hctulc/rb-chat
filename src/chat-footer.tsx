"use client";

import { type FC, useRef, useState } from "react";
import { ChatFooterToolbar } from "./chat-footer-toolbar.js";
import type { PropsOf } from "@dre44/react-base";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

interface ChatFooterProps {
    className?: string;
    placeholder?: string;
    onSend?: (message: string, files: File[]) => void;
    loading?: boolean;
    disabled?: boolean;
    sendAction?: PropsOf<"form">["action"];
    /**
     * Disables the file upload button
     */
    noFiles?: boolean;
}

export const ChatFooter: FC<ChatFooterProps> = ({
    className,
    placeholder,
    onSend,
    loading,
    disabled,
    sendAction,
    noFiles,
}) => {
    const [content, setContent] = useState<string>("");
    const inp = useRef<HTMLDivElement>(null);

    return (
        <div
            className={twMerge(
                "RB_ChatFooter h-40 shrink-0 shadow-md border-[0.5px] overflow-hidden rounded-xl",
                className
            )}
        >
            <form
                action={sendAction}
                className={twMerge("rounded-xl flex flex-col h-full", className)}
                onSubmit={(e) => {
                    // preventDefault prevents action from being called,
                    // so we only preventDefault if no action is provided
                    if (!sendAction) {
                        e.preventDefault();
                    }
                    const fd = new FormData(e.currentTarget);
                    const filesList = fd.getAll("files") as File[];
                    const content = fd.get("content") as string;
                    onSend?.(content, filesList);
                    setContent("");
                }}
            >
                <div
                    ref={inp}
                    contentEditable
                    translate="no"
                    onInput={(e) => {
                        setContent(e.currentTarget.textContent || "");
                    }}
                    className={twMerge("grow min-h-0 overflow-y-auto focus:outline-0 py-4 px-6", className)}
                />
                <input type="hidden" name="content" value={content} />
                <ChatFooterToolbar
                    onClick={() => inp.current?.focus()}
                    loading={loading}
                    disabled={!content || disabled}
                />
            </form>
        </div>
    );
};
