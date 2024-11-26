import { FC } from 'react';
import useProductParam from "../../../../hooks/product/useProductParam.ts";
import HeaderText from "../../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../../components/navigation/page.header.link.tsx";
import useFetchSuppliers from "@/hooks/supplier/useFetchSuppliers.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import Loader from "@/components/utils/Loader.tsx";
import ProductSKUForm from "@/components/forms/sku/product.sku.form.tsx";

const ProductSKUCreatePage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();
    const {suppliers, isPending, isSuccess, isError, error} = useFetchSuppliers(token);

    if (isPending) {
        return (<div className="flex justify-center items-center h-full">
            <Loader loading={isPending} />
        </div>);
    }

    if (isError) {
        return (<div className="flex flex-col justify-center items-center h-full">
            <span className="text-red-500">Oops. Something bad happened!</span>
            <span className="text-gray-400">{error!.message}</span>
        </div>);
    }

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText>Product SKU</HeaderText>

                <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                    &lt; Product
                </PageHeaderLink>
            </section>

            {isSuccess && <section className="flex justify-center">
                <div className="w-1/2">
                    <ProductSKUForm productID={productID!} productSlug={productSlug!} suppliers={suppliers} />
                </div>
            </section>}
        </div>
    );
};

export default ProductSKUCreatePage;
