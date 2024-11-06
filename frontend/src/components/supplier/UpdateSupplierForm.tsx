import {FC, useState} from 'react';
import {toast} from "react-toastify";
import FormInput from "../inputs/FormInput.tsx";
import SupplierService from "../../services/supplier/SupplierService.ts";
import {fetchValidationError} from "../../utils/FormUtils.ts";
import Button from "../inputs/Button.tsx";
import {Supplier} from "../../types/SupplierTypes.ts";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

interface Props {
    supplier: Supplier;
}

const UpdateSupplierForm: FC<Props> = ({supplier}) => {
    const navigate = useNavigate();
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    const [validationErrors, setValidationErrors] = useState([]);

    const [name, setName] = useState(supplier.name);
    const [website, setwebsite] = useState(supplier.website);
    const [contactEmail, setContactEmail] = useState(supplier.contact.email);
    const [contactPhone, setContactPhone] = useState(supplier.contact.phone);
    const [contactFax, setContactFax] = useState(supplier.contact.fax);


    const [addressStreet, setAddressStreet] = useState(supplier.address.street);
    const [addressCity, setAddressCity] = useState(supplier.address.city);
    const [addressState, setAddressState] = useState(supplier.address.state);
    const [addressCountry, setAddressCountry] = useState(supplier.address.country);
    const [addressPostalCode, setAddressPostalCode] = useState(supplier.address.postalCode);

    const submitHandler = async (event: any) => {
        event.preventDefault();

        if (!isAdmin) return toast.error("Unauthorized.");

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

            const { status, payload } = await SupplierService.updateSupplier(supplier._id!, data, token);

            if (status === 200) {
                toast.success("Supplier updated.");
                navigate(`/admin/supplier/find/${supplier._id}`);
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
            <h1 className="text-xl">Update Supplier</h1>

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
                    <Button type="submit">Update</Button>
                </div>


            </form>
        </div>
    );
};

export default UpdateSupplierForm;
