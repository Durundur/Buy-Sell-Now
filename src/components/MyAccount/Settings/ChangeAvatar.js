import { Box, FormControl, FormLabel, Image, Input, IconButton, } from "@chakra-ui/react";
import { useState } from "react";
import Avatar from '../../../components/Avatar/Avatar'
import { FaTrash } from 'react-icons/fa';

export default function ChangeAvatar({ avatar, setData }) {
    const [isHovered, setIsHovered] = useState(false);

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
        <FormControl>
            <FormLabel margin={0} cursor={'pointer'} >
                <Avatar width={'40%'} height={'40%'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={avatar}>
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
