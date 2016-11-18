import { EventEmitter, QueryList } from "@angular/core";
import { UISref } from "./uiSref";
import { UIRouterGlobals } from "ui-router-core";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/map';
export interface SrefStatus {
    active: boolean;
    exact: boolean;
    entering: boolean;
    exiting: boolean;
}
export declare class UISrefStatus {
    private _globals;
    uiSrefStatus: EventEmitter<SrefStatus>;
    srefs: QueryList<UISref>;
    status: SrefStatus;
    private _subscription;
    private _srefChangesSub;
    private _srefs$;
    constructor(_globals: UIRouterGlobals);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    private _setStatus(status);
}
