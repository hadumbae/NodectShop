import {FC, useState} from 'react';
import FormInput from "../../inputs/FormInput.tsx";
import Button from "../../inputs/Button.tsx";
import SupplierContactService from "../../../services/supplier/SupplierContactService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {fetchValidationError} from "../../../utils/FormUtils.ts";
import {ContactPerson} from "../../../types/SupplierTypes.ts";

interface Props {
    supplierID: string;
    supplierSlug: string | undefined;
    contact: ContactPerson;
}

const SupplierUpdateContactPersonForm: FC<Props> = ({supplierID, supplierSlug, contact}) => {
    const {token} = useAdminToken();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState([]);

    const [name, setName] = useState(contact.name);
    const [title, setTitle] = useState(contact.title);
    const [email, setEmail] = useState(contact.email);
    const [phone, setPhone] = useState(contact.phone);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const data = {name, title, email, phone};

        try {
            setIsLoading(true);
            const {status, payload} = await SupplierContactService.updateSupplierContact(supplierID, contact._id, data, token);

            if (status === 200) {
                toast.success("Contact Person updated successfully.");
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
            <h1 className="text-xl">Update Contact Person</h1>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <FormInput label={"Name"} inputType={"text"} name={"name"} errors={fetchValidationError("name", validationErrors)} value={name} changeHandler={setName} />
                <FormInput label={"Title"} inputType={"text"} name={"title"} errors={fetchValidationError("title", validationErrors)} value={title} changeHandler={setTitle} />
                <FormInput label={"Email"} inputType={"email"} name={"email"} errors={fetchValidationError("email", validationErrors)} value={email} changeHandler={setEmail} />
                <FormInput label={"Phone"} inputType={"text"} name={"phone"} errors={fetchValidationError("phone", validationErrors)} value={phone} changeHandler={setPhone} />

                <div className="text-right">
                    <Button type={"submit"} disabled={isLoading}>Update</Button>
                </div>
            </form>
        </div>
    );
};

export default SupplierUpdateContactPersonForm;
