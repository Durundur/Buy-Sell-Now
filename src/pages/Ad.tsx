import {
	Box,
	Flex,
	HStack,
	Text,
	Stack,
	Divider,
	Avatar,
	VStack,
	Button,
	Breadcrumb,
	BreadcrumbItem,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from '../components/AdPage/Carousel';
import SecondaryText from '../components/Layout/SecondaryText';
import {
	TfiHelpAlt,
	TfiAngleRight,
	TfiLocationPin,
	TfiMobile,
	TfiAngleLeft,
} from 'react-icons/tfi';
import LoadingSpinner from '../components/Layout/LoadingSpinner';
import Error from '../components/Layout/Error';
import AdBadges from '../components/Badge/AdBadges';
import useApi from '../hooks/useApi';
import ContainerBox from '../components/Layout/ContainerBox';
import { formatDate } from '../utils/utils';
import { AdvertQueryType } from '../types/ApiRequestDataTypes';
import { GET_AD_URL } from './../hooks/ApiEndpoints';

function Ad() {
	const { id } = useParams();
	const phoneNumber = useRef<HTMLParagraphElement>(null);
	const {
		data: advertData,
		isLoading,
		error,
		makeRequest: getAdvertData,
	} = useApi<AdvertQueryType>({
		url: GET_AD_URL(id as string),
	});

	const {
		data: createNewConversationResponse,
		isLoading: isl,
		error: e,
		makeRequest: createNewConversation,
	} = useApi({
		url: 'api/v1/conversations/new-conversation',
		method: 'post',
	});

	useEffect(() => {
		getAdvertData();
	}, []);

	async function handleCreateNewConversation(e: React.MouseEvent) {
		e.preventDefault();
		const newConversationData = { adId: id };
		createNewConversation(newConversationData);
	}

	if (isLoading)
		return (
			<ContainerBox bgColor1={'gray.50'}>
				<LoadingSpinner></LoadingSpinner>
			</ContainerBox>
		);
	else if (!isLoading && error)
		return (
			<ContainerBox bgColor1={'gray.50'}>
				<Error variant='error' error={error}></Error>
			</ContainerBox>
		);
	return (
		<ContainerBox bgColor1={'gray.50'}>
			<Flex justifyItems={'center'} alignItems={'center'} gap={10} direction={'row'} p={'6'}>
				<Link to={'-1'}>
					<Flex justifyItems={'center'} alignItems={'center'} gap={'2'}>
						<TfiAngleLeft></TfiAngleLeft>
						<Text textTransform={'capitalize'}>wróc</Text>
					</Flex>
				</Link>
				<Breadcrumb
					fontSize={'sm'}
					spacing='8px'
					textTransform={'capitalize'}
					separator={<TfiAngleRight />}>
					<BreadcrumbItem>
						<Link to={'/'}>Strona główna</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<Link to={`/ogloszenia/${advertData?.mainCategory}`}>{advertData?.mainCategory}</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<Link to={`/ogloszenia/${advertData?.mainCategory}/${advertData?.subCategory}`}>
							{advertData?.subCategory}
						</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<Link
							to={`/ogloszenia/${advertData?.mainCategory}/${advertData?.subCategory}/${advertData?.subSubCategory}`}>
							{advertData?.subSubCategory}
						</Link>
					</BreadcrumbItem>
				</Breadcrumb>
			</Flex>
			<Flex gap={'20px'} display={'flex'} flexDirection={'row'}>
				<Flex gap={'20px'} width={'70%'} flexDirection={'column'}>
					<Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
						<Carousel cards={advertData?.images || []}></Carousel>
					</Box>

					<Stack boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
						<Text fontSize='2xl' fontWeight={'medium'}>
							{advertData?.tittle}
						</Text>
						<Text fontSize={'2xl'} fontWeight={'bold'}>
							{advertData?.price?.value + ' zł'}
						</Text>
						<AdBadges details={advertData?.details || {}}></AdBadges>
						<Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>
							opis
						</Text>
						{/* <Text fontSize={'lg'} whiteSpace={'pre-line'} dangerouslySetInnerHTML={{ __html: advertData?.description }}></Text> */}
						<Text whiteSpace={"pre-wrap"} fontSize={'lg'}>
							{advertData?.description}
						</Text>
						<Divider></Divider>
						<Flex justifyContent={'space-between'}>
							<SecondaryText>ID: {advertData?._id}</SecondaryText>
							<SecondaryText>Wyświetlenia: {}</SecondaryText>
							<SecondaryText>Zgłoś</SecondaryText>
						</Flex>
					</Stack>
				</Flex>
				<Flex width={'30%'} gap={'20px'} flexDirection={'column'}>
					<Box boxShadow={'md'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
						<Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>
							{advertData?.advertiser.details.isCompanyAcc ? 'przedsiębiorca' : 'osoba prywatna'}
						</Text>
						<Flex mt={'20px'} gap={'20px'} alignItems={'center'}>
							<Avatar src={advertData?.advertiser.details.avatar}></Avatar>
							<Flex flexDirection={'column'} alignItems={'flex-start'}>
								<Text mb={'5px'} fontWeight={'medium'} fontSize={'lg'}>
									{advertData?.advertiser.name}
								</Text>
								<SecondaryText fontWeight={'light'}>
									Na BSN od {formatDate(advertData?.advertiser.details.createdAt, 'long')}
								</SecondaryText>
								<SecondaryText fontWeight={'light'}>
									Ostatnio online {formatDate(advertData?.advertiser.details.updatedAt, 'long')}
								</SecondaryText>
							</Flex>
						</Flex>
						<Box bg={'gray.50'} borderRadius={'10px'} padding={'10px'} my={'20px'}>
							<Flex
								gap={'20px'}
								justifyContent={'center'}
								alignItems={'center'}
								flexDirection={'row'}>
								<TfiHelpAlt fontSize={'72px'}></TfiHelpAlt>
								<Text fontSize={'md'}>Ten ogłoszeniodawca nie otrzymał jeszcze żadnych ocen</Text>
							</Flex>
						</Box>
						<VStack gap={'10px'}>
							<Button
								onClick={(e) => handleCreateNewConversation(e)}
								w={'100%'}
								variant={'solid'}
								colorScheme={'blue'}>
								Wyślij wiadomość
							</Button>
							<HStack justifyContent={'center'} alignItems={'center'}>
								<TfiMobile fontSize={'24px'} />
								<Text ref={phoneNumber} fontSize={'24px'}>
									xxx xxx xxx
								</Text>
							</HStack>
							<Button
								variant={'solid'}
								colorScheme={'blue'}
								w={'100%'}
								onClick={() => {
									if (phoneNumber.current?.textContent) {
										phoneNumber.current.textContent = advertData?.advertiser.phoneNumber as string;
									}
								}}>
								Zadzwoń
							</Button>
						</VStack>
						<Link to={`../uzytkownik/${advertData?.advertiser?._id}`}>
							<HStack m={'20px'} justifyContent={'center'} alignItems={'center'}>
								<SecondaryText>Więcej od tego ogłoszeniodawcy</SecondaryText>
								<TfiAngleRight />
							</HStack>
						</Link>
					</Box>

					<VStack
						boxShadow={'md'}
						bg={'#fff'}
						borderRadius={'20px'}
						width={'100%'}
						padding={'20px'}
						alignItems={'stretch'}>
						<Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>
							lokalizacja
						</Text>
						<HStack my={'20px'} justifyContent={'center'} alignItems={'center'}>
							<TfiLocationPin fontSize={'32px'} />
							<Flex flexDirection={'column'}>
								<Text fontWeight={'bold'}>{advertData?.address.city}</Text>
								<SecondaryText fontSize={'sm'}>{advertData?.address?.state}</SecondaryText>
								<SecondaryText fontSize={'sm'} fontWeight={'light'}>
									143 km od Ciebie
								</SecondaryText>
							</Flex>
						</HStack>
						<Box>
							<img
								width='600'
								alt={'map'}
								height='400'
								src={`https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=300&height=200&center=lonlat:${advertData?.address?.lon},${advertData?.address?.lat}&zoom=10.2989&apiKey=48c7df543ab243d5bb855a75817032ff`}></img>
						</Box>
					</VStack>
					{advertData?.advertiser.details.isCompanyAcc ? (
						<VStack
							fontSize={'sm'}
							boxShadow={'md'}
							bg={'#fff'}
							borderRadius={'20px'}
							width={'100%'}
							padding={'20px'}
							alignItems={'stretch'}>
							<Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>
								dane firmy
							</Text>
							<Text
								maxH={'14rem'}
								sx={{
									'&::-webkit-scrollbar': {
										width: '4px',
										borderRadius: '8px',
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: `blue.500`,
										borderRadius: '8px',
									},
								}}
								overflowY={'scroll'}>
								{advertData?.advertiser.details.aboutCompany}
							</Text>
							<VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
								<Text>
									<span style={{ fontWeight: '500' }}>Nazwa firmy:</span>{' '}
									{advertData?.advertiser.details.name}
								</Text>
								{advertData?.advertiser.details?.nip && (
									<Text>
										<span style={{ fontWeight: '500' }}>NIP:</span>{' '}
										{advertData?.advertiser.details.nip}
									</Text>
								)}
								<Text>
									<span style={{ fontWeight: '500' }}>Numer telefonu:</span>{' '}
									{advertData?.advertiser.details.phoneNumber}
								</Text>
								{advertData?.advertiser.details?.email && (
									<Text>
										<span style={{ fontWeight: '500' }}>E-mail:</span>{' '}
										{advertData?.advertiser.details.email}
									</Text>
								)}
								<Text>
									<span style={{ fontWeight: '500' }}>Adres:</span>{' '}
									{advertData?.advertiser.details.address.street}{' '}
									{advertData?.advertiser.details.address.buildingNumber}
								</Text>
								<Text>
									{advertData?.advertiser.details.address.postcode}{' '}
									{advertData?.advertiser.details.address.city}
								</Text>
								{advertData?.advertiser?.details?.companyWebsite && (
									<Text>
										<span style={{ fontWeight: '500' }}>Strona internetowa: </span>
										<a
											target='_blank'
											rel='noreferrer'
											href={advertData?.advertiser?.details?.companyWebsite}>
											{advertData?.advertiser?.details?.companyWebsite}
										</a>
									</Text>
								)}
							</VStack>
						</VStack>
					) : null}
				</Flex>
			</Flex>
			<Box boxShadow={'md'} mt={'20px'} bg={'#fff'} borderRadius={'20px'} padding={'20px'}>
				<Text fontSize='md' textTransform={'uppercase'} fontWeight={'bold'}>
					Zobacz też
				</Text>
			</Box>
		</ContainerBox>
	);
}
export default Ad;
