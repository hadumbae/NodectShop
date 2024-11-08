import {FC, PropsWithChildren} from 'react';
import {Link} from "react-router-dom";

interface Props {
    link: string;
}

const PageHeaderLink: FC<PropsWithChildren<Props>> = ({children, link}) => {
    return (
        <Link
            to={link}
            className="p-2 text-lg text-gray-400 hover:underline hover:underline-offset-8 hover:text-black">
            {children}
        </Link>
    );
};

export default PageHeaderLink;
