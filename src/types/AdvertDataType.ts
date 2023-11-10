import { AccountAddressDataType } from './UserDataType';

export type numType = number | '';
export type boolType = boolean | '';

export interface AdvertDetailsType {
	brand?: string;
	model?: string;
	vinNumber?: string;
	engineSize?: numType;
	productionYear?: string;
	enginePower?: numType;
	fuel?: 'diesel' | 'benzyna' | 'lpg' | 'elektryczny' | 'hybryda';
	bodyType?: 'sedan' | 'coupe' | 'hatchback' | 'suv' | 'kabriolet' | 'limuzyna' | 'minivan' | 'kombi' | 'pickup';
	mileage?: string;
	color?: string;
	condition?: 'nowy' | 'używany';
	techCondition?: 'uszkodzony' | 'nieuszkodzony';
	transmission?: 'manualna' | 'automatyczna';
	driveType?: '4x4' | 'przód' | 'tył';
	level?: 'parter' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'powyżej 10' | 'poddasze';
	isFurnished?: boolType;
	buildingType?: 'blok' | 'kamienica' | 'apartamentowiec' | 'pozostałe' | 'wolnostojący' | 'bliźniak' | 'szeregowiec' | 'gospodarstwo' | 'pozostałe';
	livingArea?: numType;
	plotArea?: numType;
	numberOfRooms?: '1' | '2' | '3' | '4 i więcej';
	numberOfFloors?: 'parterowy' | 'jednopiętrowy' | 'dwupiętrowy i więcej';
	rent?: { value: numType };
	typeOfPlot?: 'rekreacyjne' | 'budowlane' | 'rolne' | 'leśne' | 'ogródek działkowy';
	size?: string;
}

export interface AdvertPriceType {
	value: numType;
	currency?: 'zl' | '€' | '$';
	isNegotiable: boolType;
}

export interface AdvertType {
	_id: string;
	tittle: string;
	price: AdvertPriceType;
	description: string;
	noOfviews?: numType;
	advertiser: {
		name: string;
		phoneNumber: string;
		_id: string;
	};
	address: AccountAddressDataType;
	images: string[];
	mainCategory: string;
	subCategory: string;
	subSubCategory?: string;
	details: AdvertDetailsType;
	createdAt: string;
	updatedAt: string;
	endAt: string;
}
