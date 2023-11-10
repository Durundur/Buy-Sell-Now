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
	const [images, setImages] = useState<{ avatar: File | string; banner: File | string }>({avatar,banner});
	const { data: postImagesResponse, error, isLoading, makeRequest: postImages} = useApi<ApiQueryResponseType>({
		url: UPDATE_ACC_IMAGES_URL,
		method: 'post',
		headers: { 'Content-Type': 'multipart/form-data' }
	});

	const postNewImages = () => {
		const formData = new FormData();
		if (typeof images.avatar === 'object' && images.avatar instanceof File) {
			formData.append('avatar', images.avatar);
		}
		if (typeof images.banner === 'object' && images.banner instanceof File) {
			formData.append('banner', images.banner);
		}
		if (formData.get('banner') || formData.get('avatar')) {
			postImages(formData);
		}
	};

	if (isLoading) return <LoadingSpinner/>;
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
