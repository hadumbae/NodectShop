import {FC, useEffect, useState} from 'react';
import {GiCycle} from "react-icons/gi";
import FormInput from "../../inputs/FormInput.tsx";
import Button from "../../inputs/Button.tsx";
import {toast} from "react-toastify";
import ProductService from "../../../services/product/product.service.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {fetchValidationError} from "../../../utils/FormUtils.ts";
import FormTextArea from "../../inputs/FormTextArea.tsx";
import {useNavigate} from "react-router-dom";
import _ from "lodash";
import Loader from "../../utils/Loader.tsx";
import FormFileInput from "../../inputs/FormFileInput.tsx";
import {ZProduct} from "@/schema/product.validate.schema.ts";

interface Props  {
    product?: any;
}

const ProductCreateForm: FC<Props> = ({product}) => {
    const navigate = useNavigate();

    const {token} = useAdminToken();

    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (product) setValue(product);
    }, []);

    const submitHandler = async (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        const data: any = new FormData();

        data.append("title", title);
        data.append("description", description);
        data.append("tags", tags);
        data.append("image", image);
        data.append("type", type);

        const {status, payload} = product ?
            await ProductService.updateProduct(product._id, data, token) :
            await ProductService.createProduct(data, token);

        if (status === 200) {
            const productID = product ? product._id : payload.data._id;
            const productTitle = product ? product.title : payload.data.title;

            toast.success(`Product ${product ? "updated" : "created"} succcessfully.`);
            return navigate(`/admin/product/find/${productID}/${_.kebabCase(productTitle)}`);
        } else {
            payload.errors && setValidationErrors(payload.errors);
            console.error(`${status} : ${payload.message}`)
        }

        setIsLoading(false);
    }

    const setValue = (values: ZProduct | null = null) => {
        setError(null);
        setValidationErrors([]);

        setTitle(values?.title || "");
        setDescription(values?.description || "");
        setType(values?.type || "");
        setTags(values?.tags.join(",") || "");
        setImage(null);
    }

    return (<>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-3">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">{product ? "Update" : "Create"} Product</h1>

                <button onClick={() => setValue()} className="text-gray-400 hover:text-green-500 hover:animate-spin">
                    <GiCycle/>
                </button>
            </div>

            {!isLoading &&
                <form className="flex flex-col space-y-5" onSubmit={submitHandler}>
                    <FormInput
                        label={"Product Title"}
                        inputType={"text"}
                        name={"title"}
                        value={title}
                        changeHandler={setTitle}
                        errors={fetchValidationError("title", validationErrors)}
                    />

                    <FormInput
                        label={"Product Type"}
                        inputType={"text"}
                        name={"type"}
                        value={type}
                        changeHandler={setType}
                        errors={fetchValidationError("type", validationErrors)}
                    />

                    <FormTextArea
                        label={"Description"}
                        name={description}
                        value={description}
                        changeHandler={setDescription}
                        errors={fetchValidationError("description", validationErrors)}
                    />

                    <FormFileInput
                        label="Image"
                        errors={fetchValidationError("image", validationErrors)}
                        changeHandler={setImage}/>

                    <FormInput
                        label={"Tags (Separate By Commas)"}
                        inputType={"text"}
                        name={"tags"}
                        value={tags}
                        changeHandler={setTags}
                        errors={fetchValidationError("tags", validationErrors)}
                    />


                    <div className="text-right">
                        <Button type={"submit"}>{product ? "Update" : "Create"}</Button>
                    </div>
                </form>}

            {isLoading && <div className="text-center">
                <Loader loading={isLoading || error !== null}/>
            </div>}

            {error && <div className="text-center text-red-500">
                {error.message ? error.message : "Oops. Something bad happened."}
            </div>}
        </div>

    </>);
};

export default ProductCreateForm;
