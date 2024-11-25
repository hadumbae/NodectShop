import { FC } from 'react';
import {ZCategory} from "@/schema/category.validate.schema.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";

interface Props {
    category: ZCategory;
}

const CategoryDetailsCard: FC<Props> = ({category}) => {
    return (
        <Card>
            <CardContent className="flex justify-between items-center p-4">
                <span className="text-lg">Mode</span>
                <span className="text-3xl font-bold">{category.mode}</span>
            </CardContent>
        </Card>
    );
};

export default CategoryDetailsCard;
