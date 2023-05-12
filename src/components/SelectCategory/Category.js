import {Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Lorem, HStack, GridItem, Image, SimpleGrid, Box, Flex, Text} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import CategoriesData from './CategoriesData'
import MainCategorySelect from './MainCategorySelect'
import { TfiAngleRight } from 'react-icons/tfi'
import SecondaryText from '../../components/SecondaryText'
export default function Category(props) {
  const {isOpen, onOpen, onClose } = useDisclosure()
  const [subcategories, setSubCategories] = useState()
  const [subSubCategories, setSubSubCategories] = useState()
  const [mainCategory, setMainCategory] = useState()
  const [subCategory, setSubCategory] = useState()
  const [subSubCategory, setSubSubCategory] = useState()
  const [mainCategoryImage, setMainCategoryImage] = useState()
  const [isMainCategory, setIsMainCategory] = useState()

  const [mainCategoryName, setMainCategoryName] = useState();
  const [subCategoryName, setSubCategoryName] = useState();
  const [subSubCategoryName, setSubSubCategoryName] = useState();


  const closeModal = () => {
    setIsMainCategory(false)
    onClose()
  }

  const handleSelectMainCategory = (categoryName) => {
    setIsMainCategory(true)
    setMainCategory(categoryName)
    setSubCategories(CategoriesData.find(o => o.name === categoryName).subcategories)
    setSubSubCategories([])
    setSubCategory()
    setSubSubCategory()
  }

  const handleSelectSubCategory = (subCategoryName) => {
    setSubCategory(subCategoryName)
    let subSubcategories = subcategories.find(o => o.name === subCategoryName).subsubcategories
    setSubSubCategories(subSubcategories)
    console.log(subcategories);
    if (subSubcategories == undefined || subSubcategories.length === 0) {
      setMainCategoryImage(CategoriesData.find(o => o.name === mainCategory).picture)
      setMainCategoryName(mainCategory)
      setSubCategoryName(subCategoryName)
      setSubSubCategoryName(subSubCategory)
      setSubSubCategoryName()
      closeModal()
    }
  }
  const handleSelectSubSubCategory = (subSubCategoryName) => {
    setSubSubCategory(subSubCategoryName)
    setMainCategoryImage(CategoriesData.find(o => o.name === mainCategory).picture)
    setMainCategoryName(mainCategory)
    setSubCategoryName(subCategory)
    setSubSubCategoryName(subSubCategoryName)
    closeModal()
  }
  const passDataToParent = ()=>{
    props.passData([mainCategoryName, subCategoryName, subSubCategoryName])
  }
  useEffect(()=>{
    if(mainCategoryName){
      passDataToParent()
    }
  }, [mainCategoryName, subCategoryName, subSubCategoryName])

  

  return (
    <>
      <Button display={'inline-block'} onClick={onOpen} sx={{ 'width': 'calc(var(--chakra-sizes-container-sm)/2)', 'height': 'calc(var(--chakra-sizes-container-sm)/10)' }} mb={'30px'} variant={'solid'} colorScheme={'blue'}>
        {mainCategoryImage ?
          <Flex alignItems={'center'} justifyContent={'space-around'} flexDirection={'row'}>
            <Box sx={{ 'width': 'calc(var(--chakra-sizes-container-sm)/10)', 'height': 'calc(var(--chakra-sizes-container-sm)/10)' }} borderRadius={'50%'}>
              <Image alt={''} src={mainCategoryImage}></Image>
            </Box>
            <Box>
              <Text textTransform={'capitalize'} fontWeight={'bold'}>{subSubCategoryName}</Text>
              <SecondaryText textTransform={'capitalize'}>{mainCategoryName + ' / ' + subCategoryName}</SecondaryText>
            </Box>
          </Flex> :
          'Wybierz kategorie'}
      </Button>

      <Modal size={'5xl'} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent color={'blue.900'} >
          <ModalHeader>Wybierz kategorię</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isMainCategory ?
              <SimpleGrid height={'lg'} columns={'3'} gap={'20px'} mb={'30px'}>
                {
                  CategoriesData.map((category) => {
                    return <MainCategorySelect key={category.name} onClick={() => { handleSelectMainCategory(category.name) }} category={category} />
                  })
                }
              </SimpleGrid> :
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
                  {
                    CategoriesData?.map((category, index) => {
                      return <Flex shadow={'md'} onClick={() => handleSelectMainCategory(category.name)} cursor={'pointer'} mb={'10px'} key={category.name} justifyContent={'space-between'} alignItems={'center'} bg={category.name !== mainCategory ? 'gray.50' : 'gray.200'} padding={'20px'} borderRadius={'10px'}>
                        <Text textTransform={'capitalize'}>{category.name}</Text>
                        <TfiAngleRight />
                      </Flex>
                    })
                  }
                </Box>
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
                  {
                    subcategories?.map((subcategory) => {
                      return <Flex shadow={'md'} cursor={'pointer'} mb={'10px'} key={subcategory.name} onClick={() => { handleSelectSubCategory(subcategory.name) }} justifyContent={'space-between'} alignItems={'center'} bg={subcategory.name !== subCategory ? 'gray.50' : 'gray.200'} padding={'20px'} borderRadius={'10px'}>
                        <Text textTransform={'capitalize'}>{subcategory.name}</Text>
                        <TfiAngleRight />
                      </Flex>
                    })
                  }
                </Box>
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
                  {
                    subSubCategories?.map((subsubcategory) => {
                      return <Flex shadow={'md'} onClick={() => handleSelectSubSubCategory(subsubcategory)} cursor={'pointer'} mb={'10px'} key={subsubcategory} justifyContent={'space-between'} alignItems={'center'} bg={subsubcategory !== subSubCategory ? 'gray.50' : 'gray.200'} padding={'20px'} borderRadius={'10px'}>
                        <Text textTransform={'capitalize'}>{subsubcategory}</Text>
                        <TfiAngleRight />
                      </Flex>
                    })
                  }
                </Box>
              </HStack>
            }
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

