import {FC} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {Drawer, DrawerHeader, DrawerTitle, DrawerDescription, DrawerContent, DrawerTrigger} from "@/components/ui/drawer.tsx";

interface Props {
    setChange: (value: string) => void
}

const ProductFilterHasSKUCard: FC<Props> = ({setChange}) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <Drawer>
            <DrawerTrigger>
                Open
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Product Has SKUs</DrawerTitle>
                    <DrawerDescription>Filter by whether products have SKUs.</DrawerDescription>
                </DrawerHeader>
                Yes/NO
            </DrawerContent>
        </Drawer>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Has SKU</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue={""} onValueChange={setChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="option-one" />
                        <Label htmlFor="option-one">All</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="option-yes" />
                        <Label htmlFor="option-yes">Yes</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="option-no" />
                        <Label htmlFor="option-no">No</Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default ProductFilterHasSKUCard;
