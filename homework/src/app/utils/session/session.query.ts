import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { SessionState, SessionStore } from "./session.store";

@Injectable({
    providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {

    constructor(protected override store: SessionStore) {
        super(store);
    }

    public get isLoggedIn() {
        return !!this.getValue().token;
    }

    public getUserData() : Observable<Pick<SessionState, never>> {
        return this.select(['usr', 'role', 'token', 'uuid']);
    }
}