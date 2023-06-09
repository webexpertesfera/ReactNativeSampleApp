import { configure } from 'mobx';
import React, { createContext, ReactElement } from 'react';
import { UserInfoMobx } from './userInfoMobx';

configure({ enforceActions: 'observed' });

// Equivalent to "RootStore" in standard Mobx lingo, but let's try to avoid using the term "store" as in Mobx store and use "mobx" to mean a Mobx store,
// so that we can use "store" to mean a grocery store (domain object).
export class RootMobx {
    public userInfo: UserInfoMobx;

    constructor() {
        this.userInfo = new UserInfoMobx(this);
    }
}

const rootMobx = new RootMobx();
export const RootMobxContext = createContext<RootMobx>(rootMobx);

export const RootMobxProvider: React.FC<{ children: ReactElement | ReactElement[] }> = function (props) {
    return <RootMobxContext.Provider value={rootMobx}>{props.children}</RootMobxContext.Provider>;
};
