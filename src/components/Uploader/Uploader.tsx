import { Box, Text, AspectRatio, Grid } from '@chakra-ui/react';
import { FiCamera, FiTrash2 } from 'react-icons/fi';
import { MdOutlineCameraswitch } from 'react-icons/md';
import { Image } from '../Layout/Image';
import './UploaderStyle.css';
import React, { memo, useCallback } from 'react';
import { useField } from 'formik';

export default function UploaderWraper() {
	const [field, meta, helpers] = useField('images');
	const images = field.value || [];
	const setFieldValue = helpers.setValue;
	

	const onNewImage = useCallback(
		function onNewImage(e: React.ChangeEvent<HTMLInputElement>) {
			const files = Array.from(e.target.files as ArrayLike<File>);
			if (files?.length !== 0) {
				if (images.length !== 0) {
					for (let file of files) {
						if (images.length < 6) {
							images.push(file);
						}
					}
					setFieldValue(images);
					return;
				}
				setFieldValue(files);
			}
		},
		[images]
	);

	const onRemoveImage = useCallback(
		function onRemoveImage(id: number) {
			const newImages = images;
			newImages.splice(id, 1);
			setFieldValue(newImages);
		},
		[images]
	);


	return (
		<Box fontSize={'xl'} maxWidth={'container.sm'}>
			<Grid templateColumns={'repeat(3, 1fr)'} templateRows={'repeat(2, 1fr)'} gap={3}>
				{images ? (
					<>
						<UploaderItem onRemoveImage={onRemoveImage} id={0} image={images[0]} />
						<UploaderItem onRemoveImage={onRemoveImage} id={1} image={images[1]} />
						<UploaderItem onRemoveImage={onRemoveImage} id={2} image={images[2]} />
						<UploaderItem onRemoveImage={onRemoveImage} id={3} image={images[3]} />
						<UploaderItem onRemoveImage={onRemoveImage} id={4} image={images[4]} />
						<UploaderItem onRemoveImage={onRemoveImage} id={5} image={images[5]} />
					</>
				) : (
					<></>
				)}
			</Grid>
			<input onChange={onNewImage} style={{ display: 'none' }} id={'files-input'} accept={'image/*'} multiple type={'file'} />
		</Box>
	);
}

type UploaderItemProps = {
	image?: string | File;
	id: number;
	onRemoveImage: (id: number) => void;
};

const UploaderItem = memo(function UploaderItem({ image, id, onRemoveImage }: UploaderItemProps) {
	const ImageContainerOrIcon = () => {
		if (!image) {
			if (id === 0) return <Text fontSize={'md'}>Dodaj zdjęcie</Text>;
			return <FiCamera />;
		}
		return (
			<Box display={'flex'} width={'100%'} height={'100%'}>
				<UploaderImageContainer src={image} />
				<Box
					className='uploader__item__controls'
					backgroundColor={'gray.50'}
					position={'absolute'}
					gap={3}
					left={'50%'}
					top={'50%'}
					transform={'translate(-50%, -50%)'}
					borderRadius={'md'}
					padding={2}
					shadow={'md'}
					flexDirection={'row'}
					display={'none'}>
					<FiTrash2 onClick={() => onRemoveImage(id)} cursor={'pointer'} />
					<MdOutlineCameraswitch cursor={'pointer'} />
				</Box>
			</Box>
		);
	};

	return (
		<Box
			style={{ aspectRatio: '4/3' }}
			className='uploader__item'
			position={'relative'}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
			backgroundColor={'gray.50'}
			shadow={'md'}
			borderRadius={'md'}
			_hover={{ backgroundColor: 'gray.100' }}>
			<label style={{ width: '100%', height: '100%', position: 'absolute', cursor: 'pointer' }} htmlFor={'files-input'}></label>
			<ImageContainerOrIcon />
		</Box>
	);
})

function UploaderImageContainer({ src }: { src: string | File }) {
	return (
		<AspectRatio className={'uploader__item__img'} height={'100%'} width={'100%'}>
			<Image borderRadius={'md'} src={typeof src === 'string' ? src : URL.createObjectURL(src)}></Image>
		</AspectRatio>
	);
}
