import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import { Box, Container, VStack } from "@chakra-ui/react"
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApiContext } from '../contexts';
import Error from '../components/Error'
import usePagination from '../hooks/usePagination';
import ListItemPublic from '../components/AdPreview/ListItemPublic';
import ContainerBox from '../components/ContainerBox';
import { getAds } from '../utils/apiServices';
import useApi from '../hooks/useApi';

export default function AdsList() {
    const { data, error, pageParam, isLoading } = usePagination(getAds)


    if (isLoading) return <ContainerBox><LoadingSpinner></LoadingSpinner></ContainerBox>
    else if (!isLoading && error) return <ContainerBox><Error variant="error" error={error}></Error></ContainerBox>
    return (
        <ContainerBox>
            <VStack spacing={{ base: 2, md: 4 }}>
                {data && data.map((ad) => {
                    return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>
                })}
            </VStack>
            <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
        </ContainerBox>
    )
}


