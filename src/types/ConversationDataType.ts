

export interface ConversationChatDataType{
    _id: string,
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