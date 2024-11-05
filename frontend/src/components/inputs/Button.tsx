import { FC, ReactNode } from 'react';

interface ButtonProps {
    children?: ReactNode;
    disabled?: boolean;
    type: "submit" | "reset" | "button" | undefined;
    textSizeClass?: string;
    paddingClass?: string;
}

const Button: FC<ButtonProps> = ({children, disabled, type, textSizeClass = "", paddingClass = "p-3"}) => {
    return (
        <button type={type} disabled={disabled}
                className={`bg-black text-white rounded-md ${paddingClass} disabled:bg-gray-400 ${textSizeClass}`}>
            {children}
        </button>

    // <button type="button"
    //         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>

);
};

export default Button;
