import {FC, useState} from 'react';
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

import Button from "../inputs/Button.tsx";
import Loader from "../utils/Loader.tsx";

import {setHookError} from "../../utils/FormUtils.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {CategorySchema, CategoryType} from "../../schema/CategorySchema.ts";
import HookFormInput from "../inputs/HookFormInput.tsx";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import CategoryService from "../../services/category/CategoryService.ts";

interface Props {
    category?: CategoryType;
}

const CategoryForm: FC<Props> = ({category}) => {
    const {token} = useSelector((state: any) => state.authUser);
    const navigate = useNavigate();
    const {
        register, handleSubmit, setError, reset,
        formState: {errors, isSubmitting}
    } = useForm({
                defaultValues: {category: category ? category.category : ""},
                resolver: zodResolver(CategorySchema)
            });

    const [formError, setFormError] = useState<string|null>(null)

    const onSubmit: SubmitHandler<CategoryType> = async (data: FieldValues) => {
        setFormError(null);

        const {status, payload} = category ?
            await CategoryService.updateCategory(category._id!, data, token) :
            await CategoryService.createCategory(data, token);

        if (status === 200) {
            toast.success("Category created successfully.");
            reset();

            navigate(`/admin/category/find/${payload.data._id}/${_.kebabCase(payload.data.category)}/details`)
        } else if (status == 400) {
            setHookError("category", setError, payload.errors);
        } else {
            setFormError(payload.message);
        }
    }

    return (
        <div>
            {
                isSubmitting ?
                <div className="text-center">
                    <Loader loading={isSubmitting}/>
                </div> :

                <div className="bg-white shadow-md rounded p-5">
                    <h1 className="text-2xl">{category ? "Update" : "Create"} Category</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-5">
                            <HookFormInput
                                label="Category"
                                inputType="text"
                                register={register('category', {required: true})}
                                error={errors.category}
                            />
                        </div>
                        <div className={`mt-5 flex items-center ${formError ? "justify-between" : "justify-end"}`}>
                            {formError && <span className="text-red-500">{formError}</span>}
                            <Button type="submit">{category ? "Update" : "Create"}</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default CategoryForm;
