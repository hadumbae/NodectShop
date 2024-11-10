import {FC, PropsWithChildren} from 'react';

interface Props {
    textClasses?: string;
    borderClasses?: string;
}

const Pill: FC<PropsWithChildren<Props>> = ({children, textClasses = "", borderClasses = ""}) => {
    return (
        <span className={`p-2 rounded-xl border text-center ${borderClasses} ${textClasses}`}>
            {children}
        </span>
    );
};

export default Pill;
