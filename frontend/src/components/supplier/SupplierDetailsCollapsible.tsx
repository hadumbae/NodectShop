import {FC, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {ZSupplier} from "@/schema/supplier.validate.schema.ts";

import { ChevronsUpDown } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface Props {
    supplier: ZSupplier;
}

const SupplierDetailsCollapsible: FC<Props> = ({supplier}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card>
                <CardContent className="p-3">
                    <CollapsibleTrigger asChild>
                        <div className="flex justify-between items-center cursor-pointer">
                            <span className="text-xl font-bold">Details</span>
                            <ChevronsUpDown className="h-4 w-4" />
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="py-2">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold">Name</TableCell>
                                    <TableCell>{supplier.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Website</TableCell>
                                    <TableCell>{supplier.website}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Email</TableCell>
                                    <TableCell>{supplier.contact.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Phone</TableCell>
                                    <TableCell>{supplier.contact.phone}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Fax</TableCell>
                                    <TableCell>{supplier.contact.fax}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">Address</TableCell>
                                    <TableCell>
                                        {supplier.address.street}, {supplier.address.city}, {supplier.address.state}, {supplier.address.country}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CollapsibleContent>
                </CardContent>
            </Card>
        </Collapsible>

    );
};

export default SupplierDetailsCollapsible;
