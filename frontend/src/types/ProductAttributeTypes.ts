export interface ProductAttribute {
    readonly _id: string;
    name: string;
    options: ProductAttributeOption[];
}

export interface ProductAttributeOption {
    readonly _id: string;
    name: string;
    attribute: string;
}