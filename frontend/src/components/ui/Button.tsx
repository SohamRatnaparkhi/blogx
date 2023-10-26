import React from "react";

const Button = ({ children, onClick, disabled, className, additionalClasses }:{
    children: React.ReactNode,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled: boolean
    className?: string
    additionalClasses?: string
}) => {
    return (
        <button
            onClick={onClick}
            className={className ?? `bg-[#5D8BF4] rounded-[5px] px-4 py-2 active:3/5 hover:bg-sky-blue hover:text-light-blue ease-in-out duration-200 w-3/4  text-white font-semibold text-lg ${additionalClasses} ${disabled ? "opacity-50" : ""
                }`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
