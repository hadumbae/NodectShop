import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

import CategoryService from "../../../services/category/category.admin.service.ts";
import useCategoryParam from "../../../hooks/category/useCategoryParam.ts";
import useFetchCategoryWithData from "../../../hooks/category/useFetchCategoryWithData.ts";
import {useState} from "react";
import PageHeaderLink from "@/components/navigation/PageHeaderLink.tsx";
import PageHeaderButton from "@/components/header/PageHeaderButton.tsx";
import HeaderText from "@/components/header/HeaderText.tsx";
import CategoryDetailsCard from "@/components/category/CategoryDetailsCard.tsx";

const CategoryDetailsPage = () => {

    const navigate = useNavigate();

    const {token} = useSelector((state: any) => state.authUser);
    const {categoryID, categorySlug} = useCategoryParam();
    const {data, isLoading, isSuccess} = useFetchCategoryWithData(categoryID!, token);

    const [deleteStatus, setDeleteStatus] = useState<"DELETING" | "ERROR" | null>(null);

    const deleteCategory = async () => {
        const check = confirm("Are you sure you want to delete this category?");
        if (!check) return;

        setDeleteStatus("DELETING");

        try {
            const {status, payload} = await CategoryService.deleteCategory(categoryID!, token);

            if (status === 200) {
                toast.success("Category deleted successfully.");
                setDeleteStatus(null);

                navigate("/admin/category/list");
            } else {
                setDeleteStatus("ERROR");

                toast.error("Something went wrong.");
                toast.error(payload.message);
            }
        } catch (error) {
            alert(error);
            setDeleteStatus("ERROR");
        }
    }

    return (
        <div className="md:p-5 space-y-5">
            {!isLoading && <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <HeaderText>{data.category ? data.category.category : "Category"}</HeaderText>

                <div className="flex justify-center space-x-1 md:space-x-5 lg:justify-end items-center">
                    <PageHeaderLink link={`/admin/category/list`}>
                        Index
                    </PageHeaderLink>
                    <PageHeaderLink link={`/admin/category/edit/${categoryID}/${categorySlug}`}>
                        Edit
                    </PageHeaderLink>
                    <PageHeaderButton onClick={deleteCategory}>
                        Delete
                    </PageHeaderButton>
                </div>
            </section>}

            {deleteStatus === "ERROR" && <section className="text-center text-red-500">
                Oops. Something bad happened!
            </section>}

            {isSuccess && <section className="grid grid-cols-1 md:grid-cols-3">
                <div>
                    <CategoryDetailsCard category={data.category}/>
                </div>
            </section>}
        </div>
    );
};

export default CategoryDetailsPage;
