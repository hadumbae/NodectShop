import {CSSProperties, FC} from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
    loading: boolean;
    colour?: string;
    cssOverride?: CSSProperties;
}

const Loader: FC<LoaderProps> = ({loading, colour, cssOverride}) => {
    return  <ClipLoader
        color={colour}
        loading={loading}
        cssOverride={cssOverride}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
    />;
};

export default Loader;
