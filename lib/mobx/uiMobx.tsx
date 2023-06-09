import { configure } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, ReactElement } from 'react';
import { Snackbar } from 'react-native-paper';
import { SnackbarMobx } from './snackbarMobx';

configure({ enforceActions: 'observed' });

/**
 * This class is the mobx store which contains all the UI-related settings which should be saved.
 * See the domain vs. UI split in https://mobx.js.org/defining-data-stores.html for more context
 */
export class UIMobx {
    // TODO: Fill me in when there's UI settings that should be saved in here.
    public snackbarMobx: SnackbarMobx;
    constructor() {
        this.snackbarMobx = new SnackbarMobx();
    }
}

const uiMobx = new UIMobx();
export const UIMobxContext = createContext<UIMobx>(uiMobx);

export const UIMobxProvider: React.FC<{ children: ReactElement | ReactElement[] }> = function (props) {
    return <UIMobxContext.Provider value={uiMobx}>{props.children}</UIMobxContext.Provider>;
};

export const SnackbarProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = observer((props) => {
    const { snackbarMobx } = React.useContext(UIMobxContext);
    return (
        <>
            {props.children}
            {snackbarMobx.snackbarQueue.map((snack, index) => (
                <Snackbar
                    key={index}
                    visible={true}
                    onDismiss={() => snackbarMobx.removeFirst()}
                    duration={2000}
                    wrapperStyle={{ bottom: 80 }}
                    action={{
                        label: snack.actionLabel ? snack.actionLabel : '',
                        onPress: snack.actionCallback,
                    }}
                >
                    {snack.text ?? ''}
                </Snackbar>
            ))}
        </>
    );
});
