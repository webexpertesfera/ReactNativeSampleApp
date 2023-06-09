import { configure } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, ReactElement, useEffect } from 'react';
import { Modal, Snackbar } from 'react-native-paper';
import { ProgressAlertMobx } from './progressDialogMobx';
import { Animated, Easing, Image, View } from 'react-native';

configure({ enforceActions: 'observed' });

/**
 * This class is the mobx store which contains all the UI-related settings which should be saved.
 * See the domain vs. UI split in https://mobx.js.org/defining-data-stores.html for more context
 */
export class UIMobx {
    // TODO: Fill me in when there's UI settings that should be saved in here.
    public snackbarMobx: ProgressAlertMobx;
    constructor() {
        this.snackbarMobx = new ProgressAlertMobx();
    }
}

const uiMobx = new UIMobx();
export const ProgressUIMobxContext = createContext<UIMobx>(uiMobx);

export const ProgressUIMobxProvider: React.FC<{ children: ReactElement | ReactElement[] }> = function (props) {
    return <ProgressUIMobxContext.Provider value={uiMobx}>{props.children}</ProgressUIMobxContext.Provider>;
};

export const ProgressBarProvider: React.FC = observer((props) => {
    const { snackbarMobx } = React.useContext(ProgressUIMobxContext);
    
   const spinValue = new Animated.Value(0)
    // First set up animation 
Animated.timing(
    spinValue,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true  // To make use of native driver for performance
  }
).start()

// Next, interpolate beginning and end values (in this case 0 and 1)
const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})

    return (
        <>
                <Modal
                style={{justifyContent:'center',alignItems:'center'}}
                    visible={snackbarMobx.shouldShowSnack}
                    dismissable={false}
                    onDismiss={() => {
                        snackbarMobx.removeFirst();
                    }}
                >
                    <Animated.Image
  style={{transform: [{rotate: spin}] }}
  source={require('../assets/loading/loader.png')} />
                 

                </Modal>
        </>
    );
});
