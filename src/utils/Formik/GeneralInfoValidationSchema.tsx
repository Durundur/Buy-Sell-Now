import * as Yup from 'yup';

export const GeneralInfoValidationSchema = Yup.object().shape({
	advertiser: Yup.object().shape({
		name: Yup.string().required('Nazwa jest obowiązkowa').trim(),
		phoneNumber: Yup.string()
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
			.max(13, 'Niepoprawny numer telefonu')
			.required('Pole obowiązkowe')
			.trim(),
		address: Yup.object().when('isCompanyAcc', (value, field) => {
			if(value[0]){
				return field.shape({
					city: Yup.string().required('Lokalizacja jest wymagana'),
					state: Yup.string().required('Lokalizacja jest wymagana'),
					county: Yup.string(),
					lat: Yup.number().required('Lokalizacja jest wymagana'),
					lon: Yup.number().required('Lokalizacja jest wymagana'),
					postcode: Yup.string().required('Pole obowiązkowe'),
					street: Yup.string().required('Pole obowiązkowe'),
					buildingNumber: Yup.number().required('Pole obowiązkowe')})
			}
			return field.shape({
				city: Yup.string().required('Lokalizacja jest wymagana'),
				state: Yup.string().required('Lokalizacja jest wymagana'),
				county: Yup.string(),
				lat: Yup.number().required('Lokalizacja jest wymagana'),
				lon: Yup.number().required('Lokalizacja jest wymagana'),
			})
		}),
		aboutCompany: Yup.string().when('isCompanyAcc', (value, field) => {
			if (value[0]) {
				return field.trim().max(1100, 'Opis jest za długi')
			}
			return field.optional();
		}),
		companyWebsite: Yup.string().when('isCompanyAcc', (value, field) => {
			if (value[0]) {
				return field.matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Niepoprawna wartość').trim().max(50, 'Adres jest za długi')
			}
			return field.optional();
		}),
		email: Yup.string().when('isCompanyAcc', (value, field) => {
			if (value[0]) {
				return field.email('NIeprawidłowy adres').trim().max(50, 'Adres jest za długi')
			}
			return field.optional();
		}),
		nip: Yup.string().when('isCompanyAcc', (value, field) => {
			if (value[0]) {
				return field.trim().max(50, 'Wartość jest za długa')
			}
			return field.optional();
		}),
	})
});


