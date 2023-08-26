import { Box, Button } from "@chakra-ui/react"
import LoadingSpinner from "../../LoadingSpinner"
import ChangeBanner from "./ChangeBanner"
import ChangeAvatar from './ChangeAvatar';
import { updateUserImages } from '../../../utils/apiServices'
import axios from "axios";
export default function ChangeUserImages({ avatar, banner, setData, error, isLoading, triggerApiCall }) {

    const postFiles = async () => {
        try {
            const updatedFiles = await Promise.all(
                [avatar, banner].map(async (file) => {
                    if (typeof file === 'object') {
                        const formData = new FormData();
                        formData.append("file", file);
                        formData.append("upload_preset", "gtu733xq");
                        const res = await axios.post('https://api.cloudinary.com/v1_1/dj16gqjts/image/upload', formData)
                        const { url } = res.data;
                        return url;
                    }
                    return file
                })
            )
            return updatedFiles
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        const filesUrls = await postFiles();
        let urls = {};
        if (avatar && filesUrls?.length > 0) {
            urls.avatar = filesUrls[0];
        }
        if (banner && filesUrls?.length > 1) {
            urls.banner = filesUrls[1];
        }
        console.log(urls)
        await triggerApiCall(updateUserImages(urls))
        setData((prevData) => {
            return { ...prevData, ...urls }
        })
    }



    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={4}>
            <ChangeAvatar avatar={avatar} setData={setData}></ChangeAvatar>
            <ChangeBanner banner={banner} setData={setData}></ChangeBanner>
            <Button variant={'solid'} onClick={() => handleSubmit()} colorScheme={'blue'}>Zapisz</Button>
        </Box>
    )
} 