import {FC, PropsWithChildren, useState} from 'react';

import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import {useIsMobile} from "@/hooks/use-mobile.tsx";
import {Button} from "@/components/ui/button.tsx";
import ProductAttributeForm from "@/components/forms/attribute/product.attribute.form.tsx";
import {ZProductAttribute} from "@/schema/product-attribute/product.attribute.validation.ts";

interface Props {
    attribute?: ZProductAttribute;
    onSuccess: (attribute: ZProductAttribute) => void
}

const ProductAttributeFormWrapper: FC<PropsWithChildren<Props>> = ({children, attribute, onSuccess}) => {
    const [open, setOpen] = useState<boolean>(false);
    const isMobile = useIsMobile();

    const onFormSuccess = (attribute: ZProductAttribute) => {
        if (attribute) setOpen(false);
        onSuccess(attribute);
    }

    if (!isMobile) {
        return (<Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{attribute ? "Edit" : "Create"} Product Attribute</DialogTitle>
                    <DialogDescription>
                        {attribute ? "Make changes to product attributes." : "Create new product attributes here."}
                    </DialogDescription>
                </DialogHeader>
                <ProductAttributeForm onSuccess={(attribute: ZProductAttribute) => onFormSuccess(attribute)} attribute={attribute} />
            </DialogContent>
        </Dialog>);
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{attribute ? "Edit" : "Create"} Product Attribute</DrawerTitle>
                    <DrawerDescription>
                        {attribute ? "Make changes to product attributes." : "Create new product attributes here."}
                    </DrawerDescription>
                </DrawerHeader>
                <ProductAttributeForm className="px-4" onSuccess={(attribute: ZProductAttribute) => onFormSuccess(attribute)} attribute={attribute} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default ProductAttributeFormWrapper;
