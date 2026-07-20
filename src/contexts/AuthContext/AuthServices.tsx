import axios, { type AxiosPromise } from "axios";
import { LoginCredentials, LoginRequestResponse, RegisterCredentials } from "./types";
import { ENSUREAUTH_URL, LOGIN_URL, LOGOUT_URL, SIGNUP_URL } from "../../hooks/ApiEndpoints";

const baseURL = import.meta.env.VITE_BUY_SELL_NOW_API_URL;

export const loginUser = (data: LoginCredentials): AxiosPromise<LoginRequestResponse> => {
	return axios({ method: "post", baseURL, url: LOGIN_URL, data: data, withCredentials: true, headers: { "Content-Type": "application/json" } });
};

export const logoutUser = (): AxiosPromise<void> => {
	return axios({ method: "delete", baseURL, url: LOGOUT_URL, withCredentials: true, headers: { "Content-Type": "application/json" } });
};

export const ensureAuth = (): AxiosPromise<LoginRequestResponse> => {
	return axios({ method: "get", baseURL, url: ENSUREAUTH_URL, withCredentials: true, headers: { "Content-Type": "application/json" } });
};

export const signupUser = (data: RegisterCredentials): AxiosPromise<LoginRequestResponse> => {
	return axios({ method: "post", baseURL, url: SIGNUP_URL, data: data, withCredentials: true, headers: { "Content-Type": "application/json" } });
};
