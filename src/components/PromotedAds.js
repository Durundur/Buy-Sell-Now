import { SimpleGrid } from "@chakra-ui/react";
import { Outlet } from "react-router";
import GridItem from "./AdPreview/GridItem";
import Header from "./Header";
import { useEffect } from "react";
import { getPromotedAds } from "../utils/apiServices";
import useApi from './../hooks/useApi';
import LoadingSpinner from "./LoadingSpinner";
import ContainerBox from "./ContainerBox";

function PromotedAds() {
    const { data, isLoading, triggerApiCall } = useApi();

    useEffect(() => {
        triggerApiCall(getPromotedAds());
    }, [triggerApiCall])

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <ContainerBox>
            <Header>Ogłoszenia promowane</Header>
            <SimpleGrid spacing={{ base: 2, md: 4 }} columns={{ base: 2, md: 3, lg: 4 }}>
                {
                    data && data?.map((ad) => {
                        return <GridItem key={ad?._id} adData={ad}></GridItem>
                    })
                }
            </SimpleGrid>
            <Outlet></Outlet>
        </ContainerBox>

    )
}
export default PromotedAds