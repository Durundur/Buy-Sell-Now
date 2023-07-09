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

    const handleCategoryChange = (categoryData) => {
        let categoryKeys = Object.keys(categoryData);
        let updatedData = { ...data }
        for(let categoryKey of categoryKeys){
            updatedData[categoryKey] = categoryData[categoryKey];
        }
        setData(updatedData);
    }

    return (
        <Box py={10}>
            <Category id={'category'} mainCategory={data.mainCategory} subCategory={data.subCategory} subSubCategory={data.subSubCategory} onChange={(categoryData)=>{handleCategoryChange(categoryData)}} />
        </Box>

    );
};

export default TestCom;
