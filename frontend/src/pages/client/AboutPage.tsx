import {FC} from 'react';
import {Link} from "react-router-dom";

const AboutPage: FC = () => {
    return (
        <div>
            <div className="text-center">
                <h1 className="text-red-500">About Page</h1>
            </div>
            <div className="bg-blue-500">
                <p>Test</p>
            </div>
            <Link to="/">Home</Link>
        </div>
    );
};

export default AboutPage;
