import {FC, PropsWithChildren} from 'react';
import {Link} from "react-router-dom";


interface RouteLinkProps {
    to: string;
    textColorClass?: string;
    textSizeClass?: string;
}

const RouteLink: FC<PropsWithChildren<RouteLinkProps>> = ({to, textColorClass = "text-gray-500", textSizeClass="text-xl", children}) => {
    return (
        <Link to={to}
              className={`${textColorClass} 
              hover:text-black 
              hover:underline 
              hover:underline-offset-8 
              p-4 
              ${textSizeClass}`}>
            {children}
        </Link>
    );
};

export default RouteLink;
