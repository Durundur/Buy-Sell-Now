import { Box, Button, Text } from '@chakra-ui/react';
import LoadingSpinner from '../../Layout/LoadingSpinner';
import ChangeBanner from './ChangeBanner';
import ChangeAvatar from './ChangeAvatar';
import { useState } from 'react';
import useApi from '../../../hooks/useApi';
import { UPDATE_ACC_IMAGES_URL } from '../../../hooks/ApiEndpoints';
import { ApiQueryResponseType } from '../../../types/ApiDataTypes';

type ChangeUserImagesProps = {
	avatar: string;
	banner: string;
};
export default function ChangeUserImages({ avatar, banner }: ChangeUserImagesProps) {
	const [images, setImages] = useState<{ avatar: File | string; banner: File | string }>({ avatar: avatar || '', banner: banner || '' });
	const { data: postImagesResponse, error, isLoading, makeRequest: postImages } = useApi<ApiQueryResponseType>({
		url: UPDATE_ACC_IMAGES_URL,
		method: 'post',
		headers: { 'Content-Type': 'multipart/form-data' }
	});

	const postNewImages = () => {
		const formData = new FormData();
		formData.append('avatar', images.avatar);
		formData.append('banner', images.banner);
		postImages(formData);
	};

	if (isLoading) return <LoadingSpinner />;
	return (
		<Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={4}>
			<ChangeAvatar avatar={images.avatar} setImages={setImages}></ChangeAvatar>
			<ChangeBanner banner={images.banner} setImages={setImages}></ChangeBanner>
			{error && <Text fontSize={'14px'} color={'red.500'}>{error.message}</Text>}
			{postImagesResponse?.message && <Text fontSize={'14px'} color={'blue.900'}>{postImagesResponse.message}</Text>}
			<Button onClick={() => postNewImages()} variant={'solid'} colorScheme={'blue'}>
				Zapisz
			</Button>
		</Box>
	);
}
