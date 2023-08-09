import { Flex } from '@chakra-ui/react';
import { CategoryBadge } from './CategoryBadge';
import { useState } from 'react';
import { useEffect } from 'react';

export function CatBadge({ categoriesObj }) {
    const [showSubCat, setShowSubCat] = useState(false)
    return (
        <Flex direction={'column'}>
            <CategoryBadge onClick={() => {
                setShowSubCat(!showSubCat)
            }} categoryName={categoriesObj?.name} badgeText={categoriesObj?.count}></CategoryBadge>
            {
                categoriesObj?.subCategory?.map((subCat, i) => {
                    return <SubCatBadge key={i} hideSubSubCat={!showSubCat} showSubCat={showSubCat} subCat={subCat}></SubCatBadge>
                })
            }
        </Flex>
    )
}


export function SubCatBadge({ subCat, showSubCat, hideSubSubCat }) {
    const [showSubSubCat, setShowSubSubCat] = useState(false)

    useEffect(() => {
        if (hideSubSubCat) {
            setShowSubSubCat(false);
        }
    }, [hideSubSubCat]);

    return (
        <>
            <CategoryBadge key={subCat.name} marginLeft={'1rem'} onClick={() => setShowSubSubCat(!showSubSubCat)} display={showSubCat ? null : 'none'} categoryName={subCat.name} badgeText={subCat.count}></CategoryBadge>
            {
                subCat?.subSubCategory?.map((subSubCat, i) => {
                    return <CategoryBadge key={subSubCat.name + i} marginLeft={'2rem'} display={showSubSubCat ? null : 'none'} categoryName={subSubCat.name} badgeText={subSubCat.count}></CategoryBadge>
                })
            }
        </>
    )
}