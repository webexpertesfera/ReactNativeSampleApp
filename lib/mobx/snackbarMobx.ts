import { action, computed, makeObservable, observable } from 'mobx';

export type SnackAlert = {
    text: string;
    actionLabel?: string;
    actionCallback?(): void;
};

export class SnackbarMobx {
    @observable
    public snackbarQueue: SnackAlert[];

    constructor() {
        this.snackbarQueue = [];
        makeObservable(this);
    }

    @computed
    public get shouldShowSnack() {
        return this.snackbarQueue.length > 0;
    }

    @action
    public addSnack = (newSnack: SnackAlert) => {
        // this.snackbarQueue.shift();
        this.snackbarQueue.push(newSnack);
    };

    @action
    public removeFirst = () => {
        this.snackbarQueue.pop();
    };
}
