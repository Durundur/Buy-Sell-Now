import categoriesFields from "./categoriesFields";



export const checkIfSubCategoryHasDetailsFields = (subCategoryName: string) => {
    const categoryData = categoriesFields.find(categoryData => categoryData.subCategoryName.includes(subCategoryName));
    if (categoryData && categoryData.fields.length > 0) return true;
    return false;

}