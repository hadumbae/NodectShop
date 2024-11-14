import { FC } from 'react';
import useProductParam from "../../../../hooks/product/useProductParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/PageHeaderLink.tsx";
import ProductSKUForm from "../../../../components/product/product/ProductSKUForm.tsx";

const ProductSKUCreatePage: FC = () => {
    const {productID, productSlug} = useProductParam();

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <HeaderText>Product SKU</HeaderText>

                <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                    &lt; Product
                </PageHeaderLink>
            </div>

            <div className="flex justify-center">
                <div className="w-full sm:w-2/4 lg:w-1/3">
                    <ProductSKUForm productID={productID!} productSlug={productSlug!} />
                </div>
            </div>
        </div>
    );
};

export default ProductSKUCreatePage;
