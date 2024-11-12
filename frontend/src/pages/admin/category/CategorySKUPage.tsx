import {FC, useRef} from 'react';
import {useSelector} from "react-redux";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";
import PageHeaderLink from "../../../components/header/PageHeaderLink.tsx";
import ListTable from "../../../components/utils/ListTable.tsx";
import TableAccessorType from "../../../types/TableAccessorType.ts";
import {CategoryProductSKUAccessors} from "../../../utils/CategoryListTableAccessors.tsx";

const CategorySKUPage:FC = () => {
    const {token} = useSelector((state: any) => state.authUser);
    const {categoryID, categorySlug} = useCategoryParam();
    const {category, skus, isLoading} = useFetchCategoryWithData(categoryID!, token);

    const skuAccessors = useRef<TableAccessorType[]>(CategoryProductSKUAccessors);

    return (
        <div>
            <div className="mt-5">
                <h1 className="text-3xl">{category ? category.category : "Category"} SKUs</h1>

                <div className="grid grid-cols-2 gap-2 my-5">
                    <div className="flex items-center space-x-5">
                        <PageHeaderLink
                            link={`/admin/category/find/${categoryID}/${categorySlug}/details`}>
                            Details
                        </PageHeaderLink>
                        <PageHeaderLink
                            active={true}
                            link={`/admin/category/find/${categoryID}/${categorySlug}/skus`}>
                            SKUs
                        </PageHeaderLink>
                        <PageHeaderLink
                            link={`/admin/category/find/${categoryID}/${categorySlug}/products`}>
                            Products
                        </PageHeaderLink>
                    </div>
                </div>
            </div>

            {!isLoading && <div className="bg-white shadow-md border rounded-lg p-4">
                <h1 className="text-xl">SKUs</h1>
                <ListTable accessors={skuAccessors.current} data={skus}/>
            </div>}
        </div>
    );
};

export default CategorySKUPage;
