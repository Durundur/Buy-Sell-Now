import { useEffect, } from "react"
import { useOutletContext } from "react-router"
import ContainerBox from '../Layout/ContainerBox';
import { Box, Text, Image } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react';
export default function UserContact(props) {
    const [setActiveTab, data] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])


    return (
        <ContainerBox >
            <Flex gap={8} direction={'row'} wrap={'wrap'} justifyContent={'space-between'} padding={'20px'} shadow={'md'} bg={'#fff'} borderRadius={'20px'}>
                <Flex gap={4} direction={'column'} >
                    <Flex direction={'column'} gap={4}>
                        <Text fontWeight={500} fontSize={'lg'}>Adres</Text>
                        <Box>
                            <Text>{data?.advertiser?.name}</Text>
                            <Text>ul. {data?.advertiser.address?.street} {data?.advertiser.address?.buildingNumber}</Text>
                            <Text>{data?.advertiser.address?.postcode} {data?.advertiser.address?.city}</Text>
                            <Text>NIP: {data?.advertiser.nip}</Text>
                            <Text>email: {data?.advertiser.email}</Text>
                        </Box>
                    </Flex>
                    <Flex wrap={'wrap'} gap={8} justifyContent={'flex-start'} alignItems={'flex-start'} direction={'row'}>
                        <Box>
                            <Text fontSize={'sm'}>Numer telefonu</Text>
                            <Text>{data?.advertiser?.phoneNumber}</Text>
                        </Box>
                    </Flex>
                </Flex>
                <Image margin={['auto', 'auto', 'auto', 0]} src={'https://komin.olx.pl/app/static/media/static_map_desktop.5f3cf03b7.svg'}></Image>
            </Flex>

        </ContainerBox>
    )
}