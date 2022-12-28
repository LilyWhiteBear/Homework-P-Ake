import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface SessionState {
    publicKey: string | undefined;
    token?: string;
    usr: string;
    uuid: string;
    role: string;
    timeStamp: string | undefined;
    sessionID: string | undefined;
    resumedUrlAfterAuthtication?: string;
    statusCd?: string;
}

export function createInitialState(): SessionState {
    return {
        token: '',
        usr: '',
        uuid: '',
        role: '',
        publicKey: '',
        timeStamp: '',
        sessionID: '',
        resumedUrlAfterAuthtication: '',
        statusCd: ''
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'session',
    resettable: true
})
export class SessionStore extends Store<SessionState> {
    constructor() {
        super(createInitialState());
    }
}