import {CSSProperties, FC} from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
    loading: boolean;
    colour?: string;
    cssOverride?: CSSProperties;
    size?: number;
}

const Loader: FC<LoaderProps> = ({loading, colour, cssOverride, size = 150}) => {
    return  <ClipLoader
        color={colour}
        loading={loading}
        cssOverride={cssOverride}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
    />;
};

export default Loader;
