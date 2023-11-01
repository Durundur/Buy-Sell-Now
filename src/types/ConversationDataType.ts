import { AdvertPriceType } from "./AdvertDataType"


export interface ConversationChatDataType{
    conversation: {
        ad:{
            _id: string,
            advertiser: {
                name: string,
                _id: string
            }
            images: string[]
            price: AdvertPriceType
            tittle: string
        }
        _id: string,
    }
    messages: ConversationChatMessageType[],
}

export interface ConversationChatMessageType{
    _id: string,
    timestamp: string,
    author: string,
    message: string 
}

export interface ConversationDataType{
    _id: string,
    ad: string,
    advertiser: string,
    inquirer: string
    lastMessages: ConversationChatMessageType,
}