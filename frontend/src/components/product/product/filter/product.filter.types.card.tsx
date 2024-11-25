import { FC } from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";

interface Props {
    types: string[];
}

const ProductFilterTypesCard: FC<Props> = ({types}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Filter By Types</CardTitle>
            </CardHeader>
        </Card>
    );
};

export default ProductFilterTypesCard;
