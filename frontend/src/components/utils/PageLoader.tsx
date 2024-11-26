import { FC } from 'react';
import Loader from "@/components/utils/Loader.tsx";

const PageLoader: FC = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Loader loading={true} />
        </div>
    );
};

export default PageLoader;
