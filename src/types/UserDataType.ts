import { numType } from "./AdvertDataType";

export interface UserDataType {
	_id: string;
	username: string;
	advertiser: AccountDataType;
	avatar: string;
	updatedAt: string;
	createdAt: string;
	banner: string;
}

export interface AccountAddressDataType {
	city: string;
	postcode: string;
	state: string;
	county: string;
	lat?: numType;
	lon?: numType;
}

export type AccountDataType = PersonalAccountDataType | CompanyAccountDataType;

export interface PersonalAccountDataType {
	name: string;
	phoneNumber: string;
	isCompanyAcc: false;
	address: AccountAddressDataType;
}

export interface CompanyAccountDataType {
	name: string;
	phoneNumber: string;
	aboutCompany: string;
	companyWebsite: string;
	isCompanyAcc: true;
	address: AccountAddressDataType & {
		street: string;
		buildingNumber: numType;
	};
	nip: string,
	email: string
}
