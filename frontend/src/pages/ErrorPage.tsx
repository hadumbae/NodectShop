import { FC } from 'react';
import {Link} from "react-router-dom";

const ErrorPage: FC = () => {
    return (
        <div className="h-lvh flex flex-col space-y-5 justify-center items-center">
            <h1 className="text-5xl font-orbitron italic">OOPS!</h1>
            <h1 className="text-2xl font-orbitron">Something bad happened!</h1>
            <Link to="/" className="text-gray-400 hover:text-black hover:underline hover:underline-offset-8">Go To Index</Link>
        </div>
    );
};

export default ErrorPage;
