import { Box, FormControl, FormLabel, Image, Input, IconButton, } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import Photo from '../../Photo/Photo'
export default function ChangeBanner({ banner, setData }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setData((prevData) => {
                    return { ...prevData, banner: reader.result }
                });
            };
        }
    };


    const handleAvatarRemove = (e) => {
        e.preventDefault()
        setData((prevData) => {
            return { ...prevData, banner: null }
        });
    };

    return (
        <FormControl>
            <FormLabel margin={0} cursor={'pointer'} >
                <Photo width={'40%'} height={'150px'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={banner}>
                    {isHovered && banner && (
                        <Box position={'absolute'}>
                            <IconButton onClick={(e) => handleAvatarRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                        </Box>
                    )}
                </Photo>
            </FormLabel>
            <Input value={''} onChange={(e) => handleAvatarChange(e)} accept={'image/*'} display={'none'} type={'file'} />
        </FormControl >
    )
}
