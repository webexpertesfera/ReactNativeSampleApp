import React, { useEffect } from "react";
import { useTheme } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { YELLOW } from "../constants/colors";
import { RootStackScreenProps } from "../types";
import { RootMobxContext } from "../mobx/rootMobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }: RootStackScreenProps<'Root'>) {
    const rootMobx = React.useContext(RootMobxContext);
    const getUserToken = async () => {
       const value = await  rootMobx.userInfo.tryGetToken();
        if (value !== null) {
            rootMobx.userInfo.tryGetUserInfo();
            navigation.replace('Home');
        } else {
            navigation.replace('SignIn');
        }
    };
    const styles = useStyles();
    useEffect(()=>{
        const interval = setTimeout(() => {
            getUserToken();
        }, 3000);
          return () => clearInterval(interval);
    },[])

    return <View style={styles.container}>
        <Image
            source={require('../assets/splash/Demo.png')} />
    </View>
}


const useStyles = () => {

    const theme = useTheme();

    const styles = React.useMemo(
        () =>
            StyleSheet.create({
                container: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    minHeight: '100%',
                    // paddingHorizontal: standardHorizontalPadding,
                    backgroundColor: YELLOW,
                },
            }),
        [theme]
    );
    return styles;
};
