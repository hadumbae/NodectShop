import { FC } from 'react';
import {CategoryType} from "@/schema/CategorySchema.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";

interface Props {
    category: CategoryType;
}

const CategoryDetailsCard: FC<Props> = ({category}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-end">
                    <span className="text-lg">Mode</span>
                    <span className="text-5xl font-bold">{category.mode}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {category.mode === "MANUAL" && <div className="grid grid-cols-3 gap-4">
                    <div className="flex justify-center items-end space-x-2">
                        <span className="text-3xl font-semibold md:text-4xl md:font-bold">{category.products.length}</span>
                        <span className="text-md font-medium md:text-xl md:font-semibold">
                            {category.products.length === 1 ? "Product" : "Products"}
                        </span>
                    </div>
                    <div className="flex justify-center items-end">Orders</div>
                    <div className="flex justify-center items-end">Total Values</div>
                </div>}
            </CardContent>
        </Card>
    );
};

export default CategoryDetailsCard;
