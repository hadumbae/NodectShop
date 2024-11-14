import {FC, PropsWithChildren} from 'react';
import {Link} from "react-router-dom";

interface Props {
    to: string;
    className?: string;
}

const IconButtonLink: FC<PropsWithChildren<Props>> = ({children, to, className}) => {
    return (
        <Link className={`border p-4 rounded-3xl border-gray-400 text-gray-400 hover:shadow-lg hover:border-black hover:text-black ${className}`}
            to={to}>
            {children}
        </Link>
    );
};

export default IconButtonLink;
