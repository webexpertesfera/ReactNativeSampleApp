

/**
 * Retrieves user info
 * @param email User Email  Id
 * @param pwd  User Password
 * @returns A promise of  User Info TUserInfo. If no user found , than TErrorInfo will be returned.
 */

import axios from "axios";
import { TUserInfo } from "./model/user/UserInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { ErrorInfo } from "react";
import { TErrorInfo } from "./model/user/ErrorInfo";
import { TForgotResponse } from "./model/forgot/TForgotInfo";
import { TReadInfo } from "./model/read/Read";
import {  TermsCondition } from "./model/privacy/TermsCondition";

const environment = 'development';

const apiRoot =
    environment === 'development'
        ? 'https://student.vipankumar.in/v1'
        : '';


/**
 * Retrieves user info
 * @param email User Email  Id
 * @param pwd  User Password
 * @returns A promise of  User Info TUserInfo. If no user found , than TErrorInfo will be returned.
 */

export async function signIn(email: string, pwd: string): Promise<TUserInfo | TErrorInfo | null> {
    const url = `${apiRoot}/auth/login`;
    try {
        const response = await axios.post(url, {
            email: email,
            password: pwd,
        });
        console.log(response.data);
        const info: TUserInfo = response.data.user;
        const token: string = response.data.tokens.access.token;
        await AsyncStorage.setItem('@userInfo', JSON.stringify(info));
        await   AsyncStorage.setItem('@token', token);
        await  AsyncStorage.setItem('@social', ""); 

        return info;
    } catch (error: any) {
        console.log(error.response.data);
        const info: TErrorInfo = error.response.data;
        return info;
    }
}




export async function socialLogin(email: string, name: string,id:string): Promise<TUserInfo | TErrorInfo | null> {
    const url = `${apiRoot}/users/socialProvider`;
    try {
        const response = await axios.post(url, {
            email: email,
            provider_id: id,
        });
        console.log(response.data);
        const info: TUserInfo = response.data.user;
        const token: string = response.data.tokens.access.token;
        AsyncStorage.setItem('@userInfo', JSON.stringify(info));
        AsyncStorage.setItem('@token', token);
        AsyncStorage.setItem('@social', "social");
        return info;
    } catch (error: any) {
        console.log(error.response.data);
        const info: TErrorInfo = error.response.data;
        return info;
    }
}



/**
 * Create account
 * @param email User Email  Id
 * @param pwd  User Password
 * @param userName  User Name
 * @returns A promise of  User Info TUserInfo. If email already registered , than TErrorInfo will be returned.
 */

export async function signUp(email: string, pwd: string, userName: string): Promise<TUserInfo | TErrorInfo | null> {
    const url = `${apiRoot}/auth/register`;
    try {
        const response = await axios.post(url, {
            email: email,
            password: pwd,
            userName: userName,
        });
        const info: TUserInfo = response?.data.user;
        return info;
    } catch (error: any) {
        const info: TErrorInfo = error.response.data;
        return info;
    }
}


/**
 * send Otp for forgot password
 * @param email User Email  Id
 * @returns A promise of Message. If no user found , than TErrorInfo will be returned.
 */

export async function onForgotPassword(email: string): Promise<TForgotResponse | TErrorInfo | null> {
    const url = `${apiRoot}/auth/forgot-password`;
    try {
        const response = await axios.post(url, {
            email: email,
        });
        console.log('REsSPONSE',JSON.stringify(response));
        const info: TForgotResponse = response.data;
        return info;
    } catch (error: any) {
        console.log('Errrorr',JSON.stringify(error));   const info: TErrorInfo = error.response.data;
        return info;
    }
}

