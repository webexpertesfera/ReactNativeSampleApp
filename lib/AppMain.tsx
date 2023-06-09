import { Provider } from "react-native-paper";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { SnackbarProvider, UIMobxProvider } from "./mobx/uiMobx";
import { StatusBar } from "react-native";   
import { SnackbarMobx } from "./mobx/snackbarMobx";
import { useEffect } from "react";
import { ProgressAlertMobx } from "./mobx/progressDialogMobx";
import { ProgressBarProvider, ProgressUIMobxProvider } from "./mobx/progressuiMobx";
export const AppMain = ()=>{
    const isLoadingComplete = true;

 
    return (<SafeAreaProvider>
            <MenuProvider>
                <Provider>
                    
                    <UIMobxProvider>
                      
                        <SnackbarProvider>

                        <Navigation />
                        <StatusBar />
                        
                        <ProgressBarProvider />

                        </SnackbarProvider>

                    </UIMobxProvider>
                </Provider>
            </MenuProvider>
    </SafeAreaProvider>)
}