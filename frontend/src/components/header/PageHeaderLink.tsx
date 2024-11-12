import {FC, PropsWithChildren} from 'react';
import {Link} from "react-router-dom";

interface Props {
    active?: boolean;
    link: string;
}

const PageHeaderLink: FC<PropsWithChildren<Props>> = ({children, link, active = false}) => {
    return (
        <Link
            to={link}
            className={
                `p-2 text-lg ${
                    active ? 
                        "text-black underline underline-offset-8" : 
                        "text-gray-400 hover:underline hover:underline-offset-8 hover:text-black"
                }`}>
            {children}
        </Link>
    );
};

export default PageHeaderLink;
