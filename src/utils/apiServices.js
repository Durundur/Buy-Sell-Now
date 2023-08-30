import axios from "axios";

const baseURL = process.env.REACT_APP_API
// const baseURL = process.env.REACT_APP_API_LOCAL

const LOGIN_URL = `${baseURL}api/v1/auth/login`
const LOGOUT_URL = `${baseURL}api/v1/auth/logout`
const SIGNUP_URL = `${baseURL}api/v1/auth/register`
const ADS_URL = `${baseURL}api/v1/ads`
const ENSUREAUTH_URL = `${baseURL}api/v1/auth/ensure-auth`
const CONVERSATIONS_URL = `${baseURL}api/v1/conversations`
const SETTINGS_URL = `${baseURL}api/v1/settings`


export const loginUser = (data) => {
    return axios({ method: 'post', url: LOGIN_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const logoutUser = () => {
    return axios({ method: 'delete', url: LOGOUT_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const ensureAuth = () => {
    return axios({ method: 'get', url: ENSUREAUTH_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const signupUser = (data) => {
    return axios({ method: 'post', url: SIGNUP_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getAllAds = () => {
    return axios({ method: 'get', url: ADS_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getPromotedAds = () => {
    return axios({ method: 'get', url: `${ADS_URL}/promoted`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getAds = (queryParams) => {
    return axios({ method: 'get', url: `${ADS_URL}${queryParams}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}


export const getAd = (adId) => {
    return axios({ method: 'get', url: `${ADS_URL}/${adId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getUserAds = (queryParams) => {
    return axios({ method: 'get', url: `${ADS_URL}/user${queryParams}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}


export const getUsersAds = (queryParams) => {
    return axios({ method: 'get', url: `${ADS_URL}/${queryParams}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getUsersAdsStats = (userId) => {
    return axios({ method: 'get', url: `${ADS_URL}/user/${userId}/stats`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getUsersInfo = (userId) => {
    return axios({ method: 'get', url: `${ADS_URL}/user/${userId}/info`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const postAd = (data) => {
    return axios({ method: 'post', url: ADS_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const updateAd = (data, AdId) => {
    return axios({ method: 'put', url: `${ADS_URL}/${AdId}`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const deleteAd = (AdId) => {
    return axios({ method: 'delete', url: `${ADS_URL}/${AdId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getUserConversations = () => {
    return axios({ method: 'get', url: `${CONVERSATIONS_URL}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getConversationChat = (conversationId) => {
    return axios({ method: 'get', url: `${CONVERSATIONS_URL}/${conversationId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const createNewConversation = (data) => {
    return axios({ method: 'post', url: `${CONVERSATIONS_URL}/new-conversation`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const getUserInfo = () => {
    return axios({ method: 'get', url: `${SETTINGS_URL}/general-info`, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const updateUserInfo = (data) => {
    return axios({ method: 'put', url: `${SETTINGS_URL}/general-info`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const updateUserPass = (data) => {
    return axios({ method: 'put', url: `${SETTINGS_URL}/change-password`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const changeUserEmail = (data) => {
    return axios({ method: 'put', url: `${SETTINGS_URL}/change-email`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const updateUserImages = (data) => {
    return axios({ method: 'post', url: `${SETTINGS_URL}/change-images`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}


