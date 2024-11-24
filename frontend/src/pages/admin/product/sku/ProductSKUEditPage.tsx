import {FC} from 'react';
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/page.header.link.tsx";
import ProductSKUForm from "../../../../components/product/product/ProductSKUForm.tsx";
import useFetchProductSKU from "../../../../hooks/product/useFetchProductSKU.ts";
import useAdminToken from "../../../../hooks/useAdminToken.ts";

const ProductSKUEditPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();
    const {sku} = useFetchProductSKU(productID!, skuID!, token);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
                <HeaderText>Product SKU</HeaderText>

                <div className="flex justify-end space-x-3">
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                        &lt; Product
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        &lt; SKU
                    </PageHeaderLink>
                </div>
            </div>

            {sku && <div className="flex justify-center">
                <div className="w-full sm:w-2/4 lg:w-1/3">
                    <ProductSKUForm productID={productID!} productSlug={productSlug!} sku={sku!}/>
                </div>
            </div>}
        </div>
    );
};

export default ProductSKUEditPage;
