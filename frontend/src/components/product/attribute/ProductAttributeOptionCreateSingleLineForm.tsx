import {FC, useState} from 'react';
import {ProductAttributeOption} from "../../../types/ProductAttributeTypes.ts";
import FormInputWithButton from "../../inputs/FormInputWithButton.tsx";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductAttributeOptionService from "../../../services/product/attribute/ProductAttributeOptionService.ts";
import {fetchValidationError} from "../../../utils/FormUtils.ts";

interface props {
    attributeID: string;
    pushOption: (option: ProductAttributeOption) => void;
}

const ProductAttributeOptionCreateSingleLineForm: FC<props> = ({attributeID, pushOption}) => {
    // Token, IsAdmin
    const {token, isAdmin} = useSelector((state: any)=> state.authUser);

    // name set state
    const [name, setName] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    const createOption = async () => {
        try {
            if (!token || !isAdmin) {
                toast.error("Unauthorized!");
                return;
            }

            const {status, payload} = await ProductAttributeOptionService
                .createProductAttributeOption(attributeID,{name: name}, token);

            if (status === 200) {
                toast.success("Option created successfully.");
                setName("");
                pushOption(payload.data);
            }
            else {
                toast.error(payload.message);
                if (payload.errors) setValidationErrors(payload.errors);
                console.error(`${status} : ${payload.message}`)
            }

        } catch (error) {
            toast.error("Oops! Something went wrong!");
            console.error(error);
        }
    }

    return (
        <div>
            <FormInputWithButton
                name={"name"}
                inputType={"text"}
                value={name}
                changeHandler={setName}
                submitHandler={createOption}
                errors={fetchValidationError('name', validationErrors)}
                placeholder={"Create Options"} />
        </div>
    );
};

export default ProductAttributeOptionCreateSingleLineForm;
