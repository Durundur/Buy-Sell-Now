export const LOGIN_URL = 'api/v1/auth/login/'
export const LOGOUT_URL = 'api/v1/auth/logout/'
export const SIGNUP_URL = 'api/v1/auth/register/'
export const ENSUREAUTH_URL = 'api/v1/auth/ensure-auth/'
export const GET_AD_URL = (adId: string) => {return `api/v1/advert/${adId}`};
export const UPDATE_AD_URL = (adId: string) => {return `api/v1/advert/${adId}`};
export const DELETE_AD_URL = (adId: string) => {return `api/v1/advert/${adId}`};
export const CREATE_AD_URL = 'api/v1/advert';
export const GET_ADS_URL = (searchPathAndParams: string) => {return `api/v1/adverts/search/${searchPathAndParams}`};
export const GET_PROMOTED_ADS_URL = `api/v1/adverts/promoted`;
export const GET_USER_ADS_URL = (searchPathAndParams: string) => {return `api/v1/adverts/user/${searchPathAndParams}`};
export const GET_USER_PAGE_ADS_STATS_URL = (userId: string) => {return `api/v1/adverts/user/${userId}/stats`};
export const GET_USER_PAGE_INFO_URL = (userId: string) => {return `api/v1/adverts/user/${userId}/info`};
export const GET_ACC_CONVERSATIONS_URL = 'api/v1/conversations/';
export const GET_ACC_CONVERSATION_CHAT_URL = (conversationId: string) => {return `api/v1/conversation/${conversationId}`};
export const CREATE_ACC_CONVERSATION = 'api/v1/conversation';
export const GET_ACC_GENERAL_INFO_URL = 'api/v1/settings/general-info';
export const UPDATE_ACC_GENERAL_INFO_URL = 'api/v1/settings/general-info';
export const UPDATE_ACC_EMAIL_URL = 'api/v1/settings/change-email';
export const UPDATE_ACC_PASS_URL = 'api/v1/settings/change-password';
export const UPDATE_ACC_IMAGES_URL = 'api/v1/settings/change-images';