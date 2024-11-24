import {FC} from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";

interface Props {
    product: any;
}

const BasicProductCard: FC<Props> = ({product}) => {
    return (
        <Card key={product._id} className="rounded-xl overflow-hidden">
            <CardHeader className="p-0 overflow-hidden max-h-60 flex justify-center items-center">
                <img src={product.image.secure_url} className="object-cover" />
            </CardHeader>
            <CardContent className="p-3">
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>
                    {product.category?.category || "No Category"} | {product.type || "No Type"}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-3">
                <Badge variant="outline">SOmething</Badge>
                <Button className="w-1/3">Details</Button>
            </CardFooter>
        </Card>
    );
};

export default BasicProductCard;
