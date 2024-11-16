import {FC, PropsWithChildren} from 'react';

interface Props {
    className?: string;
}

const HeaderText: FC<PropsWithChildren<Props>> = ({children, className = ""}) => {
    return (
        <h1 className={`text-3xl font-extrabold ${className}`}>{children}</h1>
    );
};

export default HeaderText;
