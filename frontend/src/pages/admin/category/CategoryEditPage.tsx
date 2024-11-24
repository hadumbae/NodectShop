import Loader from "../../../components/utils/Loader.tsx";
import CategoryForm from "../../../components/category/category.form.tsx";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/page.header.link.tsx";
import useFetchCategory from "@/hooks/category/useFetchCategory.ts";

const CategoryEditPage = () => {
    const {categoryID, categorySlug} = useCategoryParam();

    const { token } = useAdminToken();
    const {category, isPending, isSuccess} = useFetchCategory(categoryID!, token);

    if (isPending) return (<div className="h-full flex justify-center items-center">
            <Loader loading={isPending} />
        </div>);

    return (
        <div className="space-y-5">

            {isSuccess && <section className="flex justify-between">
                <HeaderText>Edit {category.category}</HeaderText>

                <PageHeaderLink link={`/admin/category/find/${categoryID}/${categorySlug}`} >
                    &lt; Back
                </PageHeaderLink>
            </section>}

            {isSuccess && <section className="flex justify-center">
                <div className="w-full md:w-2/3 xl:w-1/3">
                    <CategoryForm category={category}/>
                </div>
            </section>}
        </div>
    );
};

export default CategoryEditPage;
