
import { HStack, Flex } from "@chakra-ui/react"
import ConversationPreview from './ConversationPreview'
import { useEffect } from "react";
import { Outlet } from "react-router";
import { getUserConversations } from "../../../utils/apiServices";
import useApi from "../../../hooks/useApi";
import ContainerBox from '../../ContainerBox'
import { useOutletContext } from "react-router"


function MyMessages(props) {
    const { data, error, isLoading, triggerApiCall, setData } = useApi()
    const [setActiveTab] = useOutletContext();
    useEffect(() => {
        setActiveTab(props.activeTab)
    }, [props.activeTab])

    useEffect(() => {
        triggerApiCall(getUserConversations());
    }, [])



    return (
        <ContainerBox>
            <HStack height={'600px'} alignItems={'stretch'} >
                <Flex sx={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: `blue.500`,
                        borderRadius: '8px',
                    },
                }} flexBasis={'35%'} direction={'column'} justifyContent={'flex-start'} overflowY={'scroll'} borderRadius={'20px'} bg={'#fff'} alignItems={'stretch'} boxShadow={'md'}>
                    {
                        data?.map((conversation) => {
                            return <ConversationPreview key={conversation._id} conversation={conversation}></ConversationPreview>
                        })
                    }
                </Flex>
                <Flex flexBasis={'65%'} borderRadius={'20px'} bg={'#fff'} boxShadow={'md'}>
                    <Outlet></Outlet>
                </Flex>
            </HStack>
        </ContainerBox>
    )
}

export default MyMessages