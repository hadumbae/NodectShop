import {FC, useState} from 'react';
import {GiCycle} from "react-icons/gi";
import FormInput from "../../inputs/FormInput.tsx";
import useFetchAllCategories from "../../../hooks/category/useFetchAllCategories.ts";
import Button from "../../inputs/Button.tsx";
import {toast} from "react-toastify";
import ProductService from "../../../services/product/ProductService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {fetchValidationError} from "../../../utils/FormUtils.ts";
import FormTextArea from "../../inputs/FormTextArea.tsx";
import FormSelect from "../../inputs/FormSelect.tsx";
import {Product} from "../../../types/ProductTypes.ts";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import Loader from "../../utils/Loader.tsx";
import {CategoryType} from "../../../schema/CategorySchema.ts";

interface Props  {
    product?: Product;
}

const ProductCreateForm: FC<Props> = ({product}) => {
    const navigate = useNavigate();

    const {token} = useAdminToken();
    const {categories, isLoading, error} = useFetchAllCategories(token);
    const [validationErrors, setValidationErrors] = useState([]);

    const [title, setTitle] = useState(product ? product.title : "");
    const [description, setDescription] = useState(product ? product.description : "");
    const [category, setCategory] = useState(product ? product.category!._id : "");

    const clear = () => {
        setTitle("");
        setDescription("");
        setCategory("");
    }

    const submitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const {status, payload} = product ?
                await ProductService.updateProduct(product._id, {title, description, category}, token) :
                await ProductService.createProduct({title, description, category}, token);

            if (status === 200) {
                const productID = product ? product._id : payload._id;
                const productTitle = product ? product.title : payload.title;

                toast.success(`Product ${product ? "updated" : "created"} succcessfully.`);
                return navigate(`/admin/product/find/${productID}/${_.kebabCase(productTitle)}`);
            } else {
                payload.errors && setValidationErrors(payload.errors);
                console.error(`${status} : ${payload.message}`)
            }

        } catch (error) {
            toast.error("Oops. Something bad happened.");
            console.error(error);
        }
    }

    return (
            <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">{product ? "Update" : "Create"} Product</h1>
                    {
                        !isLoading &&
                        <button onClick={clear} className="text-gray-400 hover:text-green-500 hover:animate-spin">
                            <GiCycle/>
                        </button>
                    }
                </div>

                {(!isLoading && !error) ?
                    <form className="flex flex-col space-y-5" onSubmit={submitHandler}>
                        <FormInput
                            label={"Product Title"}
                            inputType={"text"}
                            name={"title"}
                            value={title}
                            changeHandler={setTitle}
                            errors={fetchValidationError("title", validationErrors)}
                        />

                        <FormTextArea
                            label={"Description"}
                            name={description}
                            value={description}
                            changeHandler={setDescription}
                            errors={fetchValidationError("description", validationErrors)}
                        />

                        <FormSelect
                            label={"Category"}
                            name={"category"}
                            value={category}
                            changeHandler={setCategory}
                            errors={fetchValidationError("category", validationErrors)}
                        >
                            <option value="">Select A Category</option>
                            {categories.map(
                                (categoryItem: CategoryType) => <option key={categoryItem._id} value={categoryItem._id}>
                                    {categoryItem.category}
                                </option>
                            )}
                        </FormSelect>


                        <div className="text-right">
                            <Button type={"submit"}>{product ? "Update" : "Create"}</Button>
                        </div>
                    </form> :
                    <div className="text-center">
                       <Loader loading={isLoading || error !== null} />
                    </div>}

                {error && <div className="text-center text-red-500">
                    {error.message ? error.message : "Oops. Something bad happened."}
                </div>}
            </div>
    );
};

export default ProductCreateForm;
