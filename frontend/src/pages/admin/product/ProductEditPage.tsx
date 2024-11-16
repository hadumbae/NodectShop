import {FC} from 'react';
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useProductParam from "../../../hooks/product/useProductParam.ts";
import useFetchProduct from "../../../hooks/product/useFetchProduct.ts";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/PageHeaderLink.tsx";
import ProductCreateForm from "../../../components/product/product/ProductCreateForm.tsx";
import useFetchAllCategories from "@/hooks/category/useFetchAllCategories.ts";
import Loader from "@/components/utils/Loader.tsx";

const ProductEditPage: FC = () => {
    const {token} = useAdminToken();
    const {productID, productSlug} = useProductParam();

    const {product, isLoading: productIsLoading, error: productError} = useFetchProduct(productID!, token);
    const {categories, isLoading: categoryIsLoading, error: categoryError} = useFetchAllCategories(token);

    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between items-center">
                <HeaderText className="truncate">Edit Product</HeaderText>
                <PageHeaderLink link={`/admin/product/find/${productID}/${productSlug}`}>
                    &lt; Details
                </PageHeaderLink>
            </section>

            {(productIsLoading || categoryIsLoading) && <section className="text-center">
                <Loader loading={true}/>
            </section>}

            {(productError || categoryError) && <section className="text-center">
            <h1 className="text-xl text-red-500">{categoryError?.message || productError}</h1>
            </section>}

            {product && <section className="flex justify-center">
                <div className="w-full lg:w-1/3">
                    <ProductCreateForm product={product} categories={categories}/>
                </div>
            </section>}
        </div>
    );
};

export default ProductEditPage;
