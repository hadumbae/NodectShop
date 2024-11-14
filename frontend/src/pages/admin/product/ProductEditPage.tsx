import {FC} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/PageHeaderLink.tsx";
import ProductCreateForm from "../../../components/product/product/ProductCreateForm.tsx";

const ProductEditPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {product, error, isLoading} = useFetchProduct(productID!, token);

    return (
        <div className="flex flex-col space-y-4">
            {!isLoading && <div className="flex justify-between items-center">
                <HeaderText>Edit {product!.title}</HeaderText>
                <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                    &lt; Details
                </PageHeaderLink>
            </div>}

            {error && <div className="text-center">
                <h1 className="text-xl text-red-500">{error}</h1>
            </div>}

            {product && <div className="flex justify-center">
                <div className="w-1/3">
                    <ProductCreateForm product={product}/>
                </div>
            </div>}
        </div>
    );
};

export default ProductEditPage;
