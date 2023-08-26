
import { useState } from "react";
import { Textarea, Icon, Box, } from "@chakra-ui/react";
import { AiOutlineSend } from 'react-icons/ai'

export default function ChatInput({ sendRoomMessage, conversationId, userInfo }) {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message) {
            sendRoomMessage({ message: message, author: userInfo, conversationId: conversationId })
            setMessage("")
        }
    }

    return (<>
        <Textarea onKeyDown={(e) => {
            if (e.code === "Enter") {
                e.preventDefault()
                handleSendMessage()
            }
        }} value={message} onChange={(e) => setMessage(e.target.value)} resize={'none'} rows={1} placeholder="Napisz wiadomość..." py={2} px={4} bg='gray.100' variant='unstyled' borderRadius={'20px'}></Textarea>
        <Box onClick={() => { handleSendMessage() }} _active={{ bg: 'gray.300' }} _hover={{ bg: 'gray.200', cursor: 'pointer', transitionDuration: '200ms' }} p={1.5} bg='gray.100' color={'blue.900'} borderRadius={'50%'}>
            <Icon display={'block'} fontSize={'2xl'} as={AiOutlineSend}></Icon>
        </Box>
    </>
    )
}