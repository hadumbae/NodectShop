import {FC, useState} from 'react';
import {Supplier} from "../../../types/SupplierTypes.ts";
import SupplierContactPersonDetailsCard from "./SupplierContactPersonDetailsCard.tsx";

interface Props {
    supplier: Supplier;
}

const SupplierContactPersonsList: FC<Props> = ({supplier}) => {
    const [contacts, setContacts] = useState(supplier.contactPersons);

    const contactDeleted = (contactID: string) => {
        setContacts(contacts.filter(contact => contact._id != contactID));
    }

    return (
        <div className="flex flex-col space-y-2
        sm:flex-row sm:space-x-2 sm:space-y-0
        lg:flex-col lg:space-y-4 lg:space-x-0">
            {contacts.map((contact: any) => <div className="sm:w-1/2 lg:w-full">
                <SupplierContactPersonDetailsCard key={contact._id} supplier={supplier} contact={contact} onDelete={contactDeleted} />
            </div>)}
        </div>
    );
};

export default SupplierContactPersonsList;
