import {FC} from 'react';
import useFetchProductTypesAndTags from "@/hooks/product/filter/useFetchProductTypesAndTags.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import Loader from "@/components/utils/Loader.tsx";
import ProductFilterTypesCard from "@/components/product/product/filter/product.filter.types.card.tsx";

const ProductFilterTypesAndTags: FC = () => {
    const {token} = useAdminToken();
    const {data, isPending, isSuccess, isError, error} = useFetchProductTypesAndTags(token);

    if (isPending) {
        return (<div className="flex justify-center">
            <Loader loading={isPending} />
        </div>);
    }

    if (isError) {
        return (<div className="flex flex-col justify-center items-center space-y-2">
            <span className="text-red-500">Oops. Something bad happened fetching product types and tags.</span>
            <span className="text-gray-400">{error!.message}</span>
        </div>)
    }

    return (
        <div className="space-y-5">
            {isSuccess && <ProductFilterTypesCard types={data.types} />}
        </div>
    );
};

export default ProductFilterTypesAndTags;
