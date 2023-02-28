import {
    Button, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Lorem, HStack, GridItem, Image, SimpleGrid, Box, Flex, Text
} from "@chakra-ui/react"
import { useState } from "react"
import CategoriesData from './CategoriesData'
import MainCategorySelect from './MainCategorySelect'
import { TfiAngleRight } from 'react-icons/tfi'
export default function CategorySelecotr(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMainCategory, setIsMainCategory] = useState(false)
    const [mainCategory, setMainCategory] = useState('motoryzacja')
    const [subCategory, setSubCategory] = useState('samochody osobowe')
    const subCategories = CategoriesData.find((o)=> o.name===mainCategory).subcategories
    const subSubCategories = subCategories.find((o)=>o.name==subCategory).subsubcategories

    

    const onCloseModal = () => {
        onClose()
        setIsMainCategory(false)
    }

    return (
        <>
            <Button onClick={onOpen} sx={{ 'width': 'calc(var(--chakra-sizes-container-sm)/2)', 'height': 'calc(var(--chakra-sizes-container-sm)/10)' }} mb={'30px'} variant={'solid'} colorScheme={'blue'}>Wybierz kategorie</Button>

            <Modal size={'5xl'} isOpen={isOpen} onClose={onCloseModal}>
                <ModalOverlay />
                <ModalContent color={'blue.900'} >
                    <ModalHeader>Wybierz kategorię</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack>
                            <CategoriesLists data={CategoriesData}></CategoriesLists>
                            <CategoriesLists data={subCategories}></CategoriesLists>
                            <EndCategoriesLists data={subSubCategories}></EndCategoriesLists>
                        </HStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}



function CategoriesLists(props) {
    return (
            <Box height={'lg'} overflowY={'auto'}>
                {
                    props.data?.map((category, index) => {
                        return <Flex key={category.name} justifyContent={'space-between'} gap={'20px'} alignItems={'center'} bg={'gray.50'} padding={'20px'} borderRadius={'10px'}>
                            <Text textTransform={'capitalize'}>{category.name}</Text>
                            <TfiAngleRight />
                        </Flex>
                    })
                }
            </Box>
    )
}

function EndCategoriesLists(props) {
    return (
            <Box height={'lg'} overflowY={'auto'}>
                {
                    props.data?.map((category, index) => {
                        return <Flex key={category} justifyContent={'space-between'} gap={'20px'} alignItems={'center'} bg={'gray.50'} padding={'20px'} borderRadius={'10px'}>
                            <Text textTransform={'capitalize'}>{category}</Text>
                            <TfiAngleRight />
                        </Flex>
                    })
                }
            </Box>
    )
}


