import {FC} from 'react';
import ProductCreateForm from "../../../components/product/product/ProductCreateForm.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import useFetchAllCategories from "@/hooks/category/useFetchAllCategories.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import Loader from "@/components/utils/Loader.tsx";
import ProductForm from "@/components/product/product/product.form.tsx";

const ProductCreatePage: FC = () => {
    return (
        <div className="flex flex-col space-y-2">

            <section className="flex justify-between">
                <HeaderText>Products</HeaderText>

                <PageHeaderLink link="/admin/product/list">
                    &lt; List
                </PageHeaderLink>
            </section>

            <section className="flex justify-center">
                <div className="w-full md:w-1/3">
                    <ProductForm />
                </div>
            </section>
        </div>
    );
};

export default ProductCreatePage;
