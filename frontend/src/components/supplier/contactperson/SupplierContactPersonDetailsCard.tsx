import {FC, useState} from 'react';
import {ContactPerson, Supplier} from "../../../types/SupplierTypes.ts";

import {FaMailBulk, FaPhone, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import SupplierContactService from "../../../services/supplier/SupplierContactService.ts";
import useAdminToken from "../../../hooks/useAdminToken.ts";
import {Link} from "react-router-dom";
import _ from "lodash";
import {FaPencil} from "react-icons/fa6";

interface Props {
    supplier: Supplier;
    contact: ContactPerson;
    onDelete: (contactID: string) => void;
}

const SupplierContactPersonDetailsCard: FC<Props> = ({supplier, contact, onDelete}) => {
    const {token} = useAdminToken();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const deleteContact = async () => {
        try {
            setIsLoading(true);
            const {status, payload} = await SupplierContactService.deleteSupplierContact(supplier._id, contact._id!, token);

            if (status === 200) {
                toast.success("Contact deleted.")
                onDelete(contact._id!);
            } else {
                toast.error("Oops. Something bad happened!")
                console.error(`${status} : ${payload.message}`);
            }

            setIsLoading(false);
        } catch (error) {
            toast.error("Oops. Something bad happened!")
            console.error(error);
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col space-y-2">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl">{contact.name}</h1>
                    <span className="text-sm text-gray-400">{contact.title}</span>
                </div>

                <div className="flex space-x-6 items-start">
                    <Link to={`/admin/supplier/find/${supplier._id}/${_.kebabCase(supplier.name)}/update-contact/${contact._id}/${_.kebabCase(contact.name)}`}
                          className="text-gray-500 hover:text-black">
                        <FaPencil/>
                    </Link>
                    <button className="text-gray-500 hover:text-red-500 disabled:text-gray-300" onClick={deleteContact}
                            disabled={isLoading}>
                        <FaTrash/>
                    </button>
                </div>
            </div>
            <div className="p-2 flex flex-col justify-center space-y-2 xl:flex-row xl:space-x-3 xl:space-y-0">
                <a href={`mailto:${contact.email}`} className="border rounded-xl p-2 flex items-center space-x-3 hover:shadow-md">
                    <FaMailBulk />
                    <span>{contact.email}</span>
                </a>

                <a href={`tel:${contact.phone}`} className="border rounded-xl p-2 flex items-center space-x-3 hover:shadow-md">
                    <FaPhone />
                    <span>{contact.phone}</span>
                </a>
            </div>
        </div>
    );
};

export default SupplierContactPersonDetailsCard;
