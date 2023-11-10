import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { TfiAngleRight } from 'react-icons/tfi';
import CategoriesData from './CategoriesData';

export default function SelectCategoryLists({mainCategory, subCategory, subSubCategory, setFieldValue, onClose}: {mainCategory: string, subCategory: string, subSubCategory: string, setFieldValue: (category: 'mainCategory' | 'subCategory' | 'subSubCategory', value: string) => void, onClose: () => void}) {
	const subCategoriesMap = useMemo(()=> (CategoriesData.find(o => o.name === mainCategory)?.subcategories) || [], [mainCategory]);
	const subSubCategoriesMap = useMemo(()=>(subCategoriesMap.find(o => o.name === subCategory)?.subsubcategories) || [], [subCategory, subCategoriesMap]);

	return (
		<HStack mb={'30px'}>
			<SelectCategoryList>
				{
					CategoriesData?.map((mainCat, index) =><SelectCategoryListItem setFieldValue={() => {
						setFieldValue('mainCategory', mainCat.name);
					}} isActive={mainCat.name === mainCategory} key={'mainCategory-' + index} label={mainCat.name}></SelectCategoryListItem>)

				}
			</SelectCategoryList>
			<SelectCategoryList>
				{
					Array.isArray(subCategoriesMap) ? subCategoriesMap.map((subCat: any, index) =>{
						return <SelectCategoryListItem setFieldValue={()=>{
							setFieldValue('subCategory', subCat.name);
						}} isActive={subCat.name === subCategory} key={'subCategory-' + index} label={subCat.name}></SelectCategoryListItem>
					}) : <></>
				}
			</SelectCategoryList>	
			<SelectCategoryList>
				{
					Array.isArray(subSubCategoriesMap) ? subSubCategoriesMap.map((subSubCat: any, index) => {
						return <SelectCategoryListItem setFieldValue={()=>{
							setFieldValue('subSubCategory', subSubCat);
							onClose();
						}} isActive={subSubCat === subSubCategory} key={'subSubCategory-' + index} label={subSubCat}></SelectCategoryListItem>
					}) : <></>
				} 
			</SelectCategoryList>
		</HStack>
	);
}

function SelectCategoryList({children}: {children: JSX.Element | JSX.Element[]}) {
	return (
		<Box
			width={'100%'}
			paddingX={'10px'}
			height={'lg'}
			overflowY={'auto'}
			sx={{
				'&::-webkit-scrollbar': {
					width: '4px',
					borderRadius: '8px',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: `blue.500`,
					borderRadius: '8px',
				},
			}}>
				{children}
		</Box>
	);
}

function SelectCategoryListItem({label, isActive, setFieldValue}: {label: string, isActive: boolean, setFieldValue: () => void}) {
	return (
		<Flex
			shadow={'md'}
			cursor={'pointer'}
			mb={'10px'}
			key={label}
			onClick={setFieldValue}
			justifyContent={'space-between'}
			alignItems={'center'}
			bg={!isActive ? 'gray.50' : 'gray.200'}
			padding={'20px'}
			borderRadius={'10px'}>
			<Text className='firstLetterUppercase'>{label}</Text>
			<TfiAngleRight />
		</Flex>
	);
}
