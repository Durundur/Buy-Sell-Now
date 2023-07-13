import axios from "axios";

const baseURL = process.env.REACT_APP_API_LOCAL 

const LOGIN_URL = `${baseURL}api/v1/auth/login`
const LOGOUT_URL = `${baseURL}api/v1/auth/logout`
const SIGNUP_URL =  `${baseURL}api/v1/auth/register`
const ADS_URL =  `${baseURL}api/v1/ads?page=`
const ENSUREAUTH_URL = `${baseURL}api/v1/auth/ensure-auth`


export const loginUser = (data)=>{
    return axios({method: 'post', url: LOGIN_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const logoutUser = () => {
    return axios({method: 'delete', url: LOGOUT_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const ensureAuth = () => {
    return axios({method: 'get', url: ENSUREAUTH_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const signupUser = (data)=>{
    return axios({method: 'post', url: SIGNUP_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const getAllAds = (page) => {
    return axios({method: 'get', url: ADS_URL+page, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const getAd = (AdId) => {
    return axios({method: 'get', url: `${ADS_URL}/${AdId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const getUserAds = (userId) => {
    return axios({method: 'get', url: `${ADS_URL}/user/${userId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const postAd = (data) => {
    return axios({method: 'post', url: ADS_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const updateAd = (data, AdId) => {
    return axios({method: 'put', url: `${ADS_URL}/${AdId}`, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}

export const deleteAd = (AdId) => {
    return axios({method: 'delete', url: `${ADS_URL}/${AdId}`, withCredentials: true, headers: { 'Content-Type': 'application/json' }})
}
