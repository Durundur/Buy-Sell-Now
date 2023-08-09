import { Box, FormControl, FormLabel, Input, IconButton, Image, AspectRatio } from "@chakra-ui/react";
import { useState } from "react";
import Avatar from '../../../components/Avatar/Avatar'
import { FaTrash } from 'react-icons/fa';
import AvatarFallback from "../../Avatar/AvatarFallback";

export default function ChangeAvatar({ avatar, setData }) {
    const [isHovered, setIsHovered] = useState(true);

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
        <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={['40vw', '30vw', '15vw']} height={['40vw', '30vw', '15vw']}>
            <Avatar src={avatar} position={'absolute'} width={'100%'} height={'100%'}></Avatar>
            {isHovered && avatar && (
                <Box zindex={101} position={'absolute'}>
                    <IconButton onClick={(e) => handleAvatarRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                </Box>
            )}
            <label zindex={100} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%' }} htmlFor="fileinputavatar"></label>
            <Input id="fileinputavatar" value={''} onChange={(e) => handleAvatarChange(e)} accept={'image/*'} display={'none'} type={'file'} />
        </Box>
    )
}
