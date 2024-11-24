import {FC} from 'react';
import {ZSupplier} from "@/schema/supplier.zod.ts";

interface Props {
    supplier: ZSupplier;
}

const SupplierDetailsBarCard: FC<Props> = ({supplier}) => {
    return (
        <div className="p-2 flex flex-col md:flex-row justify-center items-center space-x-6">
            <div className="flex justify-center items-center space-x-2">
                <span className="text-md font-bold">Email</span>
                <span className="text-md text-gray-600">{supplier.contact.email}</span>
            </div>

            <div className="flex justify-center items-center space-x-2">
                <span className="text-md font-bold">Phone</span>
                <span className="text-md text-gray-600">{supplier.contact.phone}</span>
            </div>

            <div className="flex justify-center items-center space-x-2">
                <span className="text-md font-bold">Fax</span>
                <span className="text-md text-gray-600">{supplier.contact.fax}</span>
            </div>

            <div className="flex justify-center items-center space-x-2">
                <span className="text-md font-bold">Address</span>
                <span className="text-md text-gray-600">
                    {supplier.address.street}, {supplier.address.city}, {supplier.address.state}, {supplier.address.country}
                </span>
            </div>
        </div>
    );
};

export default SupplierDetailsBarCard;
