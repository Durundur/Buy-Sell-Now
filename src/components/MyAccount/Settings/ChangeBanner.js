import { Box, FormControl, FormLabel, Input, IconButton, } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import Photo from '../../Photo/Photo'

export default function ChangeBanner({ banner, setData }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => {
                return { ...prevData, banner: file }
            });
        };
    }

    const handleBannerRemove = (e) => {
        e.preventDefault()
        setData((prevData) => {
            return { ...prevData, banner: undefined }
        });

    };

    return (
        <Box onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={['100%', '60vw', '50vw', '35vw']} height={'160px'}>
            <Photo src={banner} position={'absolute'} width={'100%'} height={'100%'}></Photo>
            {isHovered && banner && (
                <Box zindex={101} position={'absolute'}>
                    <IconButton onClick={(e) => handleBannerRemove(e)} bg={'gray.200'} color={'blue.900'} icon={<FaTrash />} />
                </Box>
            )}
            <label zindex={100} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%' }} htmlFor="fileinputbanner"></label>
            <Input id="fileinputbanner" value={''} onChange={(e) => handleBannerChange(e)} accept={'image/*'} display={'none'} type={'file'} />
        </Box>
    )
}
