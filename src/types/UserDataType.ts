export interface UserDataType {
	_id: string;
	username: string;
	advertiser: PersonalAccountDataType | CompanyAccountDataType;
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
	lat?: string;
	lon?: string;
}

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
		buildingNumber: number;
	};
	nip: string,
	email: string
}
