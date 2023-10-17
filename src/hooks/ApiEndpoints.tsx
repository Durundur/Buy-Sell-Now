export const LOGIN_URL = 'api/v1/auth/login/'
export const LOGOUT_URL = 'api/v1/auth/logout/'
export const SIGNUP_URL = 'api/v1/auth/register/'
export const ENSUREAUTH_URL = 'api/v1/auth/ensure-auth/'
export const GET_AD_URL = (adId: string) => {return `api/v1/ads/${adId}`};
export const UPDATE_AD_URL = GET_AD_URL;
export const DELETE_AD_URL = GET_AD_URL;
export const CREATE_AD_URL = 'api/v1/ads';
export const GET_ADS_URL = (searchPathAndParams: string) => {return `api/v1/ads/${searchPathAndParams}`};
export const GET_PROMOTED_ADS_URL = () => {return `api/v1/ads/promoted`};
export const GET_USER_ADS_URL = (userId: string) => {return `api/v1/ads/user/${userId}`};
export const GET_USER_ADS_STATS_URL = (userId: string) => {return `api/v1/ads/user/${userId}/stats`};
export const GET_USER_INFO_URL = (userId: string) => {return `api/v1/ads/user/${userId}/info`};
export const GET_ACC_CONVERSATIONS_URL = 'api/v1/conversations/';
export const GET_ACC_CONVERSATION_CHAT_URL = (conversationId: string) => {return `api/v1/conversations/${conversationId}`};
export const CREATE_ACC_CONVERSATION = 'api/v1/conversations/new-conversation';
export const GET_ACC_GENERAL_INFO_URL = 'api/v1/settings/general-info';
export const UPDATE_ACC_GENERAL_INFO_URL = 'api/v1/settings/general-info';
export const UPDATE_ACC_EMAIL_URL = 'api/v1/settings/change-email';
export const UPDATE_ACC_PASS_URL = 'api/v1/settings/change-password';
export const UPDATE_ACC_IMAGES_URL = 'api/v1/settings/change-images';