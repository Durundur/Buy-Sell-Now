import { Text, Button, Flex, Box, Image, useDisclosure, Modal, ModalBody, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent, FormErrorMessage, useFormErrorStyles } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import SecondaryText from '../Layout/SecondaryText';
import CategoriesData from './CategoriesData';
import SelectCategoryLists from './SelectCategoryLists';
import SelectMainCategory from './SelectMainCategory';
import { useEffect } from 'react';
import { checkIfSubSubCategoriesExist } from '../../utils/Categories/categoriesDataMethods';
import { FormControl } from '@chakra-ui/react';
import { clearObjectFields } from '../../utils/utils';

export default function SelectCategory() {
	const [mainCategoryField, mainCategoryMeta, mainCategoryHelpers] = useField('mainCategory');
	const [subCategoryField, subCategoryMeta, subCategoryHelpers] = useField('subCategory');
	const [subSubCategoryField, subSubCategoryMeta, subSubCategoryHelpers] = useField('subSubCategory');
	const [detailsField, detailsMeta, detailsHelpers] = useField('details');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const mainCategory = mainCategoryField.value;
	const subCategory = subCategoryField.value
	const subSubCategory = subSubCategoryField.value

	const setFieldValue = (category: 'mainCategory' | 'subCategory' | 'subSubCategory', value: string) => {
		switch(category){
			case 'mainCategory':
				subCategoryHelpers.setValue(undefined);
				subSubCategoryHelpers.setValue(undefined);
				detailsHelpers.setValue(clearObjectFields(detailsField.value));
				detailsHelpers.setTouched(false);
				mainCategoryHelpers.setValue(value);
				break;
			case 'subCategory':
				subSubCategoryHelpers.setValue(undefined);
				detailsHelpers.setValue(clearObjectFields(detailsField.value));
				subCategoryHelpers.setValue(value);
				break;
			case 'subSubCategory':
				subSubCategoryHelpers.setValue(value);
				break
		}
	}

	let isComplete =
		(Boolean(mainCategory) && Boolean(subCategory) && Boolean(subSubCategory)) ||
		!checkIfSubSubCategoriesExist(mainCategory, subCategory);


	useEffect(() => {
		if (isComplete) {
			onClose();
		}
	}, [isComplete, mainCategory, subCategory, onClose]);

	const closeModal = () => {
		if (isComplete) {
			onClose();
			return;
		}
		setFieldValue('mainCategory', '');
		setFieldValue('subCategory', '');
		setFieldValue('subSubCategory', '');
		onClose();
	};
	
	return (
	<FormControl
		isInvalid={
			(Boolean(mainCategoryMeta?.error) && Boolean(mainCategoryMeta?.touched)) ||
			(Boolean(subCategoryMeta?.error) && Boolean(subCategoryMeta?.touched)) ||
			(Boolean(subSubCategoryMeta?.error) && Boolean(subSubCategoryMeta?.touched))
		}>
		<SelectCategoryButton
			isComplete={isComplete}
			mainCategory={mainCategory}
			subCategory={subCategory}
			subSubCategory={subSubCategory as string}
			onClick={onOpen}
		/>
		<Modal size={'5xl'} isOpen={isOpen} onClose={closeModal}>
			<ModalOverlay />
			<ModalContent color={'blue.900'}>
				<ModalHeader>Wybierz kategorię</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{mainCategory ? (
						<SelectCategoryLists
							onClose={onClose}
							setFieldValue={setFieldValue}
							mainCategory={mainCategory}
							subCategory={subCategory}
							subSubCategory={subSubCategory as string}></SelectCategoryLists>
					) : (
						<SelectMainCategory setFieldValue={setFieldValue}></SelectMainCategory>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
		<Text marginTop={2} fontSize={'sm'} color={'red.500'}>
			{mainCategoryMeta.error || subCategoryMeta.error || subSubCategoryMeta.error}
		</Text>
	</FormControl>
);
}

type SelectCategoryButtonProps = {mainCategory: string, subCategory: string, subSubCategory: string, isComplete: boolean, onClick: () => void}

function SelectCategoryButton({ mainCategory, subCategory, subSubCategory, onClick, isComplete }: SelectCategoryButtonProps) {
	const mainCategoryImage = CategoriesData.find((o) => o.name === mainCategory)?.picture;
	return (
		<Button
			display={'inline-block'}
			onClick={onClick}
			sx={{
				width: 'calc(var(--chakra-sizes-container-sm)/2)',
				height: 'calc(var(--chakra-sizes-container-sm)/10)',
			}}
			variant={'solid'}
			colorScheme={'blue'}>
			{isComplete ? (
				<Flex alignItems={'center'} justifyContent={'space-around'} flexDirection={'row'}>
					<Box
						sx={{
							width: 'calc(var(--chakra-sizes-container-sm)/10)',
							height: 'calc(var(--chakra-sizes-container-sm)/10)',
						}}
						borderRadius={'50%'}>
						<Image alt={''} src={mainCategoryImage}></Image>
					</Box>
					<Box>
						<Text textTransform={'capitalize'} fontWeight={'bold'}>
							{subSubCategory}
						</Text>
						<SecondaryText textTransform={'capitalize'}>
							{mainCategory + ' / ' + subCategory}
						</SecondaryText>
					</Box>
				</Flex>
			) : (
				'Wybierz kategorie'
			)}
		</Button>
	);
}
