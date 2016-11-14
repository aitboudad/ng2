/** @module ng2 */ /** */
import { Observable } from "rxjs/Rx";
import { Transition } from "ui-router-core";
import { UIRouter } from "ui-router-core";
import { StateDeclaration } from "ui-router-core";
export interface StatesChangedEvent {
    currentStates: StateDeclaration[];
    registered: StateDeclaration[];
    deregistered: StateDeclaration[];
}
declare module 'ui-router-core/lib/globals' {
    interface UIRouterGlobals {
        states$?: Observable<StatesChangedEvent>;
        start$?: Observable<Transition>;
        success$?: Observable<Transition>;
        params$?: Observable<{
            [paramName: string]: any;
        }>;
    }
}
/** Augments UIRouterGlobals with observables for transition starts, successful transitions, and state parameters */
export declare class UIRouterRx {
    private deregisterFns;
    constructor(router: UIRouter);
    dispose(): void;
}
