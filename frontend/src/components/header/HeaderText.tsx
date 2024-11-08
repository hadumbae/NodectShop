import {FC, PropsWithChildren} from 'react';

const HeaderText: FC<PropsWithChildren> = ({children}) => {
    return (
        <h1 className="text-3xl">{children}</h1>
    );
};

export default HeaderText;
