import {FC, useState} from 'react';
import {Supplier} from "../../types/SupplierTypes.ts";
import {MdAlternateEmail} from "react-icons/md";
import {FaPhone, FaFax, FaTrash} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import SupplierService from "../../services/supplier/SupplierService.ts";
import _ from "lodash";

interface Props {
    supplier: Supplier;
    onDelete: (supplierID: string) => void;
}

const SupplierDetailsCard: FC<Props> = ({supplier, onDelete}) => {
    const {token, isAdmin} = useSelector((state: any) => state.authUser);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (!token || !isAdmin) {
            toast.error("Unauthorized!");
            return
        }

        setIsLoading(true);

        const {status, payload} = await SupplierService.deleteSupplier(supplier._id!, token);


        if (status === 200) {
            toast.success("Supplier deleted successfully.");
            onDelete(supplier._id!);
        } else {
            toast.error("Oops. Something bad happened!");
            console.error(`${status}: ${payload.message}`);
        }

        setIsLoading(false);
    }

    return (
        <div className="bg-white border rounded-lg shadow-md p-5">
            <div className="flex justify-between items-center">

                {/* Supplier Details */}

                <div>
                    <h1 className="text-2xl">{supplier.name}</h1>
                    <span>
                        <a href={supplier.website}
                           className="text-sm text-gray-400 hover:text-blue-600 hover:underline">
                            {supplier.website}
                        </a>
                    </span>
                </div>

                {/* Details And Delete */}

                <div className="flex justify-end space-x-1 items-center">
                    <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}`}
                          className="text-gray-400 hover:text-yellow-500 p-3">
                        <FaMagnifyingGlass/>
                    </Link>
                    <button className="text-gray-600 disabled:text-gray-200 hover:text-red-500 p-3" onClick={handleDelete} disabled={isLoading}>
                        <FaTrash/>
                    </button>
                </div>
            </div>

            {/* Supplier Contact Details */}

            <div className="flex justify-center items-center space-x-2 mt-2">
                {supplier.contact.email && <a href={`mailto:${supplier.contact.email}`}
                                              className="text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-1 hover:shadow-md hover:border-black">
                    <MdAlternateEmail/>
                    <span>{supplier.contact.email}</span>
                </a>}
                {supplier.contact.phone && <a href={`tel:${supplier.contact.phone}`}
                                              className="text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-3 hover:shadow-md hover:border-black">
                    <FaPhone/>
                    <span>{supplier.contact.phone}</span>
                </a>}
                {supplier.contact.fax && <a href={`fax:${supplier.contact.fax}`}
                                            className="text-sm border border-gray-200 rounded-xl p-2 flex justify-center items-center space-x-3 hover:shadow-md hover:border-black">
                    <FaFax/>
                    <span>{supplier.contact.fax}</span>
                </a>}
            </div>

            {/* Supplier Address */}
            <div className="text-sm mt-3 flex justify-center space-x-3">
                <span>{supplier.address.street}, </span>
                <span>{supplier.address.city}, </span>
                <span>{supplier.address.state}</span>
                <span>{supplier.address.country}</span>
            </div>
        </div>
    );
};

export default SupplierDetailsCard;
