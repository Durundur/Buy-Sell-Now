import { AdvertType } from './AdvertDataType';
import { ConversationDataType } from './ConversationDataType';
import { AccountDataType } from './UserDataType';


export type ApiQueryResponseType<T = void> = {
	data?: T 
	success: boolean;
	status: number;
	message: string;
	redirect?: string
};

export type AdvertQueryType = AdvertType & {
	advertiser: {
		details: AccountDataType & {
			_id: string;
			avatar: string;
			createdAt: string;
			updatedAt: string;
		};
	};
};

export type EditAdvertQueryType = AdvertType & {
	images: (string | File)[];
};


export type ConversationQueryType = ConversationDataType & {
	ad: {
		advertiser: {
			name: string;
			_id: string;
			details: {
				_id: string;
				avatar: string;
			};
		};
		_id: string;
		tittle: string;
		images: string[];
	};
	inquirer: {
		advertiser: {
			name: string;
		};
		_id: string;
		avatar: string;
	};
};

////
export interface UserAdsStats {
	totalCount: number;
	stats: MainCategoryStats[];
}

export interface CategoryStats {
	count: number;
	name: string;
}

export interface MainCategoryStats extends CategoryStats {
	subCategory: SubCategoryStats[];
}

export interface SubCategoryStats extends CategoryStats {
	subSubCategory: SubSubCategoryStats[];
}

export interface SubSubCategoryStats extends CategoryStats {}
