import { AdvertPriceType, AdvertType } from "./AdvertDataType";
import { ConversationChatDataType, ConversationDataType } from "./ConversationDataType";
import { CompanyAccountDataType, PersonalAccountDataType } from "./UserDataType";



export type AdvertQueryType = AdvertType & {
    advertiser: {
       details: (PersonalAccountDataType | CompanyAccountDataType) & {
          _id: string,
          avatar: string,
          createdAt: string,
          updatedAt: string,
       }
    }
} 

export type EditAdvertQueryType = AdvertType & {
  images: (string | File)[]
}

export type MyAdvertQueryType = AdvertType;


export type ConversationQueryType = ConversationDataType & {
  ad:{
    advertiser:{
      name: string,
      _id: string,
      details: {
        _id: string,
        avatar: string
      }
    }
    _id: string,
    tittle: string,
    images: string[]
  },
  inquirer: {
    advertiser:{
      name: string
    },
    _id: string,
    avatar: string,
  }
} 


export type ConversationChatQueryType = ConversationChatDataType & {
  conversation: {
    _id: string,
    ad: {
      price: AdvertPriceType,
      advertiser: {
        name: string,
        _id: string
      },
      _id: string,
      tittle: string,
      images: string[]
    }
  }
}


export type UserAdsStats = {
  totalCount: number,
  stats: MainCategoryStats[] 
}

export type CategoryStats = {
  count: number,
  name: string,
}

export type MainCategoryStats = CategoryStats & {
  subCategory: SubCategoryStats[]
}

export type SubCategoryStats = CategoryStats & {
  subSubCategory: SubSubCategoryStats[];
}

export type SubSubCategoryStats = CategoryStats;

