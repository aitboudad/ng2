"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var uiSref_1 = require("./uiSref");
var ui_router_core_1 = require("ui-router-core");
var ui_router_core_2 = require("ui-router-core");
var ui_router_core_3 = require("ui-router-core");
var ui_router_core_4 = require("ui-router-core");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
require("rxjs/add/observable/of");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/map");
var inactiveStatus = {
    active: false,
    exact: false,
    entering: false,
    exiting: false
};
var pathMatches = function (target) {
    if (!target.exists())
        return function () { return false; };
    var state = target.$state();
    var targetParamVals = target.params();
    var targetPath = ui_router_core_4.PathFactory.buildPath(target);
    var paramSchema = targetPath.map(function (node) { return node.paramSchema; })
        .reduce(ui_router_core_1.unnestR, [])
        .filter(function (param) { return targetParamVals.hasOwnProperty(param.id); });
    return function (path) {
        var tailNode = ui_router_core_1.tail(path);
        if (!tailNode || tailNode.state !== state)
            return false;
        var paramValues = ui_router_core_4.PathFactory.paramValues(path);
        return ui_router_core_3.Param.equals(paramSchema, paramValues, targetParamVals);
    };
};
function spreadToSubPaths(basePath, appendPath) {
    return appendPath.map(function (node) { return basePath.concat(ui_router_core_4.PathFactory.subPath(appendPath, function (n) { return n.state === node.state; })); });
}
function getSrefStatus(event, srefTarget) {
    var pathMatchesTarget = pathMatches(srefTarget);
    var tc = event.trans.treeChanges();
    var isStartEvent = event.evt === 'start';
    var isSuccessEvent = event.evt === 'success';
    var activePath = isSuccessEvent ? tc.to : tc.from;
    var isActive = function () {
        return spreadToSubPaths([], activePath)
            .map(pathMatchesTarget)
            .reduce(ui_router_core_1.anyTrueR, false);
    };
    var isExact = function () {
        return pathMatchesTarget(activePath);
    };
    var isEntering = function () {
        return spreadToSubPaths(tc.retained, tc.entering)
            .map(pathMatchesTarget)
            .reduce(ui_router_core_1.anyTrueR, false);
    };
    var isExiting = function () {
        return spreadToSubPaths(tc.retained, tc.exiting)
            .map(pathMatchesTarget)
            .reduce(ui_router_core_1.anyTrueR, false);
    };
    return {
        active: isActive(),
        exact: isExact(),
        entering: isStartEvent ? isEntering() : false,
        exiting: isStartEvent ? isExiting() : false,
    };
}
function mergeSrefStatus(left, right) {
    return {
        active: left.active || right.active,
        exact: left.exact || right.exact,
        entering: left.entering || right.entering,
        exiting: left.exiting || right.exiting,
    };
}
var UISrefStatus = (function () {
    function UISrefStatus(_globals) {
        this._globals = _globals;
        this.uiSrefStatus = new core_1.EventEmitter(false);
        this.status = Object.assign({}, inactiveStatus);
    }
    UISrefStatus.prototype.ngAfterContentInit = function () {
        var _this = this;
        var transEvents$ = this._globals.start$.switchMap(function (trans) {
            var event = function (evt) { return ({ evt: evt, trans: trans }); };
            var transStart$ = Observable_1.Observable.of(event("start"));
            var transResult = trans.promise.then(function () { return event("success"); }, function () { return event("error"); });
            var transFinish$ = Observable_1.Observable.fromPromise(transResult);
            return transStart$.concat(transFinish$);
        });
        this._srefs$ = new BehaviorSubject_1.BehaviorSubject(this.srefs.toArray());
        this._srefChangesSub = this.srefs.changes.subscribe(function (srefs) { return _this._srefs$.next(srefs); });
        var targetStates$ = this._srefs$.switchMap(function (srefs) {
            return Observable_1.Observable.combineLatest(srefs.map(function (sref) { return sref.targetState$; }));
        });
        this._subscription = transEvents$.mergeMap(function (evt) {
            return targetStates$.map(function (targets) {
                var statuses = targets.map(function (target) { return getSrefStatus(evt, target); });
                return statuses.reduce(mergeSrefStatus);
            });
        }).subscribe(this._setStatus.bind(this));
    };
    UISrefStatus.prototype.ngOnDestroy = function () {
        if (this._subscription)
            this._subscription.unsubscribe();
        if (this._srefChangesSub)
            this._srefChangesSub.unsubscribe();
        if (this._srefs$)
            this._srefs$.unsubscribe();
        this._subscription = this._srefChangesSub = this._srefs$ = undefined;
    };
    UISrefStatus.prototype._setStatus = function (status) {
        this.status = status;
        this.uiSrefStatus.emit(status);
    };
    return UISrefStatus;
}());
__decorate([
    core_1.Output("uiSrefStatus"),
    __metadata("design:type", Object)
], UISrefStatus.prototype, "uiSrefStatus", void 0);
__decorate([
    core_1.ContentChildren(uiSref_1.UISref, { descendants: true }),
    __metadata("design:type", core_1.QueryList)
], UISrefStatus.prototype, "srefs", void 0);
UISrefStatus = __decorate([
    core_1.Directive({ selector: '[uiSrefStatus],[uiSrefActive],[uiSrefActiveEq]' }),
    __param(0, core_1.Inject(ui_router_core_2.Globals)),
    __metadata("design:paramtypes", [Object])
], UISrefStatus);
exports.UISrefStatus = UISrefStatus;
//# sourceMappingURL=uiSrefStatus.js.map