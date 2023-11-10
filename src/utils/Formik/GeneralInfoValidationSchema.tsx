import * as Yup from 'yup';

export const GeneralInfoPersonalValidationSchema =  Yup.object().shape({
	advertiser: Yup.object().shape({
		name: Yup.string().required('Nazwa jest obowiązkowa').trim(),
		phoneNumber: Yup.string()
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
			.max(13, 'Niepoprawny numer telefonu')
			.required('Pole obowiązkowe')
			.trim(),
		address: Yup.object().shape({
			city: Yup.string().required('Lokalizacja jest wymagana'),
			state: Yup.string().required('Lokalizacja jest wymagana'),
			county: Yup.string(),
			lat: Yup.number().required('Lokalizacja jest wymagana'),
			lon: Yup.number().required('Lokalizacja jest wymagana')
		})
	})
});

export const GeneralInfoCompanyValidationSchema = Yup.object().shape({
	advertiser: Yup.object().shape({
		name: Yup.string().required('Nazwa jest obowiązkowa').trim(),
		phoneNumber: Yup.string()
			.matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/)
			.max(13, 'Niepoprawny numer telefonu')
			.required('Pole obowiązkowe')
			.trim(),
		address: Yup.object().shape({
			city: Yup.string().required('Lokalizacja jest wymagana'),
			state: Yup.string().required('Lokalizacja jest wymagana'),
			county: Yup.string(),
			lat: Yup.number().required('Lokalizacja jest wymagana'),
			lon: Yup.number().required('Lokalizacja jest wymagana')
		}),
		aboutCompany: Yup.string().max(1100, 'Opis jest za długi'),
		companyWebsite: Yup.string().url().trim(),
		nip: Yup.string().trim(),
		email: Yup.string().email()
	})
});

