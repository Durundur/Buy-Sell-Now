export interface LoginCredentials{
    username: string,
    password: string
}

export interface RegisterCredentials{
    username: string,
    password: string
}

export interface LoginRequestResponse{
    avatar?: string,
    message: string,
    redirect?: string,
    userId?: string,
    status: number,
    success: boolean
}

export type LoginHandlerType = (credentials: LoginCredentials) => Promise<LoginRequestResponse | AxiosResponse<LoginRequestResponse> | undefined>
export type RegisterHandlerType = (credentials: RegisterCredentials) => Promise<LoginRequestResponse | AxiosResponse<LoginRequestResponse> | undefined>
export type CheckAuthenticationHandlerType = () => AxiosResponse<LoginRequestResponse>
export type LogoutHandlerType = () => Promise<void>
export type UserInfoType = {
    userId?: string,
    userAvatar?: string
}

export interface AuthContexType{ userInfo: UserInfoType, loginHandler: LoginHandlerType, registerHandler: RegisterHandlerType, logoutHandler: LogoutHandlerType }
