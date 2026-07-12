import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    hoverBgColor = "hover:bg-blue-600",
    className = "",
    ...props
}){

    return (
        <button className={`px-4 py-2 rounded ${bgColor} ${textColor} ${hoverBgColor} ${className}`} type={type} {...props}>
            {children}
        </button>
    )
}
