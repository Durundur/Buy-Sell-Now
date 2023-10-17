import { Flex, Image, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { FormikErrors } from "formik/dist/types";
import CategoriesData from "./CategoriesData";

export default function SelectMainCategory({setFieldValue}: {setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void|FormikErrors<unknown>>}){
    return(
        <SimpleGrid height={'lg'} columns={3} gap={'20px'} mb={'30px'}>
                {
                  CategoriesData.map((category) => {
                    return <SelectMainCategoryItem onClick={()=>setFieldValue('mainCategory', category.name)} key={category.name} picture={category.picture} name={category.name} />
                  })
                }
        </SimpleGrid>
    )
}


export function SelectMainCategoryItem({picture, name, onClick}: {picture: string, name: string, onClick: () => void}){
    return(
        <Flex onClick={onClick} cursor={'pointer'} shadow={'md'} gap={'10px'} alignItems={'center'} justifyContent={'flex-start'} padding={'10px'} borderRadius={'10px'} bg={'gray.50'} direction={'row'}>
            <Box width={'70px'} borderRadius={'50%'} bg={'gray.100'} padding={'5px'}><Image src={picture}></Image></Box>
            <Text fontWeight={'bold'} textTransform={'capitalize'}>{name}</Text>
        </Flex>
    )
} 