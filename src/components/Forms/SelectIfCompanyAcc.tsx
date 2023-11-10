import { Box, Flex, FormLabel, Switch } from '@chakra-ui/react';
import { SelectInput } from './SelectInput';
import { useField } from 'formik';

export function SelectIfCompanyAcc() {
	const [field, helpers, meta] = useField('advertiser.isCompanyAcc');
	return (
		<Flex direction={'row'} alignItems={'center'}>
			<FormLabel margin={0} marginRight={4} htmlFor='isCompanyAcc' className={'firstLetterUppercase'} fontWeight={400}>
				konto firmowe
			</FormLabel>
			<Switch size={'md'} {...field} {...helpers} id='isCompanyAcc' />
		</Flex>
	);
}
