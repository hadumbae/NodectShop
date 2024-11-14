import { FC } from 'react';
import IconButtonLink from "../navigation/IconButtonLink.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import BasicCard from "../BasicCard.tsx";
import _ from "lodash";

// TODO: Create ProductSchema in Zod

interface Props {
    product: any
}

const CategoryProductDetailsCard: FC<Props> = ({product}) => {
    const totalUnits = product.skus.reduce((acc: number, cur: any) => acc + cur.unitStock, 0);
    const totalValue = product.skus.reduce((acc: number, cur: any) => acc + (cur.unitStock * cur.unitPrice), 0).toFixed(2);

    return (
        <BasicCard key={product._id}
                   className="flex flex-col space-y-5">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">{product.title}</h1>
                <IconButtonLink
                    to={`/admin/product/find/${product._id}/${_.kebabCase(product.title)}`}>
                    <FaMagnifyingGlass />
                </IconButtonLink>
            </div>

            <div className="flex justify-between ">
                <div className="text-center">
                    <span className="text-5xl">{product.skus.length}</span>
                    <span className="text-md">SKUs</span>
                </div>
                <div className="text-center">
                    <span className="text-5xl">{totalUnits}</span>
                    <span className="text-md">Units</span>
                </div>
                <div className="text-center">
                    <span className="text-5xl">${totalValue}</span>
                    <span className="text-md">Total</span>
                </div>
            </div>
        </BasicCard>
    );
};

export default CategoryProductDetailsCard;
