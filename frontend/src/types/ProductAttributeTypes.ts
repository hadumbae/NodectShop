export interface ProductAttributeType {
    readonly _id?: string;
    name: string;
    options: ProductAttributeOptionType[];
}

export interface ProductAttributeOptionType {
    readonly _id?: string;
    name: string;
    attribute: string;
}