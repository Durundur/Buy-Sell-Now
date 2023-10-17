import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { MdOutlineCameraswitch } from "react-icons/md"
import { AdvertQueryType } from '../../types/ApiRequestDataTypes';
import { useFormikContext } from 'formik';

export default function Uploader(){
    const { values, setFieldValue } = useFormikContext<AdvertQueryType>();
    const images = values?.images;
    return(
        <Box>
            <Flex flexDirection={'row'}>
                {
                    images ? <>
                    <UploaderItem id={0} image={images[0]}/>
                    <UploaderItem id={1} image={images[1]}/>
                    <UploaderItem id={2} image={images[2]}/>
                    <UploaderItem id={3} image={images[3]}/>
                    <UploaderItem id={4} image={images[4]}/>
                    <UploaderItem id={5} image={images[5]}/>
                    </> : <></>
                }
            </Flex>
            <input id={'files-input'} accept={'image/*'} multiple type={'file'} />
        </Box>
    )
}


type UploaderItemProps = {
    image?: string | File,
    id: number
}

function UploaderItem({image, id}: UploaderItemProps){

    const isValidUrl = (UrlString: string) => {
        try {
            new URL(UrlString);
            return true;
        } catch (err) {
            return false;
        }
    }

    const imagePreviewOrIcon = () => {
        if (!image) {
            if (id === 0) return <Text>Dodaj zdjęcie</Text>
            return <FiCamera />
        }
        return <>
            <Image src={typeof image === 'string' ? image : URL.createObjectURL(image)}></Image>
            <Box >
                <FiTrash2 />
                <MdOutlineCameraswitch />
            </Box>
        </>
    }


    return(
        <Box shadow={'md'}>
            {imagePreviewOrIcon()}
            <label htmlFor={'files-input'}></label>
        </Box>
    )
}