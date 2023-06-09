// eslint-disable-next-line
import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, observable, runInAction } from 'mobx';
import { RootMobx } from './rootMobx';
import { TUserInfo } from "../model/user/UserInfo";

/**
 * A StoreTokenMobx which contains useToken that are in the database
 * (A new database should be written first)
 */
export class UserInfoMobx {
    public rootMobx: RootMobx;

    @observable
    public token = '';

    @observable
    public userInfo?:TUserInfo= undefined;

    @observable
    public socialType = '';
   
    @action addToken = (token: string) => {
        this.token = token;
    };

    @action addUserInfo = (userInfo: TUserInfo) => {
        this.userInfo = userInfo;
    };


    public constructor(rootMobx: RootMobx) {
        this.rootMobx = rootMobx;
    }

    @action getUserInfo () {
        this.userInfo ;
    };


    public getToken() {
        return this.token;
    }

    @action async tryGetUserInfo() {
       
        const userInfo = await AsyncStorage.getItem('@userInfo');
        const socialType= await AsyncStorage.getItem('@social');
        if(socialType){
            runInAction(() => {
                this.socialType= socialType;
            });
        }
        if (userInfo) {
            runInAction(() => {
                this.userInfo = JSON.parse(userInfo);
            });
            return userInfo;
        }
        return null;
    }

    @action async tryGetToken() {
        if (this.token) {
            return this.token;
        }
        const token = await AsyncStorage.getItem('@token');
        if (token) {
            runInAction(() => {
                this.token = token;
            });
            return token;
        }
        return null;
    }

    @action addIsSocial = (type: string) => {
        this.socialType = type;
    };
    public getSocialType() {
        return this.socialType;
    }
    @action async clearSession() {
        await AsyncStorage.removeItem('@token');
         await AsyncStorage.removeItem('@userInfo');
         AsyncStorage.removeItem('@social'); 
        this.token = '';
        this.userInfo= undefined;
        this.socialType = '';
    }
}
