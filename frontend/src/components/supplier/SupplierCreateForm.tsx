import {FC, useState} from 'react';
import {toast} from "react-toastify";
import FormInput from "../inputs/FormInput.tsx";
import SupplierService from "../../services/supplier/SupplierService.ts";
import {fetchValidationError} from "../../utils/FormUtils.ts";
import Button from "../inputs/Button.tsx";
import useAdminToken from "../../hooks/useAdminToken.ts";
import {CategoryType} from "@/schema/CategorySchema.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    category?: CategoryType;
}

const SupplierCreateForm: FC<Props> = ({category}) => {
    console.log(category);

    const {token} = useAdminToken();
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);

    const [name, setName] = useState("");
    const [website, setwebsite] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactFax, setContactFax] = useState("");


    const [addressStreet, setAddressStreet] = useState("");
    const [addressCity, setAddressCity] = useState("");
    const [addressState, setAddressState] = useState("");
    const [addressCountry, setAddressCountry] = useState("");
    const [addressPostalCode, setAddressPostalCode] = useState("");

    const submitHandler = async (event: any) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target)
            const data = {
                name: formData.get("name"),
                website: formData.get("website"),
                contact: {
                    email: formData.get("contactEmail"),
                    phone: formData.get("contactPhone"),
                    fax: formData.get("contactFax")
                },
                address: {
                    street: formData.get("addressStreet"),
                    city: formData.get("addressCity"),
                    state: formData.get("addressState"),
                    country: formData.get("addressCountry"),
                    postalCode: formData.get("addressPostalCode"),
                }
            };

            const { status, payload } = await SupplierService.createSupplier(data, token);

            if (status === 200) {
                toast.success("Supplier created.");
                setValidationErrors([]);
                navigate("/admin/supplier/list");
            } else {
                payload.errors && setValidationErrors(payload.errors);
                console.error(`${status} : ${payload.message}`)
            }
        } catch (error) {
            toast.error("Oops. Somethign bad happened!");
            error && console.error(error)
        }
    }

    return (
        <div className="bg-white shadow rounded-md p-5">
            <h1 className="text-xl">Create Supplier</h1>

            <form onSubmit={submitHandler}>
                <div className="flex flex-col sm:flex-row space-x-6">
                    <div className="w-full sm:w-1/2 bg-blue">
                        <h3 className="text-lg mt-3">Supplier</h3>
                        <fieldset className="border rounded-xl p-3 flex flex-col space-y-3">
                            <FormInput errors={fetchValidationError("name", validationErrors)} label={"Name"}
                                       inputType={"text"} name={"name"} value={name}
                                       changeHandler={setName} required={true}/>
                            <FormInput errors={fetchValidationError("website", validationErrors)} className="mt-5"
                                       label={"Website"} inputType={"text"} name={"website"}
                                       value={website} changeHandler={setwebsite} required={true}/>
                        </fieldset>

                        <h3 className="text-lg mt-5">Contact</h3>
                        <fieldset className="border rounded-xl p-3 flex flex-col space-y-3">
                            <FormInput errors={fetchValidationError("contact.email", validationErrors)} inputType="text"
                                       label="contactEmail" name="contactEmail" value={contactEmail}
                                       changeHandler={setContactEmail} required={false}/>
                            <FormInput errors={fetchValidationError("contact.contactPhone", validationErrors)}
                                       className="mt-5" inputType="text" label="contactPhone" name="contactPhone"
                                       value={contactPhone} changeHandler={setContactPhone} required={false}/>
                            <FormInput errors={fetchValidationError("contact.fax", validationErrors)} className="mt-5"
                                       inputType="text" label="contactFax" name="contactFax"
                                       value={contactFax} changeHandler={setContactFax} required={false}/>
                        </fieldset>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <h3 className="text-lg mt-3">Address</h3>
                        <fieldset className="border rounded-xl p-3 flex flex-col space-y-5">
                            <FormInput errors={fetchValidationError("address.street", validationErrors)} label="Street"
                                       inputType="text" name="addressStreet" value={addressStreet}
                                       changeHandler={setAddressStreet} required={true}/>
                            <FormInput errors={fetchValidationError("address.city", validationErrors)} label="City"
                                       inputType="text" name="addressCity" value={addressCity}
                                       changeHandler={setAddressCity} required={true}/>
                            <FormInput errors={fetchValidationError("address.state", validationErrors)} label="State"
                                       inputType="text" name="addressState" value={addressState}
                                       changeHandler={setAddressState} required={true}/>
                            <FormInput errors={fetchValidationError("address.country", validationErrors)}
                                       label="Country" inputType="text" name="addressCountry" value={addressCountry}
                                       changeHandler={setAddressCountry} required={true}/>
                            <FormInput errors={fetchValidationError("address.postalCode", validationErrors)}
                                       label="PostalCode" inputType="text" name="addressPostalCode"
                                       value={addressPostalCode} changeHandler={setAddressPostalCode} required={true}/>
                        </fieldset>
                    </div>
                </div>

                <div className="w-full text-right mt-5">
                    <Button type="submit">Create</Button>
                </div>


            </form>
        </div>
    );
};

export default SupplierCreateForm;
