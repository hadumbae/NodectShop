import {FC, PropsWithChildren} from 'react';

interface Props {
    onClick: Function;
}

const PageHeaderButton: FC<PropsWithChildren<Props>> = ({children, onClick}) => {
    return (
        <button
            onClick={(e) => onClick(e)}
            className="p-2 text-lg text-gray-400 hover:underline hover:underline-offset-8 hover:text-black">
            {children}
        </button>
    );
};

export default PageHeaderButton;
