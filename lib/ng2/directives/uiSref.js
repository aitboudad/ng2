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
/** @module directives */ /** */
var ui_router_core_1 = require("ui-router-core");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var core_4 = require("@angular/core");
var uiView_1 = require("./uiView");
var ui_router_core_2 = require("ui-router-core");
var ui_router_core_3 = require("ui-router-core");
var Rx_1 = require("rxjs/Rx");
require("../rx");
/**
 * @internalapi
 * # blah blah blah
 */
var AnchorUISref = (function () {
    function AnchorUISref(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    AnchorUISref.prototype.update = function (href) {
        this._renderer.setElementProperty(this._el.nativeElement, 'href', href);
    };
    AnchorUISref = __decorate([
        core_1.Directive({ selector: 'a[uiSref]' }), 
        __metadata('design:paramtypes', [core_3.ElementRef, core_4.Renderer])
    ], AnchorUISref);
    return AnchorUISref;
}());
exports.AnchorUISref = AnchorUISref;
/**
 * A directive when clicked, initiates a [[Transition]] to a [[TargetState]].
 *
 * ### Purpose
 *
 * This directive is applied to anchor tags (`<a>`) or any other clickable element.  It is a state reference (or sref --
 * similar to an href).  When clicked, the directive will transition to that state by calling [[StateService.go]],
 * and optionally supply state parameter values and transition options.
 *
 * When this directive is on an anchor tag, it will also add an `href` attribute to the anchor.
 *
 * ### Selector
 *
 * - `[uiSref]`: The directive is created as an attribute on an element, e.g., `<a uiSref></a>`
 *
 * ### Inputs
 *
 * - `uiSref`: the target state's name, e.g., `uiSref="foostate"`.  If a component template uses a relative `uiSref`,
 * e.g., `uiSref=".child"`, the reference is relative to that component's state.
 *
 * - `uiParams`: any target state parameter values, as an object, e.g., `[uiParams]="{ fooId: bar.fooId }"`
 *
 * - `uiOptions`: [[TransitionOptions]], e.g., `[uiOptions]="{ inherit: false }"`
 *
 * @example
 * ```html
 *
 * <!-- Targets bar state' -->
 * <a uiSref="bar">Bar</a>
 *
 * <!-- Assume this component's state is "foo".
 *      Relatively targets "foo.child" -->
 * <a uiSref=".child">Foo Child</a>
 *
 * <!-- Targets "bar" state and supplies parameter value -->
 * <a uiSref="bar" [uiParams]="{ barId: foo.barId }">Bar {{foo.barId}}</a>
 *
 * <!-- Targets "bar" state and parameter, doesn't inherit existing parameters-->
 * <a uiSref="bar" [uiParams]="{ barId: foo.barId }" [uiOptions]="{ inherit: false }">Bar {{foo.barId}}</a>
 * ```
 */
var UISref = (function () {
    function UISref(
        /** @internalapi */ _router, 
        /** @internalapi */ parent, 
        /** @internalapi */ _anchorUISref, _globals) {
        var _this = this;
        this._router = _router;
        this.parent = parent;
        this._anchorUISref = _anchorUISref;
        /**
         * An observable (ReplaySubject) of the state this UISref is targeting.
         * When the UISref is clicked, it will transition to this [[TargetState]].
         */
        this.targetState$ = new Rx_1.ReplaySubject(1);
        /** @internalapi */
        this._emit = false;
        this._statesSub = _globals.states$.subscribe(function () { return _this.update(); });
    }
    Object.defineProperty(UISref.prototype, "uiSref", {
        /** @internalapi */
        set: function (val) { this.state = val; this.update(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISref.prototype, "uiParams", {
        /** @internalapi */
        set: function (val) { this.params = val; this.update(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISref.prototype, "uiOptions", {
        /** @internalapi */
        set: function (val) { this.options = val; this.update(); },
        enumerable: true,
        configurable: true
    });
    UISref.prototype.ngOnInit = function () {
        this._emit = true;
        this.update();
    };
    UISref.prototype.ngOnDestroy = function () {
        this._emit = false;
        this._statesSub.unsubscribe();
        this.targetState$.unsubscribe();
    };
    UISref.prototype.update = function () {
        var $state = this._router.stateService;
        if (this._emit) {
            var newTarget = $state.target(this.state, this.params, this.getOptions());
            this.targetState$.next(newTarget);
        }
        if (this._anchorUISref) {
            var href = $state.href(this.state, this.params, this.getOptions());
            this._anchorUISref.update(href);
        }
    };
    UISref.prototype.getOptions = function () {
        var defaultOpts = {
            relative: this.parent && this.parent.context && this.parent.context.name,
            inherit: true,
            source: "sref"
        };
        return ui_router_core_2.extend(defaultOpts, this.options || {});
    };
    /** When triggered by a (click) event, this function transitions to the UISref's target state */
    UISref.prototype.go = function () {
        this._router.stateService.go(this.state, this.params, this.getOptions());
        return false;
    };
    __decorate([
        core_1.Input('uiSref'), 
        __metadata('design:type', String)
    ], UISref.prototype, "state", void 0);
    __decorate([
        core_1.Input('uiParams'), 
        __metadata('design:type', Object)
    ], UISref.prototype, "params", void 0);
    __decorate([
        core_1.Input('uiOptions'), 
        __metadata('design:type', Object)
    ], UISref.prototype, "options", void 0);
    UISref = __decorate([
        core_1.Directive({
            selector: '[uiSref]',
            host: { '(click)': 'go()' }
        }),
        __param(1, core_1.Inject(uiView_1.UIView.PARENT_INJECT)),
        __param(2, core_2.Optional()),
        __param(3, core_1.Inject(ui_router_core_3.Globals)), 
        __metadata('design:paramtypes', [ui_router_core_1.UIRouter, Object, AnchorUISref, Object])
    ], UISref);
    return UISref;
}());
exports.UISref = UISref;
//# sourceMappingURL=uiSref.js.map