import { Box, Input, IconButton } from '@chakra-ui/react';
import { Avatar } from '../../Layout/Avatar';
import { FaTrash } from 'react-icons/fa';

type ChangeAvatarProps = {
	avatar: File | string;
	setImages: React.Dispatch<React.SetStateAction<{ avatar: string | File, banner: File | string }>>;
};

export default function ChangeAvatar({ avatar, setImages }: ChangeAvatarProps) {
	let avatarSrc = avatar;
	if (typeof avatar === 'object') {
		avatarSrc = URL.createObjectURL(avatar);
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files;
		if (file && file.length > 0) {
			setImages((prevData) => {
				return { ...prevData, avatar: file[0] };
			});
		}
	};

	const handleAvatarRemove = () => {
		setImages((prevData) => {
			return { ...prevData, avatar: '' };
		});
	};

	return (
	<Box
		shadow={'md'}
		borderRadius={'full'}
		_hover={{ '.delete-bnt': { display: 'block' } }}
		display={'flex'}
		justifyContent={'center'}
		alignItems={'center'}
		position={'relative'}
		width={['17vw', '15vw', '13vw', '9vw']}
		height={['17vw', '15vw', '13vw', '9vw']}>
		<Avatar src={avatarSrc as string} position={'absolute'} width={'100%'} height={'100%'}></Avatar>
		{avatar ? (
			<Box
				onClick={() => {
					handleAvatarRemove();
				}}
				className={'delete-bnt'}
				display={'none'}
				zIndex={2}
				position={'absolute'}>
				<IconButton bg={'gray.100'} color={'blue.900'} icon={<FaTrash />} aria-label={''} />
			</Box>
		) : (
			<>
				<label style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} htmlFor='fileinputavatar'></label>
				<Input
					id='fileinputavatar'
					value={''}
					onChange={(e) => {
						handleAvatarChange(e);
					}}
					accept={'image/*'}
					display={'none'}
					type={'file'}
				/>
			</>
		)}
	</Box>
);
}
