import CategoriesData from '../../components/SelectCategory/CategoriesData';
import categoriesFields from './categoriesFields';

export const checkIfSubCategoryHasDetailsFields = (subCategoryName: string) => {
	const categoryData = categoriesFields.find((categoryData) => categoryData.subCategoryName.includes(subCategoryName));
	if (categoryData && categoryData.fields.length > 0) return true;
	return false;
};

export const checkIfSubSubCategoriesExist = (mainCategory: string, subCategory: string) => {
	if (mainCategory && subCategory) {
		const subCategoriesMap = CategoriesData.find((o) => o.name === mainCategory)?.subcategories || [];
		const subSubCategoriesMap = subCategoriesMap.find((o) => o.name === subCategory)?.subsubcategories || [];
		if (subSubCategoriesMap.length === 0) return false;
		return true;
	}
	return true;
};
