const ProductPaginatedAdminService = {
    fetchPaginationQuery(pageQuery) {
        const conditions = {};

        const page = pageQuery.page || 1;
        const perPage = pageQuery.perPage || 15;

        return {page, perPage, conditions};
    },
};

export default ProductPaginatedAdminService;
