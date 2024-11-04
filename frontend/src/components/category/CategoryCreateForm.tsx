import {FC, useState} from 'react';
import {toast} from "react-toastify";
import {useSelector} from "react-redux";

import FormInput from "../inputs/FormInput.tsx";
import Button from "../inputs/Button.tsx";
import Loader from "../utils/Loader.tsx";

import {fetchValidationError} from "../../utils/FormUtils.ts";

const CategoryCreateForm: FC = () => {
    const {token} = useSelector((state: any) => state.authUser);

    const [error, setError] = useState<string|null>(null)
    const [validationErrors, setValidationErrors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const submitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            setIsLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({category: formData.get('category')})
            });

            const result = await response.json();

            if (response.status === 200) {
                setError(null);
                setValidationErrors([]);
                toast.success("Category created successfully.");
                setIsLoading(false);
            } else if (response.status == 400) {
                setIsLoading(false);
                setValidationErrors(result.errors);
            } else {
                setIsLoading(false);
                setError(result.message);
            }
        } catch (error: any) {
            setError(error);
            console.log(error);
        }
    }



    return (
        <div>
            {isLoading ? <div className="text-center">
                <Loader loading={isLoading}/>
            </div>: <div className="bg-white shadow-md rounded p-5">
                <h1 className="text-2xl">Create Category</h1>
                <form onSubmit={submitHandler}>
                    <div className="mt-5">
                        <FormInput
                            label="Category"
                            inputType="text"
                            name="category"
                            required={true}
                            errors={fetchValidationError("category", validationErrors)}/>
                    </div>
                    <div className={`mt-5 flex items-center ${error ? "justify-between" : "justify-end"}`}>
                        {error && <span className="text-red-500">{error}</span>}
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </div>}
        </div>
    );
};

export default CategoryCreateForm;
