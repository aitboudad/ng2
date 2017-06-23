(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@uirouter/core/index'), require('rxjs/ReplaySubject'), require('rxjs/BehaviorSubject'), require('rxjs/observable/of'), require('rxjs/observable/fromPromise'), require('rxjs/observable/combineLatest'), require('rxjs/operator/switchMap'), require('rxjs/operator/map'), require('rxjs/operator/concat'), require('@uirouter/rx/index')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', '@uirouter/core/index', 'rxjs/ReplaySubject', 'rxjs/BehaviorSubject', 'rxjs/observable/of', 'rxjs/observable/fromPromise', 'rxjs/observable/combineLatest', 'rxjs/operator/switchMap', 'rxjs/operator/map', 'rxjs/operator/concat', '@uirouter/rx/index'], factory) :
	(factory((global.angular = global.angular || {}),global.ng.core,global.ng.common,global['@uirouter/core'],global.Rx,global.Rx,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global['@uirouter/rx']));
}(this, (function (exports,_angular_core,_angular_common,_uirouter_core_index,rxjs_ReplaySubject,rxjs_BehaviorSubject,rxjs_observable_of,rxjs_observable_fromPromise,rxjs_observable_combineLatest,rxjs_operator_switchMap,rxjs_operator_map,rxjs_operator_concat,_uirouter_rx_index) { 'use strict';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/** @module ng2 */ /** */
/**
 * This is a [[StateBuilder.builder]] function for Angular `views`.
 *
 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
 * handles the `views` property with logic specific to \@uirouter/angular.
 *
 * If no `views: {}` property exists on the [[StateDeclaration]], then it creates the `views` object and
 * applies the state-level configuration to a view named `$default`.
 * @param {?} state
 * @return {?}
 */
function ng2ViewsBuilder(state) {
    var /** @type {?} */ views = {}, /** @type {?} */ viewsObject = state.views || { "$default": _uirouter_core_index.pick(state, ["component", "bindings"]) };
    _uirouter_core_index.forEach(viewsObject, function (config, name) {
        name = name || "$default"; // Account for views: { "": { template... } }
        if (_uirouter_core_index.isFunction(config))
            config = { component: /** @type {?} */ (config) };
        if (Object.keys(config).length == 0)
            return;
        config.$type = "ng2";
        config.$context = state;
        config.$name = name;
        var /** @type {?} */ normalized = _uirouter_core_index.ViewService.normalizeUIViewTarget(config.$context, config.$name);
        config.$uiViewName = normalized.uiViewName;
        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
        views[name] = config;
    });
    return views;
}
var id$1 = 0;
var Ng2ViewConfig = (function () {
    /**
     * @param {?} path
     * @param {?} viewDecl
     */
    function Ng2ViewConfig(path, viewDecl) {
        this.path = path;
        this.viewDecl = viewDecl;
        this.$id = id$1++;
        this.loaded = true;
    }
    /**
     * @return {?}
     */
    Ng2ViewConfig.prototype.load = function () {
        return _uirouter_core_index.services.$q.when(this);
    };
    return Ng2ViewConfig;
}());
/** @module ng2 */ /** */
/**
 * Merge two injectors
 *
 * This class implements the Injector ng2 interface but delegates
 * to the Injectors provided in the constructor.
 */
var MergeInjector = (function () {
    /**
     * @param {...?} injectors
     */
    function MergeInjector() {
        var injectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            injectors[_i] = arguments[_i];
        }
        if (injectors.length < 2)
            throw new Error("pass at least two injectors");
        this.injectors = injectors;
    }
    /**
     * Get the token from the first injector which contains it.
     *
     * Delegates to the first Injector.get().
     * If not found, then delegates to the second Injector (and so forth).
     * If no Injector contains the token, return the `notFoundValue`, or throw.
     *
     * @param {?} token the DI token
     * @param {?=} notFoundValue the value to return if none of the Injectors contains the token.
     * @return {?}
     */
    MergeInjector.prototype.get = function (token, notFoundValue) {
        for (var /** @type {?} */ i = 0; i < this.injectors.length; i++) {
            var /** @type {?} */ val$$1 = this.injectors[i].get(token, MergeInjector.NOT_FOUND);
            if (val$$1 !== MergeInjector.NOT_FOUND)
                return val$$1;
        }
        if (arguments.length >= 2)
            return notFoundValue;
        // This will throw the DI Injector error
        this.injectors[0].get(token);
    };
    return MergeInjector;
}());
MergeInjector.NOT_FOUND = {};
/** @ng2api @module directives */
/** */
/**
 * @hidden
 */
var id = 0;
/**
 * Given a component class, gets the inputs of styles:
 *
 * - \@Input('foo') _foo
 * - `inputs: ['foo']`
 *
 * \@internalapi
 */
var ng2ComponentInputs = function (factory) {
    return factory.inputs.map(function (input) { return ({ prop: input.propName, token: input.templateName }); });
};
/**
 * A UI-Router viewport directive, which is filled in by a view (component) on a state.
 *
 * ### Selector
 *
 * A `ui-view` directive can be created as an element: `<ui-view></ui-view>` or as an attribute: `<div ui-view></div>`.
 *
 * ### Purpose
 *
 * This directive is used in a Component template (or as the root component) to create a viewport.  The viewport
 * is filled in by a view (as defined by a [[Ng2ViewDeclaration]] inside a [[Ng2StateDeclaration]]) when the view's
 * state has been activated.
 *
 * #### Example:
 * ```js
 * // This app has two states, 'foo' and 'bar'
 * stateRegistry.register({ name: 'foo', url: '/foo', component: FooComponent });
 * stateRegistry.register({ name: 'bar', url: '/bar', component: BarComponent });
 * ```
 * ```html
 * <!-- This ui-view will be filled in by the foo state's component or
 *      the bar state's component when the foo or bar state is activated -->
 * <ui-view></ui-view>
 * ```
 *
 * ### Named ui-views
 *
 * A `ui-view` may optionally be given a name via the attribute value: `<div ui-view='header'></div>`.  *Note:
 * an unnamed `ui-view` is internally named `$default`*.   When a `ui-view` has a name, it will be filled in
 * by a matching named view.
 *
 * #### Example:
 * ```js
 * stateRegistry.register({
 *   name: 'foo',
 *   url: '/foo',
 *   views: { header: HeaderComponent, $default: FooComponent });
 * ```
 * ```html
 * <!-- When 'foo' state is active, filled by HeaderComponent -->
 * <div ui-view="header"></div>
 *
 * <!-- When 'foo' state is active, filled by FooComponent -->
 * <ui-view></ui-view>
 * ```
 */
var UIView = (function () {
    /**
     * @param {?} router
     * @param {?} parent
     * @param {?} viewContainerRef
     */
    function UIView(router, parent, viewContainerRef) {
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        /**
         * Data about the this UIView
         */
        this.uiViewData = {};
        this.parent = parent;
    }
    Object.defineProperty(UIView.prototype, "_name", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this.name = val$$1; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UIView.prototype.ngOnInit = function () {
        var _this = this;
        var /** @type {?} */ router = this.router;
        var /** @type {?} */ parentFqn = this.parent.fqn;
        var /** @type {?} */ name = this.name || '$default';
        this.uiViewData = {
            $type: 'ng2',
            id: id++,
            name: name,
            fqn: parentFqn ? parentFqn + "." + name : name,
            creationContext: this.parent.context,
            configUpdated: this.viewConfigUpdated.bind(this),
            config: undefined
        };
        this.deregisterHook = router.transitionService.onBefore({}, function (trans) { return _this.applyUiCanExitHook(trans); });
        this.deregisterUIView = router.viewService.registerUIView(this.uiViewData);
    };
    /**
     * For each transition, checks the component loaded in the ui-view for:
     *
     * - has a uiCanExit() component hook
     * - is being exited
     *
     * If both are true, adds the uiCanExit component function as a hook to that singular Transition.
     * @param {?} trans
     * @return {?}
     */
    UIView.prototype.applyUiCanExitHook = function (trans) {
        var /** @type {?} */ instance = this.componentRef && this.componentRef.instance;
        var /** @type {?} */ uiCanExitFn = instance && instance.uiCanExit;
        if (_uirouter_core_index.isFunction(uiCanExitFn)) {
            var /** @type {?} */ state = _uirouter_core_index.parse("uiViewData.config.viewDecl.$context.self")(this);
            if (trans.exiting().indexOf(state) !== -1) {
                trans.onStart({}, function () {
                    return uiCanExitFn.call(instance, trans);
                });
            }
        }
    };
    /**
     * @return {?}
     */
    UIView.prototype.disposeLast = function () {
        if (this.componentRef)
            this.componentRef.destroy();
        this.componentRef = null;
    };
    /**
     * @return {?}
     */
    UIView.prototype.ngOnDestroy = function () {
        if (this.deregisterUIView)
            this.deregisterUIView();
        if (this.deregisterHook)
            this.deregisterHook();
        this.disposeLast();
    };
    /**
     * The view service is informing us of an updated ViewConfig
     * (usually because a transition activated some state and its views)
     * @param {?} config
     * @return {?}
     */
    UIView.prototype.viewConfigUpdated = function (config) {
        // The config may be undefined if there is nothing currently targeting this UIView.
        // Dispose the current component, if there is one
        if (!config)
            return this.disposeLast();
        // Only care about Ng2 configs
        if (!(config instanceof Ng2ViewConfig))
            return;
        // The "new" viewconfig is already applied, so exit early
        if (this.uiViewData.config === config)
            return;
        // This is a new ViewConfig.  Dispose the previous component
        this.disposeLast();
        _uirouter_core_index.trace.traceUIViewConfigUpdated(this.uiViewData, config && config.viewDecl.$context);
        this.applyUpdatedConfig(config);
    };
    /**
     * @param {?} config
     * @return {?}
     */
    UIView.prototype.applyUpdatedConfig = function (config) {
        this.uiViewData.config = config;
        // Create the Injector for the routed component
        var /** @type {?} */ context = new _uirouter_core_index.ResolveContext(config.path);
        var /** @type {?} */ componentInjector = this.getComponentInjector(context);
        // Get the component class from the view declaration. TODO: allow promises?
        var /** @type {?} */ componentClass = config.viewDecl.component;
        // Create the component
        var /** @type {?} */ compFactoryResolver = componentInjector.get(_angular_core.ComponentFactoryResolver);
        var /** @type {?} */ compFactory = compFactoryResolver.resolveComponentFactory(componentClass);
        this.componentRef = this.componentTarget.createComponent(compFactory, undefined, componentInjector);
        // Wire resolves to @Input()s
        this.applyInputBindings(compFactory, this.componentRef, context, componentClass);
    };
    /**
     * Creates a new Injector for a routed component.
     *
     * Adds resolve values to the Injector
     * Adds providers from the NgModule for the state
     * Adds providers from the parent Component in the component tree
     * Adds a PARENT_INJECT view context object
     *
     * @param {?} context
     * @return {?} an Injector
     */
    UIView.prototype.getComponentInjector = function (context) {
        // Map resolves to "useValue: providers"
        var /** @type {?} */ resolvables = context.getTokens().map(function (token) { return context.getResolvable(token); }).filter(function (r) { return r.resolved; });
        var /** @type {?} */ newProviders = resolvables.map(function (r) { return ({ provide: r.token, useValue: r.data }); });
        var /** @type {?} */ parentInject = { context: this.uiViewData.config.viewDecl.$context, fqn: this.uiViewData.fqn };
        newProviders.push({ provide: UIView.PARENT_INJECT, useValue: parentInject });
        var /** @type {?} */ parentComponentInjector = this.viewContainerRef.injector;
        var /** @type {?} */ moduleInjector = context.getResolvable(_uirouter_core_index.NATIVE_INJECTOR_TOKEN).data;
        var /** @type {?} */ mergedParentInjector = new MergeInjector(moduleInjector, parentComponentInjector);
        return _angular_core.ReflectiveInjector.resolveAndCreate(newProviders, mergedParentInjector);
    };
    /**
     * Supplies component inputs with resolve data
     *
     * Finds component inputs which match resolves (by name) and sets the input value
     * to the resolve data.
     * @param {?} factory
     * @param {?} ref
     * @param {?} context
     * @param {?} componentClass
     * @return {?}
     */
    UIView.prototype.applyInputBindings = function (factory, ref, context, componentClass) {
        var /** @type {?} */ component = ref.instance;
        var /** @type {?} */ bindings = this.uiViewData.config.viewDecl['bindings'] || {};
        var /** @type {?} */ explicitBoundProps = Object.keys(bindings);
        // Returns the actual component property for a renamed an input renamed using `@Input('foo') _foo`.
        // return the `_foo` property
        var /** @type {?} */ renamedInputProp = function (prop$$1) {
            var /** @type {?} */ input = factory.inputs.find(function (i) { return i.templateName === prop$$1; });
            return input && input.propName || prop$$1;
        };
        // Supply resolve data to component as specified in the state's `bindings: {}`
        var /** @type {?} */ explicitInputTuples = explicitBoundProps
            .reduce(function (acc, key) { return acc.concat([{ prop: renamedInputProp(key), token: bindings[key] }]); }, []);
        // Supply resolve data to matching @Input('prop') or inputs: ['prop']
        var /** @type {?} */ implicitInputTuples = ng2ComponentInputs(factory)
            .filter(function (tuple) { return !_uirouter_core_index.inArray(explicitBoundProps, tuple.prop); });
        var /** @type {?} */ addResolvable = function (tuple) { return ({
            prop: tuple.prop,
            resolvable: context.getResolvable(tuple.token),
        }); };
        explicitInputTuples.concat(implicitInputTuples)
            .map(addResolvable)
            .map(function (tuple) {
            if (tuple.resolvable && !tuple.resolvable.resolved && tuple.resolvable.policy && tuple.resolvable.policy.async === 'NOWAIT') {
                tuple.resolvable.promise.then(function () { return ref.instance[tuple.prop] = tuple.resolvable.data; });
            }
            return tuple;
        })
            .filter(function (tuple) { return tuple.resolvable && tuple.resolvable.resolved; })
            .forEach(function (tuple) { component[tuple.prop] = tuple.resolvable.data; });
        // Initiate change detection for the newly created component
        ref.changeDetectorRef.detectChanges();
    };
    return UIView;
}());
UIView.PARENT_INJECT = "UIView.PARENT_INJECT";
UIView.decorators = [
    { type: _angular_core.Component, args: [{
                selector: 'ui-view, [ui-view]',
                template: "\n    <ng-template #componentTarget></ng-template>\n    <ng-content *ngIf=\"!componentRef\"></ng-content>\n  "
                // styles: [`
                //   .done-true {
                //     text-decoration: line-through;
                //     color: grey;
                //   }`
                // ],
                // template: `
                // <div style="padding: 1em; border: 1px solid lightgrey;">
                //
                //   <div #content style="color: lightgrey; font-size: smaller;">
                //     <div>ui-view #{{uiViewData?.id}} created by '{{ parentContext?.name || "(root)" }}' state</div>
                //     <div>name: (absolute) '{{uiViewData?.fqn}}' (contextual) '{{uiViewData?.name}}@{{parentContext?.name}}' </div>
                //     <div>currently filled by: '{{(uiViewData?.config && uiViewData?.config?.viewDecl?.$context) || 'empty...'}}'</div>
                //   </div>
                //
                // </div>`
            },] },
];
/**
 * @nocollapse
 */
UIView.ctorParameters = function () { return [
    { type: _uirouter_core_index.UIRouter, },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [UIView.PARENT_INJECT,] },] },
    { type: _angular_core.ViewContainerRef, },
]; };
UIView.propDecorators = {
    'componentTarget': [{ type: _angular_core.ViewChild, args: ['componentTarget', { read: _angular_core.ViewContainerRef },] },],
    'name': [{ type: _angular_core.Input, args: ['name',] },],
    '_name': [{ type: _angular_core.Input, args: ['ui-view',] },],
};
/** @module ng2 */ /** */
/**
 * @param {?} uiRouter
 * @param {?} injector
 * @param {?=} module
 * @return {?}
 */
function applyModuleConfig(uiRouter, injector, module) {
    if (module === void 0) { module = {}; }
    if (_uirouter_core_index.isFunction(module.config)) {
        module.config(uiRouter, injector, module);
    }
    var /** @type {?} */ states = module.states || [];
    return states.map(function (state) { return uiRouter.stateRegistry.register(state); });
}
/**
 * @param {?} uiRouter
 * @param {?} injector
 * @param {?} module
 * @return {?}
 */
function applyRootModuleConfig(uiRouter, injector, module) {
    _uirouter_core_index.isDefined(module.deferIntercept) && uiRouter.urlService.deferIntercept(module.deferIntercept);
    _uirouter_core_index.isDefined(module.otherwise) && uiRouter.urlService.rules.otherwise(module.otherwise);
}
/** @ng2api @module directives */
/** */
/**
 * \@internalapi
 * # blah blah blah
 */
var AnchorUISref = (function () {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    function AnchorUISref(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    AnchorUISref.prototype.openInNewTab = function () {
        return this._el.nativeElement.target === '_blank';
    };
    /**
     * @param {?} href
     * @return {?}
     */
    AnchorUISref.prototype.update = function (href) {
        if (href && href !== '') {
            this._renderer.setProperty(this._el.nativeElement, 'href', href);
        }
        else {
            this._renderer.removeAttribute(this._el.nativeElement, 'href');
        }
    };
    return AnchorUISref;
}());
AnchorUISref.decorators = [
    { type: _angular_core.Directive, args: [{ selector: 'a[uiSref]' },] },
];
/**
 * @nocollapse
 */
AnchorUISref.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.Renderer2, },
]; };
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
 * \@example
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
    /**
     * @param {?} _router
     * @param {?} _anchorUISref
     * @param {?} parent
     */
    function UISref(_router, _anchorUISref, parent) {
        var _this = this;
        /**
         * An observable (ReplaySubject) of the state this UISref is targeting.
         * When the UISref is clicked, it will transition to this [[TargetState]].
         */
        this.targetState$ = new rxjs_ReplaySubject.ReplaySubject(1);
        /**
         * \@internalapi
         */
        this._emit = false;
        this._router = _router;
        this._anchorUISref = _anchorUISref;
        this.parent = parent;
        this._statesSub = _router.globals.states$.subscribe(function () { return _this.update(); });
    }
    Object.defineProperty(UISref.prototype, "uiSref", {
        /**
         * \@internalapi
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this.state = val$$1; this.update(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISref.prototype, "uiParams", {
        /**
         * \@internalapi
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this.params = val$$1; this.update(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISref.prototype, "uiOptions", {
        /**
         * \@internalapi
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this.options = val$$1; this.update(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UISref.prototype.ngOnInit = function () {
        this._emit = true;
        this.update();
    };
    /**
     * @return {?}
     */
    UISref.prototype.ngOnDestroy = function () {
        this._emit = false;
        this._statesSub.unsubscribe();
        this.targetState$.unsubscribe();
    };
    /**
     * @return {?}
     */
    UISref.prototype.update = function () {
        var /** @type {?} */ $state = this._router.stateService;
        if (this._emit) {
            var /** @type {?} */ newTarget = $state.target(this.state, this.params, this.getOptions());
            this.targetState$.next(newTarget);
        }
        if (this._anchorUISref) {
            var /** @type {?} */ href = $state.href(this.state, this.params, this.getOptions());
            this._anchorUISref.update(href);
        }
    };
    /**
     * @return {?}
     */
    UISref.prototype.getOptions = function () {
        var /** @type {?} */ defaultOpts = {
            relative: this.parent && this.parent.context && this.parent.context.name,
            inherit: true,
            source: "sref"
        };
        return _uirouter_core_index.extend(defaultOpts, this.options || {});
    };
    /**
     * When triggered by a (click) event, this function transitions to the UISref's target state
     * @return {?}
     */
    UISref.prototype.go = function () {
        if (this._anchorUISref && this._anchorUISref.openInNewTab()) {
            return;
        }
        this._router.stateService.go(this.state, this.params, this.getOptions());
        return false;
    };
    return UISref;
}());
UISref.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[uiSref]',
                host: { '(click)': 'go()' }
            },] },
];
/**
 * @nocollapse
 */
UISref.ctorParameters = function () { return [
    { type: _uirouter_core_index.UIRouter, },
    { type: AnchorUISref, decorators: [{ type: _angular_core.Optional },] },
    { type: undefined, decorators: [{ type: _angular_core.Inject, args: [UIView.PARENT_INJECT,] },] },
]; };
UISref.propDecorators = {
    'state': [{ type: _angular_core.Input, args: ['uiSref',] },],
    'params': [{ type: _angular_core.Input, args: ['uiParams',] },],
    'options': [{ type: _angular_core.Input, args: ['uiOptions',] },],
};
/** @ng2api @module directives */
/** */
/**
 * \@internalapi
 */
var inactiveStatus = {
    active: false,
    exact: false,
    entering: false,
    exiting: false
};
/**
 * Returns a Predicate<PathNode[]>
 *
 * The predicate returns true when the target state (and param values)
 * match the (tail of) the path, and the path's param values
 *
 * \@internalapi
 */
var pathMatches = function (target) {
    if (!target.exists())
        return function () { return false; };
    var state = target.$state();
    var targetParamVals = target.params();
    var targetPath = _uirouter_core_index.PathUtils.buildPath(target);
    var paramSchema = targetPath.map(function (node) { return node.paramSchema; })
        .reduce(_uirouter_core_index.unnestR, [])
        .filter(function (param) { return targetParamVals.hasOwnProperty(param.id); });
    return function (path) {
        var tailNode = _uirouter_core_index.tail(path);
        if (!tailNode || tailNode.state !== state)
            return false;
        var paramValues = _uirouter_core_index.PathUtils.paramValues(path);
        return _uirouter_core_index.Param.equals(paramSchema, paramValues, targetParamVals);
    };
};
/**
 * Given basePath: [a, b], appendPath: [c, d]),
 * Expands the path to [c], [c, d]
 * Then appends each to [a,b,] and returns: [a, b, c], [a, b, c, d]
 *
 * \@internalapi
 * @param {?} basePath
 * @param {?} appendPath
 * @return {?}
 */
function spreadToSubPaths(basePath, appendPath) {
    return appendPath.map(function (node) { return basePath.concat(_uirouter_core_index.PathUtils.subPath(appendPath, function (n) { return n.state === node.state; })); });
}
/**
 * Given a TransEvt (Transition event: started, success, error)
 * and a UISref Target State, return a SrefStatus object
 * which represents the current status of that Sref:
 * active, activeEq (exact match), entering, exiting
 *
 * \@internalapi
 * @param {?} event
 * @param {?} srefTarget
 * @return {?}
 */
function getSrefStatus(event, srefTarget) {
    var /** @type {?} */ pathMatchesTarget = pathMatches(srefTarget);
    var /** @type {?} */ tc = event.trans.treeChanges();
    var /** @type {?} */ isStartEvent = event.evt === 'start';
    var /** @type {?} */ isSuccessEvent = event.evt === 'success';
    var /** @type {?} */ activePath = isSuccessEvent ? tc.to : tc.from;
    var /** @type {?} */ isActive = function () { return spreadToSubPaths([], activePath)
        .map(pathMatchesTarget)
        .reduce(_uirouter_core_index.anyTrueR, false); };
    var /** @type {?} */ isExact = function () { return pathMatchesTarget(activePath); };
    var /** @type {?} */ isEntering = function () { return spreadToSubPaths(tc.retained, tc.entering)
        .map(pathMatchesTarget)
        .reduce(_uirouter_core_index.anyTrueR, false); };
    var /** @type {?} */ isExiting = function () { return spreadToSubPaths(tc.retained, tc.exiting)
        .map(pathMatchesTarget)
        .reduce(_uirouter_core_index.anyTrueR, false); };
    return ({
        active: isActive(),
        exact: isExact(),
        entering: isStartEvent ? isEntering() : false,
        exiting: isStartEvent ? isExiting() : false,
    });
}
/**
 * \@internalapi
 * @param {?} left
 * @param {?} right
 * @return {?}
 */
function mergeSrefStatus(left, right) {
    return {
        active: left.active || right.active,
        exact: left.exact || right.exact,
        entering: left.entering || right.entering,
        exiting: left.exiting || right.exiting,
    };
}
/**
 * A directive which emits events when a paired [[UISref]] status changes.
 *
 * This directive is primarily used by the [[UISrefActive]] directives to monitor `UISref`(s).
 *
 * This directive shares two attribute selectors with `UISrefActive`:
 *
 * - `[uiSrefActive]`
 * - `[uiSrefActiveEq]`.
 *
 * Thus, whenever a `UISrefActive` directive is created, a `UISrefStatus` directive is also created.
 *
 * Most apps should simply use `UISrefActive`, but some advanced components may want to process the
 * [[SrefStatus]] events directly.
 *
 * ```js
 * <li (uiSrefStatus)="onSrefStatusChanged($event)">
 *   <a uiSref="book" [uiParams]="{ bookId: book.id }">Book {{ book.name }}</a>
 * </li>
 * ```
 *
 * The `uiSrefStatus` event is emitted whenever an enclosed `uiSref`'s status changes.
 * The event emitted is of type [[SrefStatus]], and has boolean values for `active`, `exact`, `entering`, and `exiting`.
 *
 * The values from this event can be captured and stored on a component (then applied, e.g., using ngClass).
 *
 * ---
 *
 * A single `uiSrefStatus` can enclose multiple `uiSref`.
 * Each status boolean (`active`, `exact`, `entering`, `exiting`) will be true if *any of the enclosed `uiSref` status is true*.
 * In other words, all enclosed `uiSref` statuses  are merged to a single status using `||` (logical or).
 *
 * ```js
 * <li (uiSrefStatus)="onSrefStatus($event)" uiSref="admin">
 *   Home
 *   <ul>
 *     <li> <a uiSref="admin.users">Users</a> </li>
 *     <li> <a uiSref="admin.groups">Groups</a> </li>
 *   </ul>
 * </li>
 * ```
 *
 * In the above example, `$event.active === true` when either `admin.users` or `admin.groups` is active.
 *
 * ---
 *
 * This API is subject to change.
 */
var UISrefStatus = (function () {
    /**
     * @param {?} _globals
     */
    function UISrefStatus(_globals) {
        /**
         * current statuses of the state/params the uiSref directive is linking to
         */
        this.uiSrefStatus = new _angular_core.EventEmitter(false);
        this._globals = _globals;
        this.status = Object.assign({}, inactiveStatus);
    }
    /**
     * @return {?}
     */
    UISrefStatus.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Map each transition start event to a stream of:
        // start -> (success|error)
        var /** @type {?} */ transEvents$ = rxjs_operator_switchMap.switchMap.call(this._globals.start$, function (trans) {
            var /** @type {?} */ event = function (evt) { return (({ evt: evt, trans: trans })); };
            var /** @type {?} */ transStart$ = rxjs_observable_of.of(event("start"));
            var /** @type {?} */ transResult = trans.promise.then(function () { return event("success"); }, function () { return event("error"); });
            var /** @type {?} */ transFinish$ = rxjs_observable_fromPromise.fromPromise(transResult);
            return rxjs_operator_concat.concat.call(transStart$, transFinish$);
        });
        // Watch the @ContentChildren UISref[] components and get their target states
        // let srefs$: Observable<UISref[]> = of(this.srefs.toArray()).concat(this.srefs.changes);
        this._srefs$ = new rxjs_BehaviorSubject.BehaviorSubject(this.srefs.toArray());
        this._srefChangesSub = this.srefs.changes.subscribe(function (srefs) { return _this._srefs$.next(srefs); });
        var /** @type {?} */ targetStates$ = rxjs_operator_switchMap.switchMap.call(this._srefs$, function (srefs) { return rxjs_observable_combineLatest.combineLatest(srefs.map(function (sref) { return sref.targetState$; })); });
        // Calculate the status of each UISref based on the transition event.
        // Reduce the statuses (if multiple) by or-ing each flag.
        this._subscription = rxjs_operator_switchMap.switchMap.call(transEvents$, function (evt) {
            return rxjs_operator_map.map.call(targetStates$, function (targets) {
                var /** @type {?} */ statuses = targets.map(function (target) { return getSrefStatus(evt, target); });
                return statuses.reduce(mergeSrefStatus);
            });
        }).subscribe(this._setStatus.bind(this));
    };
    /**
     * @return {?}
     */
    UISrefStatus.prototype.ngOnDestroy = function () {
        if (this._subscription)
            this._subscription.unsubscribe();
        if (this._srefChangesSub)
            this._srefChangesSub.unsubscribe();
        if (this._srefs$)
            this._srefs$.unsubscribe();
        this._subscription = this._srefChangesSub = this._srefs$ = undefined;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    UISrefStatus.prototype._setStatus = function (status) {
        this.status = status;
        this.uiSrefStatus.emit(status);
    };
    return UISrefStatus;
}());
UISrefStatus.decorators = [
    { type: _angular_core.Directive, args: [{ selector: '[uiSrefStatus],[uiSrefActive],[uiSrefActiveEq]' },] },
];
/**
 * @nocollapse
 */
UISrefStatus.ctorParameters = function () { return [
    { type: _uirouter_core_index.UIRouterGlobals, },
]; };
UISrefStatus.propDecorators = {
    'uiSrefStatus': [{ type: _angular_core.Output, args: ["uiSrefStatus",] },],
    'srefs': [{ type: _angular_core.ContentChildren, args: [UISref, { descendants: true },] },],
};
/** @ng2api @module directives */ /** */
/**
 * A directive that adds a CSS class when its associated `uiSref` link is active.
 *
 * ### Purpose
 *
 * This directive should be paired with one (or more) [[UISref]] directives.
 * It will apply a CSS class to its element when the state the `uiSref` targets is activated.
 *
 * This can be used to create navigation UI where the active link is highlighted.
 *
 * ### Selectors
 *
 * - `[uiSrefActive]`: When this selector is used, the class is added when the target state or any
 * child of the target state is active
 * - `[uiSrefActiveEq]`: When this selector is used, the class is added when the target state is
 * exactly active (the class is not added if a child of the target state is active).
 *
 * ### Inputs
 *
 * - `uiSrefActive`/`uiSrefActiveEq`: one or more CSS classes to add to the element, when the `uiSref` is active
 *
 * #### Example:
 * The anchor tag has the `active` class added when the `foo` state is active.
 * ```html
 * <a uiSref="foo" uiSrefActive="active">Foo</a>
 * ```
 *
 * ### Matching parameters
 *
 * If the `uiSref` includes parameters, the current state must be active, *and* the parameter values must match.
 *
 * #### Example:
 * The first anchor tag has the `active` class added when the `foo.bar` state is active and the `id` parameter
 * equals 25.
 * The second anchor tag has the `active` class added when the `foo.bar` state is active and the `id` parameter
 * equals 32.
 * ```html
 * <a uiSref="foo.bar" [uiParams]="{ id: 25 }" uiSrefActive="active">Bar #25</a>
 * <a uiSref="foo.bar" [uiParams]="{ id: 32 }" uiSrefActive="active">Bar #32</a>
 * ```
 *
 * #### Example:
 * A list of anchor tags are created for a list of `bar` objects.
 * An anchor tag will have the `active` class when `foo.bar` state is active and the `id` parameter matches
 * that object's `id`.
 * ```html
 * <li *ngFor="let bar of bars">
 *   <a uiSref="foo.bar" [uiParams]="{ id: bar.id }" uiSrefActive="active">Bar #{{ bar.id }}</a>
 * </li>
 * ```
 *
 * ### Multiple uiSrefs
 *
 * A single `uiSrefActive` can be used for multiple `uiSref` links.
 * This can be used to create (for example) a drop down navigation menu, where the menui is highlighted
 * if *any* of its inner links are active.
 *
 * The `uiSrefActive` should be placed on an ancestor element of the `uiSref` list.
 * If anyof the `uiSref` links are activated, the class will be added to the ancestor element.
 *
 * #### Example:
 * This is a dropdown nagivation menu for "Admin" states.
 * When any of `admin.users`, `admin.groups`, `admin.settings` are active, the `<li>` for the dropdown
 * has the `dropdown-child-active` class applied.
 * Additionally, the active anchor tag has the `active` class applied.
 * ```html
 * <ul class="dropdown-menu">
 *   <li uiSrefActive="dropdown-child-active" class="dropdown admin">
 *     Admin
 *     <ul>
 *       <li><a uiSref="admin.users" uiSrefActive="active">Users</a></li>
 *       <li><a uiSref="admin.groups" uiSrefActive="active">Groups</a></li>
 *       <li><a uiSref="admin.settings" uiSrefActive="active">Settings</a></li>
 *     </ul>
 *   </li>
 * </ul>
 * ```
 */
var UISrefActive = (function () {
    /**
     * @param {?} uiSrefStatus
     * @param {?} rnd
     * @param {?} host
     */
    function UISrefActive(uiSrefStatus, rnd, host) {
        var _this = this;
        this._classes = [];
        this._classesEq = [];
        this._subscription = uiSrefStatus.uiSrefStatus.subscribe(function (next) {
            _this._classes.forEach(function (cls) { return rnd.setElementClass(host.nativeElement, cls, next.active); });
            _this._classesEq.forEach(function (cls) { return rnd.setElementClass(host.nativeElement, cls, next.exact); });
        });
    }
    Object.defineProperty(UISrefActive.prototype, "active", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this._classes = val$$1.split("\s+"); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(UISrefActive.prototype, "activeEq", {
        /**
         * @param {?} val
         * @return {?}
         */
        set: function (val$$1) { this._classesEq = val$$1.split("\s+"); },
        enumerable: true,
        configurable: true
    });
    
    /**
     * @return {?}
     */
    UISrefActive.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return UISrefActive;
}());
UISrefActive.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[uiSrefActive],[uiSrefActiveEq]'
            },] },
];
/**
 * @nocollapse
 */
UISrefActive.ctorParameters = function () { return [
    { type: UISrefStatus, },
    { type: _angular_core.Renderer, },
    { type: _angular_core.ElementRef, decorators: [{ type: _angular_core.Host },] },
]; };
UISrefActive.propDecorators = {
    'active': [{ type: _angular_core.Input, args: ['uiSrefActive',] },],
    'activeEq': [{ type: _angular_core.Input, args: ['uiSrefActiveEq',] },],
};
/**
 * The UI-Router for Angular directives:
 *
 * - [[UIView]]: A viewport for routed components
 * - [[UISref]]: A state ref to a target state; navigates when clicked
 * - [[UISrefActive]]: (and `UISrefActiveEq`) Adds a css class when a UISref's target state (or a child state) is active
 *
 * @ng2api
 * @preferred
 * @module directives
 */ /** */
/**
 * \@internalapi
 */
var _UIROUTER_DIRECTIVES = [UISref, AnchorUISref, UIView, UISrefActive, UISrefStatus];
/**
 * References to the UI-Router directive classes, for use within a \@Component's `directives:` property
 * @deprecated use [[UIRouterModule]]
 * \@internalapi
 */
var UIROUTER_DIRECTIVES = _UIROUTER_DIRECTIVES;
/** @ng2api @module core */
/** */
/**
 * @hidden
 */
var UIROUTER_ROOT_MODULE = new _angular_core.OpaqueToken("UIRouter Root Module");
/**
 * @hidden
 */
var UIROUTER_MODULE_TOKEN = new _angular_core.OpaqueToken("UIRouter Module");
/**
 * @hidden
 */
var UIROUTER_STATES = new _angular_core.OpaqueToken("UIRouter States");
/**
 * @param {?} transitionService
 * @param {?} plateformId
 * @return {?}
 */
function onTransitionReady(transitionService, plateformId) {
    if (_angular_common.isPlatformServer(plateformId)) {
        return function () { return Promise.resolve(); };
    }
    return function () { return new Promise(function (resolve) {
        var /** @type {?} */ eventHooks = [];
        ['onSuccess', 'onError'].map(function (hook) {
            var /** @type {?} */ unsubscriberEventHook = transitionService[hook]({}, function (transition) {
                eventHooks.map(function (unsubscriber) { return unsubscriber(); });
                resolve();
            });
            eventHooks.push(unsubscriberEventHook);
        });
    }); };
}
/**
 * @param {?} module
 * @return {?}
 */
function makeRootProviders(module) {
    return [
        { provide: UIROUTER_ROOT_MODULE, useValue: module, multi: true },
        { provide: UIROUTER_MODULE_TOKEN, useValue: module, multi: true },
        // { provide: ROUTES,                       useValue: module.states || [], multi: true },
        { provide: _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
        { provide: _angular_core.APP_INITIALIZER, useFactory: onTransitionReady, deps: [_uirouter_core_index.TransitionService, _angular_core.PLATFORM_ID], multi: true },
    ];
}
/**
 * @param {?} module
 * @return {?}
 */
function makeChildProviders(module) {
    return [
        { provide: UIROUTER_MODULE_TOKEN, useValue: module, multi: true },
        // { provide: ROUTES,                       useValue: module.states || [], multi: true },
        { provide: _angular_core.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
    ];
}
/**
 * @param {?} useHash
 * @return {?}
 */
function locationStrategy(useHash) {
    return { provide: _angular_common.LocationStrategy, useClass: useHash ? _angular_common.HashLocationStrategy : _angular_common.PathLocationStrategy };
}
/**
 * Creates UI-Router Modules
 *
 * This class has two static factory methods which create UIRouter Modules.
 * A UI-Router Module is an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * with support for UI-Router.
 *
 * ### UIRouter Directives
 *
 * When a UI-Router Module is imported into a `NgModule`, that module's components
 * can use the UIRouter Directives such as [[UIView]], [[UISref]], [[UISrefActive]].
 *
 * ### State Definitions
 *
 * State definitions found in the `states:` property are provided to the Dependency Injector.
 * This enables UI-Router to automatically register the states with the [[StateRegistry]] at bootstrap (and during lazy load).
 *
 * ### Entry Components
 *
 * Any routed components are added as `entryComponents:` so they will get compiled.
 */
var UIRouterModule = (function () {
    function UIRouterModule() {
    }
    /**
     * Creates a UI-Router Module for the root (bootstrapped) application module to import
     *
     * This factory function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
     * with UI-Router support.
     *
     * The `forRoot` module should be added to the `imports:` of the `NgModule` being bootstrapped.
     * An application should only create and import a single `NgModule` using `forRoot()`.
     * All other modules should be created using [[UIRouterModule.forChild]].
     *
     * Unlike `forChild`, an `NgModule` returned by this factory provides the [[UIRouter]] singleton object.
     * This factory also accepts root-level router configuration.
     * These are the only differences between `forRoot` and `forChild`.
     *
     * Example:
     * ```js
     * let routerConfig = {
     *   otherwise: '/home',
     *   states: [homeState, aboutState]
     * };
     *
     * \@ NgModule({
     *   imports: [
     *     BrowserModule,
     *     UIRouterModule.forRoot(routerConfig),
     *     FeatureModule1
     *   ]
     * })
     * class MyRootAppModule {}
     *
     * browserPlatformDynamic.bootstrapModule(MyRootAppModule);
     * ```
     *
     * @param {?=} config declarative UI-Router configuration
     * @return {?} an `NgModule` which provides the [[UIRouter]] singleton instance
     */
    UIRouterModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: UIRouterModule,
            providers: [
                _UIROUTER_INSTANCE_PROVIDERS,
                _UIROUTER_SERVICE_PROVIDERS,
                locationStrategy(config.useHash)
            ].concat(makeRootProviders(config))
        };
    };
    /**
     * Creates an `NgModule` for a UIRouter module
     *
     * This function creates an [Angular NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
     * with UI-Router support.
     *
     * #### Example:
     * ```js
     * var homeState = { name: 'home', url: '/home', component: Home };
     * var aboutState = { name: 'about', url: '/about', component: About };
     *
     * \@ NgModule({
     *   imports: [
     *     UIRouterModule.forChild({ states: [ homeState, aboutState ] }),
     *     SharedModule,
     *   ],
     *   declarations: [ Home, About ],
     * })
     * export class AppModule {};
     * ```
     *
     * @param {?=} module UI-Router module options
     * @return {?} an `NgModule`
     */
    UIRouterModule.forChild = function (module) {
        if (module === void 0) { module = {}; }
        return {
            ngModule: UIRouterModule,
            providers: makeChildProviders(module),
        };
    };
    return UIRouterModule;
}());
UIRouterModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [_angular_common.CommonModule],
                declarations: [_UIROUTER_DIRECTIVES],
                exports: [_UIROUTER_DIRECTIVES],
                entryComponents: [UIView],
            },] },
];
/**
 * @nocollapse
 */
UIRouterModule.ctorParameters = function () { return []; };
/** @ng2api @module core */
/** */
/**
 * Returns a function which lazy loads a nested module
 *
 * This is primarily used by the [[ng2LazyLoadBuilder]] when processing [[Ng2StateDeclaration.loadChildren]].
 *
 * It could also be used manually as a [[StateDeclaration.lazyLoad]] property to lazy load an `NgModule` and its state(s).
 *
 * #### Example:
 * Using `System.import()` and named export of `HomeModule`
 * ```js
 * declare var System;
 * var futureState = {
 *   name: 'home.**',
 *   url: '/home',
 *   lazyLoad: loadNgModule(() => System.import('./home/home.module').then(result => result.HomeModule))
 * }
 * ```
 *
 * #### Example:
 * Using a path (string) to the module
 * ```js
 * var futureState = {
 *   name: 'home.**',
 *   url: '/home',
 *   lazyLoad: loadNgModule('./home/home.module#HomeModule')
 * }
 * ```
 *
 *
 * @param {?} moduleToLoad a path (string) to the NgModule to load.
 *    Or a function which loads the NgModule code which should
 *    return a reference to  the `NgModule` class being loaded (or a `Promise` for it).
 *
 * @return {?} A function which takes a transition, which:
 * - Gets the Injector (scoped properly for the destination state)
 * - Loads and creates the NgModule
 * - Finds the "replacement state" for the target state, and adds the new NgModule Injector to it (as a resolve)
 * - Returns the new states array
 */
function loadNgModule(moduleToLoad) {
    return function (transition) {
        var /** @type {?} */ ng2Injector = transition.injector().get(_uirouter_core_index.NATIVE_INJECTOR_TOKEN);
        var /** @type {?} */ createModule = function (factory) { return factory.create(ng2Injector); };
        var /** @type {?} */ applyModule = function (moduleRef) { return applyNgModule(transition, moduleRef); };
        return loadModuleFactory(moduleToLoad, ng2Injector)
            .then(createModule)
            .then(applyModule);
    };
}
/**
 * Returns the module factory that can be used to instantiate a module
 *
 * For strings this:
 * - Finds the correct NgModuleFactoryLoader
 * - Loads the new NgModuleFactory from the path string (async)
 *
 * For a Type<any> or Promise<Type<any>> this:
 * - Compiles the component type (if not running with AOT)
 * - Returns the NgModuleFactory resulting from compilation (or direct loading if using AOT) as a Promise
 *
 * \@internalapi
 * @param {?} moduleToLoad
 * @param {?} ng2Injector
 * @return {?}
 */
function loadModuleFactory(moduleToLoad, ng2Injector) {
    if (_uirouter_core_index.isString(moduleToLoad)) {
        return ng2Injector.get(_angular_core.NgModuleFactoryLoader).load(moduleToLoad);
    }
    var /** @type {?} */ compiler = ng2Injector.get(_angular_core.Compiler);
    var /** @type {?} */ offlineMode = compiler instanceof _angular_core.Compiler;
    var /** @type {?} */ unwrapEsModuleDefault = function (x) { return x && x.__esModule && x['default'] ? x['default'] : x; };
    var /** @type {?} */ compileAsync = function (moduleType) { return compiler.compileModuleAsync(moduleType); };
    var /** @type {?} */ loadChildrenPromise = Promise.resolve(moduleToLoad()).then(unwrapEsModuleDefault);
    return offlineMode ? loadChildrenPromise : loadChildrenPromise.then(compileAsync);
}
/**
 * Apply the UI-Router Modules found in the lazy loaded module.
 *
 * Apply the Lazy Loaded NgModule's newly created Injector to the right state in the state tree.
 *
 * Lazy loading uses a placeholder state which is removed (and replaced) after the module is loaded.
 * The NgModule should include a state with the same name as the placeholder.
 *
 * Find the *newly loaded state* with the same name as the *placeholder state*.
 * The NgModule's Injector (and ComponentFactoryResolver) will be added to that state.
 * The Injector/Factory are used when creating Components for the `replacement` state and all its children.
 *
 * \@internalapi
 * @param {?} transition
 * @param {?} ng2Module
 * @return {?}
 */
function applyNgModule(transition, ng2Module) {
    var /** @type {?} */ injector = ng2Module.injector;
    var /** @type {?} */ parentInjector = (ng2Module.injector['parent']) || ng2Module.injector['_parent'];
    var /** @type {?} */ uiRouter = injector.get(_uirouter_core_index.UIRouter);
    var /** @type {?} */ registry = uiRouter.stateRegistry;
    var /** @type {?} */ originalName = transition.to().name;
    var /** @type {?} */ originalState = registry.get(originalName);
    // Check if it's a future state (ends with .**)
    var /** @type {?} */ isFuture = /^(.*)\.\*\*$/.exec(originalName);
    // Final name (without the .**)
    var /** @type {?} */ replacementName = isFuture && isFuture[1];
    var /** @type {?} */ newRootModules = (multiProviderParentChildDelta(parentInjector, injector, UIROUTER_ROOT_MODULE)
        .reduce(_uirouter_core_index.uniqR, []));
    var /** @type {?} */ newChildModules = (multiProviderParentChildDelta(parentInjector, injector, UIROUTER_MODULE_TOKEN)
        .reduce(_uirouter_core_index.uniqR, []));
    if (newRootModules.length) {
        console.log(newRootModules);
        throw new Error('Lazy loaded modules should not contain a UIRouterModule.forRoot() module');
    }
    var /** @type {?} */ newStateObjects = newChildModules
        .map(function (module) { return applyModuleConfig(uiRouter, injector, module); })
        .reduce(_uirouter_core_index.unnestR, [])
        .reduce(_uirouter_core_index.uniqR, []);
    var /** @type {?} */ replacementState = registry.get(replacementName);
    if (!replacementState || replacementState === originalState) {
        throw new Error("The Future State named '" + originalName + "' lazy loaded an NgModule. " +
            ("The lazy loaded NgModule must have a state named '" + replacementName + "' ") +
            ("which replaces the (placeholder) '" + originalName + "' Future State. ") +
            ("Add a '" + replacementName + "' state to the lazy loaded NgModule ") +
            "using UIRouterModule.forChild({ states: CHILD_STATES }).");
    }
    // Supply the newly loaded states with the Injector from the lazy loaded NgModule.
    // If a tree of states is lazy loaded, only add the injector to the root of the lazy loaded tree.
    // The children will get the injector by resolve inheritance.
    var /** @type {?} */ newParentStates = newStateObjects.filter(function (state) { return !_uirouter_core_index.inArray(newStateObjects, state.parent); });
    // Add the Injector to the top of the lazy loaded state tree as a resolve
    newParentStates.forEach(function (state) { return state.resolvables.push(_uirouter_core_index.Resolvable.fromData(_uirouter_core_index.NATIVE_INJECTOR_TOKEN, injector)); });
    return {};
}
/**
 * Returns the new dependency injection values from the Child Injector
 *
 * When a DI token is defined as multi: true, the child injector
 * can add new values for the token.
 *
 * This function returns the values added by the child injector,  and excludes all values from the parent injector.
 *
 * \@internalapi
 * @param {?} parent
 * @param {?} child
 * @param {?} token
 * @return {?}
 */
function multiProviderParentChildDelta(parent, child, token) {
    var /** @type {?} */ childVals = child.get(token, []);
    var /** @type {?} */ parentVals = parent.get(token, []);
    return childVals.filter(function (val$$1) { return parentVals.indexOf(val$$1) === -1; });
}
/** @module ng2 */
/** */
/**
 * This is a [[StateBuilder.builder]] function for ngModule lazy loading in Angular.
 *
 * When the [[StateBuilder]] builds a [[State]] object from a raw [[StateDeclaration]], this builder
 * decorates the `lazyLoad` property for states that have a [[Ng2StateDeclaration.ngModule]] declaration.
 *
 * If the state has a [[Ng2StateDeclaration.ngModule]], it will create a `lazyLoad` function
 * that in turn calls `loadNgModule(loadNgModuleFn)`.
 *
 * #### Example:
 * A state that has a `ngModule`
 * ```js
 * var decl = {
 *   ngModule: () => System.import('./childModule.ts')
 * }
 * ```
 * would build a state with a `lazyLoad` function like:
 * ```js
 * import { loadNgModule } from "\@uirouter/angular";
 * var decl = {
 *   lazyLoad: loadNgModule(() => System.import('./childModule.ts')
 * }
 * ```
 *
 * If the state has both a `ngModule:` *and* a `lazyLoad`, then the `lazyLoad` is run first.
 *
 * #### Example:
 * ```js
 * var decl = {
 *   lazyLoad: () => System.import('third-party-library'),
 *   ngModule: () => System.import('./childModule.ts')
 * }
 * ```
 * would build a state with a `lazyLoad` function like:
 * ```js
 * import { loadNgModule } from "\@uirouter/angular";
 * var decl = {
 *   lazyLoad: () => System.import('third-party-library')
 *       .then(() => loadNgModule(() => System.import('./childModule.ts'))
 * }
 * ```
 *
 * @param {?} state
 * @param {?} parent
 * @return {?}
 */
function ng2LazyLoadBuilder(state, parent) {
    var /** @type {?} */ loadNgModuleFn = state['loadChildren'];
    return loadNgModuleFn ? loadNgModule(loadNgModuleFn) : state.lazyLoad;
}
/** @module ng2 */
/** */
/**
 * A `LocationServices` that delegates to the Angular LocationStrategy
 */
var Ng2LocationServices = (function (_super) {
    __extends(Ng2LocationServices, _super);
    /**
     * @param {?} router
     * @param {?} _locationStrategy
     * @param {?} isBrowser
     */
    function Ng2LocationServices(router, _locationStrategy, isBrowser) {
        var _this = _super.call(this, router, isBrowser) || this;
        _this._locationStrategy = _locationStrategy;
        _this._locationStrategy.onPopState(function (evt) {
            if (evt.type !== 'hashchange') {
                _this._listener(evt);
            }
        });
        return _this;
    }
    /**
     * @return {?}
     */
    Ng2LocationServices.prototype._get = function () {
        return this._locationStrategy.path(true)
            .replace(this._locationStrategy.getBaseHref().replace(/\/$/, ''), '');
    };
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} replace
     * @return {?}
     */
    Ng2LocationServices.prototype._set = function (state, title, url, replace) {
        var _a = _uirouter_core_index.parseUrl(url), path = _a.path, search = _a.search, hash = _a.hash;
        var /** @type {?} */ urlWithHash = path + (hash ? "#" + hash : "");
        if (replace) {
            this._locationStrategy.replaceState(state, title, urlWithHash, search);
        }
        else {
            this._locationStrategy.pushState(state, title, urlWithHash, search);
        }
    };
    /**
     * @param {?} router
     * @return {?}
     */
    Ng2LocationServices.prototype.dispose = function (router) {
        _super.prototype.dispose.call(this, router);
    };
    return Ng2LocationServices;
}(_uirouter_core_index.BaseLocationServices));
/** @module ng2 */
/** */
var Ng2LocationConfig = (function (_super) {
    __extends(Ng2LocationConfig, _super);
    /**
     * @param {?} router
     * @param {?} _locationStrategy
     */
    function Ng2LocationConfig(router, _locationStrategy) {
        var _this = _super.call(this, router, _uirouter_core_index.is(_angular_common.PathLocationStrategy)(_locationStrategy)) || this;
        _this._locationStrategy = _locationStrategy;
        return _this;
    }
    /**
     * @param {?=} href
     * @return {?}
     */
    Ng2LocationConfig.prototype.baseHref = function (href) {
        return this._locationStrategy.getBaseHref();
    };
    return Ng2LocationConfig;
}(_uirouter_core_index.BrowserLocationConfig));
/**
 * # UI-Router for Angular (v2+)
 *
 * - [@uirouter/angular home page](https://ui-router.github.io/ng2)
 * - [tutorials](https://ui-router.github.io/tutorial/ng2/helloworld)
 * - [quick start repository](http://github.com/ui-router/quickstart-ng2)
 *
 * Getting started:
 *
 * - Use npm. Add a dependency on latest `@uirouter/angular`
 * - Import UI-Router classes directly from `"@uirouter/angular"`
 *
 * ```js
 * import {StateRegistry} from "@uirouter/angular";
 * ```
 *
 * - Create application states (as defined by [[Ng2StateDeclaration]]).
 *
 * ```js
 * export let state1: Ng2StateDeclaration = {
 *   name: 'state1',
 *   component: State1Component,
 *   url: '/one'
 * }
 *
 * export let state2: Ng2StateDeclaration = {
 *   name: 'state2',
 *   component: State2Component,
 *   url: '/two'
 * }
 * ```
 *
 * - Import a [[UIRouterModule.forChild]] module into your feature `NgModule`s.
 *
 * ```js
 * @ NgModule({
 *   imports: [
 *     SharedModule,
 *     UIRouterModule.forChild({ states: [state1, state2 ] })
 *   ],
 *   declarations: [
 *     State1Component,
 *     State2Component,
 *   ]
 * })
 * export class MyFeatureModule {}
 * ```
 *
 * - Import a [[UIRouterModule.forRoot]] module into your application root `NgModule`
 * - Either bootstrap a [[UIView]] component, or add a `<ui-view></ui-view>` viewport to your root component.
 *
 * ```js
 * @ NgModule({
 *   imports: [
 *     BrowserModule,
 *     UIRouterModule.forRoot({ states: [ homeState ] }),
 *     MyFeatureModule,
 *   ],
 *   declarations: [
 *     HomeComponent
 *   ]
 *   bootstrap: [ UIView ]
 * })
 * class RootAppModule {}
 *
 * browserPlatformDynamic.bootstrapModule(RootAppModule);
 * ```
 *
 * - Optionally specify a configuration class [[ChildModule.configClass]] for any module
 * to perform any router configuration during bootstrap or lazyload.
 * Pass the class to [[UIRouterModule.forRoot]] or [[UIRouterModule.forChild]].
 *
 * ```js
 * import {UIRouter} from "@uirouter/angular";
 *
 * @ Injectable()
 * export class MyUIRouterConfig {
 *   // Constructor is injectable
 *   constructor(uiRouter: UIRouter) {
 *     uiRouter.urlMatcherFactory.type('datetime', myDateTimeParamType);
 *   }
 * }
 * ```
 *
 * @preferred @module ng2
 */
/** */
/**
 * This is a factory function for a UIRouter instance
 *
 * Creates a UIRouter instance and configures it for Angular, then invokes router bootstrap.
 * This function is used as an Angular `useFactory` Provider.
 * @param {?} locationStrategy
 * @param {?} rootModules
 * @param {?} modules
 * @param {?} injector
 * @return {?}
 */
function uiRouterFactory(locationStrategy$$1, rootModules, modules, injector) {
    if (rootModules.length !== 1) {
        throw new Error("Exactly one UIRouterModule.forRoot() should be in the bootstrapped app module's imports: []");
    }
    // ----------------- Create router -----------------
    // Create a new ng2 UIRouter and configure it for ng2
    var /** @type {?} */ router = new _uirouter_core_index.UIRouter();
    // Add RxJS plugin
    router.plugin(_uirouter_rx_index.UIRouterRx);
    // Add $q-like and $injector-like service APIs
    router.plugin(_uirouter_core_index.servicesPlugin);
    // ----------------- Monkey Patches ----------------
    // Monkey patch the services.$injector to use the root ng2 Injector
    _uirouter_core_index.services.$injector.get = injector.get.bind(injector);
    // ----------------- Configure for ng2 -------------
    router.locationService = new Ng2LocationServices(router, locationStrategy$$1, _angular_common.isPlatformBrowser(injector.get(_angular_core.PLATFORM_ID)));
    router.locationConfig = new Ng2LocationConfig(router, locationStrategy$$1);
    // Apply ng2 ui-view handling code
    var /** @type {?} */ viewConfigFactory = function (path, config) { return new Ng2ViewConfig(path, config); };
    router.viewService._pluginapi._viewConfigFactory("ng2", viewConfigFactory);
    // Apply statebuilder decorator for ng2 NgModule registration
    var /** @type {?} */ registry = router.stateRegistry;
    registry.decorator('views', ng2ViewsBuilder);
    registry.decorator('lazyLoad', ng2LazyLoadBuilder);
    // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
    var /** @type {?} */ ng2InjectorResolvable = _uirouter_core_index.Resolvable.fromData(_uirouter_core_index.NATIVE_INJECTOR_TOKEN, injector);
    registry.root().resolvables.push(ng2InjectorResolvable);
    // Auto-flush the parameter type queue
    router.urlMatcherFactory.$get();
    // ----------------- Initialize router -------------
    rootModules.forEach(function (moduleConfig) { return applyRootModuleConfig(router, injector, moduleConfig); });
    modules.forEach(function (moduleConfig) { return applyModuleConfig(router, injector, moduleConfig); });
    // Start monitoring the URL
    if (!router.urlRouter.interceptDeferred) {
        router.urlService.listen();
        router.urlService.sync();
    }
    return router;
}
/**
 * @param {?} r
 * @return {?}
 */
function parentUIViewInjectFactory(r) { return ({ fqn: null, context: r.root() }); }
var _UIROUTER_INSTANCE_PROVIDERS = [
    { provide: _uirouter_core_index.UIRouter, useFactory: uiRouterFactory, deps: [_angular_common.LocationStrategy, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN, _angular_core.Injector] },
    { provide: UIView.PARENT_INJECT, useFactory: parentUIViewInjectFactory, deps: [_uirouter_core_index.StateRegistry] },
];
/**
 * @param {?} r
 * @return {?}
 */
function fnStateService(r) { return r.stateService; }
/**
 * @param {?} r
 * @return {?}
 */
function fnTransitionService(r) { return r.transitionService; }
/**
 * @param {?} r
 * @return {?}
 */
function fnUrlMatcherFactory(r) { return r.urlMatcherFactory; }
/**
 * @param {?} r
 * @return {?}
 */
function fnUrlRouter(r) { return r.urlRouter; }
/**
 * @param {?} r
 * @return {?}
 */
function fnUrlService(r) { return r.urlService; }
/**
 * @param {?} r
 * @return {?}
 */
function fnViewService(r) { return r.viewService; }
/**
 * @param {?} r
 * @return {?}
 */
function fnStateRegistry(r) { return r.stateRegistry; }
/**
 * @param {?} r
 * @return {?}
 */
function fnGlobals(r) { return r.globals; }
var _UIROUTER_SERVICE_PROVIDERS = [
    { provide: _uirouter_core_index.StateService, useFactory: fnStateService, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.TransitionService, useFactory: fnTransitionService, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.UrlMatcherFactory, useFactory: fnUrlMatcherFactory, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.UrlRouter, useFactory: fnUrlRouter, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.UrlService, useFactory: fnUrlService, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.ViewService, useFactory: fnViewService, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.StateRegistry, useFactory: fnStateRegistry, deps: [_uirouter_core_index.UIRouter] },
    { provide: _uirouter_core_index.UIRouterGlobals, useFactory: fnGlobals, deps: [_uirouter_core_index.UIRouter] },
];
/**
 * The UI-Router providers, for use in your application bootstrap
 *
 * @deprecated use [[UIRouterModule.forRoot]]
 */
var UIROUTER_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS.concat(_UIROUTER_SERVICE_PROVIDERS);

exports.uiRouterFactory = uiRouterFactory;
exports.parentUIViewInjectFactory = parentUIViewInjectFactory;
exports._UIROUTER_INSTANCE_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS;
exports.fnStateService = fnStateService;
exports.fnTransitionService = fnTransitionService;
exports.fnUrlMatcherFactory = fnUrlMatcherFactory;
exports.fnUrlRouter = fnUrlRouter;
exports.fnUrlService = fnUrlService;
exports.fnViewService = fnViewService;
exports.fnStateRegistry = fnStateRegistry;
exports.fnGlobals = fnGlobals;
exports._UIROUTER_SERVICE_PROVIDERS = _UIROUTER_SERVICE_PROVIDERS;
exports.UIROUTER_PROVIDERS = UIROUTER_PROVIDERS;
exports.UIROUTER_ROOT_MODULE = UIROUTER_ROOT_MODULE;
exports.UIROUTER_MODULE_TOKEN = UIROUTER_MODULE_TOKEN;
exports.UIROUTER_STATES = UIROUTER_STATES;
exports.onTransitionReady = onTransitionReady;
exports.makeRootProviders = makeRootProviders;
exports.makeChildProviders = makeChildProviders;
exports.locationStrategy = locationStrategy;
exports.UIRouterModule = UIRouterModule;
exports.applyModuleConfig = applyModuleConfig;
exports.applyRootModuleConfig = applyRootModuleConfig;
exports._UIROUTER_DIRECTIVES = _UIROUTER_DIRECTIVES;
exports.UIROUTER_DIRECTIVES = UIROUTER_DIRECTIVES;
exports.UIView = UIView;
exports.AnchorUISref = AnchorUISref;
exports.UISref = UISref;
exports.UISrefStatus = UISrefStatus;
exports.UISrefActive = UISrefActive;
exports.ng2ViewsBuilder = ng2ViewsBuilder;
exports.Ng2ViewConfig = Ng2ViewConfig;
exports.ng2LazyLoadBuilder = ng2LazyLoadBuilder;
exports.loadNgModule = loadNgModule;
exports.loadModuleFactory = loadModuleFactory;
exports.applyNgModule = applyNgModule;
exports.multiProviderParentChildDelta = multiProviderParentChildDelta;
exports.fromJson = _uirouter_core_index.fromJson;
exports.toJson = _uirouter_core_index.toJson;
exports.copy = _uirouter_core_index.copy;
exports.forEach = _uirouter_core_index.forEach;
exports.extend = _uirouter_core_index.extend;
exports.equals = _uirouter_core_index.equals;
exports.identity = _uirouter_core_index.identity;
exports.noop = _uirouter_core_index.noop;
exports.Mapper = _uirouter_core_index.Mapper;
exports.TypedMap = _uirouter_core_index.TypedMap;
exports.Predicate = _uirouter_core_index.Predicate;
exports.IInjectable = _uirouter_core_index.IInjectable;
exports.Obj = _uirouter_core_index.Obj;
exports.createProxyFunctions = _uirouter_core_index.createProxyFunctions;
exports.inherit = _uirouter_core_index.inherit;
exports.inArray = _uirouter_core_index.inArray;
exports._inArray = _uirouter_core_index._inArray;
exports.removeFrom = _uirouter_core_index.removeFrom;
exports._removeFrom = _uirouter_core_index._removeFrom;
exports.pushTo = _uirouter_core_index.pushTo;
exports._pushTo = _uirouter_core_index._pushTo;
exports.deregAll = _uirouter_core_index.deregAll;
exports.defaults = _uirouter_core_index.defaults;
exports.mergeR = _uirouter_core_index.mergeR;
exports.ancestors = _uirouter_core_index.ancestors;
exports.pick = _uirouter_core_index.pick;
exports.omit = _uirouter_core_index.omit;
exports.pluck = _uirouter_core_index.pluck;
exports.filter = _uirouter_core_index.filter;
exports.find = _uirouter_core_index.find;
exports.mapObj = _uirouter_core_index.mapObj;
exports.map = _uirouter_core_index.map;
exports.values = _uirouter_core_index.values;
exports.allTrueR = _uirouter_core_index.allTrueR;
exports.anyTrueR = _uirouter_core_index.anyTrueR;
exports.unnestR = _uirouter_core_index.unnestR;
exports.flattenR = _uirouter_core_index.flattenR;
exports.pushR = _uirouter_core_index.pushR;
exports.uniqR = _uirouter_core_index.uniqR;
exports.unnest = _uirouter_core_index.unnest;
exports.flatten = _uirouter_core_index.flatten;
exports.assertPredicate = _uirouter_core_index.assertPredicate;
exports.assertMap = _uirouter_core_index.assertMap;
exports.assertFn = _uirouter_core_index.assertFn;
exports.pairs = _uirouter_core_index.pairs;
exports.arrayTuples = _uirouter_core_index.arrayTuples;
exports.applyPairs = _uirouter_core_index.applyPairs;
exports.tail = _uirouter_core_index.tail;
exports._extend = _uirouter_core_index._extend;
exports.sortfn = _uirouter_core_index.sortfn;
exports.sortBy = _uirouter_core_index.sortBy;
exports.composeSort = _uirouter_core_index.composeSort;
exports.silenceUncaughtInPromise = _uirouter_core_index.silenceUncaughtInPromise;
exports.silentRejection = _uirouter_core_index.silentRejection;
exports.notImplemented = _uirouter_core_index.notImplemented;
exports.$QLikeDeferred = _uirouter_core_index.$QLikeDeferred;
exports.$QLike = _uirouter_core_index.$QLike;
exports.$InjectorLike = _uirouter_core_index.$InjectorLike;
exports.CoreServices = _uirouter_core_index.CoreServices;
exports.LocationServices = _uirouter_core_index.LocationServices;
exports.LocationConfig = _uirouter_core_index.LocationConfig;
exports.services = _uirouter_core_index.services;
exports.Glob = _uirouter_core_index.Glob;
exports.curry = _uirouter_core_index.curry;
exports.compose = _uirouter_core_index.compose;
exports.pipe = _uirouter_core_index.pipe;
exports.prop = _uirouter_core_index.prop;
exports.propEq = _uirouter_core_index.propEq;
exports.parse = _uirouter_core_index.parse;
exports.not = _uirouter_core_index.not;
exports.and = _uirouter_core_index.and;
exports.or = _uirouter_core_index.or;
exports.all = _uirouter_core_index.all;
exports.any = _uirouter_core_index.any;
exports.is = _uirouter_core_index.is;
exports.eq = _uirouter_core_index.eq;
exports.val = _uirouter_core_index.val;
exports.invoke = _uirouter_core_index.invoke;
exports.pattern = _uirouter_core_index.pattern;
exports.isUndefined = _uirouter_core_index.isUndefined;
exports.isDefined = _uirouter_core_index.isDefined;
exports.isNull = _uirouter_core_index.isNull;
exports.isNullOrUndefined = _uirouter_core_index.isNullOrUndefined;
exports.isFunction = _uirouter_core_index.isFunction;
exports.isNumber = _uirouter_core_index.isNumber;
exports.isString = _uirouter_core_index.isString;
exports.isObject = _uirouter_core_index.isObject;
exports.isArray = _uirouter_core_index.isArray;
exports.isDate = _uirouter_core_index.isDate;
exports.isRegExp = _uirouter_core_index.isRegExp;
exports.isState = _uirouter_core_index.isState;
exports.isInjectable = _uirouter_core_index.isInjectable;
exports.isPromise = _uirouter_core_index.isPromise;
exports.Queue = _uirouter_core_index.Queue;
exports.maxLength = _uirouter_core_index.maxLength;
exports.padString = _uirouter_core_index.padString;
exports.kebobString = _uirouter_core_index.kebobString;
exports.functionToString = _uirouter_core_index.functionToString;
exports.fnToString = _uirouter_core_index.fnToString;
exports.stringify = _uirouter_core_index.stringify;
exports.beforeAfterSubstr = _uirouter_core_index.beforeAfterSubstr;
exports.splitOnDelim = _uirouter_core_index.splitOnDelim;
exports.joinNeighborsR = _uirouter_core_index.joinNeighborsR;
exports.Category = _uirouter_core_index.Category;
exports.Trace = _uirouter_core_index.Trace;
exports.trace = _uirouter_core_index.trace;
exports.RawParams = _uirouter_core_index.RawParams;
exports.ParamsOrArray = _uirouter_core_index.ParamsOrArray;
exports.ParamDeclaration = _uirouter_core_index.ParamDeclaration;
exports.Replace = _uirouter_core_index.Replace;
exports.ParamTypeDefinition = _uirouter_core_index.ParamTypeDefinition;
exports.DefType = _uirouter_core_index.DefType;
exports.Param = _uirouter_core_index.Param;
exports.ParamTypes = _uirouter_core_index.ParamTypes;
exports.StateParams = _uirouter_core_index.StateParams;
exports.ParamType = _uirouter_core_index.ParamType;
exports.PathNode = _uirouter_core_index.PathNode;
exports.GetParamsFn = _uirouter_core_index.GetParamsFn;
exports.PathUtils = _uirouter_core_index.PathUtils;
exports.ProviderLike = _uirouter_core_index.ProviderLike;
exports.ResolvableLiteral = _uirouter_core_index.ResolvableLiteral;
exports.ResolvePolicy = _uirouter_core_index.ResolvePolicy;
exports.PolicyWhen = _uirouter_core_index.PolicyWhen;
exports.PolicyAsync = _uirouter_core_index.PolicyAsync;
exports.resolvePolicies = _uirouter_core_index.resolvePolicies;
exports.defaultResolvePolicy = _uirouter_core_index.defaultResolvePolicy;
exports.Resolvable = _uirouter_core_index.Resolvable;
exports.NATIVE_INJECTOR_TOKEN = _uirouter_core_index.NATIVE_INJECTOR_TOKEN;
exports.ResolveContext = _uirouter_core_index.ResolveContext;
exports.StateOrName = _uirouter_core_index.StateOrName;
exports.TransitionPromise = _uirouter_core_index.TransitionPromise;
exports.TargetStateDef = _uirouter_core_index.TargetStateDef;
exports.ResolveTypes = _uirouter_core_index.ResolveTypes;
exports._ViewDeclaration = _uirouter_core_index._ViewDeclaration;
exports.RedirectToResult = _uirouter_core_index.RedirectToResult;
exports.StateDeclaration = _uirouter_core_index.StateDeclaration;
exports.LazyLoadResult = _uirouter_core_index.LazyLoadResult;
exports.HrefOptions = _uirouter_core_index.HrefOptions;
exports._StateDeclaration = _uirouter_core_index._StateDeclaration;
exports.BuilderFunction = _uirouter_core_index.BuilderFunction;
exports.resolvablesBuilder = _uirouter_core_index.resolvablesBuilder;
exports.StateBuilder = _uirouter_core_index.StateBuilder;
exports.StateObject = _uirouter_core_index.StateObject;
exports.StateMatcher = _uirouter_core_index.StateMatcher;
exports.StateQueueManager = _uirouter_core_index.StateQueueManager;
exports.StateRegistryListener = _uirouter_core_index.StateRegistryListener;
exports.StateRegistry = _uirouter_core_index.StateRegistry;
exports.OnInvalidCallback = _uirouter_core_index.OnInvalidCallback;
exports.StateService = _uirouter_core_index.StateService;
exports.TargetState = _uirouter_core_index.TargetState;
exports.TransitionOptions = _uirouter_core_index.TransitionOptions;
exports.TransitionHookOptions = _uirouter_core_index.TransitionHookOptions;
exports.TreeChanges = _uirouter_core_index.TreeChanges;
exports.IHookRegistration = _uirouter_core_index.IHookRegistration;
exports.TransitionHookFn = _uirouter_core_index.TransitionHookFn;
exports.TransitionStateHookFn = _uirouter_core_index.TransitionStateHookFn;
exports.TransitionCreateHookFn = _uirouter_core_index.TransitionCreateHookFn;
exports.HookFn = _uirouter_core_index.HookFn;
exports.HookResult = _uirouter_core_index.HookResult;
exports.HookRegOptions = _uirouter_core_index.HookRegOptions;
exports.IHookRegistry = _uirouter_core_index.IHookRegistry;
exports.IStateMatch = _uirouter_core_index.IStateMatch;
exports.HookMatchCriteria = _uirouter_core_index.HookMatchCriteria;
exports.IMatchingNodes = _uirouter_core_index.IMatchingNodes;
exports.RegisteredHooks = _uirouter_core_index.RegisteredHooks;
exports.PathTypes = _uirouter_core_index.PathTypes;
exports.PathType = _uirouter_core_index.PathType;
exports.HookMatchCriterion = _uirouter_core_index.HookMatchCriterion;
exports.TransitionHookPhase = _uirouter_core_index.TransitionHookPhase;
exports.TransitionHookScope = _uirouter_core_index.TransitionHookScope;
exports.HookBuilder = _uirouter_core_index.HookBuilder;
exports.matchState = _uirouter_core_index.matchState;
exports.RegisteredHook = _uirouter_core_index.RegisteredHook;
exports.makeEvent = _uirouter_core_index.makeEvent;
exports.RejectType = _uirouter_core_index.RejectType;
exports.Rejection = _uirouter_core_index.Rejection;
exports.Transition = _uirouter_core_index.Transition;
exports.GetResultHandler = _uirouter_core_index.GetResultHandler;
exports.GetErrorHandler = _uirouter_core_index.GetErrorHandler;
exports.ResultHandler = _uirouter_core_index.ResultHandler;
exports.ErrorHandler = _uirouter_core_index.ErrorHandler;
exports.TransitionHook = _uirouter_core_index.TransitionHook;
exports.TransitionEventType = _uirouter_core_index.TransitionEventType;
exports.defaultTransOpts = _uirouter_core_index.defaultTransOpts;
exports.TransitionServicePluginAPI = _uirouter_core_index.TransitionServicePluginAPI;
exports.TransitionService = _uirouter_core_index.TransitionService;
exports.ParamFactory = _uirouter_core_index.ParamFactory;
exports.UrlConfigApi = _uirouter_core_index.UrlConfigApi;
exports.UrlMatcherConfig = _uirouter_core_index.UrlMatcherConfig;
exports.UrlSyncApi = _uirouter_core_index.UrlSyncApi;
exports.UrlRulesApi = _uirouter_core_index.UrlRulesApi;
exports.UrlParts = _uirouter_core_index.UrlParts;
exports.MatchResult = _uirouter_core_index.MatchResult;
exports.UrlRuleMatchFn = _uirouter_core_index.UrlRuleMatchFn;
exports.UrlRuleHandlerFn = _uirouter_core_index.UrlRuleHandlerFn;
exports.UrlRuleType = _uirouter_core_index.UrlRuleType;
exports.UrlRule = _uirouter_core_index.UrlRule;
exports.MatcherUrlRule = _uirouter_core_index.MatcherUrlRule;
exports.StateRule = _uirouter_core_index.StateRule;
exports.RegExpRule = _uirouter_core_index.RegExpRule;
exports.UrlMatcher = _uirouter_core_index.UrlMatcher;
exports.UrlMatcherFactory = _uirouter_core_index.UrlMatcherFactory;
exports.UrlRouter = _uirouter_core_index.UrlRouter;
exports.UrlRuleFactory = _uirouter_core_index.UrlRuleFactory;
exports.BaseUrlRule = _uirouter_core_index.BaseUrlRule;
exports.UrlService = _uirouter_core_index.UrlService;
exports.ViewContext = _uirouter_core_index.ViewContext;
exports.ActiveUIView = _uirouter_core_index.ActiveUIView;
exports.ViewConfig = _uirouter_core_index.ViewConfig;
exports.ViewConfigFactory = _uirouter_core_index.ViewConfigFactory;
exports.ViewServicePluginAPI = _uirouter_core_index.ViewServicePluginAPI;
exports.ViewService = _uirouter_core_index.ViewService;
exports.UIRouterGlobals = _uirouter_core_index.UIRouterGlobals;
exports.UIRouter = _uirouter_core_index.UIRouter;
exports.PluginFactory = _uirouter_core_index.PluginFactory;
exports.LocationPlugin = _uirouter_core_index.LocationPlugin;
exports.ServicesPlugin = _uirouter_core_index.ServicesPlugin;
exports.LocationLike = _uirouter_core_index.LocationLike;
exports.HistoryLike = _uirouter_core_index.HistoryLike;
exports.$q = _uirouter_core_index.$q;
exports.$injector = _uirouter_core_index.$injector;
exports.BaseLocationServices = _uirouter_core_index.BaseLocationServices;
exports.HashLocationService = _uirouter_core_index.HashLocationService;
exports.MemoryLocationService = _uirouter_core_index.MemoryLocationService;
exports.PushStateLocationService = _uirouter_core_index.PushStateLocationService;
exports.MemoryLocationConfig = _uirouter_core_index.MemoryLocationConfig;
exports.BrowserLocationConfig = _uirouter_core_index.BrowserLocationConfig;
exports.splitHash = _uirouter_core_index.splitHash;
exports.splitQuery = _uirouter_core_index.splitQuery;
exports.splitEqual = _uirouter_core_index.splitEqual;
exports.trimHashVal = _uirouter_core_index.trimHashVal;
exports.keyValsToObjectR = _uirouter_core_index.keyValsToObjectR;
exports.getParams = _uirouter_core_index.getParams;
exports.parseUrl = _uirouter_core_index.parseUrl;
exports.buildUrl = _uirouter_core_index.buildUrl;
exports.locationPluginFactory = _uirouter_core_index.locationPluginFactory;
exports.servicesPlugin = _uirouter_core_index.servicesPlugin;
exports.hashLocationPlugin = _uirouter_core_index.hashLocationPlugin;
exports.pushStateLocationPlugin = _uirouter_core_index.pushStateLocationPlugin;
exports.memoryLocationPlugin = _uirouter_core_index.memoryLocationPlugin;
exports.UIInjector = _uirouter_core_index.UIInjector;
exports.UIRouterPlugin = _uirouter_core_index.UIRouterPlugin;
exports.UIRouterPluginBase = _uirouter_core_index.UIRouterPluginBase;
exports.Disposable = _uirouter_core_index.Disposable;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular.umd.js.map
