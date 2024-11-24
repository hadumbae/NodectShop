import {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Loader from "../../../components/utils/Loader.tsx";
import ProductAttributeDetailsCard from "../../../components/product/attribute/ProductAttributeDetailsCard.tsx";
import {ProductAttribute} from "@/types/ProductAttributeTypes.ts";
import useFetchPaginatedProductAttributes from "@/hooks/attribute/useFetchPaginatedProductAttributes.ts";
import HeaderText from "@/components/header/HeaderText.tsx";
import Pagination from "@/components/utils/pagination/Pagination.tsx";
import ProductAttributeFormWrapper from "@/components/forms/attribute/product.attribute.form.wrapper.tsx";
import {Button} from "@/components/ui/button.tsx";

const ProductAttributeListPage: FC = () => {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state: any) => state.authUser);

    if (!isAdmin) {
        navigate('/');
    }

    const [page, setPage] = useState<number>(1)
    const [perPage] = useState<number>(15);

    const {data, isPending, isSuccess, isError, error, refetch} = useFetchPaginatedProductAttributes(page, perPage, token);

    useEffect(() => {
        refetch();
    }, [page]);

    if (isPending) {
        return <div className="flex justify-center items-center h-full">
            <Loader loading={isPending} />
        </div>
    }

    return (
        <div className="flex flex-col space-y-5 h-full">
            <div className="flex justify-between">
                <HeaderText>Product Attributes</HeaderText>

                <ProductAttributeFormWrapper onSuccess={() => refetch()}>
                    <Button className="bg-primary text-gray-600 hover:text-black" variant="outline">Create</Button>
                </ProductAttributeFormWrapper>
            </div>

            {isError && <div className="flex-1 flex justify-center items-center">
                <span className="text-red-500">{error!.message}</span>
            </div>}


            {isSuccess && <div className="flex justify-center">
                    <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.attributes.map((attribute: ProductAttribute) => <div key={attribute._id}>
                            <ProductAttributeDetailsCard attribute={attribute} onDelete={() => refetch()} />
                        </div>)}
                    </div>
                </div>}

            {(isSuccess && data.totalItems > perPage) && <div>
                <Pagination totalItems={data.totalItems} currentPage={page} perPage={perPage} setPage={setPage} />
            </div>}
        </div>
    );
};

export default ProductAttributeListPage;
