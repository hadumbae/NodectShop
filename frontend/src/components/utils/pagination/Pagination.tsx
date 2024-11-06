import {FC} from 'react';

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    perPage: number;
    setPage: Function;
}

const Pagination: FC<PaginationProps> = ({totalItems, currentPage, perPage, setPage}) => {
    const totalPages = Math.ceil(totalItems / perPage);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;


    const baseButtonClasses = "hover:underline underline-offset-8 p-3";
    const paginationButtons = Array.from(
        {length: totalPages},
        (_, i: number) => <button
            className={currentPage == (i+1) ? `${baseButtonClasses} font-extrabold underline` : `${baseButtonClasses} font-bold text-gray-400 hover:text-gray-600`}
            onClick={() => setPage(i + 1)}
        >{i +1}</button>
    );

    return (
        <div className="flex flex-wrap justify-center items-center space-x-8">
            {hasPreviousPage && <button
                className={`${baseButtonClasses} font-bold text-gray-400 hover:text-gray-600`}
                onClick={() => setPage(currentPage - 1)}> &lt; </button>}
            {...paginationButtons}
            {hasNextPage && <button
                className={`${baseButtonClasses} font-bold text-gray-400 hover:text-gray-600`}
                onClick={() => setPage(currentPage + 1)}> &gt; </button>}
        </div>
    );
};

export default Pagination;
