export const fetchValidationError = (accessor: string, errors: any[]) => {
    return errors.filter((error: any) => error.path === accessor).map((error: any) => error.msg);
}