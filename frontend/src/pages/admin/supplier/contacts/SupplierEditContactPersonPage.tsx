import {FC} from 'react';
import {Link} from "react-router-dom";
import SupplierUpdateContactPersonForm from "../../../../components/supplier/contactperson/SupplierUpdateContactPersonForm.tsx";
import useAdminToken from "../../../../hooks/useAdminToken.ts";
import useFetchSupplierContact from "../../../../hooks/Supplier/useFetchSupplierContact.ts";
import Loader from "../../../../components/utils/Loader.tsx";
import useSupplierContactPersonParam from "../../../../hooks/Supplier/useSupplierContactPersonParam.ts";

const SupplierCreateContactPersonPage: FC = () => {
    const {supplierID, supplierSlug, contactID} = useSupplierContactPersonParam();

    const {token} = useAdminToken();
    const {contact} = useFetchSupplierContact(supplierID!, contactID!, token);

    return (
        <div className="mt-2 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Supplier Contact Persons</h1>
                <Link to={`/admin/supplier/find/${supplierID}/${supplierSlug}`} className="text-lg text-gray-400 hover:text-black hover:underline hover:underline-offset-8">
                    &lt; Back
                </Link>
            </div>

            {contact ? <div className="flex justify-center">
                <div className="w-2/5">
                    <SupplierUpdateContactPersonForm supplierID={supplierID!} supplierSlug={supplierSlug}
                                                     contact={contact!}/>
                </div>
            </div> : <div className="flex justify-center">
                <Loader loading={true} />
            </div>}
        </div>
    );
};

export default SupplierCreateContactPersonPage;
