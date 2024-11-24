import Loader from "@/components/utils/Loader.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import CategoryDetailsCard from "@/components/category/category.details.card.tsx";
import CategoryDeleteAlert from "@/components/category/category.delete.alert.tsx";

import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useFetchCategory from "@/hooks/category/useFetchCategory.ts";
import useAdminToken from "@/hooks/useAdminToken.ts";
import HoverText from "@/components/hover.text.tsx";
import CategoryProductList from "@/components/category/category.product.list.tsx";

const CategoryDetailsPage = () => {
    const {token} = useAdminToken();
    const {categoryID, categorySlug} = useCategoryParam();
    const {category, isPending, isSuccess, isError, error} = useFetchCategory(categoryID!, token);

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
        <div className="flex flex-col space-y-2 h-full">
            <section className="flex justify-between items-center">
                <HeaderText>{category.category}</HeaderText>

                <div className="flex justify-center space-x-1 md:space-x-5 lg:justify-end items-center">
                    <PageHeaderLink link={`/admin/category/edit/${categoryID}/${categorySlug}`}>
                        Edit
                    </PageHeaderLink>

                    <CategoryDeleteAlert category={category}>
                        <HoverText>Delete</HoverText>
                    </CategoryDeleteAlert>
                </div>
            </section>

            {isSuccess && <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Details</h1>
                    <CategoryDetailsCard category={category}/>
                </div>
                <div className="md:col-span-2 space-y-2">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <CategoryProductList categoryID={category._id} />
                </div>
            </section>}
        </div>
    );
};

export default CategoryDetailsPage;
