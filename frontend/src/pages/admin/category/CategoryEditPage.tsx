import Loader from "../../../components/utils/Loader.tsx";
import CategoryForm from "../../../components/category/CategoryForm.tsx";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";

const CategoryEditPage = () => {
    const {categoryID, categorySlug} = useCategoryParam();

    const { token } = useAdminToken();
    const {data, isLoading, isSuccess} = useFetchCategoryWithData(categoryID!, token);

    return (
        <div className="md:p-5 space-y-4">
            {isLoading && <section className="flex justify-center">
                <Loader loading={isLoading}/>
            </section>}

            {isSuccess && <section className="flex justify-between">
                <HeaderText>{data?.category?.category || "Category"}</HeaderText>

                <PageHeaderLink link={`/admin/category/find/${categoryID}/${categorySlug}`} >
                    &lt; Back
                </PageHeaderLink>
            </section>}

            {isSuccess && <section className="flex justify-center">
                <div className="w-full md:w-2/3 xl:w-1/3">
                    <CategoryForm category={data.category}/>
                </div>
            </section>}

        </div>
    );
};

export default CategoryEditPage;
