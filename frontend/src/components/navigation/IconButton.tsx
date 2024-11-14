import {FC, PropsWithChildren} from 'react';
interface Props {
    onClick: () => void;
    className?: string;
}

const IconButton: FC<PropsWithChildren<Props>> = ({children, onClick, className}) => {
    return (
        <button className={`border p-4 rounded-3xl ${className}`}
            onClick={onClick}>
            {children}
        </button>
    );
};

export default IconButton;
