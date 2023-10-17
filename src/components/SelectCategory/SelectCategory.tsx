import { Text, Button, Flex, Box, Image, useDisclosure, Modal, ModalBody, ModalOverlay, ModalHeader, ModalCloseButton, ModalContent } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import SecondaryText from '../Layout/SecondaryText';
import CategoriesData from './CategoriesData';
import SelectCategoryLists from './SelectCategoryLists';
import SelectMainCategory from './SelectMainCategory';
import { useEffect } from 'react';
import { AdvertQueryType } from '../../types/ApiRequestDataTypes';

export default function SelectCategory() {
	const { values, setFieldValue } = useFormikContext<AdvertQueryType>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const mainCategory = values?.mainCategory;
	const subCategory = values?.subCategory;
	const subSubCategory = values?.subSubCategory;

	const checkIfSubSubCategoriesExist = () => {
		if (mainCategory && subCategory) {
			const subCategoriesMap =
				CategoriesData.find((o) => o.name === mainCategory)?.subcategories || [];
			const subSubCategoriesMap =
				subCategoriesMap.find((o) => o.name === subCategory)?.subsubcategories || [];
			if (subSubCategoriesMap.length === 0) return false;
			return true;
		}
		return true;
	};

	let isComplete =
		(Boolean(mainCategory) && Boolean(subCategory) && Boolean(subSubCategory)) ||
		!checkIfSubSubCategoriesExist();

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
		<>
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
								isComplete={isComplete}
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
		</>
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
			mb={'30px'}
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
