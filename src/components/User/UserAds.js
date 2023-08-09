import { createRef, useEffect, useState } from "react"
import { useOutletContext } from "react-router"
import { Box, Flex, VStack, Text, InputGroup, Input, InputLeftElement, Select, FormLabel, FormControl, Grid, GridItem } from '@chakra-ui/react';
import ContainerBox from './../ContainerBox';
import ListItemPublic from '../../components/AdPreview/ListItemPublic';
import Pagination from '../../components/Pagination';
import { getUsersAds } from '../../utils/apiServices';
import usePagination from '../../hooks/usePagination';
import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import usePageQuery from '../../hooks/usePageQuery'
import Badge from './../Badge/Badge';
import { UserAdsFilter } from "./UserAdsFilter";
export default function UserAds(props) {
    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])
    const { id } = useParams();

    const { data, error, pageParam, isLoading } = usePagination(getUsersAds, id)



    return (
        <ContainerBox >
            <Grid gap={4} templateColumns={'repeat(4, 1fr)'}>
                <GridItem colSpan={1}>
                    <FormControl >
                        <FormLabel fontWeight={400}>Znajdz na stronie</FormLabel>
                        <InputGroup >
                            <InputLeftElement children={<IoSearchOutline />} />
                            <Input shadow={'sm'} bg={"#fff"} />
                        </InputGroup>
                    </FormControl>
                </GridItem>
                <GridItem>
                    <FormControl >
                        <FormLabel textTransform={'capitalize'} fontWeight={400}>Sortuj</FormLabel>
                        <Select textTransform={'capitalize'} shadow={'sm'} bg={'#fff'} autoComplete={'off'}>
                            <option>Cena: najtańsze</option>
                            <option>Cena: najdroższe</option>
                            <option>Czas: najnowsze</option>
                            <option>Wybrane dla Ciebie</option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1} colStart={1}>
                    <UserAdsFilter userId={id}></UserAdsFilter>
                </GridItem>
                <GridItem colSpan={3}>
                    <Flex gap={2} direction={'column'} borderRadius={'20px'}>
                        {data && data.map((ad) => {
                            return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>
                        })}
                        <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
                    </Flex>
                </GridItem>

            </Grid>







            {/* 
            <Flex gap={4} direction={'column'}>
                <Flex gap={8} direction={'row'}>
                    <FormControl >
                        <FormLabel fontWeight={400}>Znajdz na stronie</FormLabel>
                        <InputGroup >
                            <InputLeftElement children={<IoSearchOutline />} />
                            <Input bg={"#fff"} />
                        </InputGroup>
                    </FormControl>
                    <FormControl >
                        <FormLabel textTransform={'capitalize'} fontWeight={400}>Sortuj</FormLabel>
                        <Select textTransform={'capitalize'} shadow={'sm'} variant="filled" bg={'#fff'} autoComplete={'off'}>
                            <option>Cena: najtańsze</option>
                            <option>Cena: najdroższe</option>
                            <option>Czas: najnowsze</option>
                            <option>Wybrane dla Ciebie</option>
                        </Select>
                    </FormControl>
                </Flex>
                <Flex gap={4} alignItems={'flex-start'} direction={'row'}>
                    <Flex basis={'25%'} shadow={'md'} padding={'20px'} direction={'column'} gap={8} bg={'#fff'} borderRadius={'20px'}>
                        <Box>
                            <Text fontWeight={600} fontSize={'lg'}>Filtruj ogłoszenia</Text>
                            <Text fontSize={'sm'}>Znaleźliśmy 200 ogłoszeń</Text>
                        </Box>
                        <Box>
                            <Text fontSize={'sm'}>Kategorie</Text>
                            <Text>Wszystkie ogłoszenia 200</Text>
                        </Box>
                    </Flex>
                    <Flex basis={'100%'} gap={2} direction={'column'} borderRadius={'20px'}>
                        {data && data.map((ad) => {
                            return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>
                        })}
                        <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
                    </Flex>
                </Flex>
            </Flex> */}
        </ContainerBox>
    )
}