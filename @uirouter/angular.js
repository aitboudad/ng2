import { ANALYZE_FOR_ENTRY_COMPONENTS, APP_INITIALIZER, Compiler, Component, ComponentFactoryResolver, ContentChildren, Directive, ElementRef, EventEmitter, Host, Inject, Injector, Input, NgModule, NgModuleFactoryLoader, OpaqueToken, Optional, Output, PLATFORM_ID, ReflectiveInjector, Renderer, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { $InjectorLike, $QLike, $QLikeDeferred, $injector, $q, ActiveUIView, BaseLocationServices, BaseUrlRule, BrowserLocationConfig, BuilderFunction, Category, CoreServices, DefType, Disposable, ErrorHandler, GetErrorHandler, GetParamsFn, GetResultHandler, Glob, HashLocationService, HistoryLike, HookBuilder, HookFn, HookMatchCriteria, HookMatchCriterion, HookRegOptions, HookResult, HrefOptions, IHookRegistration, IHookRegistry, IInjectable, IMatchingNodes, IStateMatch, LazyLoadResult, LocationConfig, LocationLike, LocationPlugin, LocationServices, Mapper, MatchResult, MatcherUrlRule, MemoryLocationConfig, MemoryLocationService, NATIVE_INJECTOR_TOKEN, Obj, OnInvalidCallback, Param, ParamDeclaration, ParamFactory, ParamType, ParamTypeDefinition, ParamTypes, ParamsOrArray, PathNode, PathType, PathTypes, PathUtils, PluginFactory, PolicyAsync, PolicyWhen, Predicate, ProviderLike, PushStateLocationService, Queue, RawParams, RedirectToResult, RegExpRule, RegisteredHook, RegisteredHooks, RejectType, Rejection, Replace, Resolvable, ResolvableLiteral, ResolveContext, ResolvePolicy, ResolveTypes, ResultHandler, ServicesPlugin, StateBuilder, StateDeclaration, StateMatcher, StateObject, StateOrName, StateParams, StateQueueManager, StateRegistry, StateRegistryListener, StateRule, StateService, TargetState, TargetStateDef, Trace, Transition, TransitionCreateHookFn, TransitionEventType, TransitionHook, TransitionHookFn, TransitionHookOptions, TransitionHookPhase, TransitionHookScope, TransitionOptions, TransitionPromise, TransitionService, TransitionServicePluginAPI, TransitionStateHookFn, TreeChanges, TypedMap, UIInjector, UIRouter, UIRouterGlobals, UIRouterPlugin, UIRouterPluginBase, UrlConfigApi, UrlMatcher, UrlMatcherConfig, UrlMatcherFactory, UrlParts, UrlRouter, UrlRule, UrlRuleFactory, UrlRuleHandlerFn, UrlRuleMatchFn, UrlRuleType, UrlRulesApi, UrlService, UrlSyncApi, ViewConfig, ViewConfigFactory, ViewContext, ViewService, ViewServicePluginAPI, _StateDeclaration, _ViewDeclaration, _extend, _inArray, _pushTo, _removeFrom, all, allTrueR, ancestors, and, any, anyTrueR, applyPairs, arrayTuples, assertFn, assertMap, assertPredicate, beforeAfterSubstr, buildUrl, compose, composeSort, copy, createProxyFunctions, curry, defaultResolvePolicy, defaultTransOpts, defaults, deregAll, eq, equals, extend, filter, find, flatten, flattenR, fnToString, forEach, fromJson, functionToString, getParams, hashLocationPlugin, identity, inArray, inherit, invoke, is, isArray, isDate, isDefined, isFunction, isInjectable, isNull, isNullOrUndefined, isNumber, isObject, isPromise, isRegExp, isState, isString, isUndefined, joinNeighborsR, kebobString, keyValsToObjectR, locationPluginFactory, makeEvent, map, mapObj, matchState, maxLength, memoryLocationPlugin, mergeR, noop, not, notImplemented, omit, or, padString, pairs, parse, parseUrl, pattern, pick, pipe, pluck, prop, propEq, pushR, pushStateLocationPlugin, pushTo, removeFrom, resolvablesBuilder, resolvePolicies, services, servicesPlugin, silenceUncaughtInPromise, silentRejection, sortBy, sortfn, splitEqual, splitHash, splitOnDelim, splitQuery, stringify, tail, toJson, trace, trimHashVal, uniqR, unnest, unnestR, val, values } from '@uirouter/core/index';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { switchMap } from 'rxjs/operator/switchMap';
import { map as map$1 } from 'rxjs/operator/map';
import { concat } from 'rxjs/operator/concat';
import { UIRouterRx } from '@uirouter/rx/index';

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
    let /** @type {?} */ views = {}, /** @type {?} */ viewsObject = state.views || { "$default": pick(state, ["component", "bindings"]) };
    forEach(viewsObject, function (config, name) {
        name = name || "$default"; // Account for views: { "": { template... } }
        if (isFunction(config))
            config = { component: /** @type {?} */ (config) };
        if (Object.keys(config).length == 0)
            return;
        config.$type = "ng2";
        config.$context = state;
        config.$name = name;
        let /** @type {?} */ normalized = ViewService.normalizeUIViewTarget(config.$context, config.$name);
        config.$uiViewName = normalized.uiViewName;
        config.$uiViewContextAnchor = normalized.uiViewContextAnchor;
        views[name] = config;
    });
    return views;
}
let id$1 = 0;
class Ng2ViewConfig {
    /**
     * @param {?} path
     * @param {?} viewDecl
     */
    constructor(path, viewDecl) {
        this.path = path;
        this.viewDecl = viewDecl;
        this.$id = id$1++;
        this.loaded = true;
    }
    /**
     * @return {?}
     */
    load() {
        return services.$q.when(this);
    }
}

/** @module ng2 */ /** */
/**
 * Merge two injectors
 *
 * This class implements the Injector ng2 interface but delegates
 * to the Injectors provided in the constructor.
 */
class MergeInjector {
    /**
     * @param {...?} injectors
     */
    constructor(...injectors) {
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
    get(token, notFoundValue) {
        for (let /** @type {?} */ i = 0; i < this.injectors.length; i++) {
            let /** @type {?} */ val$$1 = this.injectors[i].get(token, MergeInjector.NOT_FOUND);
            if (val$$1 !== MergeInjector.NOT_FOUND)
                return val$$1;
        }
        if (arguments.length >= 2)
            return notFoundValue;
        // This will throw the DI Injector error
        this.injectors[0].get(token);
    }
}
MergeInjector.NOT_FOUND = {};

/** @ng2api @module directives */
/** */
/**
 * @hidden
 */
let id = 0;
/**
 * Given a component class, gets the inputs of styles:
 *
 * - \@Input('foo') _foo
 * - `inputs: ['foo']`
 *
 * \@internalapi
 */
const ng2ComponentInputs = (factory) => {
    return factory.inputs.map(input => ({ prop: input.propName, token: input.templateName }));
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
class UIView {
    /**
     * @param {?} router
     * @param {?} parent
     * @param {?} viewContainerRef
     */
    constructor(router, parent, viewContainerRef) {
        this.router = router;
        this.viewContainerRef = viewContainerRef;
        /**
         * Data about the this UIView
         */
        this.uiViewData = {};
        this.parent = parent;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set _name(val$$1) { this.name = val$$1; }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ router = this.router;
        const /** @type {?} */ parentFqn = this.parent.fqn;
        const /** @type {?} */ name = this.name || '$default';
        this.uiViewData = {
            $type: 'ng2',
            id: id++,
            name: name,
            fqn: parentFqn ? parentFqn + "." + name : name,
            creationContext: this.parent.context,
            configUpdated: this.viewConfigUpdated.bind(this),
            config: undefined
        };
        this.deregisterHook = router.transitionService.onBefore({}, trans => this.applyUiCanExitHook(trans));
        this.deregisterUIView = router.viewService.registerUIView(this.uiViewData);
    }
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
    applyUiCanExitHook(trans) {
        const /** @type {?} */ instance = this.componentRef && this.componentRef.instance;
        const /** @type {?} */ uiCanExitFn = instance && instance.uiCanExit;
        if (isFunction(uiCanExitFn)) {
            const /** @type {?} */ state = parse("uiViewData.config.viewDecl.$context.self")(this);
            if (trans.exiting().indexOf(state) !== -1) {
                trans.onStart({}, function () {
                    return uiCanExitFn.call(instance, trans);
                });
            }
        }
    }
    /**
     * @return {?}
     */
    disposeLast() {
        if (this.componentRef)
            this.componentRef.destroy();
        this.componentRef = null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.deregisterUIView)
            this.deregisterUIView();
        if (this.deregisterHook)
            this.deregisterHook();
        this.disposeLast();
    }
    /**
     * The view service is informing us of an updated ViewConfig
     * (usually because a transition activated some state and its views)
     * @param {?} config
     * @return {?}
     */
    viewConfigUpdated(config) {
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
        trace.traceUIViewConfigUpdated(this.uiViewData, config && config.viewDecl.$context);
        this.applyUpdatedConfig(config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    applyUpdatedConfig(config) {
        this.uiViewData.config = config;
        // Create the Injector for the routed component
        let /** @type {?} */ context = new ResolveContext(config.path);
        let /** @type {?} */ componentInjector = this.getComponentInjector(context);
        // Get the component class from the view declaration. TODO: allow promises?
        let /** @type {?} */ componentClass = config.viewDecl.component;
        // Create the component
        let /** @type {?} */ compFactoryResolver = componentInjector.get(ComponentFactoryResolver);
        let /** @type {?} */ compFactory = compFactoryResolver.resolveComponentFactory(componentClass);
        this.componentRef = this.componentTarget.createComponent(compFactory, undefined, componentInjector);
        // Wire resolves to @Input()s
        this.applyInputBindings(compFactory, this.componentRef, context, componentClass);
    }
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
    getComponentInjector(context) {
        // Map resolves to "useValue: providers"
        let /** @type {?} */ resolvables = context.getTokens().map(token => context.getResolvable(token)).filter(r => r.resolved);
        let /** @type {?} */ newProviders = resolvables.map(r => ({ provide: r.token, useValue: r.data }));
        let /** @type {?} */ parentInject = { context: this.uiViewData.config.viewDecl.$context, fqn: this.uiViewData.fqn };
        newProviders.push({ provide: UIView.PARENT_INJECT, useValue: parentInject });
        let /** @type {?} */ parentComponentInjector = this.viewContainerRef.injector;
        let /** @type {?} */ moduleInjector = context.getResolvable(NATIVE_INJECTOR_TOKEN).data;
        let /** @type {?} */ mergedParentInjector = new MergeInjector(moduleInjector, parentComponentInjector);
        return ReflectiveInjector.resolveAndCreate(newProviders, mergedParentInjector);
    }
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
    applyInputBindings(factory, ref, context, componentClass) {
        const /** @type {?} */ component = ref.instance;
        const /** @type {?} */ bindings = this.uiViewData.config.viewDecl['bindings'] || {};
        const /** @type {?} */ explicitBoundProps = Object.keys(bindings);
        // Returns the actual component property for a renamed an input renamed using `@Input('foo') _foo`.
        // return the `_foo` property
        const /** @type {?} */ renamedInputProp = (prop$$1) => {
            const /** @type {?} */ input = factory.inputs.find(i => i.templateName === prop$$1);
            return input && input.propName || prop$$1;
        };
        // Supply resolve data to component as specified in the state's `bindings: {}`
        const /** @type {?} */ explicitInputTuples = explicitBoundProps
            .reduce((acc, key) => acc.concat([{ prop: renamedInputProp(key), token: bindings[key] }]), []);
        // Supply resolve data to matching @Input('prop') or inputs: ['prop']
        const /** @type {?} */ implicitInputTuples = ng2ComponentInputs(factory)
            .filter(tuple => !inArray(explicitBoundProps, tuple.prop));
        const /** @type {?} */ addResolvable = (tuple) => ({
            prop: tuple.prop,
            resolvable: context.getResolvable(tuple.token),
        });
        explicitInputTuples.concat(implicitInputTuples)
            .map(addResolvable)
            .map(tuple => {
            if (tuple.resolvable && !tuple.resolvable.resolved && tuple.resolvable.policy && tuple.resolvable.policy.async === 'NOWAIT') {
                tuple.resolvable.promise.then(() => ref.instance[tuple.prop] = tuple.resolvable.data);
            }
            return tuple;
        })
            .filter(tuple => tuple.resolvable && tuple.resolvable.resolved)
            .forEach(tuple => { component[tuple.prop] = tuple.resolvable.data; });
        // Initiate change detection for the newly created component
        ref.changeDetectorRef.detectChanges();
    }
}
UIView.PARENT_INJECT = "UIView.PARENT_INJECT";
UIView.decorators = [
    { type: Component, args: [{
                selector: 'ui-view, [ui-view]',
                template: `
    <ng-template #componentTarget></ng-template>
    <ng-content *ngIf="!componentRef"></ng-content>
  `
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
UIView.ctorParameters = () => [
    { type: UIRouter, },
    { type: undefined, decorators: [{ type: Inject, args: [UIView.PARENT_INJECT,] },] },
    { type: ViewContainerRef, },
];
UIView.propDecorators = {
    'componentTarget': [{ type: ViewChild, args: ['componentTarget', { read: ViewContainerRef },] },],
    'name': [{ type: Input, args: ['name',] },],
    '_name': [{ type: Input, args: ['ui-view',] },],
};

/** @module ng2 */ /** */
/**
 * @param {?} uiRouter
 * @param {?} injector
 * @param {?=} module
 * @return {?}
 */
function applyModuleConfig(uiRouter, injector, module = {}) {
    if (isFunction(module.config)) {
        module.config(uiRouter, injector, module);
    }
    let /** @type {?} */ states = module.states || [];
    return states.map(state => uiRouter.stateRegistry.register(state));
}
/**
 * @param {?} uiRouter
 * @param {?} injector
 * @param {?} module
 * @return {?}
 */
function applyRootModuleConfig(uiRouter, injector, module) {
    isDefined(module.deferIntercept) && uiRouter.urlService.deferIntercept(module.deferIntercept);
    isDefined(module.otherwise) && uiRouter.urlService.rules.otherwise(module.otherwise);
}

/** @ng2api @module directives */
/** */
/**
 * \@internalapi
 * # blah blah blah
 */
class AnchorUISref {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    openInNewTab() {
        return this._el.nativeElement.target === '_blank';
    }
    /**
     * @param {?} href
     * @return {?}
     */
    update(href) {
        if (href && href !== '') {
            this._renderer.setProperty(this._el.nativeElement, 'href', href);
        }
        else {
            this._renderer.removeAttribute(this._el.nativeElement, 'href');
        }
    }
}
AnchorUISref.decorators = [
    { type: Directive, args: [{ selector: 'a[uiSref]' },] },
];
/**
 * @nocollapse
 */
AnchorUISref.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
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
class UISref {
    /**
     * @param {?} _router
     * @param {?} _anchorUISref
     * @param {?} parent
     */
    constructor(_router, _anchorUISref, parent) {
        /**
         * An observable (ReplaySubject) of the state this UISref is targeting.
         * When the UISref is clicked, it will transition to this [[TargetState]].
         */
        this.targetState$ = new ReplaySubject(1);
        /**
         * \@internalapi
         */
        this._emit = false;
        this._router = _router;
        this._anchorUISref = _anchorUISref;
        this.parent = parent;
        this._statesSub = _router.globals.states$.subscribe(() => this.update());
    }
    /**
     * \@internalapi
     * @param {?} val
     * @return {?}
     */
    set "uiSref"(val$$1) { this.state = val$$1; this.update(); }
    /**
     * \@internalapi
     * @param {?} val
     * @return {?}
     */
    set "uiParams"(val$$1) { this.params = val$$1; this.update(); }
    /**
     * \@internalapi
     * @param {?} val
     * @return {?}
     */
    set "uiOptions"(val$$1) { this.options = val$$1; this.update(); }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._emit = true;
        this.update();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._emit = false;
        this._statesSub.unsubscribe();
        this.targetState$.unsubscribe();
    }
    /**
     * @return {?}
     */
    update() {
        let /** @type {?} */ $state = this._router.stateService;
        if (this._emit) {
            let /** @type {?} */ newTarget = $state.target(this.state, this.params, this.getOptions());
            this.targetState$.next(newTarget);
        }
        if (this._anchorUISref) {
            let /** @type {?} */ href = $state.href(this.state, this.params, this.getOptions());
            this._anchorUISref.update(href);
        }
    }
    /**
     * @return {?}
     */
    getOptions() {
        let /** @type {?} */ defaultOpts = {
            relative: this.parent && this.parent.context && this.parent.context.name,
            inherit: true,
            source: "sref"
        };
        return extend(defaultOpts, this.options || {});
    }
    /**
     * When triggered by a (click) event, this function transitions to the UISref's target state
     * @return {?}
     */
    go() {
        if (this._anchorUISref && this._anchorUISref.openInNewTab()) {
            return;
        }
        this._router.stateService.go(this.state, this.params, this.getOptions());
        return false;
    }
}
UISref.decorators = [
    { type: Directive, args: [{
                selector: '[uiSref]',
                host: { '(click)': 'go()' }
            },] },
];
/**
 * @nocollapse
 */
UISref.ctorParameters = () => [
    { type: UIRouter, },
    { type: AnchorUISref, decorators: [{ type: Optional },] },
    { type: undefined, decorators: [{ type: Inject, args: [UIView.PARENT_INJECT,] },] },
];
UISref.propDecorators = {
    'state': [{ type: Input, args: ['uiSref',] },],
    'params': [{ type: Input, args: ['uiParams',] },],
    'options': [{ type: Input, args: ['uiOptions',] },],
};

/** @ng2api @module directives */
/** */
/**
 * \@internalapi
 */
const inactiveStatus = {
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
const pathMatches = (target) => {
    if (!target.exists())
        return () => false;
    let state = target.$state();
    let targetParamVals = target.params();
    let targetPath = PathUtils.buildPath(target);
    let paramSchema = targetPath.map(node => node.paramSchema)
        .reduce(unnestR, [])
        .filter((param) => targetParamVals.hasOwnProperty(param.id));
    return (path) => {
        let tailNode = tail(path);
        if (!tailNode || tailNode.state !== state)
            return false;
        let paramValues = PathUtils.paramValues(path);
        return Param.equals(paramSchema, paramValues, targetParamVals);
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
    return appendPath.map(node => basePath.concat(PathUtils.subPath(appendPath, n => n.state === node.state)));
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
    const /** @type {?} */ pathMatchesTarget = pathMatches(srefTarget);
    const /** @type {?} */ tc = event.trans.treeChanges();
    let /** @type {?} */ isStartEvent = event.evt === 'start';
    let /** @type {?} */ isSuccessEvent = event.evt === 'success';
    let /** @type {?} */ activePath = isSuccessEvent ? tc.to : tc.from;
    const /** @type {?} */ isActive = () => spreadToSubPaths([], activePath)
        .map(pathMatchesTarget)
        .reduce(anyTrueR, false);
    const /** @type {?} */ isExact = () => pathMatchesTarget(activePath);
    const /** @type {?} */ isEntering = () => spreadToSubPaths(tc.retained, tc.entering)
        .map(pathMatchesTarget)
        .reduce(anyTrueR, false);
    const /** @type {?} */ isExiting = () => spreadToSubPaths(tc.retained, tc.exiting)
        .map(pathMatchesTarget)
        .reduce(anyTrueR, false);
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
class UISrefStatus {
    /**
     * @param {?} _globals
     */
    constructor(_globals) {
        /**
         * current statuses of the state/params the uiSref directive is linking to
         */
        this.uiSrefStatus = new EventEmitter(false);
        this._globals = _globals;
        this.status = Object.assign({}, inactiveStatus);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Map each transition start event to a stream of:
        // start -> (success|error)
        let /** @type {?} */ transEvents$ = switchMap.call(this._globals.start$, (trans) => {
            const /** @type {?} */ event = (evt) => (({ evt, trans }));
            let /** @type {?} */ transStart$ = of(event("start"));
            let /** @type {?} */ transResult = trans.promise.then(() => event("success"), () => event("error"));
            let /** @type {?} */ transFinish$ = fromPromise(transResult);
            return concat.call(transStart$, transFinish$);
        });
        // Watch the @ContentChildren UISref[] components and get their target states
        // let srefs$: Observable<UISref[]> = of(this.srefs.toArray()).concat(this.srefs.changes);
        this._srefs$ = new BehaviorSubject(this.srefs.toArray());
        this._srefChangesSub = this.srefs.changes.subscribe(srefs => this._srefs$.next(srefs));
        let /** @type {?} */ targetStates$ = switchMap.call(this._srefs$, (srefs) => combineLatest(srefs.map(sref => sref.targetState$)));
        // Calculate the status of each UISref based on the transition event.
        // Reduce the statuses (if multiple) by or-ing each flag.
        this._subscription = switchMap.call(transEvents$, (evt) => {
            return map$1.call(targetStates$, (targets) => {
                let /** @type {?} */ statuses = targets.map(target => getSrefStatus(evt, target));
                return statuses.reduce(mergeSrefStatus);
            });
        }).subscribe(this._setStatus.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._subscription)
            this._subscription.unsubscribe();
        if (this._srefChangesSub)
            this._srefChangesSub.unsubscribe();
        if (this._srefs$)
            this._srefs$.unsubscribe();
        this._subscription = this._srefChangesSub = this._srefs$ = undefined;
    }
    /**
     * @param {?} status
     * @return {?}
     */
    _setStatus(status) {
        this.status = status;
        this.uiSrefStatus.emit(status);
    }
}
UISrefStatus.decorators = [
    { type: Directive, args: [{ selector: '[uiSrefStatus],[uiSrefActive],[uiSrefActiveEq]' },] },
];
/**
 * @nocollapse
 */
UISrefStatus.ctorParameters = () => [
    { type: UIRouterGlobals, },
];
UISrefStatus.propDecorators = {
    'uiSrefStatus': [{ type: Output, args: ["uiSrefStatus",] },],
    'srefs': [{ type: ContentChildren, args: [UISref, { descendants: true },] },],
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
class UISrefActive {
    /**
     * @param {?} uiSrefStatus
     * @param {?} rnd
     * @param {?} host
     */
    constructor(uiSrefStatus, rnd, host) {
        this._classes = [];
        this._classesEq = [];
        this._subscription = uiSrefStatus.uiSrefStatus.subscribe((next) => {
            this._classes.forEach(cls => rnd.setElementClass(host.nativeElement, cls, next.active));
            this._classesEq.forEach(cls => rnd.setElementClass(host.nativeElement, cls, next.exact));
        });
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set active(val$$1) { this._classes = val$$1.split("\s+"); }
    ;
    /**
     * @param {?} val
     * @return {?}
     */
    set activeEq(val$$1) { this._classesEq = val$$1.split("\s+"); }
    ;
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
UISrefActive.decorators = [
    { type: Directive, args: [{
                selector: '[uiSrefActive],[uiSrefActiveEq]'
            },] },
];
/**
 * @nocollapse
 */
UISrefActive.ctorParameters = () => [
    { type: UISrefStatus, },
    { type: Renderer, },
    { type: ElementRef, decorators: [{ type: Host },] },
];
UISrefActive.propDecorators = {
    'active': [{ type: Input, args: ['uiSrefActive',] },],
    'activeEq': [{ type: Input, args: ['uiSrefActiveEq',] },],
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
const _UIROUTER_DIRECTIVES = [UISref, AnchorUISref, UIView, UISrefActive, UISrefStatus];
/**
 * References to the UI-Router directive classes, for use within a \@Component's `directives:` property
 * @deprecated use [[UIRouterModule]]
 * \@internalapi
 */
const UIROUTER_DIRECTIVES = _UIROUTER_DIRECTIVES;

/** @ng2api @module core */
/** */
/**
 * @hidden
 */
const UIROUTER_ROOT_MODULE = new OpaqueToken("UIRouter Root Module");
/**
 * @hidden
 */
const UIROUTER_MODULE_TOKEN = new OpaqueToken("UIRouter Module");
/**
 * @hidden
 */
const UIROUTER_STATES = new OpaqueToken("UIRouter States");
/**
 * @param {?} transitionService
 * @param {?} plateformId
 * @return {?}
 */
function onTransitionReady(transitionService, plateformId) {
    if (isPlatformServer(plateformId)) {
        return () => Promise.resolve();
    }
    return () => new Promise(resolve => {
        let /** @type {?} */ eventHooks = [];
        ['onSuccess', 'onError'].map(hook => {
            const /** @type {?} */ unsubscriberEventHook = transitionService[hook]({}, (transition) => {
                eventHooks.map(unsubscriber => unsubscriber());
                resolve();
            });
            eventHooks.push(unsubscriberEventHook);
        });
    });
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
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
        { provide: APP_INITIALIZER, useFactory: onTransitionReady, deps: [TransitionService, PLATFORM_ID], multi: true },
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
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true },
    ];
}
/**
 * @param {?} useHash
 * @return {?}
 */
function locationStrategy(useHash) {
    return { provide: LocationStrategy, useClass: useHash ? HashLocationStrategy : PathLocationStrategy };
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
class UIRouterModule {
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
    static forRoot(config = {}) {
        return {
            ngModule: UIRouterModule,
            providers: [
                _UIROUTER_INSTANCE_PROVIDERS,
                _UIROUTER_SERVICE_PROVIDERS,
                locationStrategy(config.useHash),
                ...makeRootProviders(config),
            ]
        };
    }
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
    static forChild(module = {}) {
        return {
            ngModule: UIRouterModule,
            providers: makeChildProviders(module),
        };
    }
}
UIRouterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [_UIROUTER_DIRECTIVES],
                exports: [_UIROUTER_DIRECTIVES],
                entryComponents: [UIView],
            },] },
];
/**
 * @nocollapse
 */
UIRouterModule.ctorParameters = () => [];

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
    return (transition) => {
        const /** @type {?} */ ng2Injector = transition.injector().get(NATIVE_INJECTOR_TOKEN);
        const /** @type {?} */ createModule = (factory) => factory.create(ng2Injector);
        const /** @type {?} */ applyModule = (moduleRef) => applyNgModule(transition, moduleRef);
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
    if (isString(moduleToLoad)) {
        return ng2Injector.get(NgModuleFactoryLoader).load(moduleToLoad);
    }
    const /** @type {?} */ compiler = ng2Injector.get(Compiler);
    const /** @type {?} */ offlineMode = compiler instanceof Compiler;
    const /** @type {?} */ unwrapEsModuleDefault = x => x && x.__esModule && x['default'] ? x['default'] : x;
    const /** @type {?} */ compileAsync = (moduleType) => compiler.compileModuleAsync(moduleType);
    const /** @type {?} */ loadChildrenPromise = Promise.resolve(moduleToLoad()).then(unwrapEsModuleDefault);
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
    let /** @type {?} */ injector = ng2Module.injector;
    let /** @type {?} */ parentInjector = (ng2Module.injector['parent']) || ng2Module.injector['_parent'];
    let /** @type {?} */ uiRouter = injector.get(UIRouter);
    let /** @type {?} */ registry = uiRouter.stateRegistry;
    let /** @type {?} */ originalName = transition.to().name;
    let /** @type {?} */ originalState = registry.get(originalName);
    // Check if it's a future state (ends with .**)
    let /** @type {?} */ isFuture = /^(.*)\.\*\*$/.exec(originalName);
    // Final name (without the .**)
    let /** @type {?} */ replacementName = isFuture && isFuture[1];
    let /** @type {?} */ newRootModules = (multiProviderParentChildDelta(parentInjector, injector, UIROUTER_ROOT_MODULE)
        .reduce(uniqR, []));
    let /** @type {?} */ newChildModules = (multiProviderParentChildDelta(parentInjector, injector, UIROUTER_MODULE_TOKEN)
        .reduce(uniqR, []));
    if (newRootModules.length) {
        console.log(newRootModules);
        throw new Error('Lazy loaded modules should not contain a UIRouterModule.forRoot() module');
    }
    let /** @type {?} */ newStateObjects = newChildModules
        .map(module => applyModuleConfig(uiRouter, injector, module))
        .reduce(unnestR, [])
        .reduce(uniqR, []);
    let /** @type {?} */ replacementState = registry.get(replacementName);
    if (!replacementState || replacementState === originalState) {
        throw new Error(`The Future State named '${originalName}' lazy loaded an NgModule. ` +
            `The lazy loaded NgModule must have a state named '${replacementName}' ` +
            `which replaces the (placeholder) '${originalName}' Future State. ` +
            `Add a '${replacementName}' state to the lazy loaded NgModule ` +
            `using UIRouterModule.forChild({ states: CHILD_STATES }).`);
    }
    // Supply the newly loaded states with the Injector from the lazy loaded NgModule.
    // If a tree of states is lazy loaded, only add the injector to the root of the lazy loaded tree.
    // The children will get the injector by resolve inheritance.
    let /** @type {?} */ newParentStates = newStateObjects.filter(state => !inArray(newStateObjects, state.parent));
    // Add the Injector to the top of the lazy loaded state tree as a resolve
    newParentStates.forEach(state => state.resolvables.push(Resolvable.fromData(NATIVE_INJECTOR_TOKEN, injector)));
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
    let /** @type {?} */ childVals = child.get(token, []);
    let /** @type {?} */ parentVals = parent.get(token, []);
    return childVals.filter(val$$1 => parentVals.indexOf(val$$1) === -1);
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
    let /** @type {?} */ loadNgModuleFn = state['loadChildren'];
    return loadNgModuleFn ? loadNgModule(loadNgModuleFn) : state.lazyLoad;
}

/** @module ng2 */
/** */
/**
 * A `LocationServices` that delegates to the Angular LocationStrategy
 */
class Ng2LocationServices extends BaseLocationServices {
    /**
     * @param {?} router
     * @param {?} _locationStrategy
     * @param {?} isBrowser
     */
    constructor(router, _locationStrategy, isBrowser) {
        super(router, isBrowser);
        this._locationStrategy = _locationStrategy;
        this._locationStrategy.onPopState((evt) => {
            if (evt.type !== 'hashchange') {
                this._listener(evt);
            }
        });
    }
    /**
     * @return {?}
     */
    _get() {
        return this._locationStrategy.path(true)
            .replace(this._locationStrategy.getBaseHref().replace(/\/$/, ''), '');
    }
    /**
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} replace
     * @return {?}
     */
    _set(state, title, url, replace) {
        let { path, search, hash } = parseUrl(url);
        let /** @type {?} */ urlWithHash = path + (hash ? "#" + hash : "");
        if (replace) {
            this._locationStrategy.replaceState(state, title, urlWithHash, search);
        }
        else {
            this._locationStrategy.pushState(state, title, urlWithHash, search);
        }
    }
    /**
     * @param {?} router
     * @return {?}
     */
    dispose(router) {
        super.dispose(router);
    }
}

/** @module ng2 */
/** */
class Ng2LocationConfig extends BrowserLocationConfig {
    /**
     * @param {?} router
     * @param {?} _locationStrategy
     */
    constructor(router, _locationStrategy) {
        super(router, is(PathLocationStrategy)(_locationStrategy));
        this._locationStrategy = _locationStrategy;
    }
    /**
     * @param {?=} href
     * @return {?}
     */
    baseHref(href) {
        return this._locationStrategy.getBaseHref();
    }
}

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
    let /** @type {?} */ router = new UIRouter();
    // Add RxJS plugin
    router.plugin(UIRouterRx);
    // Add $q-like and $injector-like service APIs
    router.plugin(servicesPlugin);
    // ----------------- Monkey Patches ----------------
    // Monkey patch the services.$injector to use the root ng2 Injector
    services.$injector.get = injector.get.bind(injector);
    // ----------------- Configure for ng2 -------------
    router.locationService = new Ng2LocationServices(router, locationStrategy$$1, isPlatformBrowser(injector.get(PLATFORM_ID)));
    router.locationConfig = new Ng2LocationConfig(router, locationStrategy$$1);
    // Apply ng2 ui-view handling code
    let /** @type {?} */ viewConfigFactory = (path, config) => new Ng2ViewConfig(path, config);
    router.viewService._pluginapi._viewConfigFactory("ng2", viewConfigFactory);
    // Apply statebuilder decorator for ng2 NgModule registration
    let /** @type {?} */ registry = router.stateRegistry;
    registry.decorator('views', ng2ViewsBuilder);
    registry.decorator('lazyLoad', ng2LazyLoadBuilder);
    // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
    let /** @type {?} */ ng2InjectorResolvable = Resolvable.fromData(NATIVE_INJECTOR_TOKEN, injector);
    registry.root().resolvables.push(ng2InjectorResolvable);
    // Auto-flush the parameter type queue
    router.urlMatcherFactory.$get();
    // ----------------- Initialize router -------------
    rootModules.forEach(moduleConfig => applyRootModuleConfig(router, injector, moduleConfig));
    modules.forEach(moduleConfig => applyModuleConfig(router, injector, moduleConfig));
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
const _UIROUTER_INSTANCE_PROVIDERS = [
    { provide: UIRouter, useFactory: uiRouterFactory, deps: [LocationStrategy, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN, Injector] },
    { provide: UIView.PARENT_INJECT, useFactory: parentUIViewInjectFactory, deps: [StateRegistry] },
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
const _UIROUTER_SERVICE_PROVIDERS = [
    { provide: StateService, useFactory: fnStateService, deps: [UIRouter] },
    { provide: TransitionService, useFactory: fnTransitionService, deps: [UIRouter] },
    { provide: UrlMatcherFactory, useFactory: fnUrlMatcherFactory, deps: [UIRouter] },
    { provide: UrlRouter, useFactory: fnUrlRouter, deps: [UIRouter] },
    { provide: UrlService, useFactory: fnUrlService, deps: [UIRouter] },
    { provide: ViewService, useFactory: fnViewService, deps: [UIRouter] },
    { provide: StateRegistry, useFactory: fnStateRegistry, deps: [UIRouter] },
    { provide: UIRouterGlobals, useFactory: fnGlobals, deps: [UIRouter] },
];
/**
 * The UI-Router providers, for use in your application bootstrap
 *
 * @deprecated use [[UIRouterModule.forRoot]]
 */
const UIROUTER_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS.concat(_UIROUTER_SERVICE_PROVIDERS);

/** @ng2api @module ng2 */ /** for typedoc */

/**
 * Generated bundle index. Do not edit.
 */

export { uiRouterFactory, parentUIViewInjectFactory, _UIROUTER_INSTANCE_PROVIDERS, fnStateService, fnTransitionService, fnUrlMatcherFactory, fnUrlRouter, fnUrlService, fnViewService, fnStateRegistry, fnGlobals, _UIROUTER_SERVICE_PROVIDERS, UIROUTER_PROVIDERS, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN, UIROUTER_STATES, onTransitionReady, makeRootProviders, makeChildProviders, locationStrategy, UIRouterModule, applyModuleConfig, applyRootModuleConfig, _UIROUTER_DIRECTIVES, UIROUTER_DIRECTIVES, UIView, AnchorUISref, UISref, UISrefStatus, UISrefActive, ng2ViewsBuilder, Ng2ViewConfig, ng2LazyLoadBuilder, loadNgModule, loadModuleFactory, applyNgModule, multiProviderParentChildDelta, fromJson, toJson, copy, forEach, extend, equals, identity, noop, Mapper, TypedMap, Predicate, IInjectable, Obj, createProxyFunctions, inherit, inArray, _inArray, removeFrom, _removeFrom, pushTo, _pushTo, deregAll, defaults, mergeR, ancestors, pick, omit, pluck, filter, find, mapObj, map, values, allTrueR, anyTrueR, unnestR, flattenR, pushR, uniqR, unnest, flatten, assertPredicate, assertMap, assertFn, pairs, arrayTuples, applyPairs, tail, _extend, sortfn, sortBy, composeSort, silenceUncaughtInPromise, silentRejection, notImplemented, $QLikeDeferred, $QLike, $InjectorLike, CoreServices, LocationServices, LocationConfig, services, Glob, curry, compose, pipe, prop, propEq, parse, not, and, or, all, any, is, eq, val, invoke, pattern, isUndefined, isDefined, isNull, isNullOrUndefined, isFunction, isNumber, isString, isObject, isArray, isDate, isRegExp, isState, isInjectable, isPromise, Queue, maxLength, padString, kebobString, functionToString, fnToString, stringify, beforeAfterSubstr, splitOnDelim, joinNeighborsR, Category, Trace, trace, RawParams, ParamsOrArray, ParamDeclaration, Replace, ParamTypeDefinition, DefType, Param, ParamTypes, StateParams, ParamType, PathNode, GetParamsFn, PathUtils, ProviderLike, ResolvableLiteral, ResolvePolicy, PolicyWhen, PolicyAsync, resolvePolicies, defaultResolvePolicy, Resolvable, NATIVE_INJECTOR_TOKEN, ResolveContext, StateOrName, TransitionPromise, TargetStateDef, ResolveTypes, _ViewDeclaration, RedirectToResult, StateDeclaration, LazyLoadResult, HrefOptions, _StateDeclaration, BuilderFunction, resolvablesBuilder, StateBuilder, StateObject, StateMatcher, StateQueueManager, StateRegistryListener, StateRegistry, OnInvalidCallback, StateService, TargetState, TransitionOptions, TransitionHookOptions, TreeChanges, IHookRegistration, TransitionHookFn, TransitionStateHookFn, TransitionCreateHookFn, HookFn, HookResult, HookRegOptions, IHookRegistry, IStateMatch, HookMatchCriteria, IMatchingNodes, RegisteredHooks, PathTypes, PathType, HookMatchCriterion, TransitionHookPhase, TransitionHookScope, HookBuilder, matchState, RegisteredHook, makeEvent, RejectType, Rejection, Transition, GetResultHandler, GetErrorHandler, ResultHandler, ErrorHandler, TransitionHook, TransitionEventType, defaultTransOpts, TransitionServicePluginAPI, TransitionService, ParamFactory, UrlConfigApi, UrlMatcherConfig, UrlSyncApi, UrlRulesApi, UrlParts, MatchResult, UrlRuleMatchFn, UrlRuleHandlerFn, UrlRuleType, UrlRule, MatcherUrlRule, StateRule, RegExpRule, UrlMatcher, UrlMatcherFactory, UrlRouter, UrlRuleFactory, BaseUrlRule, UrlService, ViewContext, ActiveUIView, ViewConfig, ViewConfigFactory, ViewServicePluginAPI, ViewService, UIRouterGlobals, UIRouter, PluginFactory, LocationPlugin, ServicesPlugin, LocationLike, HistoryLike, $q, $injector, BaseLocationServices, HashLocationService, MemoryLocationService, PushStateLocationService, MemoryLocationConfig, BrowserLocationConfig, splitHash, splitQuery, splitEqual, trimHashVal, keyValsToObjectR, getParams, parseUrl, buildUrl, locationPluginFactory, servicesPlugin, hashLocationPlugin, pushStateLocationPlugin, memoryLocationPlugin, UIInjector, UIRouterPlugin, UIRouterPluginBase, Disposable };
//# sourceMappingURL=angular.js.map
