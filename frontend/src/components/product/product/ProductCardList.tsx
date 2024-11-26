import {FC} from 'react';
import ProductListCard from "./ProductListCard.tsx";
import {ZProduct} from "@/schema/product.validate.schema.ts";

interface Props {
    products: ZProduct[];
}

const ProductCardList: FC<Props> = ({products}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {
                products.map(
                    (product: ZProduct) => <ProductListCard
                        key={product._id}
                        product={product}
                    />
                )
            }
        </div>
    );
};

export default ProductCardList;
