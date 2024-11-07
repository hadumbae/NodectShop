import { FC, ReactNode } from 'react';

interface ButtonProps {
    children?: ReactNode;
    disabled?: boolean;
    type: "submit" | "reset" | "button" | undefined;
    textSizeClass?: string;
    paddingClass?: string;
    colourClass?: string;
}

const Button: FC<ButtonProps> = ({children, disabled, type, colourClass = "bg-black", textSizeClass = "", paddingClass = "p-3"}) => {
    return (
        <button type={type} disabled={disabled}
                className={`${colourClass} text-white rounded-md ${paddingClass} disabled:bg-gray-400 ${textSizeClass}`}>
            {children}
        </button>
    );
};

export default Button;
