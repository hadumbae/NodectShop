import {FC} from 'react';
import ProductCreateForm from "../../../components/product/product/ProductCreateForm.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import PageHeaderLink from "../../../components/navigation/PageHeaderLink.tsx";
import useFetchAllCategories from "@/hooks/category/useFetchAllCategories.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import Loader from "@/components/utils/Loader.tsx";

const ProductCreatePage: FC = () => {
    const {token} = useAdminToken();
    const {categories, isLoading, error} = useFetchAllCategories(token);

    return (
        <div className="flex flex-col space-y-2">

            <section className="flex justify-between">
                <HeaderText>Products</HeaderText>

                <PageHeaderLink link="/admin/product/list">
                    &lt; List
                </PageHeaderLink>
            </section>

            {isLoading && <section className="text-center">
                <Loader loading={isLoading} />
            </section>}

            {error && <section className="text-red-500 text-center">
                Oops. Something bad happened!
            </section>}

            {!isLoading && <section className="flex justify-center">
                <div className="w-full md:w-1/3">
                    <ProductCreateForm categories={categories}/>
                </div>
            </section>}
        </div>
    );
};

export default ProductCreatePage;
