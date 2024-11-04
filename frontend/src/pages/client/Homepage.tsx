import {FC} from 'react';
import {Link} from 'react-router-dom';

const Homepage: FC = () => {
    return (
        <div>
            <h1>Hello, World</h1>
            <Link to="/about">About</Link>
        </div>
    );
};

export default Homepage;
