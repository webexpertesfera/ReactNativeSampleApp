import { Divider, Modal, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBar from "../components/Input";
import React from "react";
import ButtonBar from "../components/Button";
import { txtEmailAddress, txtEnterEmailMessageToReset, txtForgotPassword, txtOkay, txtResetPwdSuccess, txtResetPwdSuccessDesc, txtSendEmail, validationEnter, validationEnterValid } from "../constants/strings";
import { BLACK, GREY, YELLOW } from "../constants/colors";
import { validateEmail } from "../utils/Utils";
import { onForgotPassword } from "../gsApi";
import { UIMobxContext } from "../mobx/uiMobx";
import { TForgotResponse } from "../model/forgot/TForgotInfo";
import { TErrorInfo } from "../model/user/ErrorInfo";
import DefaultCommonAlert from "../components/CommonAlert";
import { RootStackScreenProps } from "../types";
import { ProgressUIMobxContext } from "../mobx/progressuiMobx";

export default function ForgotPasswordScreen({ navigation }: RootStackScreenProps<'ForgotPassword'>) {
    const [email, setEmail] = React.useState<string>("");
    const uiContext = React.useContext(UIMobxContext);
    const [modalVisible,setModalVisible] = React.useState<boolean>(false);
    const progressContext = React.useContext(ProgressUIMobxContext);
    const forgotApi =async()=>{
        if(email.trim().length == 0 ){
            showMessage( validationEnter+ txtEmailAddress);
        }else if(!validateEmail(email)){
            showMessage(validationEnterValid+txtEmailAddress);
        }else{
            showProgress();
            const response = await onForgotPassword(email);
            hideProgress();
            if(checkResponseSuccess(response)){
                setModalVisible(true);
            }else{
                const errorMessage: TErrorInfo = response as TErrorInfo;
                showMessage(errorMessage.message);
            }
        }
    }

    const hideProgress =()=>{
        progressContext.snackbarMobx.removeFirst();
    }

    const showProgress = () => {
        progressContext.snackbarMobx.addSnack({
            visible:true,
        });
    }


    const checkResponseSuccess = (response: any): response is TForgotResponse => {return response.message }

    const showMessage =(message:string)=>{
        uiContext.snackbarMobx.addSnack({
            text: `${message}`,
        });
    }


    return (<SafeAreaView style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: YELLOW, flex: 1, paddingHorizontal: 20 }}>
        <Text style={{ color: BLACK,marginTop:20, fontWeight: 'bold', fontSize: 26 }}>
            {txtForgotPassword}
        </Text>
        <Text style={{ color: GREY,textAlign:'center', marginTop: 8, fontWeight: 'normal', fontSize: 14 }}>
            {txtEnterEmailMessageToReset}
        </Text>
        <Divider style={{height:40}}/>
        <InputBar
            placeHolderText={txtEmailAddress}
            value={email}
            onChange={text => setEmail(text)}
        />
        <ButtonBar
            onClick={()=>{
                forgotApi();
            }}
            value={txtSendEmail}
        />
            <Modal
        visible={modalVisible}
        style={{padding:50}}
        dismissableBackButton={false}
        dismissable={false}
        onDismiss={()=>{
            setModalVisible(false);
        }}
      >
            <DefaultCommonAlert
                icon={require('../assets/reset/rotate.png')}
                title={txtResetPwdSuccess}
                description={txtResetPwdSuccessDesc}
                btnOkayPlaceHolder={txtOkay}
                onClickOk={()=>{
                    setModalVisible(false);
                    navigation.goBack();

                }}
            />
        </Modal>
    </SafeAreaView>)
}