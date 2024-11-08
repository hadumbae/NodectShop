import {FC} from 'react';
import useFetchProducts from "../../../hooks/product/useFetchProducts.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";
import HeaderText from "../../../components/header/HeaderText.tsx";
import SubHeaderText from "../../../components/header/SubHeaderText.tsx";
import ProductCardList from "../../../components/product/product/ProductCardList.tsx";
import Pagination from "../../../components/utils/pagination/Pagination.tsx";
import FormInput from "../../../components/inputs/FormInput.tsx";
import Loader from "../../../components/utils/Loader.tsx";

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
        <div>
            {/* Header */}

            <div className="flex justify-between items-center">
                <HeaderText>Products</HeaderText>
                <PageHeaderLink link={"/admin/product/create"}>Create</PageHeaderLink>
            </div>

            {error && <div className="mt-5 text-red-500 text-center">
                {error}
            </div>}

            {/* List */}
            {!error && <div className="flex justify-center">
                <div className="w-4/5 flex flex-col space-y-5">
                    <div className="flex justify-between items-center">
                        <SubHeaderText>Product List</SubHeaderText>
                        <FormInput placeholder={"Search..."} inputType={"text"} name={"search"} value={title}
                                   changeHandler={setTitle}/>
                    </div>

                    {!isLoading ? <ProductCardList products={products}/> : <div className="flex justify-center">
                        <Loader loading={isLoading}/>
                    </div>}

                    {(totalItems > perPage && !isLoading) &&
                        <Pagination totalItems={totalItems} currentPage={page} perPage={perPage} setPage={setPage}/>}
                </div>
            </div>}
        </div>
    );
};

export default ProductListPage;
