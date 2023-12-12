import React from "react";
import clsx from 'clsx';


const inputGrpBaseClasses = "flex flex-col gap-y-1";
const labelBaseClasses = "text-lg font-medium";

type props = {
    className?: string
    children: React.ReactNode
    htmlFor: string
    labelText: string
    error?: string
}

export default function InpGrpShell({ className = "", children, htmlFor, labelText, error }: props) {

    return (
        <div className={clsx(inputGrpBaseClasses, className)}>
            <label htmlFor={htmlFor} className={labelBaseClasses}>{labelText}</label>
            {children}
            <div className="text-red-500 text-sm h-[1.25rem]">{error ?? ""}</div>
        </div>
    )
}