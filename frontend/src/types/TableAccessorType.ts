export default interface TableAccessorType {
    name: string;
    headerStyles: string;
    generateRowStyles: (item: any) => string;
    accessor: (item: any) => any;
}