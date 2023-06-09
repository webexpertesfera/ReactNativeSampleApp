import { action, computed, makeObservable, observable } from 'mobx';

export type ProgressAlert = {
    visible: boolean;
};

export class ProgressAlertMobx {
    @observable
    public progressDialogQueue: ProgressAlert;

    constructor() {
        this.progressDialogQueue ={visible:false};
        makeObservable(this);
    }

    @computed
    public get shouldShowSnack() {
        return this.progressDialogQueue.visible;
    }

    @action
    public addSnack = (newSnack: ProgressAlert) => {
        // this.snackbarQueue.shift();
        this.progressDialogQueue={visible:true};
    };

    @action
    public removeFirst = () => {
        this.progressDialogQueue ={visible: false};
    };
}
