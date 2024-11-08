import {FC} from 'react';
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";

const ProductDetailsPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {product, isLoading, error} = useFetchProduct(productID!, token);

    return (
        <div className="flex flex-col space-y-3">
            {!isLoading && <div className="flex justify-between items-center">
                <HeaderText>{product!.title}</HeaderText>
                <div className="flex justify-end space-x-4">
                    <PageHeaderLink link={`/admin/product/list`}>
                        &lt; Products
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/edit/${productID}/${productSlug}`}>
                        Edit
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/edit/${productID}/${productSlug}`}>
                        Delete
                    </PageHeaderLink>
                </div>
            </div>}

            {error && <div className="text-center">
                <h1 className="text-xl text-red-500">{error}</h1>
            </div>}
        </div>
    );
};

export default ProductDetailsPage;
