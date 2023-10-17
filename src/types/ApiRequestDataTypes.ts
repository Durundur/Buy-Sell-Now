import { AdvertPriceType, AdvertType } from "./AdvertDataType";
import { ConversationChatDataType, ConversationDataType } from "./ConversationDataType";
import { CompanyAccountDataType, PersonalAccountDataType, UserDataType } from "./UserDataType";

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