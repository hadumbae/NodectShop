import {FC} from 'react';
import useFetchProducts from "../../../hooks/product/useFetchProducts.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import PageHeaderLink from "../../../components/navigation/page.header.link.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import ProductCardList from "../../../components/product/product/ProductCardList.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import FormInput from "../../../components/inputs/FormInput.tsx";
import Loader from "../../../components/utils/Loader.tsx";
import {FaPlus} from "react-icons/fa";

const ProductListPage: FC = () => {
    const {token} = useAdminToken();

    const {
        products,
        page,
        setPage,
        perPage,
        totalItems,
        error,
        isLoading,
        title,
        setTitle
    } = useFetchProducts(token);

    return (
        <div className="flex flex-col space-y-4">

            {/* Header */}

            <section className="flex justify-between">
                <HeaderText>Products</HeaderText>
                <PageHeaderLink link={"/admin/product/create"}>
                    <FaPlus />
                </PageHeaderLink>
            </section>

            {/* Loader */}

            {isLoading && <section className="text-center">
                <Loader loading={isLoading} />
            </section>}

            {/* Error */}

            {error && <section className="text-red-500 text-center">
                Oops. Something went wrong!
            </section>}

            {/* Product List */}

            {!isLoading && <section className="flex justify-center">
                    <div className="flex flex-col space-y-4 w-full xl:w-4/5">
                        <FormInput placeholder={"Search..."} inputType={"text"} name={"search"} value={title}
                                   changeHandler={setTitle}/>

                        <ProductCardList products={products} />
                    </div>
            </section>}

            {/* Pagination */}

            {(!isLoading && totalItems > perPage) && <section>
                <Pagination totalItems={totalItems} currentPage={page} perPage={perPage} setPage={setPage}/>
            </section>}
        </div>
    );
};

export default ProductListPage;
