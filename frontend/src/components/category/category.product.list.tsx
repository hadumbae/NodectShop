import {FC, useRef, useState} from 'react';
import useFetchPaginatedProductsByCategory from "@/hooks/category/useFetchPaginatedProductsByCategory.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import Loader from "@/components/utils/Loader.tsx";
import BasicProductCard from "@/components/product/product/BasicProductCard.tsx";

interface Props {
    categoryID: string;
}

const CategoryProductList: FC<Props> = ({categoryID}) => {
    const {token} = useAdminToken();

    const [page, setPage] = useState<number>(1);
    const perPage = useRef<number>(15);

    const {data, isPending, isSuccess, isError, error} = useFetchPaginatedProductsByCategory(categoryID, page, perPage.current, token);

    if (isPending) return (<div className="h-full flex justify-center items-center">
        <Loader loading={isPending} />
    </div>);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
                data.products.map((product: any) => <BasicProductCard key={product._id} product={product} />)
            }
        </div>
    );
};

export default CategoryProductList;
