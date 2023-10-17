import { Box, Input, IconButton, } from "@chakra-ui/react";
import { Avatar } from '../../Layout/Avatar'
import { FaTrash } from 'react-icons/fa';

export default function ChangeAvatar({ avatar, setData }) {
    let avatarSrc = avatar;
    if (typeof avatar === 'object') {
        avatarSrc = URL.createObjectURL(avatar);
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData((prevData) => {
                return { ...prevData, avatar: file }
            });
        };
    }

    const handleAvatarRemove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setData((prevData) => {
            return { ...prevData, avatar: '' }
        });
    };

    return (
        <Box shadow={'md'} borderRadius={'full'} _hover={{ '.delete-bnt': { display: 'block' } }} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={['17vw', '15vw', '13vw', '9vw']} height={['17vw', '15vw', '13vw', '9vw']}>
            <Avatar bg={'gray.100'} src={avatarSrc} position={'absolute'} width={'100%'} height={'100%'}></Avatar>
            {
                avatar ? (<Box onClick={(e) => { handleAvatarRemove(e) }} className={'delete-bnt'} display={'none'} zindex={2} position={'absolute'}>
                    <IconButton bg={'gray.100'} color={'blue.900'} icon={<FaTrash />} />
                </Box>) : (<>
                    <label zindex={1} style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%' }} htmlFor="fileinputavatar"></label>
                    <Input id="fileinputavatar" value={''} onChange={(e) => { handleAvatarChange(e) }} accept={'image/*'} display={'none'} type={'file'} />
                </>)
            }
        </Box >
    )
}
