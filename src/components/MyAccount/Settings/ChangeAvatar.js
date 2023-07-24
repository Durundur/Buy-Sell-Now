import { Box, FormControl, FormLabel, Input, IconButton, } from "@chakra-ui/react";
import { useState } from "react";
import Avatar from '../../../components/Avatar/Avatar'
import { FaTrash } from 'react-icons/fa';
import { object } from "yup";

export default function ChangeAvatar({ avatar, setData }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => {
                return { ...prevData, avatar: file }
            });
        };
    }

    const handleAvatarRemove = (e) => {
        e.preventDefault()
        setData((prevData) => {
            return { ...prevData, avatar: undefined }
        });
    };


    return (
        <FormControl width={['40vw', '30vw', '20vw', '11vw']} height={['40vw', '30vw', '20vw', '11vw']}>
            <FormLabel height={'inherit'} borderRadius={'full'} bo margin={0} cursor={'pointer'} >
                <Avatar height={'inherit'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={avatar}>
                    {isHovered && avatar && (
                        <Box position={'absolute'}>
                            <IconButton onClick={(e) => handleAvatarRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                        </Box>
                    )}
                </Avatar>
            </FormLabel>
            <Input value={''} onChange={(e) => handleAvatarChange(e)} accept={'image/*'} display={'none'} type={'file'} />
        </FormControl >
    )
}
