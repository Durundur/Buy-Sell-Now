import { Box, Input, IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { Image } from '../../Layout/Image';

type ChangeBannerProps = {
	banner: File | string;
	setImages: React.Dispatch<React.SetStateAction<{ avatar: string | File; banner: File | string }>>;
};

export default function ChangeBanner({ banner, setImages }: ChangeBannerProps) {
	let bannerSrc = banner;
	if (typeof banner === 'object') {
		bannerSrc = URL.createObjectURL(banner);
	}

	const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file && file.length > 0) {
			setImages((prevData) => {
				return { ...prevData, banner: file[0] };
			});
		}
	};

	const handleBannerRemove = () => {
		setImages((prevData) => {
			return { ...prevData, banner: '' };
		});
	};

	return (
		<Box
			borderRadius={'20px'}
			shadow={'md'}
			_hover={{ '.delete-bnt': { display: 'block' } }}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			position={'relative'}
			width={['100%', '60vw', '50vw', '35vw']}
			height={'160px'}>
			<Image borderRadius={'20px'} src={bannerSrc as string} position={'absolute'} width={'100%'} height={'100%'}></Image>
			{banner ? (
				<Box className={'delete-bnt'} display={'none'} zIndex={2} position={'absolute'}>
					<IconButton onClick={() => handleBannerRemove()} bg={'gray.100'} color={'blue.900'} icon={<FaTrash />} aria-label={''} />
				</Box>
			) : (
				<>
					<label style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} htmlFor='fileinputbanner'></label>
					<Input id='fileinputbanner' value={''} onChange={(e) => handleBannerChange(e)} accept={'image/*'} display={'none'} type={'file'} />
				</>
			)}
		</Box>
	);
}
