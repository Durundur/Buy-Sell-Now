import { useEffect } from "react"
import { useOutletContext } from "react-router"
import ContainerBox from '../Layout/ContainerBox';
import { Flex, Text, } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react';
import { UserDataType } from "../../types/UserDataType";

export default function UserInfo({...props}) {
    const {setActiveTab, userPageData}: {setActiveTab: React.Dispatch<React.SetStateAction<number>>, userPageData: UserDataType} = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

    if(userPageData.advertiser.isCompanyAcc){
        return (
            <ContainerBox >
                <Flex direction={'column'} gap={4} shadow={'md'} padding={'20px'} bg={'#fff'} borderRadius={'20px'} >
                    <Text fontWeight={500} fontSize={'lg'}>O nas</Text>
                    <Text>{userPageData?.advertiser?.aboutCompany}</Text>
                    <Flex alignItems={'flex-start'} gap={4} direction={'column'} >
                        <Text fontWeight={500} fontSize={'lg'}>Strona internetowa</Text>
                        <Link display={'block'}>{userPageData?.advertiser?.companyWebsite}</Link>
                    </Flex>
                </Flex>
            </ContainerBox>
        )
    }
    return <></>
}