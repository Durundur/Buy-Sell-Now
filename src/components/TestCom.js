import React, { useRef, useState } from 'react';
import CategoriesData from '../components/SelectCategory/CategoriesData'
import { Select, Button, Box, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import Success from './Alerts/Success';
import useFetch from '../hooks/useFetch';
import { AuthContextProvider } from '../contexts';
import Category from './SelectCategory/Category';
import useApi from '../hooks/useApi';
import { useEffect } from 'react';
import { getAd, getAllAds, postAd, updateAd, deleteAd, getUserAds, getAds } from "../utils/apiServices";
const TestCom = () => {
    const { response, isLoading, triggerApiCall } = useApi()

    // useEffect(() => {
    //     triggerApiCall(getAd)
    // }, [])




    return (
        <Box py={10}>
        </Box>

    )
}

export default TestCom;
