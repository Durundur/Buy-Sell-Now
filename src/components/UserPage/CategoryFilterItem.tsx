import { Flex } from '@chakra-ui/react';
import { CategoryBadge } from './CategoryBadge';
import { useState } from 'react';
import { useEffect } from 'react';
import { MainCategoryStats, SubCategoryStats } from '../../types/ApiDataTypes';

type CategoryFilterItemProps = {
    userId: string, 
    mainCatParam: string,
    subCatParam: string, 
    subSubCatParam: string,
    mainCategoryObject: MainCategoryStats
}

export function CategoryFilterItem({ mainCategoryObject, mainCatParam, subCatParam, subSubCatParam, userId }: CategoryFilterItemProps) {
    const [showSubCat, setShowSubCat] = useState(false);
    return (
        <Flex my={2} gap={2} direction={'column'}>
            <CategoryBadge disableLeftIcon={false} ahref={`/uzytkownik/${userId}/${mainCategoryObject.name}`} expandIconState={showSubCat} onClick={() => { setShowSubCat(!showSubCat) }} categoryName={mainCategoryObject.name} isActive={mainCategoryObject.name === mainCatParam ? true : false} categoryCount={mainCategoryObject.count}></CategoryBadge>
            {
                mainCategoryObject && mainCategoryObject?.subCategory?.map((subCat, i) => {
                    return <SubAndSubSubCatFilterItem userId={userId} subCatParam={subCatParam} subSubCatParam={subSubCatParam} key={subCat.name} hideSubSubCat={!showSubCat} showSubCat={showSubCat} mainCat={mainCategoryObject.name} subCat={subCat}></SubAndSubSubCatFilterItem>
                })
            }
        </Flex>
    )
}

type SubAndSubSubCatFilterItemProps = {
    hideSubSubCat: boolean,
    showSubCat: boolean,
    subCat: SubCategoryStats
    userId: string,
    subCatParam: string,
    subSubCatParam: string,
    mainCat: string
}

export function SubAndSubSubCatFilterItem({ userId, mainCat, subCat, showSubCat, hideSubSubCat, subCatParam, subSubCatParam }: SubAndSubSubCatFilterItemProps) {
    const [showSubSubCat, setShowSubSubCat] = useState(false);

    useEffect(() => {
        if (hideSubSubCat) {
            setShowSubSubCat(false);
        }
    }, [hideSubSubCat]);

    return (
        <>
            <CategoryBadge disableLeftIcon={false} ahref={`/uzytkownik/${userId}/${mainCat}/${subCat.name}`} isActive={subCat.name === subCatParam ? true : false} expandIconState={showSubSubCat} marginLeft={'1rem'} onClick={() => setShowSubSubCat(!showSubSubCat)} display={showSubCat ? 'flex' : 'none'} categoryName={subCat.name} categoryCount={subCat.count}></CategoryBadge>
            {
                subCat?.subSubCategory?.map((subSubCat, i) => {
                    return <CategoryBadge ahref={`/uzytkownik/${userId}/${mainCat}/${subCat.name}/${subSubCat.name}`} isActive={subSubCat.name === subSubCatParam ? true : false} disableLeftIcon={true} key={subSubCat.name + i} marginLeft={'3.5rem'} display={showSubSubCat ? 'flex' : 'none'} categoryName={subSubCat.name} categoryCount={subSubCat.count}></CategoryBadge>
                })
            }
        </>
    )
}

