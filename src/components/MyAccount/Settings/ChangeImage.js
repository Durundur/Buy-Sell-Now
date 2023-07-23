
import { Avatar, Box, FormControl, FormLabel, Input, InputRightElement, InputGroup, Image, IconButton, Icon, Text } from "@chakra-ui/react";
import LoadingSpinner from "../../LoadingSpinner";
import useApi from "../../../hooks/useApi";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx'
import { AiOutlineUser } from 'react-icons/ai'

export default function ChangeImage({ avatar, setData }) {
    const [isHovered, setIsHovered] = useState(false);
    //pytanie czy wywylas na serwer base64 i z serwera do api, czy moze od clienta do api potem z cliena do serwera?

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setData((prevData) => {
                    return { ...prevData, avatar: reader.result }
                });
            };
        }
    };

    const handleAvatarRemove = (e) => {
        e.preventDefault()
        setData((prevData) => {
            return { ...prevData, avatar: null }
        });
    };
    return (
        <Box>
            <FormControl>
                <FormLabel _hover={{ cursor: 'pointer' }} display={'inline'} borderRadius="full" >
                    {avatar ?
                        <Avatar key={1} boxSize="150px" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={avatar}>
                            {isHovered && avatar && (
                                <Box position={'absolute'}>
                                    <IconButton onClick={(e) => handleAvatarRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                                </Box>
                            )}
                        </Avatar>
                        :
                        <Avatar key={2} boxSize="150px" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            {isHovered && avatar && (
                                <Box position={'absolute'}>
                                    <IconButton onClick={(e) => handleAvatarRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                                </Box>
                            )}
                        </Avatar>}
                </FormLabel>
                <Input value={''} onChange={(e) => handleAvatarChange(e)} accept={'image/*'} display={'none'} type={'file'} />
            </FormControl>
        </Box>
    );
}
