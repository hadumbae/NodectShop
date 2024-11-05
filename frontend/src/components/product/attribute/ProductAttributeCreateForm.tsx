import {FC, useState} from 'react';
import FormInput from "../../inputs/FormInput.tsx";
import Button from "../../inputs/Button.tsx";
import ProductAttributeService from "../../../services/product/attribute/ProductAttributeService.ts";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import { fetchValidationError } from "../../../utils/FormUtils.ts";

interface props {
    refetch?: Function
}

const ProductAttributeCreateForm: FC<props> = ({refetch}) => {
    // Find Token
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState("");

    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (token && isAdmin) {
            const {status, payload} = await ProductAttributeService
                .createProductAttribute({name: formData.get('name')}, token);

            if (status === 200) {
                setName("");
                toast.success("Attribute created successfully.");
                if (refetch) refetch();
            } else if (status === 400) {
                setValidationErrors(payload.errors);
            } else {
                toast.error("Error!");
            }
        }

    }

    return (
        <div className="bg-white rounded shadow-md p-5">
            <form onSubmit={submitHandler}>
                <FormInput
                    label={"Create Attribute"}
                    inputType={"text"}
                    name={"name"}
                    value={name}
                    changeHandler={setName}
                    errors={fetchValidationError("name", validationErrors)}
                />
                <div className="text-right mt-3">
                    <Button type="submit" textSizeClass="text-sm" paddingClass="p-2">Create</Button>
                </div>
            </form>
        </div>
    );
};

export default ProductAttributeCreateForm;
