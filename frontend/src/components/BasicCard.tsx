import {FC, PropsWithChildren} from 'react';

interface Props {
    className?: string;
}

const BasicCard: FC<PropsWithChildren<Props>> = ({children, className = ""}) => {
    return (<div className={`bg-white border shadow-md rounded-lg p-5 ${className}`}>
            {children}
        </div>);
};

export default BasicCard;
