import {Button,Input, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Lorem, HStack, GridItem, Image, SimpleGrid, Box, Flex, Text} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import CategoriesData from '../components/SelectCategory/CategoriesData'
import MainCategorySelect from '../components/SelectCategory/MainCategorySelect'
import { TfiAngleRight } from 'react-icons/tfi'
export default function TestCom(props) {
  const {isOpen, onOpen, onClose } = useDisclosure()
  const closeModal = () => {
    onClose()
  }


  const [value, setValue] = useState(''); 

  return (
    <>
      <Button as={'select'} onClick={onOpen}>
        {value ?
          <Flex alignItems={'center'} justifyContent={'space-around'} flexDirection={'row'}>
            <Box sx={{ 'width': 'calc(var(--chakra-sizes-container-sm)/10)', 'height': 'calc(var(--chakra-sizes-container-sm)/10)' }} borderRadius={'50%'}>
            </Box>
            <Box>
              <Text textTransform={'capitalize'} fontWeight={'bold'}>{value}</Text>
            </Box>
          </Flex> :
          'Wybierz kategorie'}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
            <ModalContent color={'blue.900'} >
            <ModalHeader>Wybierz kategorię</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                <option value={'ok1'}>ok1</option >
                <option value={'ok2'}>ok2</option >
                <option value={'ok3'}>ok3</option >


            </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

