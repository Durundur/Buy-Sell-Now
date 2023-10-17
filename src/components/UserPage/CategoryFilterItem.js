import { Flex } from '@chakra-ui/react';
import { CategoryBadge } from './CategoryBadge';
import { useState } from 'react';
import { useEffect } from 'react';

export function CategoryFilterItem({ categoriesObj, mainCatParam, subCatParam, subSubCatParam, userId }) {
    const [showSubCat, setShowSubCat] = useState(false)
    return (
        <Flex my={2} gap={2} direction={'column'}>
            <CategoryBadge ahref={`/uzytkownik/${userId}/${categoriesObj.name}`} expandedIconState={showSubCat} onClick={() => { setShowSubCat(!showSubCat) }} categoryName={categoriesObj.name} state={categoriesObj.name === mainCatParam ? 'active' : null} badgeText={categoriesObj?.count}></CategoryBadge>
            {
                categoriesObj?.subCategory?.map((subCat, i) => {
                    return <SubAndSubSubCatFilterItem userId={userId} subCatParam={subCatParam} subSubCatParam={subSubCatParam} key={subCat.name} hideSubSubCat={!showSubCat} showSubCat={showSubCat} mainCat={categoriesObj.name} subCat={subCat}></SubAndSubSubCatFilterItem>
                })
            }
        </Flex>
    )
}

export function SubAndSubSubCatFilterItem({ userId, mainCat, subCat, showSubCat, hideSubSubCat, subCatParam, subSubCatParam }) {
    const [showSubSubCat, setShowSubSubCat] = useState(false)

    useEffect(() => {
        if (hideSubSubCat) {
            setShowSubSubCat(false);
        }
    }, [hideSubSubCat]);

    return (
        <>
            <CategoryBadge ahref={`/uzytkownik/${userId}/${mainCat}/${subCat.name}`} state={subCat.name === subCatParam ? 'active' : null} expandedIconState={showSubSubCat} marginLeft={'1rem'} onClick={() => setShowSubSubCat(!showSubSubCat)} display={showSubCat ? null : 'none'} categoryName={subCat.name} badgeText={subCat.count}></CategoryBadge>
            {
                subCat?.subSubCategory?.map((subSubCat, i) => {
                    return <CategoryBadge ahref={`/uzytkownik/${userId}/${mainCat}/${subCat.name}/${subSubCat.name}`} state={subSubCat.name === subSubCatParam ? 'active' : null} disableLeftIcon={true} key={subSubCat.name + i} marginLeft={'3.5rem'} display={showSubSubCat ? null : 'none'} categoryName={subSubCat.name} badgeText={subSubCat.count}></CategoryBadge>
                })
            }
        </>
    )
}

