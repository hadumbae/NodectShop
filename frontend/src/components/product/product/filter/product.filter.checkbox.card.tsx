import {FC, useEffect, useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Minus, Plus} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";

interface Props {
    values: string[];
    setValues: (types: string) => void;
}

type checkType = {
    value: string;
    checked: boolean;
};

const ProductFilterCheckboxCard: FC<Props> = ({values, setValues}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [checkValues, setCheckTypes] = useState(values.map((value: string): checkType => ({value: value, checked: false})));

    useEffect(() => {
        const valueString = checkValues.reduce((acc: string[], cur: checkType): string[] => cur.checked ? [...acc, cur.value] : acc, []).join(",");
        setValues(valueString);
    }, [checkValues]);

    const handleCheck = (index: number) => {
        setCheckTypes(
            checkValues.map((type: checkType, mapIndex: number) => (
                    mapIndex === index ? {value: type.value, checked: !type.checked} : type
            ))
        );
    };

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>Filter By Types</span>
                        <CollapsibleTrigger>
                            {isOpen ? <Minus /> : <Plus />}
                        </CollapsibleTrigger>
                    </CardTitle>
                </CardHeader>
                <CollapsibleContent>
                    <CardContent className="space-y-2">
                        {
                            values.map(
                                (type: string, index: number) => <div
                                    key={index}
                                    className="flex justify-between items-center"
                                >
                                    <Label>{type}</Label>
                                    <Checkbox
                                        checked={checkValues[index].checked}
                                        onCheckedChange={() => handleCheck(index)}
                                    />
                                </div>
                            )
                        }
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
};

export default ProductFilterCheckboxCard;
