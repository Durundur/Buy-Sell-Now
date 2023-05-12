import { Container, Box, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router";
import AdPreviewGridItem from "./AdPreview/AdPreviewGridItem";
import Header from "./Header";
import { useState } from "react";
import useFetch from '../hooks/useFetch'
function PromotedAds(){
    const { data, loading, error } = useFetch("https://buy-sell-now.fly.dev/api/v1/ads");
    return(
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
             <Container  maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
                <Header>Ogłoszenia promowane</Header>
                <SimpleGrid spacing={{base: 2, md: 4}} columns={{base: 2, md: 3, lg: 4}}>
                    {
                    data && data?.map((ad)=>{
                        return <AdPreviewGridItem key={ad?._id} adData={ad}></AdPreviewGridItem>
                    })
                    }
                </SimpleGrid>
                <Outlet></Outlet>
             </Container>
        </Box>
       
    )
}
export default PromotedAds