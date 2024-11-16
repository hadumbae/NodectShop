import CategoryForm from "../../../components/category/CategoryForm.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";

const CategoryCreatePage = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <section className="flex justify-between">
                <HeaderText>Category</HeaderText>

                <PageHeaderLink link="/admin/category/list">
                    &lt; Index
                </PageHeaderLink>
            </section>

            <div className="lg:w-1/2 p-5">
                <CategoryForm />
            </div>
        </div>
    );
};

export default CategoryCreatePage;
