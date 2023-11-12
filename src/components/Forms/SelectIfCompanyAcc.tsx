import { Flex, FormLabel, Switch } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { GeneralInfoCompanyInitialValues, GeneralInfoPersonalInitialValues } from '../../utils/Formik/GeneralInfoInitialValues';

export function SelectIfCompanyAcc() {
	const [field] = useField('advertiser.isCompanyAcc');
	const { resetForm } = useFormikContext();

	useEffect(()=>{
		resetForm({values: {advertiser: field.value ? GeneralInfoCompanyInitialValues : GeneralInfoPersonalInitialValues}})
	}, [field.value])

	return (
		<Flex direction={'row'} alignItems={'center'}>
			<FormLabel margin={0} marginRight={4} htmlFor='isCompanyAcc' className={'firstLetterUppercase'} fontWeight={400}>
				konto firmowe
			</FormLabel>
			<Switch defaultChecked={field.value} size={'md'} {...field} id='isCompanyAcc' />
		</Flex>
	);
}
