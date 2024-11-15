import {Supplier} from "./SupplierTypes.ts";
import CategoryType from "./CategoryType.ts";

export interface ProductSKUImage {
    _id: string;
    isPrimary: boolean;
    secure_url: string;
    public_id: string;
}

export interface ProductSKU {
    _id: string;
    product: Product;
    supplier: Supplier;
    name: string;
    code: string;
    unitPrice: number;
    unitStock: number;
    reorderLevel: number;
    isDiscontinued: boolean;
    images: ProductSKUImage[];
    options: [];
}

export interface Product {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: CategoryType | null;
    skus: ProductSKU[];
}