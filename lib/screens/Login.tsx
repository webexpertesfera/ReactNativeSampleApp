import { Divider, Text, TouchableRipple, useTheme } from "react-native-paper";
import {  StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBar from "../components/Input";
import React from "react";
import ButtonBar from "../components/Button";
import { UIMobxContext } from "../mobx/uiMobx";
import { txtEmailAddress, txtForgotPwd, txtLogin, txtLoginToRegister, txtOr, txtPassword, txtRegister, txtSignInToContinue, txtWelcomeBack, validationEnter, validationEnterValid } from "../constants/strings";
import { BLACK, GREY, YELLOW } from "../constants/colors";
import { validateEmail } from "../utils/Utils";
import { signIn, } from "../gsApi";
import { RootStackScreenProps } from "../types";
import { TUserInfo } from "../model/user/UserInfo";
import { TErrorInfo } from "../model/user/ErrorInfo";
import { RootMobxContext } from "../mobx/rootMobx";
import { ProgressUIMobxContext } from "../mobx/progressuiMobx";

export default function LoginScreen({ navigation }: RootStackScreenProps<'SignIn'>) {
    const styles = useStyles();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const uiContext = React.useContext(UIMobxContext);
    const rootMobx = React.useContext(RootMobxContext);
    const progressContext = React.useContext(ProgressUIMobxContext);
    const loginApi = async () => {
        if (email.trim().length == 0) {
            showMessage(validationEnter + txtEmailAddress);
        } else if (password.length == 0) {
            showMessage(validationEnter + txtPassword);
        } else if (!validateEmail(email)) {
            showMessage(validationEnterValid + txtEmailAddress);
        } else {
            showProgress()
            const userInfo = await signIn(email, password);
            hideProgress();
            if (checkResponseSuccess(userInfo)) {
                rootMobx.userInfo.tryGetToken();
                rootMobx.userInfo.tryGetUserInfo();
                navigation.reset({index:0,routes:[{name:'Home'}]}) 
            } else if ((userInfo as TErrorInfo).message) {
                const errorMessage: TErrorInfo = userInfo as TErrorInfo;
                showMessage(errorMessage.message);
            }
        }
    }

    const checkResponseSuccess = (response: any): response is TUserInfo => { return response.email }


    const showMessage = (message: string) => {
        uiContext.snackbarMobx.addSnack({
            text: `${message}`,
        });
    }

    const hideProgress =()=>{
        progressContext.snackbarMobx.removeFirst();
    }

    const showProgress = () => {
        progressContext.snackbarMobx.addSnack({
            visible:true,
        });
    }

    return (<SafeAreaView style={styles.container} >
        <Text style={styles.heading}>
            {txtLogin}
        </Text>
        <Text style={styles.headingDesc}>
            {txtWelcomeBack}
        </Text>
        <Text style={styles.headingDesc2}>
            {txtSignInToContinue}
        </Text>
        <Divider style={{ height: 40 }} />
        <InputBar
            keyboadType={'email-address'}
            placeHolderText={txtEmailAddress}
            value={email}
            onChange={text => setEmail(text)}
        />
        <InputBar
            secureTextEntry={true}
            placeHolderText={txtPassword}
            value={password}
            onChange={text => setPassword(text)}
        />
        <TouchableRipple style={{
            alignSelf: 'flex-end', marginTop: 8,
        }} onPress={() => {
            navigation.push('ForgotPassword');
        }}>
            <Text style={styles.forgotPwd}>
                {txtForgotPwd}
            </Text>
        </TouchableRipple>
        <ButtonBar
            value={txtLogin}
            onClick={() => {
                loginApi();
            }}
        />
        <Divider style={{ flex: 1, }} />
        <Text style={styles.labelOr}>
            {txtOr}
        </Text>
        <Divider style={{ marginVertical: 5, }} />

        <TouchableRipple onPress={() => {
            navigation.push('Register');
        }}>
             <Text>
            <Text style={styles.forgotPwd}>
                {txtLoginToRegister}
            </Text>
            <Text style={styles.labelOrBold}>
                {txtRegister}
            </Text>
            </Text>
        </TouchableRipple>
    </SafeAreaView>)
}


const useStyles = () => {
    const theme = useTheme();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: YELLOW,
                    flex: 1,
                    paddingHorizontal: 40,
                    paddingVertical:20,
                },
                heading: {
                    color: BLACK,
                    marginTop: 20,
                    fontWeight: 'bold',
                    fontSize: 26
                },
                headingDesc: {
                    color: BLACK, marginTop: 20, fontWeight: '500', fontSize: 24
                },
                headingDesc2: {
                    color: GREY, marginTop: 8, fontWeight: 'normal', fontSize: 14
                },
                forgotPwd: {
                    color: GREY, fontWeight: 'normal', fontSize: 14
                },
                socialContainer: {
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10
                },
                imgSocialIcon: {
                    width: 50, height: 50, resizeMode: "center"
                },
                labelOr: {
                    color: GREY, marginTop: 8, fontWeight: 'normal', fontSize: 14
                },
                labelOrBold: {
                    color: BLACK, marginTop: 8, fontWeight: 'bold', fontSize: 14
                }
            }),
        [theme]
    );
    return styles;
};