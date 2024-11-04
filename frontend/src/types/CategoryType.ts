export default interface CategoryType {
    readonly _id: string;
    category: string;
    readonly slug: string;
    products: any[];
}