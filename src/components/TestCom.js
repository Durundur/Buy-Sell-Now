import React, { useRef, useState } from 'react';
import CategoriesData from '../components/SelectCategory/CategoriesData'
import { Select, Button, Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Success from './Alerts/Success';
import useFetch from '../hooks/useFetch';
import { AuthContextProvider } from '../contexts';
import Category from './SelectCategory/Category';
const TestCom = () => {

    const [data, setData] = useState({
        mainCategory: 'motoryzacja',
        subCategory: 'samochody osobowe',
        subSubCategory: 'audi'
    })

    return (
        <Box py={10}>
            <Category id={'category'} value={`${data?.mainCategory}.${data?.subCategory}.${data?.subSubCategory}`} onChange={(categories) => {}} />
        </Box>

    );
};

export default TestCom;
