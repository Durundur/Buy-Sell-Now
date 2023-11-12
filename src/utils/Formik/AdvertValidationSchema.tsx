import * as Yup from 'yup';
import { checkIfCategoryHasPriceField, checkIfSubSubCategoriesExist, createValidationSchemaForCategoriesDetails } from '../Categories/categoriesDataMethods';

export const AdvertValidationSchema = Yup.object().shape({
	tittle: Yup.string()
		.min(16, 'Tytuł nie może być krótszy niż 16 znaków.')
		.max(100, 'Tytuł musi mieć mniej niż 100 znaków')
		.required('Tytuł jest najważniejszy, nie zapomnij o nim'),
	mainCategory: Yup.string().required('Kategoria jest wymagana'),
	subCategory: Yup.string().required('Kategoria jest wymagana'),
	subSubCategory: Yup.string().when(['mainCategory', 'subCategory'], (categories, field) => {
		if (checkIfSubSubCategoriesExist(categories[0], categories[1])) {
			return field.required('Kategoria jest wymagana');
		}
		return field.notRequired();
	}),
	description: Yup.string()
		.min(180, 'Min. 180 znaków. Pamiętaj o szczegółowych informacjach czy uszkodzeniach (jeżeli takie występują)')
		.max(9000, 'Opis jest za długi')
		.required('Opis jest wymagany')
		.trim(),

	advertiser: Yup.object().shape({
		name: Yup.string()
			.min(3, 'Osoba kontaktowa powinna mieć więcej niż 3 znaków')
			.max(70, 'Osoba kontaktowa nie powinna mieć więcej niż 70 znaków')
			.required('Osoba kontaktowa jest wymagana'),
		phoneNumber: Yup.string()
			.matches(
				/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
				'Number musi składać się z cyfr'
			)
			.max(13, 'Niepoprawny numer telefonu')
			.required('Number telefonu jest obowiązkowy')
			.trim()
	}),
	address: Yup.object().shape({
		city: Yup.string().required('Lokalizacja jest wymagana'),
		state: Yup.string().required('Lokalizacja jest wymagana'),
		county: Yup.string(),
		lat: Yup.number().required('Lokalizacja jest wymagana'),
		lon: Yup.number().required('Lokalizacja jest wymagana')
	}),

	price: Yup.object().when(['mainCategory', 'subCategory', 'subSubCategory'], (categories, field) => {
		if(checkIfCategoryHasPriceField(categories[0], categories[1], categories[2])){
			return field.shape({ value: Yup.number().required('Pole obowiązkowe')})
		}
		return field.optional();
	}),
	details: Yup.object().when(['mainCategory', 'subCategory', 'subSubCategory'], (categories, field) => {
		return field.shape(createValidationSchemaForCategoriesDetails(categories[0], categories[1], categories[2]));
	})
});


