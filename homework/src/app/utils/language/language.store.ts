import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";

export interface LanguageState {
    default?: string,
    use? : string
}

export function createInitialLanguageState(): LanguageState {
    return {
        default: '',
        use: ''
    };
}

@Injectable({
    providedIn: 'root'
})
@StoreConfig({
    name: 'language',
    resettable: true
})
export class LanguageStore extends Store<LanguageState> {
    constructor() {
        super(createInitialLanguageState());
    }
}