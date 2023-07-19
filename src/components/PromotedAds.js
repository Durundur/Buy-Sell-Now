import { Container, Box, SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router";
import GridItem from "./AdPreview/GridItem";
import Header from "./Header";
import { useState } from "react";
import useFetch from '../hooks/useFetch'
function PromotedAds(){
    const { data, loading, error } = useFetch(process.env.REACT_APP_API_LOCAL + 'api/v1/ads/promoted');
    return(
        <Box pb={10} color={'blue.900'} bg={'gray.50'}>
             <Container  maxW={{md:'container.md', lg:'container.lg', xl:'container.xl'}} >
                <Header>Ogłoszenia promowane</Header>
                <SimpleGrid spacing={{base: 2, md: 4}} columns={{base: 2, md: 3, lg: 4}}>
                    {
                    data && data?.map((ad)=>{
                        return <GridItem key={ad?._id} adData={ad}></GridItem>
                    })
                    }
                </SimpleGrid>
                <Outlet></Outlet>
             </Container>
        </Box>
       
    )
}
export default PromotedAds