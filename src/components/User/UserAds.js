import { useEffect } from "react"
import { useOutletContext, useNavigate } from "react-router"
import { Box, Flex, VStack, Text, InputGroup, Input, InputLeftElement, Select, FormLabel, FormControl, Grid, GridItem } from '@chakra-ui/react';
import ContainerBox from './../ContainerBox';
import ListItemPublic from '../../components/AdPreview/ListItemPublic';
import Pagination from '../../components/Pagination';
import { getUsersAds } from '../../utils/apiServices';
import usePagination from '../../hooks/usePagination';
import { IoSearchOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import { UserAdsFilter } from "./UserAdsFilter";
import LoadingSpinner from "../LoadingSpinner";

export default function UserAds(props) {
    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

    const navigate = useNavigate()
    const { id, mainCatParam, subCatParam, subSubCatParam } = useParams();
    const { data, setData, error, pageParam, isLoading } = usePagination(getUsersAds, id, mainCatParam, subCatParam, subSubCatParam)

    function handleSortChange(e) {
        const value = e.target.value.split('/');
        const key = value[0];
        const order = value[1]
        if (key && order) navigate(`?sort=${key}&order=${order}`)
        else navigate()
    }

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
                        <Select defaultValue={'featured'} onChange={(e) => handleSortChange(e)} textTransform={'capitalize'} shadow={'sm'} bg={'#fff'} autoComplete={'off'}>
                            <option value={'price/asc'}>Cena: od najtańszych</option>
                            <option value={'price/desc'}>Cena: od najdroższych</option>
                            <option value={'createdAt/desc'}>Czas: od najnowszych</option>
                            <option value={'createdAt/asc'}>Czas: od najstarszych</option>
                            <option value={'featured'} >Wybrane dla Ciebie</option>
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={1} colStart={1}>
                    <UserAdsFilter mainCatParam={mainCatParam} subCatParam={subCatParam} subSubCatParam={subSubCatParam} userId={id}></UserAdsFilter>
                </GridItem>
                <GridItem colSpan={3}>
                    {isLoading && <LoadingSpinner></LoadingSpinner>}
                    <Flex gap={2} direction={'column'} borderRadius={'20px'}>
                        {data && data.map((ad) => {
                            return <ListItemPublic key={ad._id} adData={ad}></ListItemPublic>
                        })}
                        <Pagination isLoading={isLoading} currentPage={pageParam}></Pagination>
                    </Flex>
                </GridItem>

            </Grid>
        </ContainerBox>
    )
}