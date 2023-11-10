import { SimpleGrid } from "@chakra-ui/react";
import GridItem from "../AdPreview/GridItem";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import ContainerBox from "./ContainerBox";
import Error from "./Error";
import useApi from './../../hooks/useApi';
import { useEffect } from 'react';
import { AdvertQueryType } from "../../types/ApiDataTypes";

function PromotedAds() {
    const { data: PromotedAds, isLoading, error, makeRequest: getPromotedAds } = useApi<AdvertQueryType[]>({
        url: 'api/v1/ads/promoted',
    });

    useEffect(() => {
        getPromotedAds();
    }, [])


    if (isLoading) return <LoadingSpinner/>
    if(error) return <ContainerBox><Error error={error} variant={'info'}></Error></ContainerBox>
    return (
        <ContainerBox>
            <Header>Ogłoszenia promowane</Header>
            <SimpleGrid spacing={{ base: 2, md: 4 }} columns={{ base: 2, md: 3, lg: 4 }}>
                {
                    PromotedAds?.map((ad) => {
                        return <GridItem key={ad?._id} adData={ad}></GridItem>
                    })
                }
            </SimpleGrid>
        </ContainerBox>
    )
}
export default PromotedAds