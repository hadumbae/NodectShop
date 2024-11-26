import {FC} from 'react';
import useProductSKUParam from "../../../../hooks/product/useProductSKUParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/page.header.link.tsx";
import useFetchProductSKU from "../../../../hooks/product/useFetchProductSKU.ts";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useFetchSuppliers from "@/hooks/supplier/useFetchSuppliers.ts";
import Loader from "@/components/utils/Loader.tsx";
import ProductSKUForm from "@/components/forms/sku/product.sku.form.tsx";

const ProductSKUEditPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug, skuID, skuSlug} = useProductSKUParam();

    const skuQuery = useFetchProductSKU(productID!, skuID!, token);
    const supplierQuery = useFetchSuppliers(token);

    if (skuQuery.isPending || supplierQuery.isPending) {
        return <div className="flex justify-center items-center h-full">
            <Loader loading={true} />
        </div>;
    }

    if (skuQuery.isError || supplierQuery.isError) {
        return <div className="flex flex-col justify-center items-center h-full">
            <span className="text-red-500">Oops. Something bad happened!</span>
            <span className="text-gray-400">{skuQuery.error!.message || supplierQuery.error!.message}</span>
        </div>;
    }

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText>Product SKU</HeaderText>

                <div className="flex justify-end space-x-3">
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                        &lt; Product
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}/sku/${skuID}/${skuSlug}`}>
                        &lt; SKU
                    </PageHeaderLink>
                </div>
            </section>

            {(skuQuery.isSuccess && supplierQuery.isSuccess) && <div className="flex justify-center">
                <div className="w-full sm:w-2/4 lg:w-1/3">
                    <ProductSKUForm productID={productID!} productSlug={productSlug!} sku={skuQuery.sku} suppliers={supplierQuery.suppliers} />
                </div>
            </div>}
        </div>
    );
};

export default ProductSKUEditPage;
