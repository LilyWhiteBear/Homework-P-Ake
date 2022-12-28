import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { LanguageState, LanguageStore } from "./language.store";

@Injectable({
    providedIn: 'root'
})
export class LanguageQuery extends Query<LanguageState> {

    constructor(protected override store: LanguageStore) {
        super(store);
    }

    public getDefaultLang() : Observable<string | undefined> {
        return this.select('default');
    }

    public getUsingLang() : Observable<string | undefined> {
        return this.select('use');
    }

    public getLangData(data: Array<any>) : Observable<Pick<LanguageState, never>> {
        return this.select(data);
    }
}