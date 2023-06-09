import { Divider, Modal, Text, TouchableRipple, useTheme } from "react-native-paper";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBar from "../components/Input";
import React from "react";
import ButtonBar from "../components/Button";
import { txtAlreadyAccountLogin, txtConfirmPwd, txtCreateAccount, txtEmailAddress, txtFillFormToContinue, txtLogin, txtName, txtOkay, txtOr, txtPassword, txtRegisteredSuccess, txtRegisteredSuccessDesc, txtSignUp, validationEnter, validationEnterValid, validationEnterValidPassword, validationPwdNotMatch } from "../constants/strings";
import { BLACK, GREY, YELLOW } from "../constants/colors";
import { validateEmail } from "../utils/Utils";
import { signUp,  } from "../gsApi";
import { TUserInfo } from "../model/user/UserInfo";
import { TErrorInfo } from "../model/user/ErrorInfo";
import { UIMobxContext } from "../mobx/uiMobx";
import DefaultCommonAlert from "../components/CommonAlert";
import { RootStackScreenProps } from "../types";
import { ProgressUIMobxContext } from "../mobx/progressuiMobx";
export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
    const styles = useStyles();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [fullName, setFullName] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const uiContext = React.useContext(UIMobxContext);
    const progressContext = React.useContext(ProgressUIMobxContext);
    const registerApi = async () => {
        if (fullName.trim().length == 0) {
            showMessage(validationEnter + txtName)
        }
        else if (email.trim().length == 0) {
            showMessage(validationEnter + txtEmailAddress)
        } else if (!validateEmail(email)) {
            showMessage(validationEnterValid + txtEmailAddress);
        } else if (password.length == 0) {
            showMessage(validationEnter + txtPassword);
        } else if (confirmPassword.length == 0) {
            showMessage(validationEnter + txtConfirmPwd);
        } else if (txtPassword.length < 8) {
            showMessage(txtPassword + validationEnterValidPassword);
        } else if (password.toString() != confirmPassword.toString()) {
            showMessage(validationPwdNotMatch);
        } else {
            console.log(confirmPassword);
            showProgress();
            const userInfo = await signUp(email, password, fullName);
            hideProgress();
            if (checkResponseSuccess(userInfo)) {
                setModalVisible(true);
            } else if ((userInfo as TErrorInfo).code) {
                const errorMessage: TErrorInfo = userInfo as TErrorInfo;
                showMessage(errorMessage.message);
            }

        }
    }

    const hideProgress = () => {
        progressContext.snackbarMobx.removeFirst();
    }

    const showProgress = () => {
        progressContext.snackbarMobx.addSnack({
            visible: true,
        });
    }



    const checkResponseSuccess = (response: any): response is TUserInfo => { return response.email }

    const showMessage = (message: string) => {
        uiContext.snackbarMobx.addSnack({
            text: `${message}`,
        });
    }
    return (<SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, width: '100%', height: '100%' }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 20, flex: 1 }}>
                    <Text style={styles.heading}>
                        {txtSignUp}
                    </Text>

                    <Text style={styles.headingDesc}>
                        {txtCreateAccount}
                    </Text>
                    <Text style={styles.headingDesc2}>
                        {txtFillFormToContinue}
                    </Text>
                    <Divider style={{ height: 40, backgroundColor: 'transparent' }} />
                    <InputBar
                        placeHolderText={txtName}
                        value={fullName}
                        onChange={text => setFullName(text)}
                    />
                    <InputBar
                        placeHolderText={txtEmailAddress}
                        value={email}
                        onChange={text => setEmail(text)}
                    />
                    <InputBar
                        placeHolderText={txtPassword}
                        value={password}
                        secureTextEntry={true}
                        onChange={text => setPassword(text)}
                    />
                    <InputBar
                        placeHolderText={txtConfirmPwd}
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChange={text => setConfirmPassword(text)}
                    />
                    <ButtonBar
                        value={txtSignUp}
                        onClick={() => {
                            registerApi();
                        }}
                    />
                    <Divider style={{marginTop:10}} />
                    <Text style={styles.labelOr}>
                        {txtOr}
                    </Text>
                    <Divider style={{marginTop:10}} />
                    <TouchableRipple
                        

                    onPress={() => {
                        navigation.goBack();
                    }}>
                        <Text style={{  }}>
                            <Text style={styles.labelOr}>
                                {txtAlreadyAccountLogin}
                            </Text>
                            <Text style={styles.labelOrBold}>
                                {txtLogin}
                            </Text>
                        </Text>
                    </TouchableRipple>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
        <Modal
            dismissableBackButton={false}
            dismissable={false}
            visible={modalVisible}
            style={{ padding: 50 }}
            onDismiss={() => {
                setModalVisible(false);
            }}
        >
            <DefaultCommonAlert
                icon={require('../assets/signup/ic_check.png')}
                title={txtRegisteredSuccess}
                description={txtRegisteredSuccessDesc}
                btnOkayPlaceHolder={txtOkay}
                onClickOk={() => {
                    setModalVisible(false);
                    navigation.goBack();
                }}
            />
        </Modal>
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
                    paddingHorizontal: 20
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
                    color: GREY, alignSelf: 'flex-end', marginTop: 8, fontWeight: 'normal', fontSize: 14
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