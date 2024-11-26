import { FC } from 'react';

interface Props {
    message: string;
}

const PageError: FC<Props> = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <span className="text-red-500">Oops! Something bad happened!</span>
            <span className="text-gray-400">{message}</span>
        </div>
    );
};

export default PageError;
