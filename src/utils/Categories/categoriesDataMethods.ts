import CategoriesData from '../../components/SelectCategory/CategoriesData';
import categoriesFields from './categoriesFields';
import * as Yup from 'yup';

const createFieldValidationSchema = (fieldType: 'text' | 'number' | 'select', selectOptions?: string[]) => {
	if (fieldType === 'text') {
		return Yup.string().required('Pole obowiązkowe')
	}
	if (fieldType === 'number') {
		return Yup.number().required('Pole obowiązkowe')
	}
	if (fieldType === 'select' && selectOptions) {
		return Yup.mixed().oneOf(selectOptions).required('Pole obowiązkowe')
	}
}

export const createValidationSchemaForCategoriesDetails = (mainCategoryName: string, subCategoryName: string, subSubCategoryName: string) => {
	const categoryData = categoriesFields.find((categoryData) => categoryData.subCategoryName.includes(subCategoryName));
	const YupSchema = new Map();
	categoryData?.fields.map((fieldObj) => {
		const field = fieldObj.name.split('.');
		const fieldGroup = field[0];
		const fieldName = field[1];
		if (fieldGroup === 'details') {
			YupSchema.set(fieldName, createFieldValidationSchema(fieldObj.type as ('text' | 'number' | 'select'), fieldObj?.values))
		}
	})
	return Object.fromEntries(YupSchema);
}

export const createInitialValuesForDetails = (mainCategoryName: string, subCategoryName: string, subSubCategoryName: string) => {
	let initialValues: { [key: string]: string | { [key: string]: string } } = { details: {}, price: {}};
	const categoryData = categoriesFields.find((categoryData) => categoryData.subCategoryName.includes(subCategoryName));
	categoryData?.fields.map((detailField) => {
		const field = detailField.name.split('.');
		const fieldGroup = field[0];
		const fieldName = field[1];
		initialValues[fieldGroup] = {...(initialValues[fieldGroup] as { [key: string]: string }), [fieldName]: ''};
	})
	return initialValues;
}

export const checkIfSubCategoryHasDetailsFields = (subCategoryName: string) => {
	if (subCategoryName) {
		const categoryData = categoriesFields.find((categoryData) => categoryData.subCategoryName.includes(subCategoryName));
		if (categoryData && categoryData.fields.length > 0) return true;
	}
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

export const checkIfCategoryHasPriceField = (mainCategoryName: string, subCategoryName: string, subSubCategoryName: string) => {
	const categoryData = categoriesFields.find((categoryData) => categoryData.subCategoryName.includes(subCategoryName));
	const priceField = categoryData?.fields.find((field) => field.name === 'price.value');
	if (priceField) return true;
	return false;
}
