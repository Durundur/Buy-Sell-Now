import * as Yup from 'yup';
import { checkIfSubSubCategoriesExist } from './Categories/categoriesDataMethods';

export const ValidationSchema = Yup.object().shape({
	tittle: Yup.string()
		.min(16, 'Tytuł nie może być krótszy niż 16 znaków.')
		.max(100, 'Tytuł musi mieć mniej niż 100 znaków')
		.required('Tytuł jest najważniejszy, nie zapomnij o nim'),
	mainCategory: Yup.string().required('Kategoria jest wymagana'),
	subCategory: Yup.string().required('Kategoria jest wymagana'),
	subSubCategory: Yup.string().when(checkIfSubSubCategoriesExist('mainCategory', 'subCategory').toString(), {
		is: true,
		then: (schema) => schema.required('Kategoria jest wymagana'),
	}),
	description: Yup.string()
		.min(180, 'Min. 180 znaków. Pamiętaj o szczegółowych informacjach czy uszkodzeniach (jeżeli takie występują)')
		.max(9000, 'Opis jest za długi')
		.required('Opis jest wymagany')
		.trim(),

	price: Yup.object().shape({
		value: Yup.number().required('Pole obowiązkowe')
	}),

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
	})
});