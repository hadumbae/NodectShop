import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {onMemoChange} from "@/utils/FormUtils.ts";

interface Props {
    setTitle: (title: string) => void;
}

const ProductFilterTitleCard: FC<Props> = ({ setTitle }) => {
    const onTitleChange = onMemoChange(setTitle);

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="text" onChange={onTitleChange} placeholder="Search Products By Title..." />
            </CardContent>
        </Card>
    );
};

export default ProductFilterTitleCard;
