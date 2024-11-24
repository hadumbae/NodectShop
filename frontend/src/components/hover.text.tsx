import {FC, PropsWithChildren} from 'react';

interface Props {
    className?: string;
}

const HoverText: FC<PropsWithChildren<Props>> = ({children, className}) => {
    return (
        <span className={`p-2 text-md md:text-lg text-gray-400 hover:text-black hover:underline hover:underline-offset-8 ${className}`}>
            {children}
        </span>
    );
};

export default HoverText;
