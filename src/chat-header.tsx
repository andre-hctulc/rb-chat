"use client";

import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { FC } from "react";

interface ChatHeaderProps {
    className?: string;
    title?: string;
    headerText?: string;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ className, title, headerText }) => {
    if (!title && !headerText) {
        return null;
    }

    return (
        <div className={twMerge("RB_ChatHeader flex shrink-0 bg-primary p-4")}>
            <div>
                <h1 className={twMerge("text-t1 text-lg font-semibold", className)}>{title}</h1>
                {headerText && <p className="text-t2">{headerText}</p>}
            </div>
        </div>
    );
};
