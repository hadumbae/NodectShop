import CategoryForm from "../../../components/category/CategoryForm.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";

const CategoryCreatePage = () => {
    return (
        <div className="flex flex-col space-y-4">
            <section className="flex justify-between">
                <HeaderText>Category</HeaderText>

                <PageHeaderLink link="/admin/category/list">
                    &lt; Index
                </PageHeaderLink>
            </section>

            <section className="flex justify-center">
                <div className="w-full lg:w-1/2">
                    <CategoryForm />
                </div>
            </section>
        </div>
    );
};

export default CategoryCreatePage;
