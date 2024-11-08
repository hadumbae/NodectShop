import {FC, PropsWithChildren} from 'react';

const SubHeaderText: FC<PropsWithChildren> = ({children}) => {
    return (
        <h1 className="text-xl">{children}</h1>
    );
};

export default SubHeaderText;
