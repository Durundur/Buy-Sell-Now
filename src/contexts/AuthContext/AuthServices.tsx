import axios, { type AxiosPromise } from "axios";
import { LoginCredentials, LoginRequestResponse, RegisterCredentials } from "./types";

const baseURL = process.env.REACT_APP_API
const LOGIN_URL = `${baseURL}api/v1/auth/login`
const LOGOUT_URL = `${baseURL}api/v1/auth/logout`
const SIGNUP_URL = `${baseURL}api/v1/auth/register`
const ENSUREAUTH_URL = `${baseURL}api/v1/auth/ensure-auth`

export const loginUser = (data: LoginCredentials): AxiosPromise<LoginRequestResponse> => {
    return axios({ method: 'post', url: LOGIN_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const logoutUser = (): AxiosPromise<void> => {
    return axios({ method: 'delete', url: LOGOUT_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const ensureAuth = (): AxiosPromise<LoginRequestResponse> => {
    return axios({ method: 'get', url: ENSUREAUTH_URL, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}

export const signupUser = (data: RegisterCredentials): AxiosPromise<LoginRequestResponse> => {
    return axios({ method: 'post', url: SIGNUP_URL, data: data, withCredentials: true, headers: { 'Content-Type': 'application/json' } })
}


