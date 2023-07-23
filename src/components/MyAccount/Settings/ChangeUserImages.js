
import { Box, Button } from "@chakra-ui/react"
import LoadingSpinner from "../../LoadingSpinner"
import ChangeBanner from "./ChangeBanner"
import ChangeImage from "./ChangeImage"
import ChangeAvatar from './ChangeAvatar';


export default function ChangeUserImages({ avatar, banner, setData, error, isLoading, triggerApiCall }) {

    if (isLoading) <LoadingSpinner></LoadingSpinner>
    return (
        <Box>
            <ChangeAvatar avatar={avatar} setData={setData}></ChangeAvatar>
            <ChangeBanner banner={banner} setData={setData}></ChangeBanner>
            <Button variant={'solid'} colorScheme={'blue'}>Zapisz</Button>
        </Box>
    )
} 