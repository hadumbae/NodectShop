import {FC} from 'react';
import ProductListCard from "./ProductListCard.tsx";
import {Product} from "../../../types/ProductTypes.ts";

interface Props {
    products: Product[];
}

const ProductCardList: FC<Props> = ({products}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {products.map((product: Product) => <ProductListCard key={product._id} product={product} />)}
        </div>
    );
};

export default ProductCardList;
