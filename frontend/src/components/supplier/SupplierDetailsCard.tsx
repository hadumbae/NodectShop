import {FC} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {SupplierType} from "@/schema/supplier.schema.ts";

interface Props {
    supplier: SupplierType;
}

const SupplierDetailsCard: FC<Props> = ({supplier}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-extrabold">Details</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
};

export default SupplierDetailsCard;
