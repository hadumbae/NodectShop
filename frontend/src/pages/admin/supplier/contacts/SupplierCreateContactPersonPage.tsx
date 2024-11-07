import {FC} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import SupplierCreateContactPersonForm from "../../../../components/supplier/contactperson/SupplierCreateContactPersonForm.tsx";

const SupplierCreateContactPersonPage: FC = () => {
    const navigate = useNavigate();
    const {supplierID, slug} = useParams();

    if (!supplierID) {
        toast.error("Invalid Supplier ID");
        navigate("/admin/supplier/list");
    }

    return (
        <div className="mt-2 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl">Supplier Contact Persons</h1>
                <Link to={`/admin/supplier/find/${supplierID}/${slug}`} className="text-lg text-gray-400 hover:text-black hover:underline hover:underline-offset-8">
                    &lt; Back
                </Link>
            </div>

            <div className="flex justify-center">
                <div className="w-2/5">
                    <SupplierCreateContactPersonForm supplierID={supplierID!} supplierSlug={slug} />
                </div>
            </div>
        </div>
    );
};

export default SupplierCreateContactPersonPage;
