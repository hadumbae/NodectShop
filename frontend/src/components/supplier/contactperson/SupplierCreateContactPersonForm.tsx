import {FC, useState} from 'react';
import FormInput from "../../inputs/FormInput.tsx";
import Button from "../../inputs/Button.tsx";
import SupplierContactService from "../../../services/supplier/SupplierContactService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {fetchValidationError} from "../../../utils/FormUtils.ts";

interface Props {
    supplierID: string;
    supplierSlug: string | undefined;
}

const SupplierCreateContactPersonForm: FC<Props> = ({supplierID, supplierSlug}) => {
    const {token} = useAdminToken();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = {
            name: formData.get('name'),
            title: formData.get('title'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        try {
            setIsLoading(true);
            const {status, payload} = await SupplierContactService.createSupplierContact(supplierID, data, token);

            if (status === 200) {
                toast.success("Contact Person created successfully.");
                navigate(`/admin/supplier/find/${supplierID}/${supplierSlug}`);
            } else {
                if (payload.errors) {
                    setValidationErrors(payload.errors);
                } else {
                    toast.error("Oops. Something bad happened!");
                    console.error(`${status} : ${payload.message}`);
                }
            }
        } catch (error) {
            toast.error("Oops. Something bad happened!")
            console.error(error)
        }

        setIsLoading(false);
    }

    return (
        <div className="bg-white shadow-md border rounded-xl p-5 flex flex-col space-y-3">
            <h1 className="text-xl">Create Contact Person</h1>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <FormInput label={"Name"} inputType={"text"} name={"name"} errors={fetchValidationError("name", validationErrors)} />
                <FormInput label={"Title"} inputType={"text"} name={"title"} errors={fetchValidationError("title", validationErrors)} />
                <FormInput label={"Email"} inputType={"email"} name={"email"} errors={fetchValidationError("email", validationErrors)} />
                <FormInput label={"Phone"} inputType={"text"} name={"phone"} errors={fetchValidationError("phone", validationErrors)} />

                <div className="text-right">
                    <Button type={"submit"} disabled={isLoading}>Create</Button>
                </div>
            </form>
        </div>
    );
};

export default SupplierCreateContactPersonForm;
