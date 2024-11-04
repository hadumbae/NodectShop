import {FC} from 'react';

interface ListTableProps {
    accessors: any[],
    data: Array<any>;
}

const ListTable: FC<ListTableProps> = ({accessors, data}) => {
    return (
        <table className="w-full ">
            <thead>
                <tr className="text-left">
                    {accessors.map(
                        (column: any, index: number) => <th key={index} className={`py-3 ${column.headerStyles}`}>
                            {column.name}
                        </th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((category: any, index: number) => (
                    <tr key={index} className="border-y">
                        {accessors.map((column: any, index: number) => (
                            <td key={index} className={`py-3 ${column.generateRowStyles(category)}`}>
                                {column.accessor(category)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListTable;
