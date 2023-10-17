import { Box, Input, IconButton, } from "@chakra-ui/react";
import { FaTrash } from 'react-icons/fa';
import { Image } from "../../Layout/Image";

export default function ChangeBanner({ banner, setData }) {
    let bannerSrc = banner;
    if (typeof banner === 'object') {
        bannerSrc = URL.createObjectURL(banner);
    }

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
            return { ...prevData, banner: '' }
        });

    };

    return (
        <Box borderRadius={'20px'} shadow={'md'} _hover={{ '.delete-bnt': { display: 'block' } }} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={['100%', '60vw', '50vw', '35vw']} height={'160px'}>
            <Image borderRadius={'20px'} src={bannerSrc} position={'absolute'} width={'100%'} height={'100%'}></Image>
            {
                banner ? (
                    <Box className={'delete-bnt'} display={'none'} zindex={2} position={'absolute'}>
                        <IconButton onClick={(e) => handleBannerRemove(e)} bg={'gray.100'} color={'blue.900'} icon={<FaTrash />} />
                    </Box>
                ) : (<>
                    <label zindex={1} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%' }} htmlFor="fileinputbanner"></label>
                    <Input id="fileinputbanner" value={''} onChange={(e) => handleBannerChange(e)} accept={'image/*'} display={'none'} type={'file'} />
                </>
                )}
        </Box>
    )
}
