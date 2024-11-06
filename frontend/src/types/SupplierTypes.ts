export interface ContactPerson {
    readonly _id?: string;
    name: string;
    title: string;
    email: string;
    phone: string;
}

export interface Supplier {
    readonly _id?: string;
    name: string;
    website: string;
    contact: {
        email: string;
        phone: string;
        fax: string;
    },
    contactPersons: ContactPerson[],
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    }
}