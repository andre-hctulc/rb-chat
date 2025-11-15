"use client";

import { IconButton, Toolbar } from "@dre44/react-base";
import type { FC, ReactNode } from "react";
import { SendIcon } from "./icons/send-icon.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

interface ChatFooterToolbarProps {
    className?: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    sendIcon?: ReactNode;
}

export const ChatFooterToolbar: FC<ChatFooterToolbarProps> = ({
    className,
    onClick,
    loading,
    disabled,
    sendIcon,
}) => {
    return (
        <Toolbar
            className={twMerge("RB_ChatFooterToolbar cursor-text", className)}
            onClick={() => onClick?.()}
            p="lg"
        >
            <div className="grow" />
            <IconButton size="lg" className="px-4 pb-4" disabled={disabled || loading} type="submit">
                {sendIcon || <SendIcon />}
            </IconButton>
        </Toolbar>
    );
};
