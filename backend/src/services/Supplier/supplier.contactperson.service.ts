import Supplier from "../../models/Supplier.js";
import createHttpError from "http-errors";

const SupplierContactPersonService = {
    async fetchSupplierContactPerson(supplierID, contactID) {
        const supplier = await Supplier
            .findOne({_id: supplierID, "contactPersons._id": contactID});

        if (!supplier) throw createHttpError(404, "Supplier Contact Person Not Found.")

        return supplier
            .contactPersons
            .find(cp => cp._id.toString() === contactID);
    },

    async createSupplierContactPerson(supplierID, data) {
        console.log(supplierID);
        const supplier = await Supplier
            .findByIdAndUpdate(supplierID, {$push: {"contactPersons": data}}, {new: true});

        console.log(supplier);

        if (!supplier) throw createHttpError(404, "Supplier not found");
        return supplier.contactPersons[supplier.contactPersons.length - 1];
    },

    async updateSupplierContactPerson(supplierID: string, contactID: string, data: any) {
        const supplier = await Supplier
            .findOneAndUpdate(
                {_id: supplierID, "contactPersons._id": contactID},
                {"contactPersons.$": {_id: contactID, ...data}},
                {new: true}
            );

        if (!supplier) throw createHttpError(404, "Supplier not found");
        const contactPerson = supplier.contactPersons.find(x => x._id.toString() === contactID);
        if (!contactPerson) throw createHttpError(404, "Contact person not found");

        return contactPerson;
    },

    async deleteSupplierContactPerson(supplierID: string, contactID: string) {
        const supplier = await Supplier
            .updateOne(
                {_id: supplierID, "contactPersons._id": contactID},
                {$pull: {"contactPersons": {_id: contactID}}}
            );

        if (!supplier) throw createHttpError(404, "Supplier contact person not found");
    },
}

export default SupplierContactPersonService