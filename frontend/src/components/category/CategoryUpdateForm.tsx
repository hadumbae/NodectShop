import {FC, useState} from 'react';
import _ from "lodash";

import FormInput from "../inputs/FormInput.tsx";
import Button from "../inputs/Button.tsx";
import Loader from "../utils/Loader.tsx";

import {fetchValidationError} from "../../utils/FormUtils.ts";
import CategoryService from "../../services/category/category.admin.service.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {CategoryType} from "../../schema/CategorySchema.ts";

interface CategoryCreateForm {
    category: CategoryType,
    token: string,
}

const CategoryCreateForm: FC<CategoryCreateForm> = ({category, token}) => {
    const navigate = useNavigate();

    const [error, setError] = useState<string|null>(null)
    const [validationErrors, setValidationErrors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            setIsLoading(true);

            const {status, payload} = await CategoryService.updateCategory(category._id!, formData, token);

            if (status === 200) {
                setError(null);
                setValidationErrors([]);
                setIsLoading(false);

                toast.success("Category updated successfully.");
                navigate(`/admin/category/find/${payload.data._id}/${_.kebabCase(payload.data.category)}`)
            } else if (status == 400) {
                setIsLoading(false);
                setValidationErrors(payload.errors);
            } else {
                setIsLoading(false);
                setError(payload.message);
            }
        } catch (error: any) {
            setError(error);
            console.error(error);
        }
    }

    return (
        <div>
            {isLoading ? <div className="text-center">
                <Loader loading={isLoading}/>
            </div>: <div className="bg-white shadow-md rounded p-5">
                <h1 className="text-2xl">Update Category</h1>
                <form onSubmit={submitHandler}>
                    <div className="mt-5">
                        <FormInput
                            label="Category"
                            inputType="text"
                            name="category"
                            value={category.category}
                            required={true}
                            errors={fetchValidationError("category", validationErrors)}/>
                    </div>
                    <div className={`mt-5 flex items-center ${error ? "justify-between" : "justify-end"}`}>
                        {error && <span className="text-red-500">{error}</span>}
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default CategoryCreateForm;
