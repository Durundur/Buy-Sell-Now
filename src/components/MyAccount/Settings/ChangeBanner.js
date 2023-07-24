import { Box, FormControl, FormLabel, Input, IconButton, } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import Photo from '../../Photo/Photo'

export default function ChangeBanner({ banner, setData }) {
    const [bannerSrc, setBannerSrc] = useState(typeof banner === 'object' ? URL.createObjectURL(banner) : (banner || undefined))
    const [isHovered, setIsHovered] = useState(false);
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => {
                return { ...prevData, banner: file }
            });
        };
    }

    const handleAvatarRemove = (e) => {
        e.preventDefault()
        setData((prevData) => {
            return { ...prevData, banner: undefined }
        });

    };

    return (
        <FormControl width={['90%', '70%', '60%', '40%']} >
            <FormLabel display={'block'} margin={0} cursor={'pointer'} >
                <Photo height={'150px'} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={bannerSrc}>
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
