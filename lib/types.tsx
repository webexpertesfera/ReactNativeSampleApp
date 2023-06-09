import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type RootStackParamList = {
    Root:undefined;
    SignIn: undefined;
    Register :undefined;
    ForgotPassword:undefined;
    Home: undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
