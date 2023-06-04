import React, { useRef, useState } from 'react';
import CategoriesData from '../components/SelectCategory/CategoriesData'
import { Select,Button,Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,useDisclosure } from '@chakra-ui/react';
const TestCom = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');


    const [subcategoriesMap, setSubcategoriesMap] = useState();
    const [subsubcategoriesMap, setSubsubcategoriesMap] = useState();


    const {isOpen, onOpen, onClose } = useDisclosure()
    const handleCategoryChange = (event) => {
        const categoryName = event.target.value
        setSelectedCategory(categoryName);
        setSubcategoriesMap(CategoriesData.find(o => o.name === categoryName)?.subcategories)
        setSelectedSubcategory('');
        setSelectedSubSubcategory('');
    };

    const handleSubcategoryChange = (event) => {
        const subCategoryName = event.target.value
        setSelectedSubcategory(subCategoryName);
        setSubsubcategoriesMap(subcategoriesMap.find(o => o.name === subCategoryName)?.subsubcategories)
        setSelectedSubSubcategory('');
    };

    const handleSubSubcategoryChange = (event) => {
        setSelectedSubSubcategory(event.target.value);
    };


    return (
        <>
        <Button as={'select'} value={''} onChange={(e)=>{console.log(e)}} onClick={onOpen}>ok</Button>


        <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
        <ModalOverlay />
        <ModalContent color={'blue.900'} >
          <ModalHeader>Wybierz kategorię</ModalHeader>
          <ModalCloseButton />
        <ModalBody>
        <HStack mb={'30px'} >
            <Box width={'100%'} paddingX={'10px'} height={'lg'} overflowY={'auto'} sx={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                    borderRadius: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: `blue.500`,
                    borderRadius: '8px',
                  },
                }}>
                <Select value={selectedCategory} onChange={handleCategoryChange}>
                    {CategoriesData?.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </Box>
            {selectedCategory && (
                <Box width={'100%'} paddingX={'10px'} height={'lg'} overflowY={'auto'} sx={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                      borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `blue.500`,
                      borderRadius: '8px',
                    },
                  }}>
                    <Select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                        {subcategoriesMap?.map((subcategory) => (
                            <option key={subcategory.name} value={subcategory.name}>
                                {subcategory.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            )}
            {selectedSubcategory && (
                <Box width={'100%'} paddingX={'10px'} height={'lg'} overflowY={'auto'} sx={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                      borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: `blue.500`,
                      borderRadius: '8px',
                    },
                  }}>
                    <Select  value={selectedSubSubcategory} onChange={handleSubSubcategoryChange}>
                        {subsubcategoriesMap?.map((subsubcategory) => (
                            <option key={subsubcategory} value={subsubcategory}>
                                {subsubcategory}
                            </option>
                        ))}
                    </Select>
                </Box>
            )}
        </HStack>
        </ModalBody>
        </ModalContent>
      </Modal>
      </>
    );
};

export default TestCom;
