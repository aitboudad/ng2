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

/**
 * Higher order functions
 *
 * These utility functions are exported, but are subject to change without notice.
 *
 * @module common_hof
 */ /** */
/**
 * Returns a new function for [Partial Application](https://en.wikipedia.org/wiki/Partial_application) of the original function.
 *
 * Given a function with N parameters, returns a new function that supports partial application.
 * The new function accepts anywhere from 1 to N parameters.  When that function is called with M parameters,
 * where M is less than N, it returns a new function that accepts the remaining parameters.  It continues to
 * accept more parameters until all N parameters have been supplied.
 *
 *
 * This contrived example uses a partially applied function as an predicate, which returns true
 * if an object is found in both arrays.
 * \@example
 * ```
 * // returns true if an object is in both of the two arrays
 * function inBoth(array1, array2, object) {
 *   return array1.indexOf(object) !== -1 &&
 *          array2.indexOf(object) !== 1;
 * }
 * let obj1, obj2, obj3, obj4, obj5, obj6, obj7
 * let foos = [obj1, obj3]
 * let bars = [obj3, obj4, obj5]
 *
 * // A curried "copy" of inBoth
 * let curriedInBoth = curry(inBoth);
 * // Partially apply both the array1 and array2
 * let inFoosAndBars = curriedInBoth(foos, bars);
 *
 * // Supply the final argument; since all arguments are
 * // supplied, the original inBoth function is then called.
 * let obj1InBoth = inFoosAndBars(obj1); // false
 *
 * // Use the inFoosAndBars as a predicate.
 * // Filter, on each iteration, supplies the final argument
 * let allObjs = [ obj1, obj2, obj3, obj4, obj5, obj6, obj7 ];
 * let foundInBoth = allObjs.filter(inFoosAndBars); // [ obj3 ]
 *
 * ```
 *
 * Stolen from: http://stackoverflow.com/questions/4394747/javascript-curry-function
 *
 * @param {?} fn
 * @return {?}
 */
function curry$1(fn) {
    let /** @type {?} */ initial_args = [].slice.apply(arguments, [1]);
    let /** @type {?} */ func_args_length = fn.length;
    /**
     * @param {?} args
     * @return {?}
     */
    function curried(args) {
        if (args.length >= func_args_length)
            return fn.apply(null, args);
        return function () {
            return curried(args.concat([].slice.apply(arguments)));
        };
    }
    return curried(initial_args);
}
/**
 * Given a varargs list of functions, returns a function that composes the argument functions, right-to-left
 * given: f(x), g(x), h(x)
 * let composed = compose(f,g,h)
 * then, composed is: f(g(h(x)))
 * @return {?}
 */
function compose$1() {
    let /** @type {?} */ args = arguments;
    let /** @type {?} */ start = args.length - 1;
    return function () {
        let /** @type {?} */ i = start, /** @type {?} */ result = args[start].apply(this, arguments);
        while (i--)
            result = args[i].call(this, result);
        return result;
    };
}
/**
 * Given a varargs list of functions, returns a function that is composes the argument functions, left-to-right
 * given: f(x), g(x), h(x)
 * let piped = pipe(f,g,h);
 * then, piped is: h(g(f(x)))
 * @param {...?} funcs
 * @return {?}
 */
function pipe$1(...funcs) {
    return compose$1.apply(null, [].slice.call(arguments).reverse());
}
/**
 * Given a property name, returns a function that returns that property from an object
 * let obj = { foo: 1, name: "blarg" };
 * let getName = prop("name");
 * getName(obj) === "blarg"
 */
const prop$1 = (name) => (obj) => obj && obj[name];
/**
 * Given a property name and a value, returns a function that returns a boolean based on whether
 * the passed object has a property that matches the value
 * let obj = { foo: 1, name: "blarg" };
 * let getName = propEq("name", "blarg");
 * getName(obj) === true
 */
const propEq$1 = curry$1((name, val$$1, obj) => obj && obj[name] === val$$1);
/**
 * Given a dotted property name, returns a function that returns a nested property from an object, or undefined
 * let obj = { id: 1, nestedObj: { foo: 1, name: "blarg" }, };
 * let getName = prop("nestedObj.name");
 * getName(obj) === "blarg"
 * let propNotFound = prop("this.property.doesnt.exist");
 * propNotFound(obj) === undefined
 */
const parse$1 = (name) => pipe$1.apply(null, name.split(".").map(prop$1));
/**
 * Given a function that returns a truthy or falsey value, returns a
 * function that returns the opposite (falsey or truthy) value given the same inputs
 */
const not$1 = (fn) => (...args) => !fn.apply(null, args);
/**
 * Given two functions that return truthy or falsey values, returns a function that returns truthy
 * if both functions return truthy for the given arguments
 * @param {?} fn1
 * @param {?} fn2
 * @return {?}
 */
function and$1(fn1, fn2) {
    return (...args) => fn1.apply(null, args) && fn2.apply(null, args);
}
/**
 * Given two functions that return truthy or falsey values, returns a function that returns truthy
 * if at least one of the functions returns truthy for the given arguments
 * @param {?} fn1
 * @param {?} fn2
 * @return {?}
 */
function or$1(fn1, fn2) {
    return (...args) => fn1.apply(null, args) || fn2.apply(null, args);
}
/**
 * Check if all the elements of an array match a predicate function
 *
 * @param fn1 a predicate function `fn1`
 * @return a function which takes an array and returns true if `fn1` is true for all elements of the array
 */
const all$1 = (fn1) => (arr) => arr.reduce((b, x) => b && !!fn1(x), true);
const any$1 = (fn1) => (arr) => (arr.reduce((b, x) => b || !!fn1(x), false));
/**
 * Given a class, returns a Predicate function that returns true if the object is of that class
 */
const is$1 = (ctor) => (obj) => (obj != null && obj.constructor === ctor || obj instanceof ctor);
/**
 * Given a value, returns a Predicate function that returns true if another value is === equal to the original value
 */

/**
 * Given a value, returns a function which returns the value
 */
const val$1 = (v) => () => v;
/**
 * @param {?} fnName
 * @param {?=} args
 * @return {?}
 */
function invoke$1(fnName, args) {
    return (obj) => obj[fnName].apply(obj, args);
}
/**
 * Sorta like Pattern Matching (a functional programming conditional construct)
 *
 * See http://c2.com/cgi/wiki?PatternMatching
 *
 * This is a conditional construct which allows a series of predicates and output functions
 * to be checked and then applied.  Each predicate receives the input.  If the predicate
 * returns truthy, then its matching output function (mapping function) is provided with
 * the input and, then the result is returned.
 *
 * Each combination (2-tuple) of predicate + output function should be placed in an array
 * of size 2: [ predicate, mapFn ]
 *
 * These 2-tuples should be put in an outer array.
 *
 * \@example
 * ```
 *
 * // Here's a 2-tuple where the first element is the isString predicate
 * // and the second element is a function that returns a description of the input
 * let firstTuple = [ angular.isString, (input) => `Heres your string ${input}` ];
 *
 * // Second tuple: predicate "isNumber", mapfn returns a description
 * let secondTuple = [ angular.isNumber, (input) => `(${input}) That's a number!` ];
 *
 * let third = [ (input) => input === null,  (input) => `Oh, null...` ];
 *
 * let fourth = [ (input) => input === undefined,  (input) => `notdefined` ];
 *
 * let descriptionOf = pattern([ firstTuple, secondTuple, third, fourth ]);
 *
 * console.log(descriptionOf(undefined)); // 'notdefined'
 * console.log(descriptionOf(55)); // '(55) That's a number!'
 * console.log(descriptionOf("foo")); // 'Here's your string foo'
 * ```
 *
 * @param {?} struct A 2D array.  Each element of the array should be an array, a 2-tuple,
 * with a Predicate and a mapping/output function
 * @return {?}
 */
function pattern$1(struct) {
    return function (x) {
        for (var /** @type {?} */ i = 0; i < struct.length; i++) {
            if (struct[i][0](x))
                return struct[i][1](x);
        }
    };
}

/**
 * Matches state names using glob-like pattern strings.
 *
 * Globs can be used in specific APIs including:
 *
 * - [[StateService.is]]
 * - [[StateService.includes]]
 * - The first argument to Hook Registration functions like [[TransitionService.onStart]]
 *    - [[HookMatchCriteria]] and [[HookMatchCriterion]]
 *
 * A `Glob` string is a pattern which matches state names.
 * Nested state names are split into segments (separated by a dot) when processing.
 * The state named `foo.bar.baz` is split into three segments ['foo', 'bar', 'baz']
 *
 * Globs work according to the following rules:
 *
 * ### Exact match:
 *
 * The glob `'A.B'` matches the state named exactly `'A.B'`.
 *
 * | Glob        |Matches states named|Does not match state named|
 * |:------------|:--------------------|:---------------------|
 * | `'A'`       | `'A'`               | `'B'` , `'A.C'`      |
 * | `'A.B'`     | `'A.B'`             | `'A'` , `'A.B.C'`    |
 * | `'foo'`     | `'foo'`             | `'FOO'` , `'foo.bar'`|
 *
 * ### Single star (`*`)
 *
 * A single star (`*`) is a wildcard that matches exactly one segment.
 *
 * | Glob        |Matches states named  |Does not match state named |
 * |:------------|:---------------------|:--------------------------|
 * | `'*'`       | `'A'` , `'Z'`        | `'A.B'` , `'Z.Y.X'`       |
 * | `'A.*'`     | `'A.B'` , `'A.C'`    | `'A'` , `'A.B.C'`         |
 * | `'A.*.*'`   | `'A.B.C'` , `'A.X.Y'`| `'A'`, `'A.B'` , `'Z.Y.X'`|
 *
 * ### Double star (`**`)
 *
 * A double star (`'**'`) is a wildcard that matches *zero or more segments*
 *
 * | Glob        |Matches states named                           |Does not match state named         |
 * |:------------|:----------------------------------------------|:----------------------------------|
 * | `'**'`      | `'A'` , `'A.B'`, `'Z.Y.X'`                    | (matches all states)              |
 * | `'A.**'`    | `'A'` , `'A.B'` , `'A.C.X'`                   | `'Z.Y.X'`                         |
 * | `'**.X'`    | `'X'` , `'A.X'` , `'Z.Y.X'`                   | `'A'` , `'A.login.Z'`             |
 * | `'A.**.X'`  | `'A.X'` , `'A.B.X'` , `'A.B.C.X'`             | `'A'` , `'A.B.C'`                 |
 *
 */
class Glob$1 {
    /**
     * @param {?} text
     */
    constructor(text) {
        this.text = text;
        this.glob = text.split('.');
        let regexpString = this.text.split('.')
            .map(seg => {
            if (seg === '**')
                return '(?:|(?:\\.[^.]*)*)';
            if (seg === '*')
                return '\\.[^.]*';
            return '\\.' + seg;
        }).join('');
        this.regexp = new RegExp("^" + regexpString + "$");
    }
    /**
     * @param {?} name
     * @return {?}
     */
    matches(name) {
        return this.regexp.test('.' + name);
    }
    /**
     * Returns true if the string has glob-like characters in it
     * @param {?} text
     * @return {?}
     */
    static is(text) {
        return !!/[!,*]+/.exec(text);
    }
    /**
     * Returns a glob from the string, or null if the string isn't Glob-like
     * @param {?} text
     * @return {?}
     */
    static fromString(text) {
        return Glob$1.is(text) ? new Glob$1(text) : null;
    }
}

/**
 * @coreapi
 * @module state
 */
/** for typedoc */
/**
 * Internal representation of a UI-Router state.
 *
 * Instances of this class are created when a [[StateDeclaration]] is registered with the [[StateRegistry]].
 *
 * A registered [[StateDeclaration]] is augmented with a getter ([[StateDeclaration.$$state]]) which returns the corresponding [[StateObject]] object.
 *
 * This class prototypally inherits from the corresponding [[StateDeclaration]].
 * Each of its own properties (i.e., `hasOwnProperty`) are built using builders from the [[StateBuilder]].
 */
class StateObject$1 {
    /**
     * @deprecated use State.create()
     * @param {?=} config
     */
    constructor(config) {
        return StateObject$1.create(config || {});
    }
    /**
     * Create a state object to put the private/internal implementation details onto.
     * The object's prototype chain looks like:
     * (Internal State Object) -> (Copy of State.prototype) -> (State Declaration object) -> (State Declaration's prototype...)
     *
     * @param {?} stateDecl the user-supplied State Declaration
     * @return {?}
     */
    static create(stateDecl) {
        stateDecl = StateObject$1.isStateClass(stateDecl) ? new stateDecl() : stateDecl;
        let /** @type {?} */ state = (inherit$1(inherit$1(stateDecl, StateObject$1.prototype)));
        stateDecl.$$state = () => state;
        state.self = stateDecl;
        state.__stateObjectCache = {
            nameGlob: Glob$1.fromString(state.name) // might return null
        };
        return state;
    }
    /**
     * Returns true if the provided parameter is the same state.
     *
     * Compares the identity of the state against the passed value, which is either an object
     * reference to the actual `State` instance, the original definition object passed to
     * `$stateProvider.state()`, or the fully-qualified name.
     *
     * @param {?} ref Can be one of (a) a `State` instance, (b) an object that was passed
     *        into `$stateProvider.state()`, (c) the fully-qualified name of a state as a string.
     * @return {?} Returns `true` if `ref` matches the current `State` instance.
     */
    is(ref) {
        return this === ref || this.self === ref || this.fqn() === ref;
    }
    /**
     * @deprecated this does not properly handle dot notation
     * @return {?} Returns a dot-separated name of the state.
     */
    fqn() {
        if (!this.parent || !(this.parent instanceof this.constructor))
            return this.name;
        let /** @type {?} */ name = this.parent.fqn();
        return name ? name + "." + this.name : this.name;
    }
    /**
     * Returns the root node of this state's tree.
     *
     * @return {?} The root of this state's tree.
     */
    root() {
        return this.parent && this.parent.root() || this;
    }
    /**
     * Gets the state's `Param` objects
     *
     * Gets the list of [[Param]] objects owned by the state.
     * If `opts.inherit` is true, it also includes the ancestor states' [[Param]] objects.
     * If `opts.matchingKeys` exists, returns only `Param`s whose `id` is a key on the `matchingKeys` object
     *
     * @param {?=} opts options
     * @return {?}
     */
    parameters(opts) {
        opts = defaults$1(opts, { inherit: true, matchingKeys: null });
        let /** @type {?} */ inherited = opts.inherit && this.parent && this.parent.parameters() || [];
        return inherited.concat(values$1(this.params))
            .filter(param => !opts.matchingKeys || opts.matchingKeys.hasOwnProperty(param.id));
    }
    /**
     * Returns a single [[Param]] that is owned by the state
     *
     * If `opts.inherit` is true, it also searches the ancestor states` [[Param]]s.
     * @param {?} id the name of the [[Param]] to return
     * @param {?=} opts options
     * @return {?}
     */
    parameter(id, opts = {}) {
        return (this.url && this.url.parameter(id, opts) ||
            find$1(values$1(this.params), propEq$1('id', id)) ||
            opts.inherit && this.parent && this.parent.parameter(id));
    }
    /**
     * @return {?}
     */
    toString() {
        return this.fqn();
    }
}
/**
 * Predicate which returns true if the object is an class with \@State() decorator
 */
StateObject$1.isStateClass = (stateDecl) => isFunction$1(stateDecl) && stateDecl['__uiRouterState'] === true;
/**
 * Predicate which returns true if the object is an internal [[StateObject]] object
 */
StateObject$1.isState = (obj) => isObject$1(obj['__stateObjectCache']);

/** Predicates
 *
 * These predicates return true/false based on the input.
 * Although these functions are exported, they are subject to change without notice.
 *
 * @module common_predicates
 */
/** */
const toStr = Object.prototype.toString;
const tis = (t) => (x) => typeof (x) === t;
const isUndefined$1 = tis('undefined');
const isDefined$1 = not$1(isUndefined$1);
const isNull$1 = (o) => o === null;
const isNullOrUndefined$1 = or$1(isNull$1, isUndefined$1);
const isFunction$1 = (tis('function'));
const isNumber$1 = (tis('number'));
const isString$1 = (tis('string'));
const isObject$1 = (x) => x !== null && typeof x === 'object';
const isArray$1 = Array.isArray;
const isDate$1 = (((x) => toStr.call(x) === '[object Date]'));
const isRegExp$1 = (((x) => toStr.call(x) === '[object RegExp]'));
const isState$1 = StateObject$1.isState;
/**
 * Predicate which checks if a value is injectable
 *
 * A value is "injectable" if it is a function, or if it is an ng1 array-notation-style array
 * where all the elements in the array are Strings, except the last one, which is a Function
 * @param {?} val
 * @return {?}
 */
function isInjectable$1(val$$1) {
    if (isArray$1(val$$1) && val$$1.length) {
        let /** @type {?} */ head = val$$1.slice(0, -1), /** @type {?} */ tail$$1 = val$$1.slice(-1);
        return !(head.filter(not$1(isString$1)).length || tail$$1.filter(not$1(isFunction$1)).length);
    }
    return isFunction$1(val$$1);
}
/**
 * Predicate which checks if a value looks like a Promise
 *
 * It is probably a Promise if it's an object, and it has a `then` property which is a Function
 */
const isPromise$1 = and$1(isObject$1, pipe$1(prop$1('then'), isFunction$1));

/**
 * This module is a stub for core services such as Dependency Injection or Browser Location.
 * Core services may be implemented by a specific framework, such as ng1 or ng2, or be pure javascript.
 *
 * @module common
 */
/** for typedoc */
let notImplemented$1 = (fnname) => () => {
    throw new Error(`${fnname}(): No coreservices implementation for UI-Router is loaded.`);
};
let services$1 = {
    $q: undefined,
    $injector: undefined,
};

/**
 * Random utility functions used in the UI-Router code
 *
 * These functions are exported, but are subject to change without notice.
 *
 * @preferred
 * @module common
 */
/** for typedoc */
let w = typeof window === 'undefined' ? {} : window;
let angular = w.angular || {};
const fromJson$1 = angular.fromJson || JSON.parse.bind(JSON);
const toJson$1 = angular.toJson || JSON.stringify.bind(JSON);
const copy$1 = angular.copy || _copy;
const forEach$1 = angular.forEach || _forEach;
const extend$1 = Object.assign || _extend$1;
const equals$1 = angular.equals || _equals;
/**
 * @param {?} x
 * @return {?}
 */
function identity$1(x) { return x; }
/**
 * @return {?}
 */
function noop$1() { }
/**
 * Builds proxy functions on the `to` object which pass through to the `from` object.
 *
 * For each key in `fnNames`, creates a proxy function on the `to` object.
 * The proxy function calls the real function on the `from` object.
 *
 *
 * #### Example:
 * This example creates an new class instance whose functions are prebound to the new'd object.
 * ```js
 * class Foo {
 *   constructor(data) {
 *     // Binds all functions from Foo.prototype to 'this',
 *     // then copies them to 'this'
 *     bindFunctions(Foo.prototype, this, this);
 *     this.data = data;
 *   }
 *
 *   log() {
 *     console.log(this.data);
 *   }
 * }
 *
 * let myFoo = new Foo([1,2,3]);
 * var logit = myFoo.log;
 * logit(); // logs [1, 2, 3] from the myFoo 'this' instance
 * ```
 *
 * #### Example:
 * This example creates a bound version of a service function, and copies it to another object
 * ```
 *
 * var SomeService = {
 *   this.data = [3, 4, 5];
 *   this.log = function() {
 *     console.log(this.data);
 *   }
 * }
 *
 * // Constructor fn
 * function OtherThing() {
 *   // Binds all functions from SomeService to SomeService,
 *   // then copies them to 'this'
 *   bindFunctions(SomeService, this, SomeService);
 * }
 *
 * let myOtherThing = new OtherThing();
 * myOtherThing.log(); // logs [3, 4, 5] from SomeService's 'this'
 * ```
 *
 * @param {?} source A function that returns the source object which contains the original functions to be bound
 * @param {?} target A function that returns the target object which will receive the bound functions
 * @param {?} bind A function that returns the object which the functions will be bound to
 * @param {?=} fnNames The function names which will be bound (Defaults to all the functions found on the 'from' object)
 * @param {?=} latebind If true, the binding of the function is delayed until the first time it's invoked
 * @return {?}
 */
function createProxyFunctions$1(source, target, bind, fnNames, latebind = false) {
    const /** @type {?} */ bindFunction = (fnName) => source()[fnName].bind(bind());
    const /** @type {?} */ makeLateRebindFn = fnName => function lateRebindFunction() {
        target[fnName] = bindFunction(fnName);
        return target[fnName].apply(null, arguments);
    };
    fnNames = fnNames || Object.keys(source());
    return fnNames.reduce((acc, name) => {
        acc[name] = latebind ? makeLateRebindFn(name) : bindFunction(name);
        return acc;
    }, target);
}
/**
 * prototypal inheritance helper.
 * Creates a new object which has `parent` object as its prototype, and then copies the properties from `extra` onto it
 */
const inherit$1 = (parent, extra) => extend$1(Object.create(parent), extra);
/**
 * Given an array, returns true if the object is found in the array, (using indexOf)
 */
const inArray$1 = curry$1(_inArray$1);
/**
 * @param {?} array
 * @param {?=} obj
 * @return {?}
 */
function _inArray$1(array, obj) {
    return array.indexOf(obj) !== -1;
}
/**
 * Given an array, and an item, if the item is found in the array, it removes it (in-place).
 * The same array is returned
 */
const removeFrom$1 = curry$1(_removeFrom$1);
/**
 * @param {?} array
 * @param {?=} obj
 * @return {?}
 */
function _removeFrom$1(array, obj) {
    let /** @type {?} */ idx = array.indexOf(obj);
    if (idx >= 0)
        array.splice(idx, 1);
    return array;
}
/**
 * pushes a values to an array and returns the value
 */
const pushTo$1 = curry$1(_pushTo$1);
/**
 * @param {?} arr
 * @param {?=} val
 * @return {?}
 */
function _pushTo$1(arr, val$$1) {
    return (arr.push(val$$1), val$$1);
}
/**
 * Given an array of (deregistration) functions, calls all functions and removes each one from the source array
 */
const deregAll$1 = (functions) => functions.slice().forEach(fn => {
    typeof fn === 'function' && fn();
    removeFrom$1(functions, fn);
});
/**
 * Applies a set of defaults to an options object.  The options object is filtered
 * to only those properties of the objects in the defaultsList.
 * Earlier objects in the defaultsList take precedence when applying defaults.
 * @param {?} opts
 * @param {...?} defaultsList
 * @return {?}
 */
function defaults$1(opts, ...defaultsList) {
    let /** @type {?} */ _defaultsList = defaultsList.concat({}).reverse();
    let /** @type {?} */ defaultVals = extend$1.apply(null, _defaultsList);
    return extend$1({}, defaultVals, pick$1(opts || {}, Object.keys(defaultVals)));
}
/**
 * Reduce function that merges each element of the list into a single object, using extend
 */
const mergeR$1 = (memo, item) => extend$1(memo, item);
/**
 * Finds the common ancestor path between two states.
 *
 * @param {?} first
 * @param {?} second
 * @return {?}
 */
function ancestors$1(first, second) {
    let /** @type {?} */ path = [];
    for (let /** @type {?} */ n in first.path) {
        if (first.path[n] !== second.path[n])
            break;
        path.push(first.path[n]);
    }
    return path;
}
/**
 * Return a copy of the object only containing the whitelisted properties.
 *
 * #### Example:
 * ```
 * var foo = { a: 1, b: 2, c: 3 };
 * var ab = pick(foo, ['a', 'b']); // { a: 1, b: 2 }
 * ```
 * @param {?} obj the source object
 * @param {?} propNames an Array of strings, which are the whitelisted property names
 * @return {?}
 */
function pick$1(obj, propNames) {
    let /** @type {?} */ objCopy = {};
    for (let /** @type {?} */ prop$$1 in obj) {
        if (propNames.indexOf(prop$$1) !== -1) {
            objCopy[prop$$1] = obj[prop$$1];
        }
    }
    return objCopy;
}
/**
 * Return a copy of the object omitting the blacklisted properties.
 *
 * \@example
 * ```
 *
 * var foo = { a: 1, b: 2, c: 3 };
 * var ab = omit(foo, ['a', 'b']); // { c: 3 }
 * ```
 * @param {?} obj the source object
 * @param {?} propNames an Array of strings, which are the blacklisted property names
 * @return {?}
 */
function omit$1(obj, propNames) {
    return Object.keys(obj)
        .filter(not$1(inArray$1(propNames)))
        .reduce((acc, key) => (acc[key] = obj[key], acc), {});
}
/**
 * Maps an array, or object to a property (by name)
 * @param {?} collection
 * @param {?} propName
 * @return {?}
 */

/**
 * Filters an Array or an Object's properties based on a predicate
 * @template T
 * @param {?} collection
 * @param {?} callback
 * @return {?}
 */
function filter$1(collection, callback) {
    let /** @type {?} */ arr = isArray$1(collection), /** @type {?} */ result = arr ? [] : {};
    let /** @type {?} */ accept = arr ? x => result.push(x) : (x, key) => result[key] = x;
    forEach$1(collection, function (item, i) {
        if (callback(item, i))
            accept(item, i);
    });
    return (result);
}
/**
 * Finds an object from an array, or a property of an object, that matches a predicate
 * @param {?} collection
 * @param {?} callback
 * @return {?}
 */
function find$1(collection, callback) {
    let /** @type {?} */ result;
    forEach$1(collection, function (item, i) {
        if (result)
            return;
        if (callback(item, i))
            result = item;
    });
    return result;
}
/**
 * Given an object, returns a new object, where each property is transformed by the callback function
 */
let mapObj$1 = map$2;
/**
 * Maps an array or object properties using a callback function
 * @param {?} collection
 * @param {?} callback
 * @return {?}
 */
function map$2(collection, callback) {
    let /** @type {?} */ result = isArray$1(collection) ? [] : {};
    forEach$1(collection, (item, i) => result[i] = callback(item, i));
    return result;
}
/**
 * Given an object, return its enumerable property values
 *
 * \@example
 * ```
 *
 * let foo = { a: 1, b: 2, c: 3 }
 * let vals = values(foo); // [ 1, 2, 3 ]
 * ```
 */
const values$1 = (obj) => Object.keys(obj).map(key => obj[key]);
/**
 * Reduce function that returns true if all of the values are truthy.
 *
 * \@example
 * ```
 *
 * let vals = [ 1, true, {}, "hello world"];
 * vals.reduce(allTrueR, true); // true
 *
 * vals.push(0);
 * vals.reduce(allTrueR, true); // false
 * ```
 */
const allTrueR$1 = (memo, elem) => memo && elem;
/**
 * Reduce function that returns true if any of the values are truthy.
 *
 *  * \@example
 * ```
 *
 * let vals = [ 0, null, undefined ];
 * vals.reduce(anyTrueR, true); // false
 *
 * vals.push("hello world");
 * vals.reduce(anyTrueR, true); // true
 * ```
 */
const anyTrueR$1 = (memo, elem) => memo || elem;
/**
 * Reduce function which un-nests a single level of arrays
 * \@example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
 * ```
 */
const unnestR$1 = (memo, elem) => memo.concat(elem);
/**
 * Reduce function which recursively un-nests all arrays
 *
 * \@example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * input.reduce(unnestR, []) // [ "a", "b", "c", "d", "double, "nested" ]
 * ```
 */

/**
 * Reduce function that pushes an object to an array, then returns the array.
 * Mostly just for [[flattenR]] and [[uniqR]]
 * @param {?} arr
 * @param {?} obj
 * @return {?}
 */
function pushR$1(arr, obj) {
    arr.push(obj);
    return arr;
}
/**
 * Reduce function that filters out duplicates
 */
const uniqR$1 = (acc, token) => inArray$1(acc, token) ? acc : pushR$1(acc, token);
/**
 * Return a new array with a single level of arrays unnested.
 *
 * \@example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * unnest(input) // [ "a", "b", "c", "d", [ "double, "nested" ] ]
 * ```
 */
const unnest$1 = (arr) => arr.reduce(unnestR$1, []);
/**
 * Return a completely flattened version of an array.
 *
 * \@example
 * ```
 *
 * let input = [ [ "a", "b" ], [ "c", "d" ], [ [ "double", "nested" ] ] ];
 * flatten(input) // [ "a", "b", "c", "d", "double, "nested" ]
 * ```
 */

/**
 * Given a .filter Predicate, builds a .filter Predicate which throws an error if any elements do not pass.
 * \@example
 * ```
 *
 * let isNumber = (obj) => typeof(obj) === 'number';
 * let allNumbers = [ 1, 2, 3, 4, 5 ];
 * allNumbers.filter(assertPredicate(isNumber)); //OK
 *
 * let oneString = [ 1, 2, 3, 4, "5" ];
 * oneString.filter(assertPredicate(isNumber, "Not all numbers")); // throws Error(""Not all numbers"");
 * ```
 */
const assertPredicate$1 = assertFn$1;
/**
 * Given a .map function, builds a .map function which throws an error if any mapped elements do not pass a truthyness test.
 * \@example
 * ```
 *
 * var data = { foo: 1, bar: 2 };
 *
 * let keys = [ 'foo', 'bar' ]
 * let values = keys.map(assertMap(key => data[key], "Key not found"));
 * // values is [1, 2]
 *
 * let keys = [ 'foo', 'bar', 'baz' ]
 * let values = keys.map(assertMap(key => data[key], "Key not found"));
 * // throws Error("Key not found")
 * ```
 */

/**
 * @param {?} predicateOrMap
 * @param {?=} errMsg
 * @return {?}
 */
function assertFn$1(predicateOrMap, errMsg = "assert failure") {
    return (obj) => {
        let /** @type {?} */ result = predicateOrMap(obj);
        if (!result) {
            throw new Error(isFunction$1(errMsg) ? ((errMsg))(obj) : errMsg);
        }
        return result;
    };
}
/**
 * Like _.pairs: Given an object, returns an array of key/value pairs
 *
 * \@example
 * ```
 *
 * pairs({ foo: "FOO", bar: "BAR }) // [ [ "foo", "FOO" ], [ "bar": "BAR" ] ]
 * ```
 */

/**
 * Given two or more parallel arrays, returns an array of tuples where
 * each tuple is composed of [ a[i], b[i], ... z[i] ]
 *
 * \@example
 * ```
 *
 * let foo = [ 0, 2, 4, 6 ];
 * let bar = [ 1, 3, 5, 7 ];
 * let baz = [ 10, 30, 50, 70 ];
 * arrayTuples(foo, bar);       // [ [0, 1], [2, 3], [4, 5], [6, 7] ]
 * arrayTuples(foo, bar, baz);  // [ [0, 1, 10], [2, 3, 30], [4, 5, 50], [6, 7, 70] ]
 * ```
 * @param {...?} args
 * @return {?}
 */
function arrayTuples$1(...args) {
    if (args.length === 0)
        return [];
    let /** @type {?} */ maxArrayLen = args.reduce((min, arr) => Math.min(arr.length, min), 9007199254740991); // aka 2^53 − 1 aka Number.MAX_SAFE_INTEGER
    let /** @type {?} */ i, /** @type {?} */ result = [];
    for (i = 0; i < maxArrayLen; i++) {
        // This is a hot function
        // Unroll when there are 1-4 arguments
        switch (args.length) {
            case 1:
                result.push([args[0][i]]);
                break;
            case 2:
                result.push([args[0][i], args[1][i]]);
                break;
            case 3:
                result.push([args[0][i], args[1][i], args[2][i]]);
                break;
            case 4:
                result.push([args[0][i], args[1][i], args[2][i], args[3][i]]);
                break;
            default:
                result.push(args.map(array => array[i]));
                break;
        }
    }
    return result;
}
/**
 * Reduce function which builds an object from an array of [key, value] pairs.
 *
 * Each iteration sets the key/val pair on the memo object, then returns the memo for the next iteration.
 *
 * Each keyValueTuple should be an array with values [ key: string, value: any ]
 *
 * \@example
 * ```
 *
 * var pairs = [ ["fookey", "fooval"], ["barkey", "barval"] ]
 *
 * var pairsToObj = pairs.reduce((memo, pair) => applyPairs(memo, pair), {})
 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
 *
 * // Or, more simply:
 * var pairsToObj = pairs.reduce(applyPairs, {})
 * // pairsToObj == { fookey: "fooval", barkey: "barval" }
 * ```
 * @param {?} memo
 * @param {?} keyValTuple
 * @return {?}
 */
function applyPairs$1(memo, keyValTuple) {
    let /** @type {?} */ key, /** @type {?} */ value;
    if (isArray$1(keyValTuple))
        [key, value] = keyValTuple;
    if (!isString$1(key))
        throw new Error("invalid parameters to applyPairs");
    memo[key] = value;
    return memo;
}
/**
 * Get the last element of an array
 * @template T
 * @param {?} arr
 * @return {?}
 */
function tail$1(arr) {
    return arr.length && arr[arr.length - 1] || undefined;
}
/**
 * shallow copy from src to dest
 *
 * note: This is a shallow copy, while angular.copy is a deep copy.
 * ui-router uses `copy` only to make copies of state parameters.
 * @param {?} src
 * @param {?} dest
 * @return {?}
 */
function _copy(src, dest) {
    if (dest)
        Object.keys(dest).forEach(key => delete dest[key]);
    if (!dest)
        dest = {};
    return extend$1(dest, src);
}
/**
 * Naive forEach implementation works with Objects or Arrays
 * @param {?} obj
 * @param {?} cb
 * @param {?} _this
 * @return {?}
 */
function _forEach(obj, cb, _this) {
    if (isArray$1(obj))
        return obj.forEach(cb, _this);
    Object.keys(obj).forEach(key => cb(obj[key], key));
}
/**
 * @param {?} toObj
 * @return {?}
 */
function _extend$1(toObj) {
    for (let /** @type {?} */ i = 1; i < arguments.length; i++) {
        let /** @type {?} */ obj = arguments[i];
        if (!obj)
            continue;
        let /** @type {?} */ keys = Object.keys(obj);
        for (let /** @type {?} */ j = 0; j < keys.length; j++) {
            toObj[keys[j]] = obj[keys[j]];
        }
    }
    return toObj;
}
/**
 * @param {?} o1
 * @param {?} o2
 * @return {?}
 */
function _equals(o1, o2) {
    if (o1 === o2)
        return true;
    if (o1 === null || o2 === null)
        return false;
    if (o1 !== o1 && o2 !== o2)
        return true; // NaN === NaN
    let /** @type {?} */ t1 = typeof o1, /** @type {?} */ t2 = typeof o2;
    if (t1 !== t2 || t1 !== 'object')
        return false;
    const /** @type {?} */ tup = [o1, o2];
    if (all$1(isArray$1)(tup))
        return _arraysEq(o1, o2);
    if (all$1(isDate$1)(tup))
        return o1.getTime() === o2.getTime();
    if (all$1(isRegExp$1)(tup))
        return o1.toString() === o2.toString();
    if (all$1(isFunction$1)(tup))
        return true; // meh
    let /** @type {?} */ predicates = [isFunction$1, isArray$1, isDate$1, isRegExp$1];
    if (predicates.map(any$1).reduce((b, fn) => b || !!fn(tup), false))
        return false;
    let /** @type {?} */ key, /** @type {?} */ keys = {};
    for (key in o1) {
        if (!_equals(o1[key], o2[key]))
            return false;
        keys[key] = true;
    }
    for (key in o2) {
        if (!keys[key])
            return false;
    }
    return true;
}
/**
 * @param {?} a1
 * @param {?} a2
 * @return {?}
 */
function _arraysEq(a1, a2) {
    if (a1.length !== a2.length)
        return false;
    return arrayTuples$1(a1, a2).reduce((b, t) => b && _equals(t[0], t[1]), true);
}
/**
 * Create a sort function
 *
 * Creates a sort function which sorts by a numeric property.
 *
 * The `propFn` should return the property as a number which can be sorted.
 *
 * #### Example:
 * This example returns the `priority` prop.
 * ```js
 * var sortfn = sortBy(obj => obj.priority)
 * // equivalent to:
 * var longhandSortFn = (a, b) => a.priority - b.priority;
 * ```
 *
 * #### Example:
 * This example uses [[prop]]
 * ```js
 * var sortfn = sortBy(prop('priority'))
 * ```
 *
 * The `checkFn` can be used to exclude objects from sorting.
 *
 * #### Example:
 * This example only sorts objects with type === 'FOO'
 * ```js
 * var sortfn = sortBy(prop('priority'), propEq('type', 'FOO'))
 * ```
 *
 * @param propFn a function that returns the property (as a number)
 * @param checkFn a predicate
 *
 * @return a sort function like: `(a, b) => (checkFn(a) && checkFn(b)) ? propFn(a) - propFn(b) : 0`
 */
const sortBy$1 = (propFn, checkFn = val$1(true)) => (a, b) => (checkFn(a) && checkFn(b)) ? propFn(a) - propFn(b) : 0;
/**
 * Composes a list of sort functions
 *
 * Creates a sort function composed of multiple sort functions.
 * Each sort function is invoked in series.
 * The first sort function to return non-zero "wins".
 *
 * @param sortFns list of sort functions
 */
const composeSort$1 = (...sortFns) => function composedSort(a, b) {
    return sortFns.reduce((prev, fn) => prev || fn(a, b), 0);
};
// issue #2676
const silenceUncaughtInPromise$1 = (promise) => promise.catch(e => 0) && promise;
const silentRejection$1 = (error) => silenceUncaughtInPromise$1(services$1.$q.reject(error));

/**
 * for typedoc
 */
class Queue$1 {
    /**
     * @param {?=} _items
     * @param {?=} _limit
     */
    constructor(_items = [], _limit = null) {
        this._items = _items;
        this._limit = _limit;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    enqueue(item) {
        let /** @type {?} */ items = this._items;
        items.push(item);
        if (this._limit && items.length > this._limit)
            items.shift();
        return item;
    }
    /**
     * @return {?}
     */
    dequeue() {
        if (this.size())
            return this._items.splice(0, 1)[0];
    }
    /**
     * @return {?}
     */
    clear() {
        let /** @type {?} */ current = this._items;
        this._items = [];
        return current;
    }
    /**
     * @return {?}
     */
    size() {
        return this._items.length;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    remove(item) {
        let /** @type {?} */ idx = this._items.indexOf(item);
        return idx > -1 && this._items.splice(idx, 1)[0];
    }
    /**
     * @return {?}
     */
    peekTail() {
        return this._items[this._items.length - 1];
    }
    /**
     * @return {?}
     */
    peekHead() {
        if (this.size())
            return this._items[0];
    }
}

/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
let RejectType$1 = {};
RejectType$1.SUPERSEDED = 2;
RejectType$1.ABORTED = 3;
RejectType$1.INVALID = 4;
RejectType$1.IGNORED = 5;
RejectType$1.ERROR = 6;
RejectType$1[RejectType$1.SUPERSEDED] = "SUPERSEDED";
RejectType$1[RejectType$1.ABORTED] = "ABORTED";
RejectType$1[RejectType$1.INVALID] = "INVALID";
RejectType$1[RejectType$1.IGNORED] = "IGNORED";
RejectType$1[RejectType$1.ERROR] = "ERROR";
/**
 * @hidden
 */
let id$1 = 0;
class Rejection$1 {
    /**
     * @param {?} type
     * @param {?=} message
     * @param {?=} detail
     */
    constructor(type, message, detail) {
        this.$id = id$1++;
        this.type = type;
        this.message = message;
        this.detail = detail;
    }
    /**
     * @return {?}
     */
    toString() {
        const /** @type {?} */ detailString = (d) => d && d.toString !== Object.prototype.toString ? d.toString() : stringify$1(d);
        let /** @type {?} */ detail = detailString(this.detail);
        let { $id, type, message } = this;
        return `Transition Rejection($id: ${$id} type: ${type}, message: ${message}, detail: ${detail})`;
    }
    /**
     * @return {?}
     */
    toPromise() {
        return extend$1(silentRejection$1(this), { _transitionRejection: this });
    }
    /**
     * Returns true if the obj is a rejected promise created from the `asPromise` factory
     * @param {?} obj
     * @return {?}
     */
    static isRejectionPromise(obj) {
        return obj && (typeof obj.then === 'function') && is$1(Rejection$1)(obj._transitionRejection);
    }
    /**
     * Returns a Rejection due to transition superseded
     * @param {?=} detail
     * @param {?=} options
     * @return {?}
     */
    static superseded(detail, options) {
        let /** @type {?} */ message = "The transition has been superseded by a different transition";
        let /** @type {?} */ rejection = new Rejection$1(RejectType$1.SUPERSEDED, message, detail);
        if (options && options.redirected) {
            rejection.redirected = true;
        }
        return rejection;
    }
    /**
     * Returns a Rejection due to redirected transition
     * @param {?=} detail
     * @return {?}
     */
    static redirected(detail) {
        return Rejection$1.superseded(detail, { redirected: true });
    }
    /**
     * Returns a Rejection due to invalid transition
     * @param {?=} detail
     * @return {?}
     */
    static invalid(detail) {
        let /** @type {?} */ message = "This transition is invalid";
        return new Rejection$1(RejectType$1.INVALID, message, detail);
    }
    /**
     * Returns a Rejection due to ignored transition
     * @param {?=} detail
     * @return {?}
     */
    static ignored(detail) {
        let /** @type {?} */ message = "The transition was ignored";
        return new Rejection$1(RejectType$1.IGNORED, message, detail);
    }
    /**
     * Returns a Rejection due to aborted transition
     * @param {?=} detail
     * @return {?}
     */
    static aborted(detail) {
        let /** @type {?} */ message = "The transition has been aborted";
        return new Rejection$1(RejectType$1.ABORTED, message, detail);
    }
    /**
     * Returns a Rejection due to aborted transition
     * @param {?=} detail
     * @return {?}
     */
    static errored(detail) {
        let /** @type {?} */ message = "The transition errored";
        return new Rejection$1(RejectType$1.ERROR, message, detail);
    }
    /**
     * Returns a Rejection
     *
     * Normalizes a value as a Rejection.
     * If the value is already a Rejection, returns it.
     * Otherwise, wraps and returns the value as a Rejection (Rejection type: ERROR).
     *
     * @param {?=} detail
     * @return {?} `detail` if it is already a `Rejection`, else returns an ERROR Rejection.
     */
    static normalize(detail) {
        return is$1(Rejection$1)(detail) ? detail : Rejection$1.errored(detail);
    }
}

/**
 * # Transition tracing (debug)
 *
 * Enable transition tracing to print transition information to the console,
 * in order to help debug your application.
 * Tracing logs detailed information about each Transition to your console.
 *
 * To enable tracing, import the [[Trace]] singleton and enable one or more categories.
 *
 * ### ES6
 * ```js
 * import {trace} from "ui-router-ng2"; // or "angular-ui-router"
 * trace.enable(1, 5); // TRANSITION and VIEWCONFIG
 * ```
 *
 * ### CJS
 * ```js
 * let trace = require("angular-ui-router").trace; // or "ui-router-ng2"
 * trace.enable("TRANSITION", "VIEWCONFIG");
 * ```
 *
 * ### Globals
 * ```js
 * let trace = window["angular-ui-router"].trace; // or "ui-router-ng2"
 * trace.enable(); // Trace everything (very verbose)
 * ```
 *
 * ### Angular 1:
 * ```js
 * app.run($trace => $trace.enable());
 * ```
 *
 * @coreapi
 * @module trace
 */ /** for typedoc */
/**
 * @hidden
 * @param {?} uiview
 * @return {?}
 */
function uiViewString(uiview) {
    if (!uiview)
        return 'ui-view (defunct)';
    const /** @type {?} */ state = uiview.creationContext ? uiview.creationContext.name || '(root)' : '(none)';
    return `[ui-view#${uiview.id} ${uiview.$type}:${uiview.fqn} (${uiview.name}@${state})]`;
}
/**
 * @hidden
 */
const viewConfigString = (viewConfig) => {
    let view = viewConfig.viewDecl;
    const state = view.$context.name || '(root)';
    return `[View#${viewConfig.$id} from '${state}' state]: target ui-view: '${view.$uiViewName}@${view.$uiViewContextAnchor}'`;
};
/**
 * @hidden
 * @param {?} input
 * @return {?}
 */
function normalizedCat(input) {
    return isNumber$1(input) ? Category$1[input] : Category$1[Category$1[input]];
}
let Category$1 = {};
Category$1.RESOLVE = 0;
Category$1.TRANSITION = 1;
Category$1.HOOK = 2;
Category$1.UIVIEW = 3;
Category$1.VIEWCONFIG = 4;
Category$1[Category$1.RESOLVE] = "RESOLVE";
Category$1[Category$1.TRANSITION] = "TRANSITION";
Category$1[Category$1.HOOK] = "HOOK";
Category$1[Category$1.UIVIEW] = "UIVIEW";
Category$1[Category$1.VIEWCONFIG] = "VIEWCONFIG";
/**
 * @hidden
 */
const _tid = parse$1("$id");
/**
 * @hidden
 */
const _rid = parse$1("router.$id");
/**
 * @hidden
 */
const transLbl = (trans) => `Transition #${_tid(trans)}-${_rid(trans)}`;
/**
 * Prints UI-Router Transition trace information to the console.
 */
class Trace$1 {
    /**
     * @hidden
     */
    constructor() {
        /**
         * @hidden
         */
        this._enabled = {};
        this.approximateDigests = 0;
    }
    /**
     * @hidden
     * @param {?} enabled
     * @param {?} categories
     * @return {?}
     */
    _set(enabled, categories) {
        if (!categories.length) {
            categories = (Object.keys(Category$1)
                .map(k => parseInt(k, 10))
                .filter(k => !isNaN(k))
                .map(key => Category$1[key]));
        }
        categories.map(normalizedCat).forEach(category => this._enabled[category] = enabled);
    }
    /**
     * @param {...?} categories
     * @return {?}
     */
    enable(...categories) { this._set(true, categories); }
    /**
     * @param {...?} categories
     * @return {?}
     */
    disable(...categories) { this._set(false, categories); }
    /**
     * Retrieves the enabled stateus of a [[Category]]
     *
     * ```js
     * trace.enabled("VIEWCONFIG"); // true or false
     * ```
     *
     * @param {?} category
     * @return {?} boolean true if the category is enabled
     */
    enabled(category) {
        return !!this._enabled[normalizedCat(category)];
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} trans
     * @return {?}
     */
    traceTransitionStart(trans) {
        if (!this.enabled(Category$1.TRANSITION))
            return;
        console.log(`${transLbl(trans)}: Started  -> ${stringify$1(trans)}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} trans
     * @return {?}
     */
    traceTransitionIgnored(trans) {
        if (!this.enabled(Category$1.TRANSITION))
            return;
        console.log(`${transLbl(trans)}: Ignored  <> ${stringify$1(trans)}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} step
     * @param {?} trans
     * @param {?} options
     * @return {?}
     */
    traceHookInvocation(step, trans, options) {
        if (!this.enabled(Category$1.HOOK))
            return;
        let /** @type {?} */ event = parse$1("traceData.hookType")(options) || "internal", /** @type {?} */ context = parse$1("traceData.context.state.name")(options) || parse$1("traceData.context")(options) || "unknown", /** @type {?} */ name = functionToString$1(((step)).registeredHook.callback);
        console.log(`${transLbl(trans)}:   Hook -> ${event} context: ${context}, ${maxLength$1(200, name)}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} hookResult
     * @param {?} trans
     * @param {?} transitionOptions
     * @return {?}
     */
    traceHookResult(hookResult, trans, transitionOptions) {
        if (!this.enabled(Category$1.HOOK))
            return;
        console.log(`${transLbl(trans)}:   <- Hook returned: ${maxLength$1(200, stringify$1(hookResult))}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} path
     * @param {?} when
     * @param {?=} trans
     * @return {?}
     */
    traceResolvePath(path, when, trans) {
        if (!this.enabled(Category$1.RESOLVE))
            return;
        console.log(`${transLbl(trans)}:         Resolving ${path} (${when})`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} resolvable
     * @param {?=} trans
     * @return {?}
     */
    traceResolvableResolved(resolvable, trans) {
        if (!this.enabled(Category$1.RESOLVE))
            return;
        console.log(`${transLbl(trans)}:               <- Resolved  ${resolvable} to: ${maxLength$1(200, stringify$1(resolvable.data))}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} reason
     * @param {?} trans
     * @return {?}
     */
    traceError(reason, trans) {
        if (!this.enabled(Category$1.TRANSITION))
            return;
        console.log(`${transLbl(trans)}: <- Rejected ${stringify$1(trans)}, reason: ${reason}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} finalState
     * @param {?} trans
     * @return {?}
     */
    traceSuccess(finalState, trans) {
        if (!this.enabled(Category$1.TRANSITION))
            return;
        console.log(`${transLbl(trans)}: <- Success  ${stringify$1(trans)}, final state: ${finalState.name}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} event
     * @param {?} viewData
     * @param {?=} extra
     * @return {?}
     */
    traceUIViewEvent(event, viewData, extra = "") {
        if (!this.enabled(Category$1.UIVIEW))
            return;
        console.log(`ui-view: ${padString$1(30, event)} ${uiViewString(viewData)}${extra}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} viewData
     * @param {?} context
     * @return {?}
     */
    traceUIViewConfigUpdated(viewData, context) {
        if (!this.enabled(Category$1.UIVIEW))
            return;
        this.traceUIViewEvent("Updating", viewData, ` with ViewConfig from context='${context}'`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} viewData
     * @param {?} html
     * @return {?}
     */
    traceUIViewFill(viewData, html) {
        if (!this.enabled(Category$1.UIVIEW))
            return;
        this.traceUIViewEvent("Fill", viewData, ` with: ${maxLength$1(200, html)}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} pairs
     * @return {?}
     */
    traceViewSync(pairs$$1) {
        if (!this.enabled(Category$1.VIEWCONFIG))
            return;
        const /** @type {?} */ mapping = pairs$$1.map(([uiViewData, config]) => {
            const /** @type {?} */ uiView = `${uiViewData.$type}:${uiViewData.fqn}`;
            const /** @type {?} */ view = config && `${config.viewDecl.$context.name}: ${config.viewDecl.$name} (${config.viewDecl.$type})`;
            return { 'ui-view fqn': uiView, 'state: view name': view };
        }).sort((a, b) => a['ui-view fqn'].localeCompare(b['ui-view fqn']));
        console.table(mapping);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} event
     * @param {?} viewConfig
     * @return {?}
     */
    traceViewServiceEvent(event, viewConfig) {
        if (!this.enabled(Category$1.VIEWCONFIG))
            return;
        console.log(`VIEWCONFIG: ${event} ${viewConfigString(viewConfig)}`);
    }
    /**
     * \@internalapi called by ui-router code
     * @param {?} event
     * @param {?} viewData
     * @return {?}
     */
    traceViewServiceUIViewEvent(event, viewData) {
        if (!this.enabled(Category$1.VIEWCONFIG))
            return;
        console.log(`VIEWCONFIG: ${event} ${uiViewString(viewData)}`);
    }
}
/**
 * The [[Trace]] singleton
 *
 * #### Example:
 * ```js
 * import {trace} from "angular-ui-router";
 * trace.enable(1, 5);
 * ```
 */
let trace$1 = new Trace$1();

/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
let TransitionHookPhase$1 = {};
TransitionHookPhase$1.CREATE = 0;
TransitionHookPhase$1.BEFORE = 1;
TransitionHookPhase$1.RUN = 2;
TransitionHookPhase$1.SUCCESS = 3;
TransitionHookPhase$1.ERROR = 4;
TransitionHookPhase$1[TransitionHookPhase$1.CREATE] = "CREATE";
TransitionHookPhase$1[TransitionHookPhase$1.BEFORE] = "BEFORE";
TransitionHookPhase$1[TransitionHookPhase$1.RUN] = "RUN";
TransitionHookPhase$1[TransitionHookPhase$1.SUCCESS] = "SUCCESS";
TransitionHookPhase$1[TransitionHookPhase$1.ERROR] = "ERROR";
let TransitionHookScope$1 = {};
TransitionHookScope$1.TRANSITION = 0;
TransitionHookScope$1.STATE = 1;
TransitionHookScope$1[TransitionHookScope$1.TRANSITION] = "TRANSITION";
TransitionHookScope$1[TransitionHookScope$1.STATE] = "STATE";

/**
 * @coreapi
 * @module state
 */ /** for typedoc */
/**
 * Encapsulate the target (destination) state/params/options of a [[Transition]].
 *
 * This class is frequently used to redirect a transition to a new destination.
 *
 * See:
 *
 * - [[HookResult]]
 * - [[TransitionHookFn]]
 * - [[TransitionService.onStart]]
 *
 * To create a `TargetState`, use [[StateService.target]].
 *
 * ---
 *
 * This class wraps:
 *
 * 1) an identifier for a state
 * 2) a set of parameters
 * 3) and transition options
 * 4) the registered state object (the [[StateDeclaration]])
 *
 * Many UI-Router APIs such as [[StateService.go]] take a [[StateOrName]] argument which can
 * either be a *state object* (a [[StateDeclaration]] or [[StateObject]]) or a *state name* (a string).
 * The `TargetState` class normalizes those options.
 *
 * A `TargetState` may be valid (the state being targeted exists in the registry)
 * or invalid (the state being targeted is not registered).
 */
class TargetState$1 {
    /**
     * The TargetState constructor
     *
     * Note: Do not construct a `TargetState` manually.
     * To create a `TargetState`, use the [[StateService.target]] factory method.
     *
     * \@internalapi
     * @param {?} _identifier An identifier for a state.
     *    Either a fully-qualified state name, or the object used to define the state.
     * @param {?=} _definition The internal state representation, if exists.
     * @param {?=} _params Parameters for the target state
     * @param {?=} _options Transition options.
     *
     */
    constructor(_identifier, _definition, _params, _options = {}) {
        this._identifier = _identifier;
        this._definition = _definition;
        this._options = _options;
        this._params = _params || {};
    }
    /**
     * The name of the state this object targets
     * @return {?}
     */
    name() {
        return this._definition && this._definition.name || (this._identifier);
    }
    /**
     * The identifier used when creating this TargetState
     * @return {?}
     */
    identifier() {
        return this._identifier;
    }
    /**
     * The target parameter values
     * @return {?}
     */
    params() {
        return this._params;
    }
    /**
     * The internal state object (if it was found)
     * @return {?}
     */
    $state() {
        return this._definition;
    }
    /**
     * The internal state declaration (if it was found)
     * @return {?}
     */
    state() {
        return this._definition && this._definition.self;
    }
    /**
     * The target options
     * @return {?}
     */
    options() {
        return this._options;
    }
    /**
     * True if the target state was found
     * @return {?}
     */
    exists() {
        return !!(this._definition && this._definition.self);
    }
    /**
     * True if the object is valid
     * @return {?}
     */
    valid() {
        return !this.error();
    }
    /**
     * If the object is invalid, returns the reason why
     * @return {?}
     */
    error() {
        let /** @type {?} */ base = (this.options().relative);
        if (!this._definition && !!base) {
            let /** @type {?} */ stateName = base.name ? base.name : base;
            return `Could not resolve '${this.name()}' from state '${stateName}'`;
        }
        if (!this._definition)
            return `No such state '${this.name()}'`;
        if (!this._definition.self)
            return `State '${this.name()}' has an invalid definition`;
    }
    /**
     * @return {?}
     */
    toString() {
        return `'${this.name()}'${toJson$1(this.params())}`;
    }
}
/**
 * Returns true if the object has a state property that might be a state or state name
 */
TargetState$1.isDef = (obj) => obj && obj.state && (isString$1(obj.state) || isString$1(obj.state.name));

/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
let defaultOptions = {
    current: noop$1,
    transition: null,
    traceData: {},
    bind: null,
};
/**
 * @hidden
 */
class TransitionHook$1 {
    /**
     * @param {?} transition
     * @param {?} stateContext
     * @param {?} registeredHook
     * @param {?} options
     */
    constructor(transition, stateContext, registeredHook, options) {
        this.transition = transition;
        this.stateContext = stateContext;
        this.registeredHook = registeredHook;
        this.options = options;
        this.isSuperseded = () => this.type.hookPhase === TransitionHookPhase$1.RUN && !this.options.transition.isActive();
        this.options = defaults$1(options, defaultOptions);
        this.type = registeredHook.eventType;
    }
    /**
     * @param {?} err
     * @return {?}
     */
    logError(err) {
        this.transition.router.stateService.defaultErrorHandler()(err);
    }
    /**
     * @return {?}
     */
    invokeHook() {
        let /** @type {?} */ hook = this.registeredHook;
        if (hook._deregistered)
            return;
        let /** @type {?} */ notCurrent = this.getNotCurrentRejection();
        if (notCurrent)
            return notCurrent;
        let /** @type {?} */ options = this.options;
        trace$1.traceHookInvocation(this, this.transition, options);
        const /** @type {?} */ invokeCallback = () => hook.callback.call(options.bind, this.transition, this.stateContext);
        const /** @type {?} */ normalizeErr = err => Rejection$1.normalize(err).toPromise();
        const /** @type {?} */ handleError = err => hook.eventType.getErrorHandler(this)(err);
        const /** @type {?} */ handleResult = result => hook.eventType.getResultHandler(this)(result);
        try {
            let /** @type {?} */ result = invokeCallback();
            if (!this.type.synchronous && isPromise$1(result)) {
                return result.catch(normalizeErr)
                    .then(handleResult, handleError);
            }
            else {
                return handleResult(result);
            }
        }
        catch (err) {
            // If callback throws (synchronously)
            return handleError(Rejection$1.normalize(err));
        }
    }
    /**
     * This method handles the return value of a Transition Hook.
     *
     * A hook can return false (cancel), a TargetState (redirect),
     * or a promise (which may later resolve to false or a redirect)
     *
     * This also handles "transition superseded" -- when a new transition
     * was started while the hook was still running
     * @param {?} result
     * @return {?}
     */
    handleHookResult(result) {
        let /** @type {?} */ notCurrent = this.getNotCurrentRejection();
        if (notCurrent)
            return notCurrent;
        // Hook returned a promise
        if (isPromise$1(result)) {
            // Wait for the promise, then reprocess with the resulting value
            return result.then(val$$1 => this.handleHookResult(val$$1));
        }
        trace$1.traceHookResult(result, this.transition, this.options);
        // Hook returned false
        if (result === false) {
            // Abort this Transition
            return Rejection$1.aborted("Hook aborted transition").toPromise();
        }
        const /** @type {?} */ isTargetState = is$1(TargetState$1);
        // hook returned a TargetState
        if (isTargetState(result)) {
            // Halt the current Transition and redirect (a new Transition) to the TargetState.
            return Rejection$1.redirected(result).toPromise();
        }
    }
    /**
     * Return a Rejection promise if the transition is no longer current due
     * to a stopped router (disposed), or a new transition has started and superseded this one.
     * @return {?}
     */
    getNotCurrentRejection() {
        let /** @type {?} */ router = this.transition.router;
        // The router is stopped
        if (router._disposed) {
            return Rejection$1.aborted(`UIRouter instance #${router.$id} has been stopped (disposed)`).toPromise();
        }
        if (this.transition._aborted) {
            return Rejection$1.aborted().toPromise();
        }
        // This transition is no longer current.
        // Another transition started while this hook was still running.
        if (this.isSuperseded()) {
            // Abort this transition
            return Rejection$1.superseded(this.options.current()).toPromise();
        }
    }
    /**
     * @return {?}
     */
    toString() {
        let { options, registeredHook } = this;
        let /** @type {?} */ event = parse$1("traceData.hookType")(options) || "internal", /** @type {?} */ context = parse$1("traceData.context.state.name")(options) || parse$1("traceData.context")(options) || "unknown", /** @type {?} */ name = fnToString$1(registeredHook.callback);
        return `${event} context: ${context}, ${maxLength$1(200, name)}`;
    }
    /**
     * Chains together an array of TransitionHooks.
     *
     * Given a list of [[TransitionHook]] objects, chains them together.
     * Each hook is invoked after the previous one completes.
     *
     * #### Example:
     * ```js
     * var hooks: TransitionHook[] = getHooks();
     * let promise: Promise<any> = TransitionHook.chain(hooks);
     *
     * promise.then(handleSuccess, handleError);
     * ```
     *
     * @param {?} hooks the list of hooks to chain together
     * @param {?=} waitFor if provided, the chain is `.then()`'ed off this promise
     * @return {?} a `Promise` for sequentially invoking the hooks (in order)
     */
    static chain(hooks, waitFor) {
        // Chain the next hook off the previous
        const /** @type {?} */ createHookChainR = (prev, nextHook) => prev.then(() => nextHook.invokeHook());
        return hooks.reduce(createHookChainR, waitFor || services$1.$q.when());
    }
    /**
     * Invokes all the provided TransitionHooks, in order.
     * Each hook's return value is checked.
     * If any hook returns a promise, then the rest of the hooks are chained off that promise, and the promise is returned.
     * If no hook returns a promise, then all hooks are processed synchronously.
     *
     * @template T
     * @param {?} hooks the list of TransitionHooks to invoke
     * @param {?} doneCallback a callback that is invoked after all the hooks have successfully completed
     *
     * @return {?} a promise for the async result, or the result of the callback
     */
    static invokeHooks(hooks, doneCallback) {
        for (let /** @type {?} */ idx = 0; idx < hooks.length; idx++) {
            let /** @type {?} */ hookResult = hooks[idx].invokeHook();
            if (isPromise$1(hookResult)) {
                let /** @type {?} */ remainingHooks = hooks.slice(idx + 1);
                return TransitionHook$1.chain(remainingHooks, hookResult)
                    .then(doneCallback);
            }
        }
        return doneCallback();
    }
    /**
     * Run all TransitionHooks, ignoring their return value.
     * @param {?} hooks
     * @return {?}
     */
    static runAllHooks(hooks) {
        hooks.forEach(hook => hook.invokeHook());
    }
}
/**
 * These GetResultHandler(s) are used by [[invokeHook]] below
 * Each HookType chooses a GetResultHandler (See: [[TransitionService._defineCoreEvents]])
 */
TransitionHook$1.HANDLE_RESULT = (hook) => (result) => hook.handleHookResult(result);
/**
 * If the result is a promise rejection, log it.
 * Otherwise, ignore the result.
 */
TransitionHook$1.LOG_REJECTED_RESULT = (hook) => (result) => {
    isPromise$1(result) && result.catch(err => hook.logError(Rejection$1.normalize(err)));
    return undefined;
};
/**
 * These GetErrorHandler(s) are used by [[invokeHook]] below
 * Each HookType chooses a GetErrorHandler (See: [[TransitionService._defineCoreEvents]])
 */
TransitionHook$1.LOG_ERROR = (hook) => (error) => hook.logError(error);
TransitionHook$1.REJECT_ERROR = (hook) => (error) => silentRejection$1(error);
TransitionHook$1.THROW_ERROR = (hook) => (error) => {
    throw error;
};

/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
/**
 * Determines if the given state matches the matchCriteria
 *
 * @hidden
 *
 * @param {?} state a State Object to test against
 * @param {?} criterion
 * - If a string, matchState uses the string as a glob-matcher against the state name
 * - If an array (of strings), matchState uses each string in the array as a glob-matchers against the state name
 *   and returns a positive match if any of the globs match.
 * - If a function, matchState calls the function with the state and returns true if the function's result is truthy.
 * @return {?}
 */
function matchState$1(state, criterion) {
    let /** @type {?} */ toMatch = isString$1(criterion) ? [criterion] : criterion;
    /**
     * @param {?} _state
     * @return {?}
     */
    function matchGlobs(_state) {
        let /** @type {?} */ globStrings = (toMatch);
        for (let /** @type {?} */ i = 0; i < globStrings.length; i++) {
            let /** @type {?} */ glob = new Glob$1(globStrings[i]);
            if ((glob && glob.matches(_state.name)) || (!glob && globStrings[i] === _state.name)) {
                return true;
            }
        }
        return false;
    }
    let /** @type {?} */ matchFn = ((isFunction$1(toMatch) ? toMatch : matchGlobs));
    return !!matchFn(state);
}
/**
 * \@internalapi
 * The registration data for a registered transition hook
 */
class RegisteredHook$1 {
    /**
     * @param {?} tranSvc
     * @param {?} eventType
     * @param {?} callback
     * @param {?} matchCriteria
     * @param {?=} options
     */
    constructor(tranSvc, eventType, callback, matchCriteria, options = ({})) {
        this.tranSvc = tranSvc;
        this.eventType = eventType;
        this.callback = callback;
        this.matchCriteria = matchCriteria;
        this.priority = options.priority || 0;
        this.bind = options.bind || null;
        this._deregistered = false;
    }
    /**
     * Gets the matching [[PathNode]]s
     *
     * Given an array of [[PathNode]]s, and a [[HookMatchCriterion]], returns an array containing
     * the [[PathNode]]s that the criteria matches, or `null` if there were no matching nodes.
     *
     * Returning `null` is significant to distinguish between the default
     * "match-all criterion value" of `true` compared to a `() => true` function,
     * when the nodes is an empty array.
     *
     * This is useful to allow a transition match criteria of `entering: true`
     * to still match a transition, even when `entering === []`.  Contrast that
     * with `entering: (state) => true` which only matches when a state is actually
     * being entered.
     * @param {?} nodes
     * @param {?} criterion
     * @return {?}
     */
    _matchingNodes(nodes, criterion) {
        if (criterion === true)
            return nodes;
        let /** @type {?} */ matching = nodes.filter(node => matchState$1(node.state, criterion));
        return matching.length ? matching : null;
    }
    /**
     * Gets the default match criteria (all `true`)
     *
     * Returns an object which has all the criteria match paths as keys and `true` as values, i.e.:
     *
     * ```js
     * {
     *   to: true,
     *   from: true,
     *   entering: true,
     *   exiting: true,
     *   retained: true,
     * }
     * @return {?}
     */
    _getDefaultMatchCriteria() {
        return map$2(this.tranSvc._pluginapi._getPathTypes(), () => true);
    }
    /**
     * Gets matching nodes as [[IMatchingNodes]]
     *
     * Create a IMatchingNodes object from the TransitionHookTypes that is roughly equivalent to:
     *
     * ```js
     * let matches: IMatchingNodes = {
     *   to:       _matchingNodes([tail(treeChanges.to)],   mc.to),
     *   from:     _matchingNodes([tail(treeChanges.from)], mc.from),
     *   exiting:  _matchingNodes(treeChanges.exiting,      mc.exiting),
     *   retained: _matchingNodes(treeChanges.retained,     mc.retained),
     *   entering: _matchingNodes(treeChanges.entering,     mc.entering),
     * };
     * ```
     * @param {?} treeChanges
     * @return {?}
     */
    _getMatchingNodes(treeChanges) {
        let /** @type {?} */ criteria = extend$1(this._getDefaultMatchCriteria(), this.matchCriteria);
        let /** @type {?} */ paths = values$1(this.tranSvc._pluginapi._getPathTypes());
        return paths.reduce((mn, pathtype) => {
            // STATE scope criteria matches against every node in the path.
            // TRANSITION scope criteria matches against only the last node in the path
            let /** @type {?} */ isStateHook = pathtype.scope === TransitionHookScope$1.STATE;
            let /** @type {?} */ path = treeChanges[pathtype.name] || [];
            let /** @type {?} */ nodes = isStateHook ? path : [tail$1(path)];
            mn[pathtype.name] = this._matchingNodes(nodes, criteria[pathtype.name]);
            return mn;
        }, /** @type {?} */ ({}));
    }
    /**
     * Determines if this hook's [[matchCriteria]] match the given [[TreeChanges]]
     *
     * @param {?} treeChanges
     * @return {?} an IMatchingNodes object, or null. If an IMatchingNodes object is returned, its values
     * are the matching [[PathNode]]s for each [[HookMatchCriterion]] (to, from, exiting, retained, entering)
     */
    matches(treeChanges) {
        let /** @type {?} */ matches = this._getMatchingNodes(treeChanges);
        // Check if all the criteria matched the TreeChanges object
        let /** @type {?} */ allMatched = values$1(matches).every(identity$1);
        return allMatched ? matches : null;
    }
}
/**
 * @hidden Return a registration function of the requested type.
 * @param {?} registry
 * @param {?} transitionService
 * @param {?} eventType
 * @return {?}
 */
function makeEvent$1(registry, transitionService, eventType) {
    // Create the object which holds the registered transition hooks.
    let /** @type {?} */ _registeredHooks = registry._registeredHooks = (registry._registeredHooks || {});
    let /** @type {?} */ hooks = _registeredHooks[eventType.name] = [];
    // Create hook registration function on the IHookRegistry for the event
    registry[eventType.name] = hookRegistrationFn;
    /**
     * @param {?} matchObject
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    function hookRegistrationFn(matchObject, callback, options = {}) {
        let /** @type {?} */ registeredHook = new RegisteredHook$1(transitionService, eventType, callback, matchObject, options);
        hooks.push(registeredHook);
        return function deregisterEventHook() {
            registeredHook._deregistered = true;
            removeFrom$1(hooks)(registeredHook);
        };
    }
    return hookRegistrationFn;
}

/**
 * @coreapi
 * @module transition
 */ /** for typedoc */
/**
 * This class returns applicable TransitionHooks for a specific Transition instance.
 *
 * Hooks ([[RegisteredHook]]) may be registered globally, e.g., $transitions.onEnter(...), or locally, e.g.
 * myTransition.onEnter(...).  The HookBuilder finds matching RegisteredHooks (where the match criteria is
 * determined by the type of hook)
 *
 * The HookBuilder also converts RegisteredHooks objects to TransitionHook objects, which are used to run a Transition.
 *
 * The HookBuilder constructor is given the $transitions service and a Transition instance.  Thus, a HookBuilder
 * instance may only be used for one specific Transition object. (side note: the _treeChanges accessor is private
 * in the Transition class, so we must also provide the Transition's _treeChanges)
 *
 */
class HookBuilder$1 {
    /**
     * @param {?} transition
     */
    constructor(transition) {
        this.transition = transition;
    }
    /**
     * @param {?} phase
     * @return {?}
     */
    buildHooksForPhase(phase) {
        let /** @type {?} */ $transitions = this.transition.router.transitionService;
        return $transitions._pluginapi._getEvents(phase)
            .map(type => this.buildHooks(type))
            .reduce(unnestR$1, [])
            .filter(identity$1);
    }
    /**
     * Returns an array of newly built TransitionHook objects.
     *
     * - Finds all RegisteredHooks registered for the given `hookType` which matched the transition's [[TreeChanges]].
     * - Finds [[PathNode]] (or `PathNode[]`) to use as the TransitionHook context(s)
     * - For each of the [[PathNode]]s, creates a TransitionHook
     *
     * @param {?} hookType the type of the hook registration function, e.g., 'onEnter', 'onFinish'.
     * @return {?}
     */
    buildHooks(hookType) {
        let /** @type {?} */ transition = this.transition;
        let /** @type {?} */ treeChanges = transition.treeChanges();
        // Find all the matching registered hooks for a given hook type
        let /** @type {?} */ matchingHooks = this.getMatchingHooks(hookType, treeChanges);
        if (!matchingHooks)
            return [];
        let /** @type {?} */ baseHookOptions = ({
            transition: transition,
            current: transition.options().current
        });
        const /** @type {?} */ makeTransitionHooks = (hook) => {
            // Fetch the Nodes that caused this hook to match.
            let /** @type {?} */ matches = hook.matches(treeChanges);
            // Select the PathNode[] that will be used as TransitionHook context objects
            let /** @type {?} */ matchingNodes = matches[hookType.criteriaMatchPath.name];
            // Return an array of HookTuples
            return matchingNodes.map(node => {
                let /** @type {?} */ _options = extend$1({
                    bind: hook.bind,
                    traceData: { hookType: hookType.name, context: node }
                }, baseHookOptions);
                let /** @type {?} */ state = hookType.criteriaMatchPath.scope === TransitionHookScope$1.STATE ? node.state.self : null;
                let /** @type {?} */ transitionHook = new TransitionHook$1(transition, state, hook, _options);
                return ({ hook, node, transitionHook });
            });
        };
        return matchingHooks.map(makeTransitionHooks)
            .reduce(unnestR$1, [])
            .sort(tupleSort(hookType.reverseSort))
            .map(tuple => tuple.transitionHook);
    }
    /**
     * Finds all RegisteredHooks from:
     * - The Transition object instance hook registry
     * - The TransitionService ($transitions) global hook registry
     *
     * which matched:
     * - the eventType
     * - the matchCriteria (to, from, exiting, retained, entering)
     *
     * @param {?} hookType
     * @param {?} treeChanges
     * @return {?} an array of matched [[RegisteredHook]]s
     */
    getMatchingHooks(hookType, treeChanges) {
        let /** @type {?} */ isCreate = hookType.hookPhase === TransitionHookPhase$1.CREATE;
        // Instance and Global hook registries
        let /** @type {?} */ $transitions = this.transition.router.transitionService;
        let /** @type {?} */ registries = isCreate ? [$transitions] : [this.transition, $transitions];
        return registries.map((reg) => reg.getHooks(hookType.name)) // Get named hooks from registries
            .filter(assertPredicate$1(isArray$1, `broken event named: ${hookType.name}`)) // Sanity check
            .reduce(unnestR$1, []) // Un-nest RegisteredHook[][] to RegisteredHook[] array
            .filter(hook => hook.matches(treeChanges)); // Only those satisfying matchCriteria
    }
}
/**
 * A factory for a sort function for HookTuples.
 *
 * The sort function first compares the PathNode depth (how deep in the state tree a node is), then compares
 * the EventHook priority.
 *
 * @param {?=} reverseDepthSort a boolean, when true, reverses the sort order for the node depth
 * @return {?} a tuple sort function
 */
function tupleSort(reverseDepthSort = false) {
    return function nodeDepthThenPriority(l, r) {
        let /** @type {?} */ factor = reverseDepthSort ? -1 : 1;
        let /** @type {?} */ depthDelta = (l.node.state.path.length - r.node.state.path.length) * factor;
        return depthDelta !== 0 ? depthDelta : r.hook.priority - l.hook.priority;
    };
}

/**
 * @coreapi
 * @module params
 */
/** */
/**
 * An internal class which implements [[ParamTypeDefinition]].
 *
 * A [[ParamTypeDefinition]] is a plain javascript object used to register custom parameter types.
 * When a param type definition is registered, an instance of this class is created internally.
 *
 * This class has naive implementations for all the [[ParamTypeDefinition]] methods.
 *
 * Used by [[UrlMatcher]] when matching or formatting URLs, or comparing and validating parameter values.
 *
 * #### Example:
 * ```js
 * var paramTypeDef = {
 *   decode: function(val) { return parseInt(val, 10); },
 *   encode: function(val) { return val && val.toString(); },
 *   equals: function(a, b) { return this.is(a) && a === b; },
 *   is: function(val) { return angular.isNumber(val) && isFinite(val) && val % 1 === 0; },
 *   pattern: /\d+/
 * }
 *
 * var paramType = new ParamType(paramTypeDef);
 * ```
 * \@internalapi
 */
class ParamType$1 {
    /**
     * @param {?} def  A configuration object which contains the custom type definition.  The object's
     *        properties will override the default methods and/or pattern in `ParamType`'s public interface.
     */
    constructor(def) {
        /**
         * \@inheritdoc
         */
        this.pattern = /.*/;
        /**
         * \@inheritdoc
         */
        this.inherit = true;
        extend$1(this, def);
    }
    /**
     * \@inheritdoc
     * @param {?} val
     * @param {?=} key
     * @return {?}
     */
    is(val$$1, key) { return true; }
    /**
     * \@inheritdoc
     * @param {?} val
     * @param {?=} key
     * @return {?}
     */
    encode(val$$1, key) { return val$$1; }
    /**
     * \@inheritdoc
     * @param {?} val
     * @param {?=} key
     * @return {?}
     */
    decode(val$$1, key) { return val$$1; }
    /**
     * \@inheritdoc
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    equals(a, b) { return a == b; }
    /**
     * @return {?}
     */
    $subPattern() {
        let /** @type {?} */ sub = this.pattern.toString();
        return sub.substr(1, sub.length - 2);
    }
    /**
     * @return {?}
     */
    toString() {
        return `{ParamType:${this.name}}`;
    }
    /**
     * Given an encoded string, or a decoded object, returns a decoded object
     * @param {?} val
     * @return {?}
     */
    $normalize(val$$1) {
        return this.is(val$$1) ? val$$1 : this.decode(val$$1);
    }
    /**
     * Wraps an existing custom ParamType as an array of ParamType, depending on 'mode'.
     * e.g.:
     * - urlmatcher pattern "/path?{queryParam[]:int}"
     * - url: "/path?queryParam=1&queryParam=2
     * - $stateParams.queryParam will be [1, 2]
     * if `mode` is "auto", then
     * - url: "/path?queryParam=1 will create $stateParams.queryParam: 1
     * - url: "/path?queryParam=1&queryParam=2 will create $stateParams.queryParam: [1, 2]
     * @param {?} mode
     * @param {?} isSearch
     * @return {?}
     */
    $asArray(mode, isSearch) {
        if (!mode)
            return this;
        if (mode === "auto" && !isSearch)
            throw new Error("'auto' array mode is for query parameters only");
        return new ((ArrayType))(this, mode);
    }
}
/**
 * Wraps up a `ParamType` object to handle array values.
 * \@internalapi
 * @param {?} type
 * @param {?} mode
 * @return {?}
 */
function ArrayType(type, mode) {
    /**
     * @param {?} val
     * @return {?}
     */
    function arrayWrap(val$$1) {
        return isArray$1(val$$1) ? val$$1 : (isDefined$1(val$$1) ? [val$$1] : []);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    function arrayUnwrap(val$$1) {
        switch (val$$1.length) {
            case 0: return undefined;
            case 1: return mode === "auto" ? val$$1[0] : val$$1;
            default: return val$$1;
        }
    }
    /**
     * @param {?} callback
     * @param {?=} allTruthyMode
     * @return {?}
     */
    function arrayHandler(callback, allTruthyMode) {
        return function handleArray(val$$1) {
            if (isArray$1(val$$1) && val$$1.length === 0)
                return val$$1;
            let /** @type {?} */ arr = arrayWrap(val$$1);
            let /** @type {?} */ result = map$2(arr, callback);
            return (allTruthyMode === true) ? filter$1(result, x => !x).length === 0 : arrayUnwrap(result);
        };
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    function arrayEqualsHandler(callback) {
        return function handleArray(val1, val2) {
            let /** @type {?} */ left = arrayWrap(val1), /** @type {?} */ right = arrayWrap(val2);
            if (left.length !== right.length)
                return false;
            for (let /** @type {?} */ i = 0; i < left.length; i++) {
                if (!callback(left[i], right[i]))
                    return false;
            }
            return true;
        };
    }
    ['encode', 'decode', 'equals', '$normalize'].forEach(name => {
        var /** @type {?} */ paramTypeFn = type[name].bind(type);
        var /** @type {?} */ wrapperFn = name === 'equals' ? arrayEqualsHandler : arrayHandler;
        this[name] = wrapperFn(paramTypeFn);
    });
    extend$1(this, {
        dynamic: type.dynamic,
        name: type.name,
        pattern: type.pattern,
        inherit: type.inherit,
        is: arrayHandler(type.is.bind(type), true),
        $arrayMode: mode
    });
}

/**
 * @coreapi
 * @module params
 */ /** for typedoc */
/**
 * @hidden
 */
let hasOwn = Object.prototype.hasOwnProperty;
/**
 * @hidden
 */
let isShorthand = (cfg) => ["value", "type", "squash", "array", "dynamic"].filter(hasOwn.bind(cfg || {})).length === 0;
let DefType$1 = {};
DefType$1.PATH = 0;
DefType$1.SEARCH = 1;
DefType$1.CONFIG = 2;
DefType$1[DefType$1.PATH] = "PATH";
DefType$1[DefType$1.SEARCH] = "SEARCH";
DefType$1[DefType$1.CONFIG] = "CONFIG";
/**
 * @hidden
 * @param {?} cfg
 * @return {?}
 */
function unwrapShorthand(cfg) {
    cfg = isShorthand(cfg) && ({ value: cfg }) || cfg;
    getStaticDefaultValue['__cacheable'] = true;
    /**
     * @return {?}
     */
    function getStaticDefaultValue() {
        return cfg.value;
    }
    return extend$1(cfg, {
        $$fn: isInjectable$1(cfg.value) ? cfg.value : getStaticDefaultValue,
    });
}
/**
 * @hidden
 * @param {?} cfg
 * @param {?} urlType
 * @param {?} location
 * @param {?} id
 * @param {?} paramTypes
 * @return {?}
 */
function getType(cfg, urlType, location, id, paramTypes) {
    if (cfg.type && urlType && urlType.name !== 'string')
        throw new Error(`Param '${id}' has two type configurations.`);
    if (cfg.type && urlType && urlType.name === 'string' && paramTypes.type(/** @type {?} */ (cfg.type)))
        return paramTypes.type(/** @type {?} */ (cfg.type));
    if (urlType)
        return urlType;
    if (!cfg.type) {
        let /** @type {?} */ type = location === DefType$1.CONFIG ? "any" :
            location === DefType$1.PATH ? "path" :
                location === DefType$1.SEARCH ? "query" : "string";
        return paramTypes.type(type);
    }
    return cfg.type instanceof ParamType$1 ? cfg.type : paramTypes.type(/** @type {?} */ (cfg.type));
}
/**
 * \@internalapi
 * returns false, true, or the squash value to indicate the "default parameter url squash policy".
 * @param {?} config
 * @param {?} isOptional
 * @param {?} defaultPolicy
 * @return {?}
 */
function getSquashPolicy(config, isOptional, defaultPolicy) {
    let /** @type {?} */ squash = config.squash;
    if (!isOptional || squash === false)
        return false;
    if (!isDefined$1(squash) || squash == null)
        return defaultPolicy;
    if (squash === true || isString$1(squash))
        return squash;
    throw new Error(`Invalid squash policy: '${squash}'. Valid policies: false, true, or arbitrary string`);
}
/**
 * \@internalapi
 * @param {?} config
 * @param {?} arrayMode
 * @param {?} isOptional
 * @param {?} squash
 * @return {?}
 */
function getReplace(config, arrayMode, isOptional, squash) {
    let /** @type {?} */ replace, /** @type {?} */ configuredKeys, /** @type {?} */ defaultPolicy = [
        { from: "", to: (isOptional || arrayMode ? undefined : "") },
        { from: null, to: (isOptional || arrayMode ? undefined : "") },
    ];
    replace = isArray$1(config.replace) ? config.replace : [];
    if (isString$1(squash))
        replace.push({ from: squash, to: undefined });
    configuredKeys = map$2(replace, prop$1("from"));
    return filter$1(defaultPolicy, item => configuredKeys.indexOf(item.from) === -1).concat(replace);
}
/**
 * \@internalapi
 */
class Param$1 {
    /**
     * @param {?} id
     * @param {?} type
     * @param {?} config
     * @param {?} location
     * @param {?} urlMatcherFactory
     */
    constructor(id, type, config, location, urlMatcherFactory) {
        config = unwrapShorthand(config);
        type = getType(config, type, location, id, urlMatcherFactory.paramTypes);
        let arrayMode = getArrayMode();
        type = arrayMode ? type.$asArray(arrayMode, location === DefType$1.SEARCH) : type;
        let isOptional = config.value !== undefined || location === DefType$1.SEARCH;
        let dynamic = isDefined$1(config.dynamic) ? !!config.dynamic : !!type.dynamic;
        let raw = isDefined$1(config.raw) ? !!config.raw : !!type.raw;
        let squash = getSquashPolicy(config, isOptional, urlMatcherFactory.defaultSquashPolicy());
        let replace = getReplace(config, arrayMode, isOptional, squash);
        let inherit$$1 = isDefined$1(config.inherit) ? !!config.inherit : !!type.inherit;
        // array config: param name (param[]) overrides default settings.  explicit config overrides param name.
        function getArrayMode() {
            let arrayDefaults = { array: (location === DefType$1.SEARCH ? "auto" : false) };
            let arrayParamNomenclature = id.match(/\[\]$/) ? { array: true } : {};
            return extend$1(arrayDefaults, arrayParamNomenclature, config).array;
        }
        extend$1(this, { id, type, location, isOptional, dynamic, raw, squash, replace, inherit: inherit$$1, array: arrayMode, config });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isDefaultValue(value) {
        return this.isOptional && this.type.equals(this.value(), value);
    }
    /**
     * [Internal] Gets the decoded representation of a value if the value is defined, otherwise, returns the
     * default value, which may be the result of an injectable function.
     * @param {?=} value
     * @return {?}
     */
    value(value) {
        /**
         * [Internal] Get the default value of a parameter, which may be an injectable function.
         */
        const getDefaultValue = () => {
            if (this._defaultValueCache)
                return this._defaultValueCache.defaultValue;
            if (!services$1.$injector)
                throw new Error("Injectable functions cannot be called at configuration time");
            let defaultValue = services$1.$injector.invoke(this.config.$$fn);
            if (defaultValue !== null && defaultValue !== undefined && !this.type.is(defaultValue))
                throw new Error(`Default value (${defaultValue}) for parameter '${this.id}' is not an instance of ParamType (${this.type.name})`);
            if (this.config.$$fn['__cacheable']) {
                this._defaultValueCache = { defaultValue };
            }
            return defaultValue;
        };
        const /** @type {?} */ replaceSpecialValues = (val$$1) => {
            for (let /** @type {?} */ tuple of this.replace) {
                if (tuple.from === val$$1)
                    return tuple.to;
            }
            return val$$1;
        };
        value = replaceSpecialValues(value);
        return isUndefined$1(value) ? getDefaultValue() : this.type.$normalize(value);
    }
    /**
     * @return {?}
     */
    isSearch() {
        return this.location === DefType$1.SEARCH;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    validates(value) {
        // There was no parameter value, but the param is optional
        if ((isUndefined$1(value) || value === null) && this.isOptional)
            return true;
        // The value was not of the correct ParamType, and could not be decoded to the correct ParamType
        const /** @type {?} */ normalized = this.type.$normalize(value);
        if (!this.type.is(normalized))
            return false;
        // The value was of the correct type, but when encoded, did not match the ParamType's regexp
        const /** @type {?} */ encoded = this.type.encode(normalized);
        return !(isString$1(encoded) && !this.type.pattern.exec(/** @type {?} */ (encoded)));
    }
    /**
     * @return {?}
     */
    toString() {
        return `{Param:${this.id} ${this.type} squash: '${this.squash}' optional: ${this.isOptional}}`;
    }
    /**
     * @param {?} params
     * @param {?=} values
     * @return {?}
     */
    static values(params, values$$1 = {}) {
        const /** @type {?} */ paramValues = ({});
        for (let /** @type {?} */ param of params) {
            paramValues[param.id] = param.value(values$$1[param.id]);
        }
        return paramValues;
    }
    /**
     * Finds [[Param]] objects which have different param values
     *
     * Filters a list of [[Param]] objects to only those whose parameter values differ in two param value objects
     *
     * @param {?} params
     * @param {?=} values1
     * @param {?=} values2
     * @return {?} any Param objects whose values were different between values1 and values2
     */
    static changed(params, values1 = {}, values2 = {}) {
        return params.filter(param => !param.type.equals(values1[param.id], values2[param.id]));
    }
    /**
     * Checks if two param value objects are equal (for a set of [[Param]] objects)
     *
     * @param {?} params The list of [[Param]] objects to check
     * @param {?=} values1 The first set of param values
     * @param {?=} values2 The second set of param values
     *
     * @return {?} true if the param values in values1 and values2 are equal
     */
    static equals(params, values1 = {}, values2 = {}) {
        return Param$1.changed(params, values1, values2).length === 0;
    }
    /**
     * Returns true if a the parameter values are valid, according to the Param definitions
     * @param {?} params
     * @param {?=} values
     * @return {?}
     */
    static validates(params, values$$1 = {}) {
        return params.map(param => param.validates(values$$1[param.id])).reduce(allTrueR$1, true);
    }
}

/** @module path */ /** for typedoc */
/**
 * \@internalapi
 *
 * A node in a [[TreeChanges]] path
 *
 * For a [[TreeChanges]] path, this class holds the stateful information for a single node in the path.
 * Each PathNode corresponds to a state being entered, exited, or retained.
 * The stateful information includes parameter values and resolve data.
 */
class PathNode$1 {
    /**
     * @param {?} stateOrNode
     */
    constructor(stateOrNode) {
        if (stateOrNode instanceof PathNode$1) {
            let node = stateOrNode;
            this.state = node.state;
            this.paramSchema = node.paramSchema.slice();
            this.paramValues = extend$1({}, node.paramValues);
            this.resolvables = node.resolvables.slice();
            this.views = node.views && node.views.slice();
        }
        else {
            let state = stateOrNode;
            this.state = state;
            this.paramSchema = state.parameters({ inherit: false });
            this.paramValues = {};
            this.resolvables = state.resolvables.map(res => res.clone());
        }
    }
    /**
     * Sets [[paramValues]] for the node, from the values of an object hash
     * @param {?} params
     * @return {?}
     */
    applyRawParams(params) {
        const /** @type {?} */ getParamVal = (paramDef) => [paramDef.id, paramDef.value(params[paramDef.id])];
        this.paramValues = this.paramSchema.reduce((memo, pDef) => applyPairs$1(memo, getParamVal(pDef)), {});
        return this;
    }
    /**
     * Gets a specific [[Param]] metadata that belongs to the node
     * @param {?} name
     * @return {?}
     */
    parameter(name) {
        return find$1(this.paramSchema, propEq$1("id", name));
    }
    /**
     * @param {?} node
     * @param {?=} paramsFn
     * @return {?} true if the state and parameter values for another PathNode are
     * equal to the state and param values for this PathNode
     */
    equals(node, paramsFn) {
        const /** @type {?} */ diff = this.diff(node, paramsFn);
        return diff && diff.length === 0;
    }
    /**
     * Finds Params with different parameter values on another PathNode.
     *
     * Given another node (of the same state), finds the parameter values which differ.
     * Returns the [[Param]] (schema objects) whose parameter values differ.
     *
     * Given another node for a different state, returns `false`
     *
     * @param {?} node The node to compare to
     * @param {?=} paramsFn A function that returns which parameters should be compared.
     * @return {?} The [[Param]]s which differ, or null if the two nodes are for different states
     */
    diff(node, paramsFn) {
        if (this.state !== node.state)
            return false;
        const /** @type {?} */ params = paramsFn ? paramsFn(this) : this.paramSchema;
        return Param$1.changed(params, this.paramValues, node.paramValues);
    }
    /**
     * Returns a clone of the PathNode
     * @param {?} node
     * @return {?}
     */
    static clone(node) {
        return new PathNode$1(node);
    }
}

/** @module path */ /** for typedoc */
/**
 * This class contains functions which convert TargetStates, Nodes and paths from one type to another.
 */
class PathUtils$1 {
    constructor() { }
    /**
     * Given a PathNode[], create an TargetState
     * @param {?} path
     * @return {?}
     */
    static makeTargetState(path) {
        let /** @type {?} */ state = tail$1(path).state;
        return new TargetState$1(state, state, path.map(prop$1("paramValues")).reduce(mergeR$1, {}));
    }
    /**
     * @param {?} targetState
     * @return {?}
     */
    static buildPath(targetState) {
        let /** @type {?} */ toParams = targetState.params();
        return targetState.$state().path.map(state => new PathNode$1(state).applyRawParams(toParams));
    }
    /**
     * Given a fromPath: PathNode[] and a TargetState, builds a toPath: PathNode[]
     * @param {?} fromPath
     * @param {?} targetState
     * @return {?}
     */
    static buildToPath(fromPath, targetState) {
        let /** @type {?} */ toPath = PathUtils$1.buildPath(targetState);
        if (targetState.options().inherit) {
            return PathUtils$1.inheritParams(fromPath, toPath, Object.keys(targetState.params()));
        }
        return toPath;
    }
    /**
     * Creates ViewConfig objects and adds to nodes.
     *
     * On each [[PathNode]], creates ViewConfig objects from the views: property of the node's state
     * @param {?} $view
     * @param {?} path
     * @param {?} states
     * @return {?}
     */
    static applyViewConfigs($view, path, states) {
        // Only apply the viewConfigs to the nodes for the given states
        path.filter(node => inArray$1(states, node.state)).forEach(node => {
            let /** @type {?} */ viewDecls = values$1(node.state.views || {});
            let /** @type {?} */ subPath = PathUtils$1.subPath(path, n => n === node);
            let /** @type {?} */ viewConfigs = viewDecls.map(view => $view.createViewConfig(subPath, view));
            node.views = viewConfigs.reduce(unnestR$1, []);
        });
    }
    /**
     * Given a fromPath and a toPath, returns a new to path which inherits parameters from the fromPath
     *
     * For a parameter in a node to be inherited from the from path:
     * - The toPath's node must have a matching node in the fromPath (by state).
     * - The parameter name must not be found in the toKeys parameter array.
     *
     * Note: the keys provided in toKeys are intended to be those param keys explicitly specified by some
     * caller, for instance, $state.transitionTo(..., toParams).  If a key was found in toParams,
     * it is not inherited from the fromPath.
     * @param {?} fromPath
     * @param {?} toPath
     * @param {?=} toKeys
     * @return {?}
     */
    static inheritParams(fromPath, toPath, toKeys = []) {
        /**
         * @param {?} path
         * @param {?} state
         * @return {?}
         */
        function nodeParamVals(path, state) {
            let /** @type {?} */ node = find$1(path, propEq$1('state', state));
            return extend$1({}, node && node.paramValues);
        }
        let /** @type {?} */ noInherit = fromPath.map(node => node.paramSchema)
            .reduce(unnestR$1, [])
            .filter(param => !param.inherit)
            .map(prop$1('id'));
        /**
         * Given an [[PathNode]] "toNode", return a new [[PathNode]] with param values inherited from the
         * matching node in fromPath.  Only inherit keys that aren't found in "toKeys" from the node in "fromPath""
         * @param {?} toNode
         * @return {?}
         */
        function makeInheritedParamsNode(toNode) {
            // All param values for the node (may include default key/vals, when key was not found in toParams)
            let /** @type {?} */ toParamVals = extend$1({}, toNode && toNode.paramValues);
            // limited to only those keys found in toParams
            let /** @type {?} */ incomingParamVals = pick$1(toParamVals, toKeys);
            toParamVals = omit$1(toParamVals, toKeys);
            let /** @type {?} */ fromParamVals = omit$1(nodeParamVals(fromPath, toNode.state) || {}, noInherit);
            // extend toParamVals with any fromParamVals, then override any of those those with incomingParamVals
            let /** @type {?} */ ownParamVals = extend$1(toParamVals, fromParamVals, incomingParamVals);
            return new PathNode$1(toNode.state).applyRawParams(ownParamVals);
        }
        // The param keys specified by the incoming toParams
        return (toPath.map(makeInheritedParamsNode));
    }
    /**
     * Computes the tree changes (entering, exiting) between a fromPath and toPath.
     * @param {?} fromPath
     * @param {?} toPath
     * @param {?} reloadState
     * @return {?}
     */
    static treeChanges(fromPath, toPath, reloadState) {
        let /** @type {?} */ keep = 0, /** @type {?} */ max = Math.min(fromPath.length, toPath.length);
        const /** @type {?} */ nodesMatch = (node1, node2) => node1.equals(node2, PathUtils$1.nonDynamicParams);
        while (keep < max && fromPath[keep].state !== reloadState && nodesMatch(fromPath[keep], toPath[keep])) {
            keep++;
        }
        /**
         * Given a retained node, return a new node which uses the to node's param values
         * @param {?} retainedNode
         * @param {?} idx
         * @return {?}
         */
        function applyToParams(retainedNode, idx) {
            let /** @type {?} */ cloned = PathNode$1.clone(retainedNode);
            cloned.paramValues = toPath[idx].paramValues;
            return cloned;
        }
        let /** @type {?} */ from, /** @type {?} */ retained, /** @type {?} */ exiting, /** @type {?} */ entering, /** @type {?} */ to;
        from = fromPath;
        retained = from.slice(0, keep);
        exiting = from.slice(keep);
        // Create a new retained path (with shallow copies of nodes) which have the params of the toPath mapped
        let /** @type {?} */ retainedWithToParams = retained.map(applyToParams);
        entering = toPath.slice(keep);
        to = (retainedWithToParams).concat(entering);
        return { from, to, retained, exiting, entering };
    }
    /**
     * Returns a new path which is: the subpath of the first path which matches the second path.
     *
     * The new path starts from root and contains any nodes that match the nodes in the second path.
     * It stops before the first non-matching node.
     *
     * Nodes are compared using their state property and their parameter values.
     * If a `paramsFn` is provided, only the [[Param]] returned by the function will be considered when comparing nodes.
     *
     * @param {?} pathA the first path
     * @param {?} pathB the second path
     * @param {?=} paramsFn a function which returns the parameters to consider when comparing
     *
     * @return {?} an array of PathNodes from the first path which match the nodes in the second path
     */
    static matching(pathA, pathB, paramsFn) {
        let /** @type {?} */ done = false;
        let /** @type {?} */ tuples = arrayTuples$1(pathA, pathB);
        return tuples.reduce((matching, [nodeA, nodeB]) => {
            done = done || !nodeA.equals(nodeB, paramsFn);
            return done ? matching : matching.concat(nodeA);
        }, []);
    }
    /**
     * Returns true if two paths are identical.
     *
     * @param {?} pathA
     * @param {?} pathB
     * @param {?=} paramsFn a function which returns the parameters to consider when comparing
     * @return {?} true if the the states and parameter values for both paths are identical
     */
    static equals(pathA, pathB, paramsFn) {
        return pathA.length === pathB.length &&
            PathUtils$1.matching(pathA, pathB, paramsFn).length === pathA.length;
    }
    /**
     * Return a subpath of a path, which stops at the first matching node
     *
     * Given an array of nodes, returns a subset of the array starting from the first node,
     * stopping when the first node matches the predicate.
     *
     * @param {?} path a path of [[PathNode]]s
     * @param {?} predicate a [[Predicate]] fn that matches [[PathNode]]s
     * @return {?} a subpath up to the matching node, or undefined if no match is found
     */
    static subPath(path, predicate) {
        let /** @type {?} */ node = find$1(path, predicate);
        let /** @type {?} */ elementIdx = path.indexOf(node);
        return elementIdx === -1 ? undefined : path.slice(0, elementIdx + 1);
    }
}
PathUtils$1.nonDynamicParams = (node) => node.state.parameters({ inherit: false })
    .filter(param => !param.dynamic);
/**
 * Gets the raw parameter values from a path
 */
PathUtils$1.paramValues = (path) => path.reduce((acc, node) => extend$1(acc, node.paramValues), {});

/**
 * @coreapi
 * @module resolve
 */ /** for typedoc */
// TODO: explicitly make this user configurable
let defaultResolvePolicy$1 = {
    when: "LAZY",
    async: "WAIT"
};
/**
 * The basic building block for the resolve system.
 *
 * Resolvables encapsulate a state's resolve's resolveFn, the resolveFn's declared dependencies, the wrapped (.promise),
 * and the unwrapped-when-complete (.data) result of the resolveFn.
 *
 * Resolvable.get() either retrieves the Resolvable's existing promise, or else invokes resolve() (which invokes the
 * resolveFn) and returns the resulting promise.
 *
 * Resolvable.get() and Resolvable.resolve() both execute within a context path, which is passed as the first
 * parameter to those fns.
 */
class Resolvable$1 {
    /**
     * @param {?} arg1
     * @param {?=} resolveFn
     * @param {?=} deps
     * @param {?=} policy
     * @param {?=} data
     */
    constructor(arg1, resolveFn, deps, policy, data) {
        this.resolved = false;
        this.promise = undefined;
        if (arg1 instanceof Resolvable$1) {
            extend$1(this, arg1);
        }
        else if (isFunction$1(resolveFn)) {
            if (arg1 == null || arg1 == undefined)
                throw new Error("new Resolvable(): token argument is required");
            if (!isFunction$1(resolveFn))
                throw new Error("new Resolvable(): resolveFn argument must be a function");
            this.token = arg1;
            this.policy = policy;
            this.resolveFn = resolveFn;
            this.deps = deps || [];
            this.data = data;
            this.resolved = data !== undefined;
            this.promise = this.resolved ? services$1.$q.when(this.data) : undefined;
        }
        else if (isObject$1(arg1) && arg1.token && isFunction$1(arg1.resolveFn)) {
            let literal = arg1;
            return new Resolvable$1(literal.token, literal.resolveFn, literal.deps, literal.policy, literal.data);
        }
    }
    /**
     * @param {?} state
     * @return {?}
     */
    getPolicy(state) {
        let /** @type {?} */ thisPolicy = this.policy || {};
        let /** @type {?} */ statePolicy = state && state.resolvePolicy || {};
        return {
            when: thisPolicy.when || statePolicy.when || defaultResolvePolicy$1.when,
            async: thisPolicy.async || statePolicy.async || defaultResolvePolicy$1.async,
        };
    }
    /**
     * Asynchronously resolve this Resolvable's data
     *
     * Given a ResolveContext that this Resolvable is found in:
     * Wait for this Resolvable's dependencies, then invoke this Resolvable's function
     * and update the Resolvable's state
     * @param {?} resolveContext
     * @param {?=} trans
     * @return {?}
     */
    resolve(resolveContext, trans) {
        let /** @type {?} */ $q$$1 = services$1.$q;
        // Gets all dependencies from ResolveContext and wait for them to be resolved
        const /** @type {?} */ getResolvableDependencies = () => ($q$$1.all(resolveContext.getDependencies(this).map(resolvable => resolvable.get(resolveContext, trans))));
        // Invokes the resolve function passing the resolved dependencies as arguments
        const /** @type {?} */ invokeResolveFn = (resolvedDeps) => this.resolveFn.apply(null, resolvedDeps);
        /**
         * For RXWAIT policy:
         *
         * Given an observable returned from a resolve function:
         * - enables .cache() mode (this allows multicast subscribers)
         * - then calls toPromise() (this triggers subscribe() and thus fetches)
         * - Waits for the promise, then return the cached observable (not the first emitted value).
         */
        const waitForRx = (observable$) => {
            let cached = observable$.cache(1);
            return cached.take(1).toPromise().then(() => cached);
        };
        // If the resolve policy is RXWAIT, wait for the observable to emit something. otherwise pass through.
        let /** @type {?} */ node = resolveContext.findNode(this);
        let /** @type {?} */ state = node && node.state;
        let /** @type {?} */ maybeWaitForRx = this.getPolicy(state).async === "RXWAIT" ? waitForRx : identity$1;
        // After the final value has been resolved, update the state of the Resolvable
        const /** @type {?} */ applyResolvedValue = (resolvedValue) => {
            this.data = resolvedValue;
            this.resolved = true;
            trace$1.traceResolvableResolved(this, trans);
            return this.data;
        };
        // Sets the promise property first, then getsResolvableDependencies in the context of the promise chain. Always waits one tick.
        return this.promise = $q$$1.when()
            .then(getResolvableDependencies)
            .then(invokeResolveFn)
            .then(maybeWaitForRx)
            .then(applyResolvedValue);
    }
    /**
     * Gets a promise for this Resolvable's data.
     *
     * Fetches the data and returns a promise.
     * Returns the existing promise if it has already been fetched once.
     * @param {?} resolveContext
     * @param {?=} trans
     * @return {?}
     */
    get(resolveContext, trans) {
        return this.promise || this.resolve(resolveContext, trans);
    }
    /**
     * Gets the result of the resolvable.
     *
     * The return value depends on `policy.async`:
     *
     * * `WAIT`: Returns the resolved value of the promise, or undefined if it has not yet resolved
     * * `NOWAIT`: Returns the promise for the result
     * @return {?}
     */
    result() {
        return this.policy.async === 'NOWAIT' ? this.promise : this.data;
    }
    /**
     * @return {?}
     */
    toString() {
        return `Resolvable(token: ${stringify$1(this.token)}, requires: [${this.deps.map(stringify$1)}])`;
    }
    /**
     * @return {?}
     */
    clone() {
        return new Resolvable$1(this);
    }
}
Resolvable$1.fromData = (token, data) => new Resolvable$1(token, () => data, null, null, data);

/**
 * # The Resolve subsystem
 *
 * This subsystem is an asynchronous, hierarchical Dependency Injection system.
 *
 * Typically, resolve is configured on a state using a [[StateDeclaration.resolve]] declaration.
 *
 * @coreapi
 * @module resolve
 */ /** for typedoc */
/**
 * \@internalapi
 */
let resolvePolicies$1 = {
    when: {
        LAZY: "LAZY",
        EAGER: "EAGER"
    },
    async: {
        WAIT: "WAIT",
        NOWAIT: "NOWAIT",
        RXWAIT: "RXWAIT"
    }
};

/** @module resolve */
/** for typedoc */
const when = resolvePolicies$1.when;
const ALL_WHENS = [when.EAGER, when.LAZY];
const EAGER_WHENS = [when.EAGER];
const NATIVE_INJECTOR_TOKEN$1 = "Native Injector";
/**
 * Encapsulates Dependency Injection for a path of nodes
 *
 * UI-Router states are organized as a tree.
 * A nested state has a path of ancestors to the root of the tree.
 * When a state is being activated, each element in the path is wrapped as a [[PathNode]].
 * A `PathNode` is a stateful object that holds things like parameters and resolvables for the state being activated.
 *
 * The ResolveContext closes over the [[PathNode]]s, and provides DI for the last node in the path.
 */
class ResolveContext$1 {
    /**
     * @param {?} _path
     */
    constructor(_path) {
        this._path = _path;
    }
    /**
     * Gets all the tokens found in the resolve context, de-duplicated
     * @return {?}
     */
    getTokens() {
        return this._path.reduce((acc, node) => acc.concat(node.resolvables.map(r => r.token)), []).reduce(uniqR$1, []);
    }
    /**
     * Gets the Resolvable that matches the token
     *
     * Gets the last Resolvable that matches the token in this context, or undefined.
     * Throws an error if it doesn't exist in the ResolveContext
     * @param {?} token
     * @return {?}
     */
    getResolvable(token) {
        let /** @type {?} */ matching = this._path.map(node => node.resolvables)
            .reduce(unnestR$1, [])
            .filter((r) => r.token === token);
        return tail$1(matching);
    }
    /**
     * Returns the [[ResolvePolicy]] for the given [[Resolvable]]
     * @param {?} resolvable
     * @return {?}
     */
    getPolicy(resolvable) {
        let /** @type {?} */ node = this.findNode(resolvable);
        return resolvable.getPolicy(node.state);
    }
    /**
     * Returns a ResolveContext that includes a portion of this one
     *
     * Given a state, this method creates a new ResolveContext from this one.
     * The new context starts at the first node (root) and stops at the node for the `state` parameter.
     *
     * #### Why
     *
     * When a transition is created, the nodes in the "To Path" are injected from a ResolveContext.
     * A ResolveContext closes over a path of [[PathNode]]s and processes the resolvables.
     * The "To State" can inject values from its own resolvables, as well as those from all its ancestor state's (node's).
     * This method is used to create a narrower context when injecting ancestor nodes.
     *
     * \@example
     * `let ABCD = new ResolveContext([A, B, C, D]);`
     *
     * Given a path `[A, B, C, D]`, where `A`, `B`, `C` and `D` are nodes for states `a`, `b`, `c`, `d`:
     * When injecting `D`, `D` should have access to all resolvables from `A`, `B`, `C`, `D`.
     * However, `B` should only be able to access resolvables from `A`, `B`.
     *
     * When resolving for the `B` node, first take the full "To Path" Context `[A,B,C,D]` and limit to the subpath `[A,B]`.
     * `let AB = ABCD.subcontext(a)`
     * @param {?} state
     * @return {?}
     */
    subContext(state) {
        return new ResolveContext$1(PathUtils$1.subPath(this._path, node => node.state === state));
    }
    /**
     * Adds Resolvables to the node that matches the state
     *
     * This adds a [[Resolvable]] (generally one created on the fly; not declared on a [[StateDeclaration.resolve]] block).
     * The resolvable is added to the node matching the `state` parameter.
     *
     * These new resolvables are not automatically fetched.
     * The calling code should either fetch them, fetch something that depends on them,
     * or rely on [[resolvePath]] being called when some state is being entered.
     *
     * Note: each resolvable's [[ResolvePolicy]] is merged with the state's policy, and the global default.
     *
     * @param {?} newResolvables the new Resolvables
     * @param {?} state Used to find the node to put the resolvable on
     * @return {?}
     */
    addResolvables(newResolvables, state) {
        let /** @type {?} */ node = (find$1(this._path, propEq$1('state', state)));
        let /** @type {?} */ keys = newResolvables.map(r => r.token);
        node.resolvables = node.resolvables.filter(r => keys.indexOf(r.token) === -1).concat(newResolvables);
    }
    /**
     * Returns a promise for an array of resolved path Element promises
     *
     * @param {?=} when
     * @param {?=} trans
     * @return {?}
     */
    resolvePath(when = "LAZY", trans) {
        // This option determines which 'when' policy Resolvables we are about to fetch.
        let /** @type {?} */ whenOption = inArray$1(ALL_WHENS, when) ? when : "LAZY";
        // If the caller specified EAGER, only the EAGER Resolvables are fetched.
        // if the caller specified LAZY, both EAGER and LAZY Resolvables are fetched.`
        let /** @type {?} */ matchedWhens = whenOption === resolvePolicies$1.when.EAGER ? EAGER_WHENS : ALL_WHENS;
        // get the subpath to the state argument, if provided
        trace$1.traceResolvePath(this._path, when, trans);
        const /** @type {?} */ matchesPolicy = (acceptedVals, whenOrAsync) => (resolvable) => inArray$1(acceptedVals, this.getPolicy(resolvable)[whenOrAsync]);
        // Trigger all the (matching) Resolvables in the path
        // Reduce all the "WAIT" Resolvables into an array
        let /** @type {?} */ promises = this._path.reduce((acc, node) => {
            let /** @type {?} */ nodeResolvables = node.resolvables.filter(matchesPolicy(matchedWhens, 'when'));
            let /** @type {?} */ nowait = nodeResolvables.filter(matchesPolicy(['NOWAIT'], 'async'));
            let /** @type {?} */ wait = nodeResolvables.filter(not$1(matchesPolicy(['NOWAIT'], 'async')));
            // For the matching Resolvables, start their async fetch process.
            let /** @type {?} */ subContext = this.subContext(node.state);
            let /** @type {?} */ getResult = (r) => r.get(subContext, trans)
                .then(value => ({ token: r.token, value: value }));
            nowait.forEach(getResult);
            return acc.concat(wait.map(getResult));
        }, []);
        // Wait for all the "WAIT" resolvables
        return services$1.$q.all(promises);
    }
    /**
     * @return {?}
     */
    injector() {
        return this._injector || (this._injector = new UIInjectorImpl(this));
    }
    /**
     * @param {?} resolvable
     * @return {?}
     */
    findNode(resolvable) {
        return find$1(this._path, (node) => inArray$1(node.resolvables, resolvable));
    }
    /**
     * Gets the async dependencies of a Resolvable
     *
     * Given a Resolvable, returns its dependencies as a Resolvable[]
     * @param {?} resolvable
     * @return {?}
     */
    getDependencies(resolvable) {
        let /** @type {?} */ node = this.findNode(resolvable);
        // Find which other resolvables are "visible" to the `resolvable` argument
        // subpath stopping at resolvable's node, or the whole path (if the resolvable isn't in the path)
        let /** @type {?} */ subPath = PathUtils$1.subPath(this._path, x => x === node) || this._path;
        let /** @type {?} */ availableResolvables = subPath
            .reduce((acc, node) => acc.concat(node.resolvables), []) //all of subpath's resolvables
            .filter(res => res !== resolvable); // filter out the `resolvable` argument
        const /** @type {?} */ getDependency = (token) => {
            let /** @type {?} */ matching = availableResolvables.filter(r => r.token === token);
            if (matching.length)
                return tail$1(matching);
            let /** @type {?} */ fromInjector = this.injector().getNative(token);
            if (!fromInjector) {
                throw new Error("Could not find Dependency Injection token: " + stringify$1(token));
            }
            return new Resolvable$1(token, () => fromInjector, [], fromInjector);
        };
        return resolvable.deps.map(getDependency);
    }
}
class UIInjectorImpl {
    /**
     * @param {?} context
     */
    constructor(context) {
        this.context = context;
        this.native = this.get(NATIVE_INJECTOR_TOKEN$1) || services$1.$injector;
    }
    /**
     * @param {?} token
     * @return {?}
     */
    get(token) {
        let /** @type {?} */ resolvable = this.context.getResolvable(token);
        if (resolvable) {
            if (this.context.getPolicy(resolvable).async === 'NOWAIT') {
                return resolvable.get(this.context);
            }
            if (!resolvable.resolved) {
                throw new Error("Resolvable async .get() not complete:" + stringify$1(resolvable.token));
            }
            return resolvable.data;
        }
        return this.native && this.native.get(token);
    }
    /**
     * @param {?} token
     * @return {?}
     */
    getAsync(token) {
        let /** @type {?} */ resolvable = this.context.getResolvable(token);
        if (resolvable)
            return resolvable.get(this.context);
        return services$1.$q.when(this.native.get(token));
    }
    /**
     * @param {?} token
     * @return {?}
     */
    getNative(token) {
        return this.native && this.native.get(token);
    }
}

/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
/**
 * @hidden
 */
const stateSelf = prop$1("self");
/**
 * Represents a transition between two states.
 *
 * When navigating to a state, we are transitioning **from** the current state **to** the new state.
 *
 * This object contains all contextual information about the to/from states, parameters, resolves.
 * It has information about all states being entered and exited as a result of the transition.
 */
class Transition$1 {
    /**
     * Creates a new Transition object.
     *
     * If the target state is not valid, an error is thrown.
     *
     * \@internalapi
     *
     * @param {?} fromPath The path of [[PathNode]]s from which the transition is leaving.  The last node in the `fromPath`
     *        encapsulates the "from state".
     * @param {?} targetState The target state and parameters being transitioned to (also, the transition options)
     * @param {?} router The [[UIRouter]] instance
     */
    constructor(fromPath, targetState, router) {
        /**
         * @hidden
         */
        this._deferred = services$1.$q.defer();
        /**
         * This promise is resolved or rejected based on the outcome of the Transition.
         *
         * When the transition is successful, the promise is resolved
         * When the transition is unsuccessful, the promise is rejected with the [[Rejection]] or javascript error
         */
        this.promise = this._deferred.promise;
        /**
         * @hidden Holds the hook registration functions such as those passed to Transition.onStart()
         */
        this._registeredHooks = {};
        /**
         * @hidden
         */
        this._hookBuilder = new HookBuilder$1(this);
        /**
         * Checks if this transition is currently active/running.
         */
        this.isActive = () => this.router.globals.transition === this;
        this.router = router;
        this._targetState = targetState;
        if (!targetState.valid()) {
            throw new Error(targetState.error());
        }
        // current() is assumed to come from targetState.options, but provide a naive implementation otherwise.
        this._options = extend$1({ current: val$1(this) }, targetState.options());
        this.$id = router.transitionService._transitionCount++;
        let toPath = PathUtils$1.buildToPath(fromPath, targetState);
        this._treeChanges = PathUtils$1.treeChanges(fromPath, toPath, this._options.reloadState);
        this.createTransitionHookRegFns();
        let onCreateHooks = this._hookBuilder.buildHooksForPhase(TransitionHookPhase$1.CREATE);
        TransitionHook$1.invokeHooks(onCreateHooks, () => null);
        this.applyViewConfigs(router);
    }
    /**
     * @hidden
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onBefore(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onStart(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onExit(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onRetain(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onEnter(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onFinish(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onSuccess(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onError(criteria, callback, options) { return; }
    /**
     * @hidden
     * Creates the transition-level hook registration functions
     * (which can then be used to register hooks)
     * @return {?}
     */
    createTransitionHookRegFns() {
        this.router.transitionService._pluginapi._getEvents()
            .filter(type => type.hookPhase !== TransitionHookPhase$1.CREATE)
            .forEach(type => makeEvent$1(this, this.router.transitionService, type));
    }
    /**
     * \@internalapi
     * @param {?} hookName
     * @return {?}
     */
    getHooks(hookName) {
        return this._registeredHooks[hookName];
    }
    /**
     * @param {?} router
     * @return {?}
     */
    applyViewConfigs(router) {
        let /** @type {?} */ enteringStates = this._treeChanges.entering.map(node => node.state);
        PathUtils$1.applyViewConfigs(router.transitionService.$view, this._treeChanges.to, enteringStates);
    }
    /**
     * \@internalapi
     *
     * @return {?} the internal from [State] object
     */
    $from() {
        return tail$1(this._treeChanges.from).state;
    }
    /**
     * \@internalapi
     *
     * @return {?} the internal to [State] object
     */
    $to() {
        return tail$1(this._treeChanges.to).state;
    }
    /**
     * Returns the "from state"
     *
     * Returns the state that the transition is coming *from*.
     *
     * @return {?} The state declaration object for the Transition's ("from state").
     */
    from() {
        return this.$from().self;
    }
    /**
     * Returns the "to state"
     *
     * Returns the state that the transition is going *to*.
     *
     * @return {?} The state declaration object for the Transition's target state ("to state").
     */
    to() {
        return this.$to().self;
    }
    /**
     * Gets the Target State
     *
     * A transition's [[TargetState]] encapsulates the [[to]] state, the [[params]], and the [[options]] as a single object.
     *
     * @return {?} the [[TargetState]] of this Transition
     */
    targetState() {
        return this._targetState;
    }
    /**
     * Determines whether two transitions are equivalent.
     * @deprecated
     * @param {?} compare
     * @return {?}
     */
    is(compare) {
        if (compare instanceof Transition$1) {
            // TODO: Also compare parameters
            return this.is({ to: compare.$to().name, from: compare.$from().name });
        }
        return !((compare.to && !matchState$1(this.$to(), compare.to)) ||
            (compare.from && !matchState$1(this.$from(), compare.from)));
    }
    /**
     * @param {?=} pathname
     * @return {?}
     */
    params(pathname = "to") {
        return Object.freeze(this._treeChanges[pathname].map(prop$1("paramValues")).reduce(mergeR$1, {}));
    }
    /**
     * Creates a [[UIInjector]] Dependency Injector
     *
     * Returns a Dependency Injector for the Transition's target state (to state).
     * The injector provides resolve values which the target state has access to.
     *
     * The `UIInjector` can also provide values from the native root/global injector (ng1/ng2).
     *
     * #### Example:
     * ```js
     * .onEnter({ entering: 'myState' }, trans => {
     *   var myResolveValue = trans.injector().get('myResolve');
     *   // Inject a global service from the global/native injector (if it exists)
     *   var MyService = trans.injector().get('MyService');
     * })
     * ```
     *
     * In some cases (such as `onBefore`), you may need access to some resolve data but it has not yet been fetched.
     * You can use [[UIInjector.getAsync]] to get a promise for the data.
     * #### Example:
     * ```js
     * .onBefore({}, trans => {
     *   return trans.injector().getAsync('myResolve').then(myResolveValue =>
     *     return myResolveValue !== 'ABORT';
     *   });
     * });
     * ```
     *
     * If a `state` is provided, the injector that is returned will be limited to resolve values that the provided state has access to.
     * This can be useful if both a parent state `foo` and a child state `foo.bar` have both defined a resolve such as `data`.
     * #### Example:
     * ```js
     * .onEnter({ to: 'foo.bar' }, trans => {
     *   // returns result of `foo` state's `data` resolve
     *   // even though `foo.bar` also has a `data` resolve
     *   var fooData = trans.injector('foo').get('data');
     * });
     * ```
     *
     * If you need resolve data from the exiting states, pass `'from'` as `pathName`.
     * The resolve data from the `from` path will be returned.
     * #### Example:
     * ```js
     * .onExit({ exiting: 'foo.bar' }, trans => {
     *   // Gets the resolve value of `data` from the exiting state.
     *   var fooData = trans.injector(null, 'foo.bar').get('data');
     * });
     * ```
     *
     *
     * @param {?=} state Limits the resolves provided to only the resolves the provided state has access to.
     * @param {?=} pathName Default: `'to'`: Chooses the path for which to create the injector. Use this to access resolves for `exiting` states.
     *
     * @return {?} a [[UIInjector]]
     */
    injector(state, pathName = "to") {
        let /** @type {?} */ path = this._treeChanges[pathName];
        if (state)
            path = PathUtils$1.subPath(path, node => node.state === state || node.state.name === state);
        return new ResolveContext$1(path).injector();
    }
    /**
     * Gets all available resolve tokens (keys)
     *
     * This method can be used in conjunction with [[injector]] to inspect the resolve values
     * available to the Transition.
     *
     * This returns all the tokens defined on [[StateDeclaration.resolve]] blocks, for the states
     * in the Transition's [[TreeChanges.to]] path.
     *
     * #### Example:
     * This example logs all resolve values
     * ```js
     * let tokens = trans.getResolveTokens();
     * tokens.forEach(token => console.log(token + " = " + trans.injector().get(token)));
     * ```
     *
     * #### Example:
     * This example creates promises for each resolve value.
     * This triggers fetches of resolves (if any have not yet been fetched).
     * When all promises have all settled, it logs the resolve values.
     * ```js
     * let tokens = trans.getResolveTokens();
     * let promise = tokens.map(token => trans.injector().getAsync(token));
     * Promise.all(promises).then(values => console.log("Resolved values: " + values));
     * ```
     *
     * Note: Angular 1 users whould use `$q.all()`
     *
     * @param {?=} pathname resolve context's path name (e.g., `to` or `from`)
     *
     * @return {?} an array of resolve tokens (keys)
     */
    getResolveTokens(pathname = "to") {
        return new ResolveContext$1(this._treeChanges[pathname]).getTokens();
    }
    /**
     * Dynamically adds a new [[Resolvable]] (i.e., [[StateDeclaration.resolve]]) to this transition.
     *
     * #### Example:
     * ```js
     * transitionService.onBefore({}, transition => {
     *   transition.addResolvable({
     *     token: 'myResolve',
     *     deps: ['MyService'],
     *     resolveFn: myService => myService.getData()
     *   });
     * });
     * ```
     *
     * @param {?} resolvable a [[ResolvableLiteral]] object (or a [[Resolvable]])
     * @param {?=} state the state in the "to path" which should receive the new resolve (otherwise, the root state)
     * @return {?}
     */
    addResolvable(resolvable, state = "") {
        resolvable = is$1(Resolvable$1)(resolvable) ? resolvable : new Resolvable$1(resolvable);
        let /** @type {?} */ stateName = (typeof state === "string") ? state : state.name;
        let /** @type {?} */ topath = this._treeChanges.to;
        let /** @type {?} */ targetNode = find$1(topath, node => node.state.name === stateName);
        let /** @type {?} */ resolveContext = new ResolveContext$1(topath);
        resolveContext.addResolvables([/** @type {?} */ (resolvable)], targetNode.state);
    }
    /**
     * Gets the transition from which this transition was redirected.
     *
     * If the current transition is a redirect, this method returns the transition that was redirected.
     *
     * #### Example:
     * ```js
     * let transitionA = $state.go('A').transition
     * transitionA.onStart({}, () => $state.target('B'));
     * $transitions.onSuccess({ to: 'B' }, (trans) => {
     *   trans.to().name === 'B'; // true
     *   trans.redirectedFrom() === transitionA; // true
     * });
     * ```
     *
     * @return {?} The previous Transition, or null if this Transition is not the result of a redirection
     */
    redirectedFrom() {
        return this._options.redirectedFrom || null;
    }
    /**
     * Gets the original transition in a redirect chain
     *
     * A transition might belong to a long chain of multiple redirects.
     * This method walks the [[redirectedFrom]] chain back to the original (first) transition in the chain.
     *
     * #### Example:
     * ```js
     * // states
     * registry.register({ name: 'A', redirectTo: 'B' });
     * registry.register({ name: 'B', redirectTo: 'C' });
     * registry.register({ name: 'C', redirectTo: 'D' });
     * registry.register({ name: 'D' });
     *
     * let transitionA = $state.go('A').transition
     *
     * $transitions.onSuccess({ to: 'D' }, (trans) => {
     *   trans.to().name === 'D'; // true
     *   trans.redirectedFrom().to().name === 'C'; // true
     *   trans.originalTransition() === transitionA; // true
     *   trans.originalTransition().to().name === 'A'; // true
     * });
     * ```
     *
     * @return {?} The original Transition that started a redirect chain
     */
    originalTransition() {
        let /** @type {?} */ rf = this.redirectedFrom();
        return (rf && rf.originalTransition()) || this;
    }
    /**
     * Get the transition options
     *
     * @return {?} the options for this Transition.
     */
    options() {
        return this._options;
    }
    /**
     * Gets the states being entered.
     *
     * @return {?} an array of states that will be entered during this transition.
     */
    entering() {
        return map$2(this._treeChanges.entering, prop$1('state')).map(stateSelf);
    }
    /**
     * Gets the states being exited.
     *
     * @return {?} an array of states that will be exited during this transition.
     */
    exiting() {
        return map$2(this._treeChanges.exiting, prop$1('state')).map(stateSelf).reverse();
    }
    /**
     * Gets the states being retained.
     *
     * @return {?} an array of states that are already entered from a previous Transition, that will not be
     *    exited during this Transition
     */
    retained() {
        return map$2(this._treeChanges.retained, prop$1('state')).map(stateSelf);
    }
    /**
     * Get the [[ViewConfig]]s associated with this Transition
     *
     * Each state can define one or more views (template/controller), which are encapsulated as `ViewConfig` objects.
     * This method fetches the `ViewConfigs` for a given path in the Transition (e.g., "to" or "entering").
     *
     * @param {?=} pathname the name of the path to fetch views for:
     *   (`'to'`, `'from'`, `'entering'`, `'exiting'`, `'retained'`)
     * @param {?=} state If provided, only returns the `ViewConfig`s for a single state in the path
     *
     * @return {?} a list of ViewConfig objects for the given path.
     */
    views(pathname = "entering", state) {
        let /** @type {?} */ path = this._treeChanges[pathname];
        path = !state ? path : path.filter(propEq$1('state', state));
        return path.map(prop$1("views")).filter(identity$1).reduce(unnestR$1, []);
    }
    /**
     * @param {?=} pathname
     * @return {?}
     */
    treeChanges(pathname) {
        return pathname ? this._treeChanges[pathname] : this._treeChanges;
    }
    /**
     * Creates a new transition that is a redirection of the current one.
     *
     * This transition can be returned from a [[TransitionService]] hook to
     * redirect a transition to a new state and/or set of parameters.
     *
     * \@internalapi
     *
     * @param {?} targetState
     * @return {?} Returns a new [[Transition]] instance.
     */
    redirect(targetState) {
        let /** @type {?} */ redirects = 1, /** @type {?} */ trans = this;
        while ((trans = trans.redirectedFrom()) != null) {
            if (++redirects > 20)
                throw new Error(`Too many consecutive Transition redirects (20+)`);
        }
        let /** @type {?} */ redirectOpts = { redirectedFrom: this, source: "redirect" };
        // If the original transition was caused by URL sync, then use { location: 'replace' }
        // on the new transition (unless the target state explicitly specifies location: false).
        // This causes the original url to be replaced with the url for the redirect target
        // so the original url disappears from the browser history.
        if (this.options().source === 'url' && targetState.options().location !== false) {
            redirectOpts.location = 'replace';
        }
        let /** @type {?} */ newOptions = extend$1({}, this.options(), targetState.options(), redirectOpts);
        targetState = new TargetState$1(targetState.identifier(), targetState.$state(), targetState.params(), newOptions);
        let /** @type {?} */ newTransition = this.router.transitionService.create(this._treeChanges.from, targetState);
        let /** @type {?} */ originalEnteringNodes = this._treeChanges.entering;
        let /** @type {?} */ redirectEnteringNodes = newTransition._treeChanges.entering;
        // --- Re-use resolve data from original transition ---
        // When redirecting from a parent state to a child state where the parent parameter values haven't changed
        // (because of the redirect), the resolves fetched by the original transition are still valid in the
        // redirected transition.
        //
        // This allows you to define a redirect on a parent state which depends on an async resolve value.
        // You can wait for the resolve, then redirect to a child state based on the result.
        // The redirected transition does not have to re-fetch the resolve.
        // ---------------------------------------------------------
        const /** @type {?} */ nodeIsReloading = (reloadState) => (node) => {
            return reloadState && node.state.includes[reloadState.name];
        };
        // Find any "entering" nodes in the redirect path that match the original path and aren't being reloaded
        let /** @type {?} */ matchingEnteringNodes = PathUtils$1.matching(redirectEnteringNodes, originalEnteringNodes, PathUtils$1.nonDynamicParams)
            .filter(not$1(nodeIsReloading(targetState.options().reloadState)));
        // Use the existing (possibly pre-resolved) resolvables for the matching entering nodes.
        matchingEnteringNodes.forEach((node, idx) => {
            node.resolvables = originalEnteringNodes[idx].resolvables;
        });
        return newTransition;
    }
    /**
     * @hidden If a transition doesn't exit/enter any states, returns any [[Param]] whose value changed
     * @return {?}
     */
    _changedParams() {
        let /** @type {?} */ tc = this._treeChanges;
        /** Return undefined if it's not a "dynamic" transition, for the following reasons */
        // If user explicitly wants a reload
        if (this._options.reload)
            return undefined;
        // If any states are exiting or entering
        if (tc.exiting.length || tc.entering.length)
            return undefined;
        // If to/from path lengths differ
        if (tc.to.length !== tc.from.length)
            return undefined;
        // If the to/from paths are different
        let /** @type {?} */ pathsDiffer = arrayTuples$1(tc.to, tc.from)
            .map(tuple => tuple[0].state !== tuple[1].state)
            .reduce(anyTrueR$1, false);
        if (pathsDiffer)
            return undefined;
        // Find any parameter values that differ
        let /** @type {?} */ nodeSchemas = tc.to.map((node) => node.paramSchema);
        let [toValues, fromValues] = [tc.to, tc.from].map(path => path.map(x => x.paramValues));
        let /** @type {?} */ tuples = arrayTuples$1(nodeSchemas, toValues, fromValues);
        return tuples.map(([schema, toVals, fromVals]) => Param$1.changed(schema, toVals, fromVals)).reduce(unnestR$1, []);
    }
    /**
     * Returns true if the transition is dynamic.
     *
     * A transition is dynamic if no states are entered nor exited, but at least one dynamic parameter has changed.
     *
     * @return {?} true if the Transition is dynamic
     */
    dynamic() {
        let /** @type {?} */ changes = this._changedParams();
        return !changes ? false : changes.map(x => x.dynamic).reduce(anyTrueR$1, false);
    }
    /**
     * Returns true if the transition is ignored.
     *
     * A transition is ignored if no states are entered nor exited, and no parameter values have changed.
     *
     * @return {?} true if the Transition is ignored.
     */
    ignored() {
        return !!this._ignoredReason();
    }
    /**
     * @hidden
     * @return {?}
     */
    _ignoredReason() {
        const /** @type {?} */ pending = this.router.globals.transition;
        const /** @type {?} */ reloadState = this._options.reloadState;
        const /** @type {?} */ same = (pathA, pathB) => {
            if (pathA.length !== pathB.length)
                return false;
            const /** @type {?} */ matching = PathUtils$1.matching(pathA, pathB);
            return pathA.length === matching.filter(node => !reloadState || !node.state.includes[reloadState.name]).length;
        };
        let /** @type {?} */ newTC = this.treeChanges();
        let /** @type {?} */ pendTC = pending && pending.treeChanges();
        if (pendTC && same(pendTC.to, newTC.to) && same(pendTC.exiting, newTC.exiting))
            return "SameAsPending";
        if (newTC.exiting.length === 0 && newTC.entering.length === 0 && same(newTC.from, newTC.to))
            return "SameAsCurrent";
    }
    /**
     * Runs the transition
     *
     * This method is generally called from the [[StateService.transitionTo]]
     *
     * \@internalapi
     *
     * @return {?} a promise for a successful transition.
     */
    run() {
        let /** @type {?} */ runAllHooks = TransitionHook$1.runAllHooks;
        // Gets transition hooks array for the given phase
        const /** @type {?} */ getHooksFor = (phase) => this._hookBuilder.buildHooksForPhase(phase);
        // When the chain is complete, then resolve or reject the deferred
        const /** @type {?} */ transitionSuccess = () => {
            trace$1.traceSuccess(this.$to(), this);
            this.success = true;
            this._deferred.resolve(this.to());
            runAllHooks(getHooksFor(TransitionHookPhase$1.SUCCESS));
        };
        const /** @type {?} */ transitionError = (reason) => {
            trace$1.traceError(reason, this);
            this.success = false;
            this._deferred.reject(reason);
            this._error = reason;
            runAllHooks(getHooksFor(TransitionHookPhase$1.ERROR));
        };
        const /** @type {?} */ runTransition = () => {
            // Wait to build the RUN hook chain until the BEFORE hooks are done
            // This allows a BEFORE hook to dynamically add additional RUN hooks via the Transition object.
            let /** @type {?} */ allRunHooks = getHooksFor(TransitionHookPhase$1.RUN);
            let /** @type {?} */ done = () => services$1.$q.when(undefined);
            return TransitionHook$1.invokeHooks(allRunHooks, done);
        };
        const /** @type {?} */ startTransition = () => {
            let /** @type {?} */ globals = this.router.globals;
            globals.lastStartedTransitionId = this.$id;
            globals.transition = this;
            globals.transitionHistory.enqueue(this);
            trace$1.traceTransitionStart(this);
            return services$1.$q.when(undefined);
        };
        let /** @type {?} */ allBeforeHooks = getHooksFor(TransitionHookPhase$1.BEFORE);
        TransitionHook$1.invokeHooks(allBeforeHooks, startTransition)
            .then(runTransition)
            .then(transitionSuccess, transitionError);
        return this.promise;
    }
    /**
     * Checks if the Transition is valid
     *
     * @return {?} true if the Transition is valid
     */
    valid() {
        return !this.error() || this.success !== undefined;
    }
    /**
     * Aborts this transition
     *
     * Imperative API to abort a Transition.
     * This only applies to Transitions that are not yet complete.
     * @return {?}
     */
    abort() {
        // Do not set flag if the transition is already complete
        if (isUndefined$1(this.success)) {
            this._aborted = true;
        }
    }
    /**
     * The Transition error reason.
     *
     * If the transition is invalid (and could not be run), returns the reason the transition is invalid.
     * If the transition was valid and ran, but was not successful, returns the reason the transition failed.
     *
     * @return {?} an error message explaining why the transition is invalid, or the reason the transition failed.
     */
    error() {
        let /** @type {?} */ state = this.$to();
        if (state.self.abstract)
            return `Cannot transition to abstract state '${state.name}'`;
        const /** @type {?} */ paramDefs = state.parameters(), /** @type {?} */ values$$1 = this.params();
        const /** @type {?} */ invalidParams = paramDefs.filter(param => !param.validates(values$$1[param.id]));
        if (invalidParams.length) {
            return `Param values not valid for state '${state.name}'. Invalid params: [ ${invalidParams.map(param => param.id).join(', ')} ]`;
        }
        if (this.success === false)
            return this._error;
    }
    /**
     * A string representation of the Transition
     *
     * @return {?} A string representation of the Transition
     */
    toString() {
        let /** @type {?} */ fromStateOrName = this.from();
        let /** @type {?} */ toStateOrName = this.to();
        const /** @type {?} */ avoidEmptyHash = (params) => (params["#"] !== null && params["#"] !== undefined) ? params : omit$1(params, ["#"]);
        // (X) means the to state is invalid.
        let /** @type {?} */ id = this.$id, /** @type {?} */ from = isObject$1(fromStateOrName) ? fromStateOrName.name : fromStateOrName, /** @type {?} */ fromParams = toJson$1(avoidEmptyHash(this._treeChanges.from.map(prop$1('paramValues')).reduce(mergeR$1, {}))), /** @type {?} */ toValid = this.valid() ? "" : "(X) ", /** @type {?} */ to = isObject$1(toStateOrName) ? toStateOrName.name : toStateOrName, /** @type {?} */ toParams = toJson$1(avoidEmptyHash(this.params()));
        return `Transition#${id}( '${from}'${fromParams} -> ${toValid}'${to}'${toParams} )`;
    }
}
/**
 * @hidden
 */
Transition$1.diToken = Transition$1;

/**
 * Functions that manipulate strings
 *
 * Although these functions are exported, they are subject to change without notice.
 *
 * @module common_strings
 */ /** */
/**
 * Returns a string shortened to a maximum length
 *
 * If the string is already less than the `max` length, return the string.
 * Else return the string, shortened to `max - 3` and append three dots ("...").
 *
 * @param {?} max the maximum length of the string to return
 * @param {?} str the input string
 * @return {?}
 */
function maxLength$1(max, str) {
    if (str.length <= max)
        return str;
    return str.substr(0, max - 3) + "...";
}
/**
 * Returns a string, with spaces added to the end, up to a desired str length
 *
 * If the string is already longer than the desired length, return the string.
 * Else returns the string, with extra spaces on the end, such that it reaches `length` characters.
 *
 * @param {?} length the desired length of the string to return
 * @param {?} str the input string
 * @return {?}
 */
function padString$1(length, str) {
    while (str.length < length)
        str += " ";
    return str;
}
/**
 * @param {?} camelCase
 * @return {?}
 */

/**
 * @param {?} fn
 * @return {?}
 */
function functionToString$1(fn) {
    let /** @type {?} */ fnStr = fnToString$1(fn);
    let /** @type {?} */ namedFunctionMatch = fnStr.match(/^(function [^ ]+\([^)]*\))/);
    let /** @type {?} */ toStr = namedFunctionMatch ? namedFunctionMatch[1] : fnStr;
    let /** @type {?} */ fnName = fn['name'] || "";
    if (fnName && toStr.match(/function \(/)) {
        return 'function ' + fnName + toStr.substr(9);
    }
    return toStr;
}
/**
 * @param {?} fn
 * @return {?}
 */
function fnToString$1(fn) {
    let /** @type {?} */ _fn = isArray$1(fn) ? fn.slice(-1)[0] : fn;
    return _fn && _fn.toString() || "undefined";
}
let stringifyPatternFn = null;
let stringifyPattern = function (value) {
    let /** @type {?} */ isRejection = Rejection$1.isRejectionPromise;
    stringifyPatternFn = (stringifyPatternFn) || pattern$1([
        [not$1(isDefined$1), val$1("undefined")],
        [isNull$1, val$1("null")],
        [isPromise$1, val$1("[Promise]")],
        [isRejection, (x) => x._transitionRejection.toString()],
        [is$1(Rejection$1), invoke$1("toString")],
        [is$1(Transition$1), invoke$1("toString")],
        [is$1(Resolvable$1), invoke$1("toString")],
        [isInjectable$1, functionToString$1],
        [val$1(true), identity$1]
    ]);
    return stringifyPatternFn(value);
};
/**
 * @param {?} o
 * @return {?}
 */
function stringify$1(o) {
    var /** @type {?} */ seen = [];
    /**
     * @param {?} val
     * @return {?}
     */
    function format(val$$1) {
        if (isObject$1(val$$1)) {
            if (seen.indexOf(val$$1) !== -1)
                return '[circular ref]';
            seen.push(val$$1);
        }
        return stringifyPattern(val$$1);
    }
    return JSON.stringify(o, (key, val$$1) => format(val$$1)).replace(/\\"/g, '"');
}
/**
 * Returns a function that splits a string on a character or substring
 */

/**
 * Splits on a delimiter, but returns the delimiters in the array
 *
 * #### Example:
 * ```js
 * var splitOnSlashes = splitOnDelim('/');
 * splitOnSlashes("/foo"); // ["/", "foo"]
 * splitOnSlashes("/foo/"); // ["/", "foo", "/"]
 * ```
 * @param {?} delim
 * @return {?}
 */
function splitOnDelim$1(delim) {
    let /** @type {?} */ re = new RegExp("(" + delim + ")", "g");
    return (str) => str.split(re).filter(identity$1);
}

/**
 * Reduce fn that joins neighboring strings
 *
 * Given an array of strings, returns a new array
 * where all neighboring strings have been joined.
 *
 * #### Example:
 * ```js
 * let arr = ["foo", "bar", 1, "baz", "", "qux" ];
 * arr.reduce(joinNeighborsR, []) // ["foobar", 1, "bazqux" ]
 * ```
 * @param {?} acc
 * @param {?} x
 * @return {?}
 */
function joinNeighborsR$1(acc, x) {
    if (isString$1(tail$1(acc)) && isString$1(x))
        return acc.slice(0, -1).concat(tail$1(acc) + x);
    return pushR$1(acc, x);
}

/** @module common */ /** for typedoc */

/**
 * @coreapi
 * @module params
 */
/** */
/**
 * A registry for parameter types.
 *
 * This registry manages the built-in (and custom) parameter types.
 *
 * The built-in parameter types are:
 *
 * - [[string]]
 * - [[path]]
 * - [[query]]
 * - [[hash]]
 * - [[int]]
 * - [[bool]]
 * - [[date]]
 * - [[json]]
 * - [[any]]
 */
class ParamTypes$1 {
    /**
     * \@internalapi
     */
    constructor() {
        /**
         * @hidden
         */
        this.enqueue = true;
        /**
         * @hidden
         */
        this.typeQueue = [];
        /**
         * \@internalapi
         */
        this.defaultTypes = pick$1(ParamTypes$1.prototype, ["hash", "string", "query", "path", "int", "bool", "date", "json", "any"]);
        // Register default types. Store them in the prototype of this.types.
        const makeType = (definition, name) => new ParamType$1(extend$1({ name }, definition));
        this.types = inherit$1(map$2(this.defaultTypes, makeType), {});
    }
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.types = {};
    }
    /**
     * Registers a parameter type
     *
     * End users should call [[UrlMatcherFactory.type]], which delegates to this method.
     * @param {?} name
     * @param {?=} definition
     * @param {?=} definitionFn
     * @return {?}
     */
    type(name, definition, definitionFn) {
        if (!isDefined$1(definition))
            return this.types[name];
        if (this.types.hasOwnProperty(name))
            throw new Error(`A type named '${name}' has already been defined.`);
        this.types[name] = new ParamType$1(extend$1({ name }, definition));
        if (definitionFn) {
            this.typeQueue.push({ name, def: definitionFn });
            if (!this.enqueue)
                this._flushTypeQueue();
        }
        return this;
    }
    /**
     * \@internalapi
     * @return {?}
     */
    _flushTypeQueue() {
        while (this.typeQueue.length) {
            let /** @type {?} */ type = this.typeQueue.shift();
            if (type.pattern)
                throw new Error("You cannot override a type's .pattern at runtime.");
            extend$1(this.types[type.name], services$1.$injector.invoke(type.def));
        }
    }
}
/**
 * @hidden
 * @return {?}
 */
function initDefaultTypes() {
    const /** @type {?} */ makeDefaultType = (def) => {
        const /** @type {?} */ valToString = (val$$1) => val$$1 != null ? val$$1.toString() : val$$1;
        const /** @type {?} */ defaultTypeBase = {
            encode: valToString,
            decode: valToString,
            is: is$1(String),
            pattern: /.*/,
            equals: (a, b) => a == b,
        };
        return (extend$1({}, defaultTypeBase, def));
    };
    // Default Parameter Type Definitions
    extend$1(ParamTypes$1.prototype, {
        string: makeDefaultType({}),
        path: makeDefaultType({
            pattern: /[^/]*/,
        }),
        query: makeDefaultType({}),
        hash: makeDefaultType({
            inherit: false,
        }),
        int: makeDefaultType({
            decode: (val$$1) => parseInt(val$$1, 10),
            is: function (val$$1) {
                return !isNullOrUndefined$1(val$$1) && this.decode(val$$1.toString()) === val$$1;
            },
            pattern: /-?\d+/,
        }),
        bool: makeDefaultType({
            encode: (val$$1) => val$$1 && 1 || 0,
            decode: (val$$1) => parseInt(val$$1, 10) !== 0,
            is: is$1(Boolean),
            pattern: /0|1/
        }),
        date: makeDefaultType({
            encode: function (val$$1) {
                return !this.is(val$$1) ? undefined : [
                    val$$1.getFullYear(),
                    ('0' + (val$$1.getMonth() + 1)).slice(-2),
                    ('0' + val$$1.getDate()).slice(-2)
                ].join("-");
            },
            decode: function (val$$1) {
                if (this.is(val$$1))
                    return ((val$$1));
                let /** @type {?} */ match = this.capture.exec(val$$1);
                return match ? new Date(match[1], match[2] - 1, match[3]) : undefined;
            },
            is: (val$$1) => val$$1 instanceof Date && !isNaN(val$$1.valueOf()),
            /**
             * @param {?} l
             * @param {?} r
             * @return {?}
             */
            equals(l, r) {
                return ['getFullYear', 'getMonth', 'getDate']
                    .reduce((acc, fn) => acc && l[fn]() === r[fn](), true);
            },
            pattern: /[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/,
            capture: /([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/
        }),
        json: makeDefaultType({
            encode: toJson$1,
            decode: fromJson$1,
            is: is$1(Object),
            equals: equals$1,
            pattern: /[^/]*/
        }),
        // does not encode/decode
        any: makeDefaultType({
            encode: identity$1,
            decode: identity$1,
            is: () => true,
            equals: equals$1,
        }),
    });
}
initDefaultTypes();

/**
 * @coreapi
 * @module params
 */
/** */
/**
 * \@internalapi
 */
class StateParams$1 {
    /**
     * @param {?=} params
     */
    constructor(params = {}) {
        extend$1(this, params);
    }
    /**
     * Merges a set of parameters with all parameters inherited between the common parents of the
     * current state and a given destination state.
     *
     * @param {?} newParams
     * @param {?} $current
     * @param {?} $to
     * @return {?}
     */
    $inherit(newParams, $current, $to) {
        let /** @type {?} */ parents = ancestors$1($current, $to), /** @type {?} */ parentParams, /** @type {?} */ inherited = {}, /** @type {?} */ inheritList = [];
        for (let /** @type {?} */ i in parents) {
            if (!parents[i] || !parents[i].params)
                continue;
            parentParams = Object.keys(parents[i].params);
            if (!parentParams.length)
                continue;
            for (let /** @type {?} */ j in parentParams) {
                if (inheritList.indexOf(parentParams[j]) >= 0)
                    continue;
                inheritList.push(parentParams[j]);
                inherited[parentParams[j]] = this[parentParams[j]];
            }
        }
        return extend$1({}, inherited, newParams);
    }
    ;
}

/** @module path */ /** for typedoc */

/** @module resolve */ /** for typedoc */

/** @module state */ /** for typedoc */
const parseUrl$1 = (url) => {
    if (!isString$1(url))
        return false;
    let /** @type {?} */ root = url.charAt(0) === '^';
    return { val: root ? url.substring(1) : url, root };
};
/**
 * @param {?} state
 * @return {?}
 */
function nameBuilder(state) {
    return state.name;
}
/**
 * @param {?} state
 * @return {?}
 */
function selfBuilder(state) {
    state.self.$$state = () => state;
    return state.self;
}
/**
 * @param {?} state
 * @return {?}
 */
function dataBuilder(state) {
    if (state.parent && state.parent.data) {
        state.data = state.self.data = inherit$1(state.parent.data, state.data);
    }
    return state.data;
}
const getUrlBuilder = ($urlMatcherFactoryProvider, root) => function urlBuilder(state) {
    let /** @type {?} */ stateDec = (state);
    // For future states, i.e., states whose name ends with `.**`,
    // match anything that starts with the url prefix
    if (stateDec && stateDec.url && stateDec.name && stateDec.name.match(/\.\*\*$/)) {
        stateDec.url += "{remainder:any}"; // match any path (.*)
    }
    const /** @type {?} */ parsed = parseUrl$1(stateDec.url), /** @type {?} */ parent = state.parent;
    const /** @type {?} */ url = !parsed ? stateDec.url : $urlMatcherFactoryProvider.compile(parsed.val, {
        params: state.params || {},
        paramMap: function (paramConfig, isSearch) {
            if (stateDec.reloadOnSearch === false && isSearch)
                paramConfig = extend$1(paramConfig || {}, { dynamic: true });
            return paramConfig;
        }
    });
    if (!url)
        return null;
    if (!$urlMatcherFactoryProvider.isMatcher(url))
        throw new Error(`Invalid url '${url}' in state '${state}'`);
    return (parsed && parsed.root) ? url : ((parent && parent.navigable) || root()).url.append(/** @type {?} */ (url));
};
const getNavigableBuilder = (isRoot) => function navigableBuilder(state) {
    return !isRoot(state) && state.url ? state : (state.parent ? state.parent.navigable : null);
};
const getParamsBuilder = (paramFactory) => function paramsBuilder(state) {
    const /** @type {?} */ makeConfigParam = (config, id) => paramFactory.fromConfig(id, null, config);
    let /** @type {?} */ urlParams = (state.url && state.url.parameters({ inherit: false })) || [];
    let /** @type {?} */ nonUrlParams = values$1(mapObj$1(omit$1(state.params || {}, urlParams.map(prop$1('id'))), makeConfigParam));
    return urlParams.concat(nonUrlParams).map(p => [p.id, p]).reduce(applyPairs$1, {});
};
/**
 * @param {?} state
 * @return {?}
 */
function pathBuilder(state) {
    return state.parent ? state.parent.path.concat(state) : [state];
}
/**
 * @param {?} state
 * @return {?}
 */
function includesBuilder(state) {
    let /** @type {?} */ includes = state.parent ? extend$1({}, state.parent.includes) : {};
    includes[state.name] = true;
    return includes;
}
/**
 * This is a [[StateBuilder.builder]] function for the `resolve:` block on a [[StateDeclaration]].
 *
 * When the [[StateBuilder]] builds a [[StateObject]] object from a raw [[StateDeclaration]], this builder
 * validates the `resolve` property and converts it to a [[Resolvable]] array.
 *
 * resolve: input value can be:
 *
 * {
 *   // analyzed but not injected
 *   myFooResolve: function() { return "myFooData"; },
 *
 *   // function.toString() parsed, "DependencyName" dep as string (not min-safe)
 *   myBarResolve: function(DependencyName) { return DependencyName.fetchSomethingAsPromise() },
 *
 *   // Array split; "DependencyName" dep as string
 *   myBazResolve: [ "DependencyName", function(dep) { return dep.fetchSomethingAsPromise() },
 *
 *   // Array split; DependencyType dep as token (compared using ===)
 *   myQuxResolve: [ DependencyType, function(dep) { return dep.fetchSometingAsPromise() },
 *
 *   // val.$inject used as deps
 *   // where:
 *   //     corgeResolve.$inject = ["DependencyName"];
 *   //     function corgeResolve(dep) { dep.fetchSometingAsPromise() }
 *   // then "DependencyName" dep as string
 *   myCorgeResolve: corgeResolve,
 *
 *  // inject service by name
 *  // When a string is found, desugar creating a resolve that injects the named service
 *   myGraultResolve: "SomeService"
 * }
 *
 * or:
 *
 * [
 *   new Resolvable("myFooResolve", function() { return "myFooData" }),
 *   new Resolvable("myBarResolve", function(dep) { return dep.fetchSomethingAsPromise() }, [ "DependencyName" ]),
 *   { provide: "myBazResolve", useFactory: function(dep) { dep.fetchSomethingAsPromise() }, deps: [ "DependencyName" ] }
 * ]
 * @param {?} state
 * @return {?}
 */
function resolvablesBuilder$1(state) {
    /**
     * convert resolve: {} and resolvePolicy: {} objects to an array of tuples
     */
    const objects2Tuples = (resolveObj, resolvePolicies$$1) => Object.keys(resolveObj || {}).map(token => ({ token, val: resolveObj[token], deps: undefined, policy: resolvePolicies$$1[token] }));
    /**
     * fetch DI annotations from a function or ng1-style array
     */
    const annotate = (fn) => {
        let $injector$$1 = services$1.$injector;
        // ng1 doesn't have an $injector until runtime.
        // If the $injector doesn't exist, use "deferred" literal as a
        // marker indicating they should be annotated when runtime starts
        return fn['$inject'] || ($injector$$1 && $injector$$1.annotate(fn, $injector$$1.strictDi)) || "deferred";
    };
    /**
     * true if the object has both `token` and `resolveFn`, and is probably a [[ResolveLiteral]]
     */
    const isResolveLiteral = (obj) => !!(obj.token && obj.resolveFn);
    /**
     * true if the object looks like a provide literal, or a ng2 Provider
     */
    const isLikeNg2Provider = (obj) => !!((obj.provide || obj.token) && (obj.useValue || obj.useFactory || obj.useExisting || obj.useClass));
    /**
     * true if the object looks like a tuple from obj2Tuples
     */
    const isTupleFromObj = (obj) => !!(obj && obj.val && (isString$1(obj.val) || isArray$1(obj.val) || isFunction$1(obj.val)));
    /**
     * extracts the token from a Provider or provide literal
     */
    const token = (p) => p.provide || p.token;
    /**
     * Given a literal resolve or provider object, returns a Resolvable
     */
    const literal2Resolvable = pattern$1([
        [prop$1('resolveFn'), p => new Resolvable$1(token(p), p.resolveFn, p.deps, p.policy)],
        [prop$1('useFactory'), p => new Resolvable$1(token(p), p.useFactory, (p.deps || p.dependencies), p.policy)],
        [prop$1('useClass'), p => new Resolvable$1(token(p), () => new p.useClass(), [], p.policy)],
        [prop$1('useValue'), p => new Resolvable$1(token(p), () => p.useValue, [], p.policy, p.useValue)],
        [prop$1('useExisting'), p => new Resolvable$1(token(p), identity$1, [p.useExisting], p.policy)],
    ]);
    const /** @type {?} */ tuple2Resolvable = pattern$1([
        [pipe$1(prop$1("val"), isString$1), (tuple) => new Resolvable$1(tuple.token, identity$1, [tuple.val], tuple.policy)],
        [pipe$1(prop$1("val"), isArray$1), (tuple) => new Resolvable$1(tuple.token, tail$1(/** @type {?} */ (tuple.val)), tuple.val.slice(0, -1), tuple.policy)],
        [pipe$1(prop$1("val"), isFunction$1), (tuple) => new Resolvable$1(tuple.token, tuple.val, annotate(tuple.val), tuple.policy)],
    ]);
    const /** @type {?} */ item2Resolvable = (pattern$1([
        [is$1(Resolvable$1), (r) => r],
        [isResolveLiteral, literal2Resolvable],
        [isLikeNg2Provider, literal2Resolvable],
        [isTupleFromObj, tuple2Resolvable],
        [val$1(true), (obj) => { throw new Error("Invalid resolve value: " + stringify$1(obj)); }]
    ]));
    // If resolveBlock is already an array, use it as-is.
    // Otherwise, assume it's an object and convert to an Array of tuples
    let /** @type {?} */ decl = state.resolve;
    let /** @type {?} */ items = isArray$1(decl) ? decl : objects2Tuples(decl, state.resolvePolicy || {});
    return items.map(item2Resolvable);
}
/**
 * \@internalapi A internal global service
 *
 * StateBuilder is a factory for the internal [[StateObject]] objects.
 *
 * When you register a state with the [[StateRegistry]], you register a plain old javascript object which
 * conforms to the [[StateDeclaration]] interface.  This factory takes that object and builds the corresponding
 * [[StateObject]] object, which has an API and is used internally.
 *
 * Custom properties or API may be added to the internal [[StateObject]] object by registering a decorator function
 * using the [[builder]] method.
 */
class StateBuilder$1 {
    /**
     * @param {?} matcher
     * @param {?} urlMatcherFactory
     */
    constructor(matcher, urlMatcherFactory) {
        this.matcher = matcher;
        let self = this;
        const root = () => matcher.find("");
        const isRoot = (state) => state.name === "";
        function parentBuilder(state) {
            if (isRoot(state))
                return null;
            return matcher.find(self.parentName(state)) || root();
        }
        this.builders = {
            name: [nameBuilder],
            self: [selfBuilder],
            parent: [parentBuilder],
            data: [dataBuilder],
            // Build a URLMatcher if necessary, either via a relative or absolute URL
            url: [getUrlBuilder(urlMatcherFactory, root)],
            // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
            navigable: [getNavigableBuilder(isRoot)],
            params: [getParamsBuilder(urlMatcherFactory.paramFactory)],
            // Each framework-specific ui-router implementation should define its own `views` builder
            // e.g., src/ng1/statebuilders/views.ts
            views: [],
            // Keep a full path from the root down to this state as this is needed for state activation.
            path: [pathBuilder],
            // Speed up $state.includes() as it's used a lot
            includes: [includesBuilder],
            resolvables: [resolvablesBuilder$1]
        };
    }
    /**
     * Registers a [[BuilderFunction]] for a specific [[StateObject]] property (e.g., `parent`, `url`, or `path`).
     * More than one BuilderFunction can be registered for a given property.
     *
     * The BuilderFunction(s) will be used to define the property on any subsequently built [[StateObject]] objects.
     *
     * @param {?} name The name of the State property being registered for.
     * @param {?} fn The BuilderFunction which will be used to build the State property
     * @return {?} a function which deregisters the BuilderFunction
     */
    builder(name, fn) {
        let /** @type {?} */ builders = this.builders;
        let /** @type {?} */ array = builders[name] || [];
        // Backwards compat: if only one builder exists, return it, else return whole arary.
        if (isString$1(name) && !isDefined$1(fn))
            return array.length > 1 ? array : array[0];
        if (!isString$1(name) || !isFunction$1(fn))
            return;
        builders[name] = array;
        builders[name].push(fn);
        return () => builders[name].splice(builders[name].indexOf(fn, 1)) && null;
    }
    /**
     * Builds all of the properties on an essentially blank State object, returning a State object which has all its
     * properties and API built.
     *
     * @param {?} state an uninitialized State object
     * @return {?} the built State object
     */
    build(state) {
        let { matcher, builders } = this;
        let /** @type {?} */ parent = this.parentName(state);
        if (parent && !matcher.find(parent, undefined, false)) {
            return null;
        }
        for (let /** @type {?} */ key in builders) {
            if (!builders.hasOwnProperty(key))
                continue;
            let /** @type {?} */ chain = builders[key].reduce((parentFn, step) => (_state) => step(_state, parentFn), noop$1);
            state[key] = chain(state);
        }
        return state;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    parentName(state) {
        // name = 'foo.bar.baz.**'
        let /** @type {?} */ name = state.name || "";
        // segments = ['foo', 'bar', 'baz', '.**']
        let /** @type {?} */ segments = name.split('.');
        // segments = ['foo', 'bar', 'baz']
        let /** @type {?} */ lastSegment = segments.pop();
        // segments = ['foo', 'bar'] (ignore .** segment for future states)
        if (lastSegment === '**')
            segments.pop();
        if (segments.length) {
            if (state.parent) {
                throw new Error(`States that specify the 'parent:' property should not have a '.' in their name (${name})`);
            }
            // 'foo.bar'
            return segments.join(".");
        }
        if (!state.parent)
            return "";
        return isString$1(state.parent) ? state.parent : state.parent.name;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    name(state) {
        let /** @type {?} */ name = state.name;
        if (name.indexOf('.') !== -1 || !state.parent)
            return name;
        let /** @type {?} */ parentName = isString$1(state.parent) ? state.parent : state.parent.name;
        return parentName ? parentName + "." + name : name;
    }
}

/** @module state */ /** for typedoc */
class StateMatcher$1 {
    /**
     * @param {?} _states
     */
    constructor(_states) {
        this._states = _states;
    }
    /**
     * @param {?} stateName
     * @return {?}
     */
    isRelative(stateName) {
        stateName = stateName || "";
        return stateName.indexOf(".") === 0 || stateName.indexOf("^") === 0;
    }
    /**
     * @param {?} stateOrName
     * @param {?=} base
     * @param {?=} matchGlob
     * @return {?}
     */
    find(stateOrName, base, matchGlob = true) {
        if (!stateOrName && stateOrName !== "")
            return undefined;
        let /** @type {?} */ isStr = isString$1(stateOrName);
        let /** @type {?} */ name = isStr ? stateOrName : ((stateOrName)).name;
        if (this.isRelative(name))
            name = this.resolvePath(name, base);
        let /** @type {?} */ state = this._states[name];
        if (state && (isStr || (!isStr && (state === stateOrName || state.self === stateOrName)))) {
            return state;
        }
        else if (isStr && matchGlob) {
            let /** @type {?} */ _states = values$1(this._states);
            let /** @type {?} */ matches = _states.filter(state => state.__stateObjectCache.nameGlob &&
                state.__stateObjectCache.nameGlob.matches(name));
            if (matches.length > 1) {
                console.log(`stateMatcher.find: Found multiple matches for ${name} using glob: `, matches.map(match => match.name));
            }
            return matches[0];
        }
        return undefined;
    }
    /**
     * @param {?} name
     * @param {?} base
     * @return {?}
     */
    resolvePath(name, base) {
        if (!base)
            throw new Error(`No reference point given for path '${name}'`);
        let /** @type {?} */ baseState = this.find(base);
        let /** @type {?} */ splitName = name.split("."), /** @type {?} */ i = 0, /** @type {?} */ pathLength = splitName.length, /** @type {?} */ current = baseState;
        for (; i < pathLength; i++) {
            if (splitName[i] === "" && i === 0) {
                current = baseState;
                continue;
            }
            if (splitName[i] === "^") {
                if (!current.parent)
                    throw new Error(`Path '${name}' not valid for state '${baseState.name}'`);
                current = current.parent;
                continue;
            }
            break;
        }
        let /** @type {?} */ relName = splitName.slice(i).join(".");
        return current.name + (current.name && relName ? "." : "") + relName;
    }
}

/** @module state */ /** for typedoc */
/**
 * \@internalapi
 */
class StateQueueManager$1 {
    /**
     * @param {?} $registry
     * @param {?} $urlRouter
     * @param {?} states
     * @param {?} builder
     * @param {?} listeners
     */
    constructor($registry, $urlRouter, states, builder, listeners) {
        this.$registry = $registry;
        this.$urlRouter = $urlRouter;
        this.states = states;
        this.builder = builder;
        this.listeners = listeners;
        this.queue = [];
        this.matcher = $registry.matcher;
    }
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.queue = [];
    }
    /**
     * @param {?} stateDecl
     * @return {?}
     */
    register(stateDecl) {
        let /** @type {?} */ queue = this.queue;
        let /** @type {?} */ state = StateObject$1.create(stateDecl);
        let /** @type {?} */ name = state.name;
        if (!isString$1(name))
            throw new Error("State must have a valid name");
        if (this.states.hasOwnProperty(name) || inArray$1(queue.map(prop$1('name')), name))
            throw new Error(`State '${name}' is already defined`);
        queue.push(state);
        this.flush();
        return state;
    }
    /**
     * @return {?}
     */
    flush() {
        let { queue, states, builder } = this;
        let /** @type {?} */ registered = [], /** @type {?} */ // states that got registered
        orphans = [], /** @type {?} */ // states that don't yet have a parent registered
        previousQueueLength = {}; // keep track of how long the queue when an orphan was first encountered
        const /** @type {?} */ getState = (name) => this.states.hasOwnProperty(name) && this.states[name];
        while (queue.length > 0) {
            let /** @type {?} */ state = queue.shift();
            let /** @type {?} */ name = state.name;
            let /** @type {?} */ result = builder.build(state);
            let /** @type {?} */ orphanIdx = orphans.indexOf(state);
            if (result) {
                let /** @type {?} */ existingState = getState(name);
                if (existingState && existingState.name === name) {
                    throw new Error(`State '${name}' is already defined`);
                }
                let /** @type {?} */ existingFutureState = getState(name + ".**");
                if (existingFutureState) {
                    // Remove future state of the same name
                    this.$registry.deregister(existingFutureState);
                }
                states[name] = state;
                this.attachRoute(state);
                if (orphanIdx >= 0)
                    orphans.splice(orphanIdx, 1);
                registered.push(state);
                continue;
            }
            let /** @type {?} */ prev = previousQueueLength[name];
            previousQueueLength[name] = queue.length;
            if (orphanIdx >= 0 && prev === queue.length) {
                // Wait until two consecutive iterations where no additional states were dequeued successfully.
                // throw new Error(`Cannot register orphaned state '${name}'`);
                queue.push(state);
                return states;
            }
            else if (orphanIdx < 0) {
                orphans.push(state);
            }
            queue.push(state);
        }
        if (registered.length) {
            this.listeners.forEach(listener => listener("registered", registered.map(s => s.self)));
        }
        return states;
    }
    /**
     * @param {?} state
     * @return {?}
     */
    attachRoute(state) {
        if (state.abstract || !state.url)
            return;
        this.$urlRouter.rule(this.$urlRouter.urlRuleFactory.create(state));
    }
}

/**
 * @coreapi
 * @module state
 */ /** for typedoc */
class StateRegistry$1 {
    /**
     * \@internalapi
     * @param {?} _router
     */
    constructor(_router) {
        this._router = _router;
        this.states = {};
        this.listeners = [];
        this.matcher = new StateMatcher$1(this.states);
        this.builder = new StateBuilder$1(this.matcher, _router.urlMatcherFactory);
        this.stateQueue = new StateQueueManager$1(this, _router.urlRouter, this.states, this.builder, this.listeners);
        this._registerRoot();
    }
    /**
     * \@internalapi
     * @return {?}
     */
    _registerRoot() {
        let /** @type {?} */ rootStateDef = {
            name: '',
            url: '^',
            views: null,
            params: {
                '#': { value: null, type: 'hash', dynamic: true }
            },
            abstract: true
        };
        let /** @type {?} */ _root = this._root = this.stateQueue.register(rootStateDef);
        _root.navigable = null;
    }
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.stateQueue.dispose();
        this.listeners = [];
        this.get().forEach(state => this.get(state) && this.deregister(state));
    }
    /**
     * Listen for a State Registry events
     *
     * Adds a callback that is invoked when states are registered or deregistered with the StateRegistry.
     *
     * #### Example:
     * ```js
     * let allStates = registry.get();
     *
     * // Later, invoke deregisterFn() to remove the listener
     * let deregisterFn = registry.onStatesChanged((event, states) => {
     *   switch(event) {
     *     case: 'registered':
     *       states.forEach(state => allStates.push(state));
     *       break;
     *     case: 'deregistered':
     *       states.forEach(state => {
     *         let idx = allStates.indexOf(state);
     *         if (idx !== -1) allStates.splice(idx, 1);
     *       });
     *       break;
     *   }
     * });
     * ```
     *
     * @param {?} listener a callback function invoked when the registered states changes.
     *        The function receives two parameters, `event` and `state`.
     *        See [[StateRegistryListener]]
     * @return {?} a function that deregisters the listener
     */
    onStatesChanged(listener) {
        this.listeners.push(listener);
        return function deregisterListener() {
            removeFrom$1(this.listeners)(listener);
        }.bind(this);
    }
    /**
     * Gets the implicit root state
     *
     * Gets the root of the state tree.
     * The root state is implicitly created by UI-Router.
     * Note: this returns the internal [[StateObject]] representation, not a [[StateDeclaration]]
     *
     * @return {?} the root [[StateObject]]
     */
    root() {
        return this._root;
    }
    /**
     * Adds a state to the registry
     *
     * Registers a [[StateDeclaration]] or queues it for registration.
     *
     * Note: a state will be queued if the state's parent isn't yet registered.
     *
     * @param {?} stateDefinition the definition of the state to register.
     * @return {?} the internal [[StateObject]] object.
     *          If the state was successfully registered, then the object is fully built (See: [[StateBuilder]]).
     *          If the state was only queued, then the object is not fully built.
     */
    register(stateDefinition) {
        return this.stateQueue.register(stateDefinition);
    }
    /**
     * @hidden
     * @param {?} state
     * @return {?}
     */
    _deregisterTree(state) {
        let /** @type {?} */ all$$1 = this.get().map(s => s.$$state());
        const /** @type {?} */ getChildren = (states) => {
            let /** @type {?} */ children = all$$1.filter(s => states.indexOf(s.parent) !== -1);
            return children.length === 0 ? children : children.concat(getChildren(children));
        };
        let /** @type {?} */ children = getChildren([state]);
        let /** @type {?} */ deregistered = [state].concat(children).reverse();
        deregistered.forEach(state => {
            let /** @type {?} */ $ur = this._router.urlRouter;
            // Remove URL rule
            $ur.rules().filter(propEq$1("state", state)).forEach($ur.removeRule.bind($ur));
            // Remove state from registry
            delete this.states[state.name];
        });
        return deregistered;
    }
    /**
     * Removes a state from the registry
     *
     * This removes a state from the registry.
     * If the state has children, they are are also removed from the registry.
     *
     * @param {?} stateOrName the state's name or object representation
     * @return {?}
     */
    deregister(stateOrName) {
        let /** @type {?} */ _state = this.get(stateOrName);
        if (!_state)
            throw new Error("Can't deregister state; not found: " + stateOrName);
        let /** @type {?} */ deregisteredStates = this._deregisterTree(_state.$$state());
        this.listeners.forEach(listener => listener("deregistered", deregisteredStates.map(s => s.self)));
        return deregisteredStates;
    }
    /**
     * @param {?=} stateOrName
     * @param {?=} base
     * @return {?}
     */
    get(stateOrName, base) {
        if (arguments.length === 0)
            return (Object.keys(this.states).map(name => this.states[name].self));
        let /** @type {?} */ found = this.matcher.find(stateOrName, base);
        return found && found.self || null;
    }
    /**
     * @param {?} name
     * @param {?} func
     * @return {?}
     */
    decorator(name, func) {
        return this.builder.builder(name, func);
    }
}

/**
 * @coreapi
 * @module url
 */
/** for typedoc */
/**
 * @hidden
 * @param {?} string
 * @param {?=} param
 * @return {?}
 */
function quoteRegExp(string, param) {
    let /** @type {?} */ surroundPattern = ['', ''], /** @type {?} */ result = string.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&");
    if (!param)
        return result;
    switch (param.squash) {
        case false:
            surroundPattern = ['(', ')' + (param.isOptional ? '?' : '')];
            break;
        case true:
            result = result.replace(/\/$/, '');
            surroundPattern = ['(?:\/(', ')|\/)?'];
            break;
        default:
            surroundPattern = [`(${param.squash}|`, ')?'];
            break;
    }
    return result + surroundPattern[0] + param.type.pattern.source + surroundPattern[1];
}
/**
 * @hidden
 */
const memoizeTo = (obj, prop$$1, fn) => obj[prop$$1] = obj[prop$$1] || fn();
/**
 * @hidden
 */
const splitOnSlash = splitOnDelim$1('/');
/**
 * Matches URLs against patterns.
 *
 * Matches URLs against patterns and extracts named parameters from the path or the search
 * part of the URL.
 *
 * A URL pattern consists of a path pattern, optionally followed by '?' and a list of search (query)
 * parameters. Multiple search parameter names are separated by '&'. Search parameters
 * do not influence whether or not a URL is matched, but their values are passed through into
 * the matched parameters returned by [[UrlMatcher.exec]].
 *
 * - *Path parameters* are defined using curly brace placeholders (`/somepath/{param}`)
 * or colon placeholders (`/somePath/:param`).
 *
 * - *A parameter RegExp* may be defined for a param after a colon
 * (`/somePath/{param:[a-zA-Z0-9]+}`) in a curly brace placeholder.
 * The regexp must match for the url to be matched.
 * Should the regexp itself contain curly braces, they must be in matched pairs or escaped with a backslash.
 *
 * Note: a RegExp parameter will encode its value using either [[ParamTypes.path]] or [[ParamTypes.query]].
 *
 * - *Custom parameter types* may also be specified after a colon (`/somePath/{param:int}`) in curly brace parameters.
 *   See [[UrlMatcherFactory.type]] for more information.
 *
 * - *Catch-all parameters* are defined using an asterisk placeholder (`/somepath/*catchallparam`).
 *   A catch-all * parameter value will contain the remainder of the URL.
 *
 * ---
 *
 * Parameter names may contain only word characters (latin letters, digits, and underscore) and
 * must be unique within the pattern (across both path and search parameters).
 * A path parameter matches any number of characters other than '/'. For catch-all
 * placeholders the path parameter matches any number of characters.
 *
 * Examples:
 *
 * * `'/hello/'` - Matches only if the path is exactly '/hello/'. There is no special treatment for
 *   trailing slashes, and patterns have to match the entire path, not just a prefix.
 * * `'/user/:id'` - Matches '/user/bob' or '/user/1234!!!' or even '/user/' but not '/user' or
 *   '/user/bob/details'. The second path segment will be captured as the parameter 'id'.
 * * `'/user/{id}'` - Same as the previous example, but using curly brace syntax.
 * * `'/user/{id:[^/]*}'` - Same as the previous example.
 * * `'/user/{id:[0-9a-fA-F]{1,8}}'` - Similar to the previous example, but only matches if the id
 *   parameter consists of 1 to 8 hex digits.
 * * `'/files/{path:.*}'` - Matches any URL starting with '/files/' and captures the rest of the
 *   path into the parameter 'path'.
 * * `'/files/*path'` - ditto.
 * * `'/calendar/{start:date}'` - Matches "/calendar/2014-11-12" (because the pattern defined
 *   in the built-in  `date` ParamType matches `2014-11-12`) and provides a Date object in $stateParams.start
 *
 */
class UrlMatcher$1 {
    /**
     * @param {?} pattern The pattern to compile into a matcher.
     * @param {?} paramTypes The [[ParamTypes]] registry
     * @param {?} paramFactory
     * @param {?=} config  A configuration object
     * - `caseInsensitive` - `true` if URL matching should be case insensitive, otherwise `false`, the default value (for backward compatibility) is `false`.
     * - `strict` - `false` if matching against a URL with a trailing slash should be treated as equivalent to a URL without a trailing slash, the default value is `true`.
     */
    constructor(pattern$$1, paramTypes, paramFactory, config) {
        this.config = config;
        /**
         * @hidden
         */
        this._cache = { path: [this] };
        /**
         * @hidden
         */
        this._children = [];
        /**
         * @hidden
         */
        this._params = [];
        /**
         * @hidden
         */
        this._segments = [];
        /**
         * @hidden
         */
        this._compiled = [];
        this.pattern = pattern$$1;
        this.config = defaults$1(this.config, {
            params: {},
            strict: true,
            caseInsensitive: false,
            paramMap: identity$1
        });
        // Find all placeholders and create a compiled pattern, using either classic or curly syntax:
        //   '*' name
        //   ':' name
        //   '{' name '}'
        //   '{' name ':' regexp '}'
        // The regular expression is somewhat complicated due to the need to allow curly braces
        // inside the regular expression. The placeholder regexp breaks down as follows:
        //    ([:*])([\w\[\]]+)              - classic placeholder ($1 / $2) (search version has - for snake-case)
        //    \{([\w\[\]]+)(?:\:\s*( ... ))?\}  - curly brace placeholder ($3) with optional regexp/type ... ($4) (search version has - for snake-case
        //    (?: ... | ... | ... )+         - the regexp consists of any number of atoms, an atom being either
        //    [^{}\\]+                       - anything other than curly braces or backslash
        //    \\.                            - a backslash escape
        //    \{(?:[^{}\\]+|\\.)*\}          - a matched set of curly braces containing other atoms
        let placeholder = /([:*])([\w\[\]]+)|\{([\w\[\]]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, searchPlaceholder = /([:]?)([\w\[\].-]+)|\{([\w\[\].-]+)(?:\:\s*((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, last = 0, m, patterns = [];
        const checkParamErrors = (id) => {
            if (!UrlMatcher$1.nameValidator.test(id))
                throw new Error(`Invalid parameter name '${id}' in pattern '${pattern$$1}'`);
            if (find$1(this._params, propEq$1('id', id)))
                throw new Error(`Duplicate parameter name '${id}' in pattern '${pattern$$1}'`);
        };
        // Split into static segments separated by path parameter placeholders.
        // The number of segments is always 1 more than the number of parameters.
        const matchDetails = (m, isSearch) => {
            // IE[78] returns '' for unmatched groups instead of null
            let id = m[2] || m[3];
            let regexp = isSearch ? m[4] : m[4] || (m[1] === '*' ? '[\\s\\S]*' : null);
            const makeRegexpType = (regexp) => inherit$1(paramTypes.type(isSearch ? "query" : "path"), {
                pattern: new RegExp(regexp, this.config.caseInsensitive ? 'i' : undefined)
            });
            return {
                id,
                regexp,
                cfg: this.config.params[id],
                segment: pattern$$1.substring(last, m.index),
                type: !regexp ? null : paramTypes.type(regexp) || makeRegexpType(regexp)
            };
        };
        let p, segment;
        while ((m = placeholder.exec(pattern$$1))) {
            p = matchDetails(m, false);
            if (p.segment.indexOf('?') >= 0)
                break; // we're into the search part
            checkParamErrors(p.id);
            this._params.push(paramFactory.fromPath(p.id, p.type, this.config.paramMap(p.cfg, false)));
            this._segments.push(p.segment);
            patterns.push([p.segment, tail$1(this._params)]);
            last = placeholder.lastIndex;
        }
        segment = pattern$$1.substring(last);
        // Find any search parameter names and remove them from the last segment
        let i = segment.indexOf('?');
        if (i >= 0) {
            let search = segment.substring(i);
            segment = segment.substring(0, i);
            if (search.length > 0) {
                last = 0;
                while ((m = searchPlaceholder.exec(search))) {
                    p = matchDetails(m, true);
                    checkParamErrors(p.id);
                    this._params.push(paramFactory.fromSearch(p.id, p.type, this.config.paramMap(p.cfg, true)));
                    last = placeholder.lastIndex;
                    // check if ?&
                }
            }
        }
        this._segments.push(segment);
        this._compiled = patterns.map(pattern$$1 => quoteRegExp.apply(null, pattern$$1)).concat(quoteRegExp(segment));
    }
    /**
     * Creates a new concatenated UrlMatcher
     *
     * Builds a new UrlMatcher by appending another UrlMatcher to this one.
     *
     * @param {?} url A `UrlMatcher` instance to append as a child of the current `UrlMatcher`.
     * @return {?}
     */
    append(url) {
        this._children.push(url);
        url._cache = {
            path: this._cache.path.concat(url),
            parent: this,
            pattern: null,
        };
        return url;
    }
    /**
     * @hidden
     * @return {?}
     */
    isRoot() {
        return this._cache.path[0] === this;
    }
    /**
     * Returns the input pattern string
     * @return {?}
     */
    toString() {
        return this.pattern;
    }
    /**
     * Tests the specified url/path against this matcher.
     *
     * Tests if the given url matches this matcher's pattern, and returns an object containing the captured
     * parameter values.  Returns null if the path does not match.
     *
     * The returned object contains the values
     * of any search parameters that are mentioned in the pattern, but their value may be null if
     * they are not present in `search`. This means that search parameters are always treated
     * as optional.
     *
     * #### Example:
     * ```js
     * new UrlMatcher('/user/{id}?q&r').exec('/user/bob', {
     *   x: '1', q: 'hello'
     * });
     * // returns { id: 'bob', q: 'hello', r: null }
     * ```
     *
     * @param {?} path    The URL path to match, e.g. `$location.path()`.
     * @param {?=} search  URL search parameters, e.g. `$location.search()`.
     * @param {?=} hash    URL hash e.g. `$location.hash()`.
     * @param {?=} options
     *
     * @return {?} The captured parameter values.
     */
    exec(path, search = {}, hash, options = {}) {
        let /** @type {?} */ match = memoizeTo(this._cache, 'pattern', () => {
            return new RegExp([
                '^',
                unnest$1(this._cache.path.map(prop$1('_compiled'))).join(''),
                this.config.strict === false ? '\/?' : '',
                '$'
            ].join(''), this.config.caseInsensitive ? 'i' : undefined);
        }).exec(path);
        if (!match)
            return null;
        //options = defaults(options, { isolate: false });
        let /** @type {?} */ allParams = this.parameters(), /** @type {?} */ pathParams = allParams.filter(param => !param.isSearch()), /** @type {?} */ searchParams = allParams.filter(param => param.isSearch()), /** @type {?} */ nPathSegments = this._cache.path.map(urlm => urlm._segments.length - 1).reduce((a, x) => a + x), /** @type {?} */ values$$1 = {};
        if (nPathSegments !== match.length - 1)
            throw new Error(`Unbalanced capture group in route '${this.pattern}'`);
        /**
         * @param {?} string
         * @return {?}
         */
        function decodePathArray(string) {
            const /** @type {?} */ reverseString = (str) => str.split("").reverse().join("");
            const /** @type {?} */ unquoteDashes = (str) => str.replace(/\\-/g, "-");
            let /** @type {?} */ split = reverseString(string).split(/-(?!\\)/);
            let /** @type {?} */ allReversed = map$2(split, reverseString);
            return map$2(allReversed, unquoteDashes).reverse();
        }
        for (let /** @type {?} */ i = 0; i < nPathSegments; i++) {
            let /** @type {?} */ param = pathParams[i];
            let /** @type {?} */ value = match[i + 1];
            // if the param value matches a pre-replace pair, replace the value before decoding.
            for (let /** @type {?} */ j = 0; j < param.replace.length; j++) {
                if (param.replace[j].from === value)
                    value = param.replace[j].to;
            }
            if (value && param.array === true)
                value = decodePathArray(value);
            if (isDefined$1(value))
                value = param.type.decode(value);
            values$$1[param.id] = param.value(value);
        }
        searchParams.forEach(param => {
            let /** @type {?} */ value = search[param.id];
            for (let /** @type {?} */ j = 0; j < param.replace.length; j++) {
                if (param.replace[j].from === value)
                    value = param.replace[j].to;
            }
            if (isDefined$1(value))
                value = param.type.decode(value);
            values$$1[param.id] = param.value(value);
        });
        if (hash)
            values$$1["#"] = hash;
        return values$$1;
    }
    /**
     * @hidden
     * Returns all the [[Param]] objects of all path and search parameters of this pattern in order of appearance.
     *
     *    pattern has no parameters, an empty array is returned.
     * @param {?=} opts
     * @return {?}
     */
    parameters(opts = {}) {
        if (opts.inherit === false)
            return this._params;
        return unnest$1(this._cache.path.map(matcher => matcher._params));
    }
    /**
     * @hidden
     * Returns a single parameter from this UrlMatcher by id
     *
     * @param {?} id
     * @param {?=} opts
     * @return {?}
     */
    parameter(id, opts = {}) {
        const /** @type {?} */ findParam = () => {
            for (let /** @type {?} */ param of this._params) {
                if (param.id === id)
                    return param;
            }
        };
        let /** @type {?} */ parent = this._cache.parent;
        return findParam() || (opts.inherit !== false && parent && parent.parameter(id, opts)) || null;
    }
    /**
     * Validates the input parameter values against this UrlMatcher
     *
     * Checks an object hash of parameters to validate their correctness according to the parameter
     * types of this `UrlMatcher`.
     *
     * @param {?} params The object hash of parameters to validate.
     * @return {?} Returns `true` if `params` validates, otherwise `false`.
     */
    validates(params) {
        const /** @type {?} */ validParamVal = (param, val$$1) => !param || param.validates(val$$1);
        params = params || {};
        // I'm not sure why this checks only the param keys passed in, and not all the params known to the matcher
        let /** @type {?} */ paramSchema = this.parameters().filter(paramDef => params.hasOwnProperty(paramDef.id));
        return paramSchema.map(paramDef => validParamVal(paramDef, params[paramDef.id])).reduce(allTrueR$1, true);
    }
    /**
     * Given a set of parameter values, creates a URL from this UrlMatcher.
     *
     * Creates a URL that matches this pattern by substituting the specified values
     * for the path and search parameters.
     *
     * #### Example:
     * ```js
     * new UrlMatcher('/user/{id}?q').format({ id:'bob', q:'yes' });
     * // returns '/user/bob?q=yes'
     * ```
     *
     * @param {?=} values  the values to substitute for the parameters in this pattern.
     * @return {?} the formatted URL (path and optionally search part).
     */
    format(values$$1 = {}) {
        // Build the full path of UrlMatchers (including all parent UrlMatchers)
        let /** @type {?} */ urlMatchers = this._cache.path;
        // Extract all the static segments and Params (processed as ParamDetails)
        // into an ordered array
        let /** @type {?} */ pathSegmentsAndParams = urlMatchers.map(UrlMatcher$1.pathSegmentsAndParams)
            .reduce(unnestR$1, [])
            .map(x => isString$1(x) ? x : getDetails(x));
        // Extract the query params into a separate array
        let /** @type {?} */ queryParams = urlMatchers.map(UrlMatcher$1.queryParams)
            .reduce(unnestR$1, [])
            .map(getDetails);
        const /** @type {?} */ isInvalid = (param) => param.isValid === false;
        if (pathSegmentsAndParams.concat(queryParams).filter(isInvalid).length) {
            return null;
        }
        /**
         * Given a Param, applies the parameter value, then returns detailed information about it
         * @param {?} param
         * @return {?}
         */
        function getDetails(param) {
            // Normalize to typed value
            let /** @type {?} */ value = param.value(values$$1[param.id]);
            let /** @type {?} */ isValid = param.validates(value);
            let /** @type {?} */ isDefaultValue = param.isDefaultValue(value);
            // Check if we're in squash mode for the parameter
            let /** @type {?} */ squash = isDefaultValue ? param.squash : false;
            // Allow the Parameter's Type to encode the value
            let /** @type {?} */ encoded = param.type.encode(value);
            return { param, value, isValid, isDefaultValue, squash, encoded };
        }
        // Build up the path-portion from the list of static segments and parameters
        let /** @type {?} */ pathString = pathSegmentsAndParams.reduce((acc, x) => {
            // The element is a static segment (a raw string); just append it
            if (isString$1(x))
                return acc + x;
            // Otherwise, it's a ParamDetails.
            let { squash, encoded, param } = x;
            // If squash is === true, try to remove a slash from the path
            if (squash === true)
                return (acc.match(/\/$/)) ? acc.slice(0, -1) : acc;
            // If squash is a string, use the string for the param value
            if (isString$1(squash))
                return acc + squash;
            if (squash !== false)
                return acc; // ?
            if (encoded == null)
                return acc;
            // If this parameter value is an array, encode the value using encodeDashes
            if (isArray$1(encoded))
                return acc + map$2(/** @type {?} */ (encoded), UrlMatcher$1.encodeDashes).join("-");
            // If the parameter type is "raw", then do not encodeURIComponent
            if (param.raw)
                return acc + encoded;
            // Encode the value
            return acc + encodeURIComponent(/** @type {?} */ (encoded));
        }, "");
        // Build the query string by applying parameter values (array or regular)
        // then mapping to key=value, then flattening and joining using "&"
        let /** @type {?} */ queryString = queryParams.map((paramDetails) => {
            let { param, squash, encoded, isDefaultValue } = paramDetails;
            if (encoded == null || (isDefaultValue && squash !== false))
                return;
            if (!isArray$1(encoded))
                encoded = [/** @type {?} */ (encoded)];
            if (encoded.length === 0)
                return;
            if (!param.raw)
                encoded = map$2(/** @type {?} */ (encoded), encodeURIComponent);
            return ((encoded)).map(val$$1 => `${param.id}=${val$$1}`);
        }).filter(identity$1).reduce(unnestR$1, []).join("&");
        // Concat the pathstring with the queryString (if exists) and the hashString (if exists)
        return pathString + (queryString ? `?${queryString}` : "") + (values$$1["#"] ? "#" + values$$1["#"] : "");
    }
    /**
     * @hidden
     * @param {?} str
     * @return {?}
     */
    static encodeDashes(str) {
        return encodeURIComponent(str).replace(/-/g, c => `%5C%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    }
    /**
     * @hidden Given a matcher, return an array with the matcher's path segments and path params, in order
     * @param {?} matcher
     * @return {?}
     */
    static pathSegmentsAndParams(matcher) {
        let /** @type {?} */ staticSegments = matcher._segments;
        let /** @type {?} */ pathParams = matcher._params.filter(p => p.location === DefType$1.PATH);
        return arrayTuples$1(staticSegments, pathParams.concat(undefined))
            .reduce(unnestR$1, [])
            .filter(x => x !== "" && isDefined$1(x));
    }
    /**
     * @hidden Given a matcher, return an array with the matcher's query params
     * @param {?} matcher
     * @return {?}
     */
    static queryParams(matcher) {
        return matcher._params.filter(p => p.location === DefType$1.SEARCH);
    }
    /**
     * Compare two UrlMatchers
     *
     * This comparison function converts a UrlMatcher into static and dynamic path segments.
     * Each static path segment is a static string between a path separator (slash character).
     * Each dynamic segment is a path parameter.
     *
     * The comparison function sorts static segments before dynamic ones.
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static compare(a, b) {
        /**
         * Turn a UrlMatcher and all its parent matchers into an array
         * of slash literals '/', string literals, and Param objects
         *
         * This example matcher matches strings like "/foo/:param/tail":
         * var matcher = $umf.compile("/foo").append($umf.compile("/:param")).append($umf.compile("/")).append($umf.compile("tail"));
         * var result = segments(matcher); // [ '/', 'foo', '/', Param, '/', 'tail' ]
         *
         * Caches the result as `matcher._cache.segments`
         */
        const segments = (matcher) => matcher._cache.segments = matcher._cache.segments ||
            matcher._cache.path.map(UrlMatcher$1.pathSegmentsAndParams)
                .reduce(unnestR$1, [])
                .reduce(joinNeighborsR$1, [])
                .map(x => isString$1(x) ? splitOnSlash(x) : x)
                .reduce(unnestR$1, []);
        /**
         * Gets the sort weight for each segment of a UrlMatcher
         *
         * Caches the result as `matcher._cache.weights`
         */
        const weights = (matcher) => matcher._cache.weights = matcher._cache.weights ||
            segments(matcher).map(segment => {
                // Sort slashes first, then static strings, the Params
                if (segment === '/')
                    return 1;
                if (isString$1(segment))
                    return 2;
                if (segment instanceof Param$1)
                    return 3;
            });
        let /** @type {?} */ cmp, /** @type {?} */ i, /** @type {?} */ pairs$$1 = arrayTuples$1(weights(a), weights(b));
        for (i = 0; i < pairs$$1.length; i++) {
            cmp = pairs$$1[i][0] - pairs$$1[i][1];
            if (cmp !== 0)
                return cmp;
        }
        return 0;
    }
}
/**
 * @hidden
 */
UrlMatcher$1.nameValidator = /^\w+([-.]+\w+)*(?:\[\])?$/;

/**
 * @internalapi
 * @module url
 */ /** for typedoc */
/**
 * Factory for [[UrlMatcher]] instances.
 *
 * The factory is available to ng1 services as
 * `$urlMatcherFactor` or ng1 providers as `$urlMatcherFactoryProvider`.
 */
class UrlMatcherFactory$1 {
    constructor() {
        /**
         * @hidden
         */
        this.paramTypes = new ParamTypes$1();
        /**
         * @hidden
         */
        this._isCaseInsensitive = false;
        /**
         * @hidden
         */
        this._isStrictMode = true;
        /**
         * @hidden
         */
        this._defaultSquashPolicy = false;
        /**
         * @hidden
         */
        this._getConfig = (config) => extend$1({ strict: this._isStrictMode, caseInsensitive: this._isCaseInsensitive }, config);
        /**
         * \@internalapi Creates a new [[Param]] for a given location (DefType)
         */
        this.paramFactory = {
            /** Creates a new [[Param]] from a CONFIG block */
            fromConfig: (id, type, config) => new Param$1(id, type, config, DefType$1.CONFIG, this),
            /** Creates a new [[Param]] from a url PATH */
            fromPath: (id, type, config) => new Param$1(id, type, config, DefType$1.PATH, this),
            /** Creates a new [[Param]] from a url SEARCH */
            fromSearch: (id, type, config) => new Param$1(id, type, config, DefType$1.SEARCH, this),
        };
        extend$1(this, { UrlMatcher: UrlMatcher$1, Param: Param$1 });
    }
    /**
     * \@inheritdoc
     * @param {?=} value
     * @return {?}
     */
    caseInsensitive(value) {
        return this._isCaseInsensitive = isDefined$1(value) ? value : this._isCaseInsensitive;
    }
    /**
     * \@inheritdoc
     * @param {?=} value
     * @return {?}
     */
    strictMode(value) {
        return this._isStrictMode = isDefined$1(value) ? value : this._isStrictMode;
    }
    /**
     * \@inheritdoc
     * @param {?=} value
     * @return {?}
     */
    defaultSquashPolicy(value) {
        if (isDefined$1(value) && value !== true && value !== false && !isString$1(value))
            throw new Error(`Invalid squash policy: ${value}. Valid policies: false, true, arbitrary-string`);
        return this._defaultSquashPolicy = isDefined$1(value) ? value : this._defaultSquashPolicy;
    }
    /**
     * Creates a [[UrlMatcher]] for the specified pattern.
     *
     * @param {?} pattern  The URL pattern.
     * @param {?=} config  The config object hash.
     * @return {?} The UrlMatcher.
     */
    compile(pattern$$1, config) {
        return new UrlMatcher$1(pattern$$1, this.paramTypes, this.paramFactory, this._getConfig(config));
    }
    /**
     * Returns true if the specified object is a [[UrlMatcher]], or false otherwise.
     *
     * @param {?} object  The object to perform the type check against.
     * @return {?} `true` if the object matches the `UrlMatcher` interface, by
     *          implementing all the same methods.
     */
    isMatcher(object) {
        // TODO: typeof?
        if (!isObject$1(object))
            return false;
        let /** @type {?} */ result = true;
        forEach$1(UrlMatcher$1.prototype, (val$$1, name) => {
            if (isFunction$1(val$$1))
                result = result && (isDefined$1(object[name]) && isFunction$1(object[name]));
        });
        return result;
    }
    ;
    /**
     * Creates and registers a custom [[ParamType]] object
     *
     * A [[ParamType]] can be used to generate URLs with typed parameters.
     *
     * @param {?} name  The type name.
     * @param {?=} definition The type definition. See [[ParamTypeDefinition]] for information on the values accepted.
     * @param {?=} definitionFn A function that is injected before the app runtime starts.
     *        The result of this function should be a [[ParamTypeDefinition]].
     *        The result is merged into the existing `definition`.
     *        See [[ParamType]] for information on the values accepted.
     *
     * @return {?} - if a type was registered: the [[UrlMatcherFactory]]
     *   - if only the `name` parameter was specified: the currently registered [[ParamType]] object, or undefined
     *
     * Note: Register custom types *before using them* in a state definition.
     *
     * See [[ParamTypeDefinition]] for examples
     */
    type(name, definition, definitionFn) {
        let /** @type {?} */ type = this.paramTypes.type(name, definition, definitionFn);
        return !isDefined$1(definition) ? type : this;
    }
    ;
    /**
     * @hidden
     * @return {?}
     */
    $get() {
        this.paramTypes.enqueue = false;
        this.paramTypes._flushTypeQueue();
        return this;
    }
    ;
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.paramTypes.dispose();
    }
}

/**
 * @coreapi
 * @module url
 */ /** */
/**
 * Creates a [[UrlRule]]
 *
 * Creates a [[UrlRule]] from a:
 *
 * - `string`
 * - [[UrlMatcher]]
 * - `RegExp`
 * - [[StateObject]]
 * \@internalapi
 */
class UrlRuleFactory$1 {
    /**
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
    }
    /**
     * @param {?} str
     * @return {?}
     */
    compile(str) {
        return this.router.urlMatcherFactory.compile(str);
    }
    /**
     * @param {?} what
     * @param {?=} handler
     * @return {?}
     */
    create(what, handler) {
        const /** @type {?} */ makeRule = pattern$1([
            [isString$1, (_what) => makeRule(this.compile(_what))],
            [is$1(UrlMatcher$1), (_what) => this.fromUrlMatcher(_what, handler)],
            [isState$1, (_what) => this.fromState(_what, this.router)],
            [is$1(RegExp), (_what) => this.fromRegExp(_what, handler)],
            [isFunction$1, (_what) => new BaseUrlRule$1(_what, /** @type {?} */ (handler))],
        ]);
        let /** @type {?} */ rule = makeRule(what);
        if (!rule)
            throw new Error("invalid 'what' in when()");
        return rule;
    }
    /**
     * A UrlRule which matches based on a UrlMatcher
     *
     * The `handler` may be either a `string`, a [[UrlRuleHandlerFn]] or another [[UrlMatcher]]
     *
     * ## Handler as a function
     *
     * If `handler` is a function, the function is invoked with:
     *
     * - matched parameter values ([[RawParams]] from [[UrlMatcher.exec]])
     * - url: the current Url ([[UrlParts]])
     * - router: the router object ([[UIRouter]])
     *
     * #### Example:
     * ```js
     * var urlMatcher = $umf.compile("/foo/:fooId/:barId");
     * var rule = factory.fromUrlMatcher(urlMatcher, match => "/home/" + match.fooId + "/" + match.barId);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match); // '/home/123/456'
     * ```
     *
     * ## Handler as UrlMatcher
     *
     * If `handler` is a UrlMatcher, the handler matcher is used to create the new url.
     * The `handler` UrlMatcher is formatted using the matched param from the first matcher.
     * The url is replaced with the result.
     *
     * #### Example:
     * ```js
     * var urlMatcher = $umf.compile("/foo/:fooId/:barId");
     * var handler = $umf.compile("/home/:fooId/:barId");
     * var rule = factory.fromUrlMatcher(urlMatcher, handler);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match); // '/home/123/456'
     * ```
     * @param {?} urlMatcher
     * @param {?} handler
     * @return {?}
     */
    fromUrlMatcher(urlMatcher, handler) {
        let /** @type {?} */ _handler = (handler);
        if (isString$1(handler))
            handler = this.router.urlMatcherFactory.compile(handler);
        if (is$1(UrlMatcher$1)(handler))
            _handler = (match) => ((handler)).format(match);
        /**
         * @param {?} url
         * @return {?}
         */
        function match(url) {
            let /** @type {?} */ match = urlMatcher.exec(url.path, url.search, url.hash);
            return urlMatcher.validates(match) && match;
        }
        /**
         * @param {?} params
         * @return {?}
         */
        function matchPriority(params) {
            let /** @type {?} */ optional = urlMatcher.parameters().filter(param => param.isOptional);
            if (!optional.length)
                return 0.000001;
            let /** @type {?} */ matched = optional.filter(param => params[param.id]);
            return matched.length / optional.length;
        }
        let /** @type {?} */ details = { urlMatcher, matchPriority, type: "URLMATCHER" };
        return (extend$1(new BaseUrlRule$1(match, _handler), details));
    }
    /**
     * A UrlRule which matches a state by its url
     *
     * #### Example:
     * ```js
     * var rule = factory.fromState($state.get('foo'), router);
     * var match = rule.match('/foo/123/456'); // results in { fooId: '123', barId: '456' }
     * var result = rule.handler(match);
     * // Starts a transition to 'foo' with params: { fooId: '123', barId: '456' }
     * ```
     * @param {?} state
     * @param {?} router
     * @return {?}
     */
    fromState(state, router) {
        /**
         * Handles match by transitioning to matched state
         *
         * First checks if the router should start a new transition.
         * A new transition is not required if the current state's URL
         * and the new URL are already identical
         */
        const handler = (match) => {
            let $state = router.stateService;
            let globals = router.globals;
            if ($state.href(state, match) !== $state.href(globals.current, globals.params)) {
                $state.transitionTo(state, match, { inherit: true, source: "url" });
            }
        };
        let /** @type {?} */ details = { state, type: "STATE" };
        return (extend$1(this.fromUrlMatcher(state.url, handler), details));
    }
    /**
     * A UrlRule which matches based on a regular expression
     *
     * The `handler` may be either a [[UrlRuleHandlerFn]] or a string.
     *
     * ## Handler as a function
     *
     * If `handler` is a function, the function is invoked with:
     *
     * - regexp match array (from `regexp`)
     * - url: the current Url ([[UrlParts]])
     * - router: the router object ([[UIRouter]])
     *
     * #### Example:
     * ```js
     * var rule = factory.fromRegExp(/^\/foo\/(bar|baz)$/, match => "/home/" + match[1])
     * var match = rule.match('/foo/bar'); // results in [ '/foo/bar', 'bar' ]
     * var result = rule.handler(match); // '/home/bar'
     * ```
     *
     * ## Handler as string
     *
     * If `handler` is a string, the url is *replaced by the string* when the Rule is invoked.
     * The string is first interpolated using `string.replace()` style pattern.
     *
     * #### Example:
     * ```js
     * var rule = factory.fromRegExp(/^\/foo\/(bar|baz)$/, "/home/$1")
     * var match = rule.match('/foo/bar'); // results in [ '/foo/bar', 'bar' ]
     * var result = rule.handler(match); // '/home/bar'
     * ```
     * @param {?} regexp
     * @param {?} handler
     * @return {?}
     */
    fromRegExp(regexp, handler) {
        if (regexp.global || regexp.sticky)
            throw new Error("Rule RegExp must not be global or sticky");
        /**
         * If handler is a string, the url will be replaced by the string.
         * If the string has any String.replace() style variables in it (like `$2`),
         * they will be replaced by the captures from [[match]]
         */
        const redirectUrlTo = (match) => 
        // Interpolates matched values into $1 $2, etc using a String.replace()-style pattern
        handler.replace(/\$(\$|\d{1,2})/, (m, what) => match[what === '$' ? 0 : Number(what)]);
        const /** @type {?} */ _handler = isString$1(handler) ? redirectUrlTo : handler;
        const /** @type {?} */ match = (url) => regexp.exec(url.path);
        let /** @type {?} */ details = { regexp, type: "REGEXP" };
        return (extend$1(new BaseUrlRule$1(match, _handler), details));
    }
}
UrlRuleFactory$1.isUrlRule = obj => obj && ['type', 'match', 'handler'].every(key => isDefined$1(obj[key]));
/**
 * A base rule which calls `match`
 *
 * The value from the `match` function is passed through to the `handler`.
 * \@internalapi
 */
class BaseUrlRule$1 {
    /**
     * @param {?} match
     * @param {?=} handler
     */
    constructor(match, handler) {
        this.match = match;
        this.type = "RAW";
        this.matchPriority = (match) => 0 - this.$id;
        this.handler = handler || identity$1;
    }
}

/**
 * @internalapi
 * @module url
 */
/** for typedoc */
/**
 * @hidden
 * @param {?} url
 * @param {?} isHtml5
 * @param {?} absolute
 * @param {?} baseHref
 * @return {?}
 */
function appendBasePath(url, isHtml5, absolute, baseHref) {
    if (baseHref === '/')
        return url;
    if (isHtml5)
        return baseHref.slice(0, -1) + url;
    if (absolute)
        return baseHref.slice(1) + url;
    return url;
}
/**
 * @hidden
 */
const getMatcher = prop$1("urlMatcher");
/**
 * Default rule priority sorting function.
 *
 * Sorts rules by:
 *
 * - Explicit priority (set rule priority using [[UrlRulesApi.when]])
 * - Rule type (STATE: 4, URLMATCHER: 4, REGEXP: 3, RAW: 2, OTHER: 1)
 * - `UrlMatcher` specificity ([[UrlMatcher.compare]]): works for STATE and URLMATCHER types to pick the most specific rule.
 * - Registration order (for rule types other than STATE and URLMATCHER)
 *
 * \@coreapi
 */
let defaultRuleSortFn;
defaultRuleSortFn = composeSort$1(sortBy$1(pipe$1(prop$1("priority"), x => -x)), sortBy$1(pipe$1(prop$1("type"), type => ({ "STATE": 4, "URLMATCHER": 4, "REGEXP": 3, "RAW": 2, "OTHER": 1 })[type])), (a, b) => (getMatcher(a) && getMatcher(b)) ? UrlMatcher$1.compare(getMatcher(a), getMatcher(b)) : 0, sortBy$1(prop$1("$id"), inArray$1(["REGEXP", "RAW", "OTHER"])));
/**
 * Updates URL and responds to URL changes
 *
 * ### Deprecation warning:
 * This class is now considered to be an internal API
 * Use the [[UrlService]] instead.
 * For configuring URL rules, use the [[UrlRulesApi]] which can be found as [[UrlService.rules]].
 *
 * This class updates the URL when the state changes.
 * It also responds to changes in the URL.
 */
class UrlRouter$1 {
    /**
     * @hidden
     * @param {?} router
     */
    constructor(router) {
        /**
         * @hidden
         */
        this._sortFn = defaultRuleSortFn;
        /**
         * @hidden
         */
        this._rules = [];
        /**
         * @hidden
         */
        this.interceptDeferred = false;
        /**
         * @hidden
         */
        this._id = 0;
        /**
         * @hidden
         */
        this._sorted = false;
        this._router = router;
        this.urlRuleFactory = new UrlRuleFactory$1(router);
        createProxyFunctions$1(val$1(UrlRouter$1.prototype), this, val$1(this));
    }
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.listen(false);
        this._rules = [];
        delete this._otherwiseFn;
    }
    /**
     * \@inheritdoc
     * @param {?=} compareFn
     * @return {?}
     */
    sort(compareFn) {
        this._rules.sort(this._sortFn = compareFn || this._sortFn);
        this._sorted = true;
    }
    /**
     * @return {?}
     */
    ensureSorted() {
        this._sorted || this.sort();
    }
    /**
     * Given a URL, check all rules and return the best [[MatchResult]]
     * @param {?} url
     * @return {?}
     */
    match(url) {
        this.ensureSorted();
        url = extend$1({ path: '', search: {}, hash: '' }, url);
        let /** @type {?} */ rules = this.rules();
        if (this._otherwiseFn)
            rules.push(this._otherwiseFn);
        // Checks a single rule. Returns { rule: rule, match: match, weight: weight } if it matched, or undefined
        let /** @type {?} */ checkRule = (rule) => {
            let /** @type {?} */ match = rule.match(url, this._router);
            return match && { match, rule, weight: rule.matchPriority(match) };
        };
        // The rules are pre-sorted.
        // - Find the first matching rule.
        // - Find any other matching rule that sorted *exactly the same*, according to `.sort()`.
        // - Choose the rule with the highest match weight.
        let /** @type {?} */ best;
        for (let /** @type {?} */ i = 0; i < rules.length; i++) {
            // Stop when there is a 'best' rule and the next rule sorts differently than it.
            if (best && this._sortFn(rules[i], best.rule) !== 0)
                break;
            let /** @type {?} */ current = checkRule(rules[i]);
            // Pick the best MatchResult
            best = (!best || current && current.weight > best.weight) ? current : best;
        }
        return best;
    }
    /**
     * \@inheritdoc
     * @param {?=} evt
     * @return {?}
     */
    sync(evt) {
        if (evt && evt.defaultPrevented)
            return;
        let /** @type {?} */ router = this._router, /** @type {?} */ $url = router.urlService, /** @type {?} */ $state = router.stateService;
        let /** @type {?} */ url = {
            path: $url.path(), search: $url.search(), hash: $url.hash(),
        };
        let /** @type {?} */ best = this.match(url);
        let /** @type {?} */ applyResult = pattern$1([
            [isString$1, (newurl) => $url.url(newurl, true)],
            [TargetState$1.isDef, (def) => $state.go(def.state, def.params, def.options)],
            [is$1(TargetState$1), (target) => $state.go(target.state(), target.params(), target.options())],
        ]);
        applyResult(best && best.rule.handler(best.match, url, router));
    }
    /**
     * \@inheritdoc
     * @param {?=} enabled
     * @return {?}
     */
    listen(enabled) {
        if (enabled === false) {
            this._stopFn && this._stopFn();
            delete this._stopFn;
        }
        else {
            return this._stopFn = this._stopFn || this._router.urlService.onChange(evt => this.sync(evt));
        }
    }
    /**
     * Internal API.
     * \@internalapi
     * @param {?=} read
     * @return {?}
     */
    update(read) {
        let /** @type {?} */ $url = this._router.locationService;
        if (read) {
            this.location = $url.path();
            return;
        }
        if ($url.path() === this.location)
            return;
        $url.url(this.location, true);
    }
    /**
     * Internal API.
     *
     * Pushes a new location to the browser history.
     *
     * \@internalapi
     * @param {?} urlMatcher
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    push(urlMatcher, params, options) {
        let /** @type {?} */ replace = options && !!options.replace;
        this._router.urlService.url(urlMatcher.format(params || {}), replace);
    }
    /**
     * Builds and returns a URL with interpolated parameters
     *
     * #### Example:
     * ```js
     * matcher = $umf.compile("/about/:person");
     * params = { person: "bob" };
     * $bob = $urlRouter.href(matcher, params);
     * // $bob == "/about/bob";
     * ```
     *
     * @param {?} urlMatcher The [[UrlMatcher]] object which is used as the template of the URL to generate.
     * @param {?=} params An object of parameter values to fill the matcher's required parameters.
     * @param {?=} options Options object. The options are:
     *
     * - **`absolute`** - {boolean=false},  If true will generate an absolute url, e.g. "http://www.example.com/fullurl".
     *
     * @return {?} Returns the fully compiled URL, or `null` if `params` fail validation against `urlMatcher`
     */
    href(urlMatcher, params, options) {
        let /** @type {?} */ url = urlMatcher.format(params);
        if (url == null)
            return null;
        options = options || { absolute: false };
        let /** @type {?} */ cfg = this._router.urlService.config;
        let /** @type {?} */ isHtml5 = cfg.html5Mode();
        if (!isHtml5 && url !== null) {
            url = "#" + cfg.hashPrefix() + url;
        }
        url = appendBasePath(url, isHtml5, options.absolute, cfg.baseHref());
        if (!options.absolute || !url) {
            return url;
        }
        let /** @type {?} */ slash = (!isHtml5 && url ? '/' : ''), /** @type {?} */ port = cfg.port();
        port = ((port === 80 || port === 443 ? '' : ':' + port));
        return [cfg.protocol(), '://', cfg.host(), port, slash, url].join('');
    }
    /**
     * Manually adds a URL Rule.
     *
     * Usually, a url rule is added using [[StateDeclaration.url]] or [[when]].
     * This api can be used directly for more control (to register a [[BaseUrlRule]], for example).
     * Rules can be created using [[UrlRouter.urlRuleFactory]], or create manually as simple objects.
     *
     * A rule should have a `match` function which returns truthy if the rule matched.
     * It should also have a `handler` function which is invoked if the rule is the best match.
     *
     * @param {?} rule
     * @return {?} a function that deregisters the rule
     */
    rule(rule) {
        if (!UrlRuleFactory$1.isUrlRule(rule))
            throw new Error("invalid rule");
        rule.$id = this._id++;
        rule.priority = rule.priority || 0;
        this._rules.push(rule);
        this._sorted = false;
        return () => this.removeRule(rule);
    }
    /**
     * \@inheritdoc
     * @param {?} rule
     * @return {?}
     */
    removeRule(rule) {
        removeFrom$1(this._rules, rule);
    }
    /**
     * \@inheritdoc
     * @return {?}
     */
    rules() {
        this.ensureSorted();
        return this._rules.slice();
    }
    /**
     * \@inheritdoc
     * @param {?} handler
     * @return {?}
     */
    otherwise(handler) {
        let /** @type {?} */ handlerFn = getHandlerFn(handler);
        this._otherwiseFn = this.urlRuleFactory.create(val$1(true), handlerFn);
        this._sorted = false;
    }
    ;
    /**
     * \@inheritdoc
     * @param {?} handler
     * @return {?}
     */
    initial(handler) {
        let /** @type {?} */ handlerFn = getHandlerFn(handler);
        let /** @type {?} */ matchFn = (urlParts, router) => router.globals.transitionHistory.size() === 0 && !!/^\/?$/.exec(urlParts.path);
        this.rule(this.urlRuleFactory.create(matchFn, handlerFn));
    }
    ;
    /**
     * \@inheritdoc
     * @param {?} matcher
     * @param {?} handler
     * @param {?=} options
     * @return {?}
     */
    when(matcher, handler, options) {
        let /** @type {?} */ rule = this.urlRuleFactory.create(matcher, handler);
        if (isDefined$1(options && options.priority))
            rule.priority = options.priority;
        this.rule(rule);
        return rule;
    }
    ;
    /**
     * \@inheritdoc
     * @param {?=} defer
     * @return {?}
     */
    deferIntercept(defer) {
        if (defer === undefined)
            defer = true;
        this.interceptDeferred = defer;
    }
    ;
}
/**
 * @param {?} handler
 * @return {?}
 */
function getHandlerFn(handler) {
    if (!isFunction$1(handler) && !isString$1(handler) && !is$1(TargetState$1)(handler) && !TargetState$1.isDef(handler)) {
        throw new Error("'handler' must be a string, function, TargetState, or have a state: 'newtarget' property");
    }
    return isFunction$1(handler) ? (handler) : val$1(handler);
}

/**
 * @coreapi
 * @module view
 */ /** for typedoc */
/**
 * The View service
 *
 * This service pairs existing `ui-view` components (which live in the DOM)
 * with view configs (from the state declaration objects: [[StateDeclaration.views]]).
 *
 * - After a successful Transition, the views from the newly entered states are activated via [[activateViewConfig]].
 *   The views from exited states are deactivated via [[deactivateViewConfig]].
 *   (See: the [[registerActivateViews]] Transition Hook)
 *
 * - As `ui-view` components pop in and out of existence, they register themselves using [[registerUIView]].
 *
 * - When the [[sync]] function is called, the registered `ui-view`(s) ([[ActiveUIView]])
 * are configured with the matching [[ViewConfig]](s)
 *
 */
class ViewService$1 {
    constructor() {
        this._uiViews = [];
        this._viewConfigs = [];
        this._viewConfigFactories = {};
        this._pluginapi = {
            _rootViewContext: this._rootViewContext.bind(this),
            _viewConfigFactory: this._viewConfigFactory.bind(this),
            _registeredUIViews: () => this._uiViews,
            _activeViewConfigs: () => this._viewConfigs,
        };
    }
    /**
     * @param {?=} context
     * @return {?}
     */
    _rootViewContext(context) {
        return this._rootContext = context || this._rootContext;
    }
    ;
    /**
     * @param {?} viewType
     * @param {?} factory
     * @return {?}
     */
    _viewConfigFactory(viewType, factory) {
        this._viewConfigFactories[viewType] = factory;
    }
    /**
     * @param {?} path
     * @param {?} decl
     * @return {?}
     */
    createViewConfig(path, decl) {
        let /** @type {?} */ cfgFactory = this._viewConfigFactories[decl.$type];
        if (!cfgFactory)
            throw new Error("ViewService: No view config factory registered for type " + decl.$type);
        let /** @type {?} */ cfgs = cfgFactory(path, decl);
        return isArray$1(cfgs) ? cfgs : [cfgs];
    }
    /**
     * Deactivates a ViewConfig.
     *
     * This function deactivates a `ViewConfig`.
     * After calling [[sync]], it will un-pair from any `ui-view` with which it is currently paired.
     *
     * @param {?} viewConfig The ViewConfig view to deregister.
     * @return {?}
     */
    deactivateViewConfig(viewConfig) {
        trace$1.traceViewServiceEvent("<- Removing", viewConfig);
        removeFrom$1(this._viewConfigs, viewConfig);
    }
    /**
     * @param {?} viewConfig
     * @return {?}
     */
    activateViewConfig(viewConfig) {
        trace$1.traceViewServiceEvent("-> Registering", /** @type {?} */ (viewConfig));
        this._viewConfigs.push(viewConfig);
    }
    /**
     * @return {?}
     */
    sync() {
        let /** @type {?} */ uiViewsByFqn = this._uiViews.map(uiv => [uiv.fqn, uiv]).reduce(applyPairs$1, /** @type {?} */ ({}));
        /**
         * @param {?} uiView
         * @return {?}
         */
        function uiViewDepth(uiView) {
            const /** @type {?} */ stateDepth = (context) => context && context.parent ? stateDepth(context.parent) + 1 : 1;
            return (uiView.fqn.split(".").length * 10000) + stateDepth(uiView.creationContext);
        }
        /**
         * @param {?} config
         * @return {?}
         */
        function viewConfigDepth(config) {
            let /** @type {?} */ context = config.viewDecl.$context, /** @type {?} */ count = 0;
            while (++count && context.parent)
                context = context.parent;
            return count;
        }
        // Given a depth function, returns a compare function which can return either ascending or descending order
        const /** @type {?} */ depthCompare = curry$1((depthFn, posNeg, left, right) => posNeg * (depthFn(left) - depthFn(right)));
        const /** @type {?} */ matchingConfigPair = (uiView) => {
            let /** @type {?} */ matchingConfigs = this._viewConfigs.filter(ViewService$1.matches(uiViewsByFqn, uiView));
            if (matchingConfigs.length > 1) {
                // This is OK.  Child states can target a ui-view that the parent state also targets (the child wins)
                // Sort by depth and return the match from the deepest child
                // console.log(`Multiple matching view configs for ${uiView.fqn}`, matchingConfigs);
                matchingConfigs.sort(depthCompare(viewConfigDepth, -1)); // descending
            }
            return [uiView, matchingConfigs[0]];
        };
        const /** @type {?} */ configureUIView = ([uiView, viewConfig]) => {
            // If a parent ui-view is reconfigured, it could destroy child ui-views.
            // Before configuring a child ui-view, make sure it's still in the active uiViews array.
            if (this._uiViews.indexOf(uiView) !== -1)
                uiView.configUpdated(viewConfig);
        };
        // Sort views by FQN and state depth. Process uiviews nearest the root first.
        const /** @type {?} */ pairs$$1 = this._uiViews.sort(depthCompare(uiViewDepth, 1)).map(matchingConfigPair);
        trace$1.traceViewSync(pairs$$1);
        pairs$$1.forEach(configureUIView);
    }
    ;
    /**
     * Registers a `ui-view` component
     *
     * When a `ui-view` component is created, it uses this method to register itself.
     * After registration the [[sync]] method is used to ensure all `ui-view` are configured with the proper [[ViewConfig]].
     *
     * Note: the `ui-view` component uses the `ViewConfig` to determine what view should be loaded inside the `ui-view`,
     * and what the view's state context is.
     *
     * Note: There is no corresponding `deregisterUIView`.
     *       A `ui-view` should hang on to the return value of `registerUIView` and invoke it to deregister itself.
     *
     * @param {?} uiView The metadata for a UIView
     * @return {?} a de-registration function used when the view is destroyed.
     */
    registerUIView(uiView) {
        trace$1.traceViewServiceUIViewEvent("-> Registering", uiView);
        let /** @type {?} */ uiViews = this._uiViews;
        const /** @type {?} */ fqnAndTypeMatches = (uiv) => uiv.fqn === uiView.fqn && uiv.$type === uiView.$type;
        if (uiViews.filter(fqnAndTypeMatches).length)
            trace$1.traceViewServiceUIViewEvent("!!!! duplicate uiView named:", uiView);
        uiViews.push(uiView);
        this.sync();
        return () => {
            let /** @type {?} */ idx = uiViews.indexOf(uiView);
            if (idx === -1) {
                trace$1.traceViewServiceUIViewEvent("Tried removing non-registered uiView", uiView);
                return;
            }
            trace$1.traceViewServiceUIViewEvent("<- Deregistering", uiView);
            removeFrom$1(uiViews)(uiView);
        };
    }
    ;
    /**
     * Returns the list of views currently available on the page, by fully-qualified name.
     *
     * @return {?}
     */
    available() {
        return this._uiViews.map(prop$1("fqn"));
    }
    /**
     * Returns the list of views on the page containing loaded content.
     *
     * @return {?}
     */
    active() {
        return this._uiViews.filter(prop$1("$config")).map(prop$1("name"));
    }
    /**
     * Normalizes a view's name from a state.views configuration block.
     *
     * This should be used by a framework implementation to calculate the values for
     * [[_ViewDeclaration.$uiViewName]] and [[_ViewDeclaration.$uiViewContextAnchor]].
     *
     * @param {?} context the context object (state declaration) that the view belongs to
     * @param {?=} rawViewName the name of the view, as declared in the [[StateDeclaration.views]]
     *
     * @return {?} the normalized uiViewName and uiViewContextAnchor that the view targets
     */
    static normalizeUIViewTarget(context, rawViewName = "") {
        // TODO: Validate incoming view name with a regexp to allow:
        // ex: "view.name@foo.bar" , "^.^.view.name" , "view.name@^.^" , "" ,
        // "@" , "$default@^" , "!$default.$default" , "!foo.bar"
        let /** @type {?} */ viewAtContext = rawViewName.split("@");
        let /** @type {?} */ uiViewName = viewAtContext[0] || "$default"; // default to unnamed view
        let /** @type {?} */ uiViewContextAnchor = isString$1(viewAtContext[1]) ? viewAtContext[1] : "^"; // default to parent context
        // Handle relative view-name sugar syntax.
        // Matches rawViewName "^.^.^.foo.bar" into array: ["^.^.^.foo.bar", "^.^.^", "foo.bar"],
        let /** @type {?} */ relativeViewNameSugar = /^(\^(?:\.\^)*)\.(.*$)/.exec(uiViewName);
        if (relativeViewNameSugar) {
            // Clobbers existing contextAnchor (rawViewName validation will fix this)
            uiViewContextAnchor = relativeViewNameSugar[1]; // set anchor to "^.^.^"
            uiViewName = relativeViewNameSugar[2]; // set view-name to "foo.bar"
        }
        if (uiViewName.charAt(0) === '!') {
            uiViewName = uiViewName.substr(1);
            uiViewContextAnchor = ""; // target absolutely from root
        }
        // handle parent relative targeting "^.^.^"
        let /** @type {?} */ relativeMatch = /^(\^(?:\.\^)*)$/;
        if (relativeMatch.exec(uiViewContextAnchor)) {
            let /** @type {?} */ anchor = uiViewContextAnchor.split(".").reduce(((anchor, x) => anchor.parent), context);
            uiViewContextAnchor = anchor.name;
        }
        else if (uiViewContextAnchor === '.') {
            uiViewContextAnchor = context.name;
        }
        return { uiViewName, uiViewContextAnchor };
    }
}
/**
 * Given a ui-view and a ViewConfig, determines if they "match".
 *
 * A ui-view has a fully qualified name (fqn) and a context object.  The fqn is built from its overall location in
 * the DOM, describing its nesting relationship to any parent ui-view tags it is nested inside of.
 *
 * A ViewConfig has a target ui-view name and a context anchor.  The ui-view name can be a simple name, or
 * can be a segmented ui-view path, describing a portion of a ui-view fqn.
 *
 * In order for a ui-view to match ViewConfig, ui-view's $type must match the ViewConfig's $type
 *
 * If the ViewConfig's target ui-view name is a simple name (no dots), then a ui-view matches if:
 * - the ui-view's name matches the ViewConfig's target name
 * - the ui-view's context matches the ViewConfig's anchor
 *
 * If the ViewConfig's target ui-view name is a segmented name (with dots), then a ui-view matches if:
 * - There exists a parent ui-view where:
 *    - the parent ui-view's name matches the first segment (index 0) of the ViewConfig's target name
 *    - the parent ui-view's context matches the ViewConfig's anchor
 * - And the remaining segments (index 1..n) of the ViewConfig's target name match the tail of the ui-view's fqn
 *
 * Example:
 *
 * DOM:
 * <ui-view>                        <!-- created in the root context (name: "") -->
 *   <ui-view name="foo">                <!-- created in the context named: "A"      -->
 *     <ui-view>                    <!-- created in the context named: "A.B"    -->
 *       <ui-view name="bar">            <!-- created in the context named: "A.B.C"  -->
 *       </ui-view>
 *     </ui-view>
 *   </ui-view>
 * </ui-view>
 *
 * uiViews: [
 *  { fqn: "$default",                  creationContext: { name: "" } },
 *  { fqn: "$default.foo",              creationContext: { name: "A" } },
 *  { fqn: "$default.foo.$default",     creationContext: { name: "A.B" } }
 *  { fqn: "$default.foo.$default.bar", creationContext: { name: "A.B.C" } }
 * ]
 *
 * These four view configs all match the ui-view with the fqn: "$default.foo.$default.bar":
 *
 * - ViewConfig1: { uiViewName: "bar",                       uiViewContextAnchor: "A.B.C" }
 * - ViewConfig2: { uiViewName: "$default.bar",              uiViewContextAnchor: "A.B" }
 * - ViewConfig3: { uiViewName: "foo.$default.bar",          uiViewContextAnchor: "A" }
 * - ViewConfig4: { uiViewName: "$default.foo.$default.bar", uiViewContextAnchor: "" }
 *
 * Using ViewConfig3 as an example, it matches the ui-view with fqn "$default.foo.$default.bar" because:
 * - The ViewConfig's segmented target name is: [ "foo", "$default", "bar" ]
 * - There exists a parent ui-view (which has fqn: "$default.foo") where:
 *    - the parent ui-view's name "foo" matches the first segment "foo" of the ViewConfig's target name
 *    - the parent ui-view's context "A" matches the ViewConfig's anchor context "A"
 * - And the remaining segments [ "$default", "bar" ].join("."_ of the ViewConfig's target name match
 *   the tail of the ui-view's fqn "default.bar"
 *
 * \@internalapi
 */
ViewService$1.matches = (uiViewsByFqn, uiView) => (viewConfig) => {
    // Don't supply an ng1 ui-view with an ng2 ViewConfig, etc
    if (uiView.$type !== viewConfig.viewDecl.$type)
        return false;
    // Split names apart from both viewConfig and uiView into segments
    let vc = viewConfig.viewDecl;
    let vcSegments = vc.$uiViewName.split(".");
    let uivSegments = uiView.fqn.split(".");
    // Check if the tails of the segment arrays match. ex, these arrays' tails match:
    // vc: ["foo", "bar"], uiv fqn: ["$default", "foo", "bar"]
    if (!equals$1(vcSegments, uivSegments.slice(0 - vcSegments.length)))
        return false;
    // Now check if the fqn ending at the first segment of the viewConfig matches the context:
    // ["$default", "foo"].join(".") == "$default.foo", does the ui-view $default.foo context match?
    let negOffset = (1 - vcSegments.length) || undefined;
    let fqnToFirstSegment = uivSegments.slice(0, negOffset).join(".");
    let uiViewContext = uiViewsByFqn[fqnToFirstSegment].creationContext;
    return vc.$uiViewContextAnchor === (uiViewContext && uiViewContext.name);
};

/**
 * @coreapi
 * @module core
 */ /** */
/**
 * Global router state
 *
 * This is where we hold the global mutable state such as current state, current
 * params, current transition, etc.
 */
class UIRouterGlobals$1 {
    constructor() {
        /**
         * Current parameter values
         *
         * The parameter values from the latest successful transition
         */
        this.params = new StateParams$1();
        /**
         * \@internalapi
         */
        this.lastStartedTransitionId = -1;
        /**
         * \@internalapi
         */
        this.transitionHistory = new Queue$1([], 1);
        /**
         * \@internalapi
         */
        this.successfulTransitions = new Queue$1([], 1);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.transitionHistory.clear();
        this.successfulTransitions.clear();
        this.transition = null;
    }
}

/**
 * @coreapi
 * @module url
 */ /** */
/**
 * @hidden
 */
const makeStub = (keys) => keys.reduce((acc, key) => (acc[key] = notImplemented$1(key), acc), { dispose: noop$1 });
/**
 * @hidden
 */
const locationServicesFns = ["url", "path", "search", "hash", "onChange"];
/**
 * @hidden
 */
const locationConfigFns = ["port", "protocol", "host", "baseHref", "html5Mode", "hashPrefix"];
/**
 * @hidden
 */
const umfFns = ["type", "caseInsensitive", "strictMode", "defaultSquashPolicy"];
/**
 * @hidden
 */
const rulesFns = ["sort", "when", "initial", "otherwise", "rules", "rule", "removeRule"];
/**
 * @hidden
 */
const syncFns = ["deferIntercept", "listen", "sync", "match"];
/**
 * API for URL management
 */
class UrlService$1 {
    /**
     * @hidden
     * @param {?} router
     * @param {?=} lateBind
     */
    constructor(router, lateBind = true) {
        this.router = router;
        this.rules = {};
        this.config = {};
        // proxy function calls from UrlService to the LocationService/LocationConfig
        const locationServices = () => router.locationService;
        createProxyFunctions$1(locationServices, this, locationServices, locationServicesFns, lateBind);
        const locationConfig = () => router.locationConfig;
        createProxyFunctions$1(locationConfig, this.config, locationConfig, locationConfigFns, lateBind);
        const umf = () => router.urlMatcherFactory;
        createProxyFunctions$1(umf, this.config, umf, umfFns);
        const urlRouter = () => router.urlRouter;
        createProxyFunctions$1(urlRouter, this.rules, urlRouter, rulesFns);
        createProxyFunctions$1(urlRouter, this, urlRouter, syncFns);
    }
    /**
     * @param {?=} newurl
     * @param {?=} replace
     * @param {?=} state
     * @return {?}
     */
    url(newurl, replace, state) { return; }
    ;
    /**
     * \@inheritdoc
     * @return {?}
     */
    path() { return; }
    ;
    /**
     * \@inheritdoc
     * @return {?}
     */
    search() { return; }
    ;
    /**
     * \@inheritdoc
     * @return {?}
     */
    hash() { return; }
    ;
    /**
     * \@inheritdoc
     * @param {?} callback
     * @return {?}
     */
    onChange(callback) { return; }
    ;
    /**
     * Returns the current URL parts
     *
     * This method returns the current URL components as a [[UrlParts]] object.
     *
     * @return {?} the current url parts
     */
    parts() {
        return { path: this.path(), search: this.search(), hash: this.hash() };
    }
    /**
     * @return {?}
     */
    dispose() { }
    /**
     * \@inheritdoc
     * @param {?=} evt
     * @return {?}
     */
    sync(evt) { return; }
    /**
     * \@inheritdoc
     * @param {?=} enabled
     * @return {?}
     */
    listen(enabled) { return; }
    ;
    /**
     * \@inheritdoc
     * @param {?=} defer
     * @return {?}
     */
    deferIntercept(defer) { return; }
    /**
     * \@inheritdoc
     * @param {?} urlParts
     * @return {?}
     */
    match(urlParts) { return; }
}
/**
 * @hidden
 */
UrlService$1.locationServiceStub = makeStub(locationServicesFns);
/**
 * @hidden
 */
UrlService$1.locationConfigStub = makeStub(locationConfigFns);

/**
 * @coreapi
 * @module core
 */ /** */
/**
 * @hidden
 */
let _routerInstance = 0;
/**
 * The master class used to instantiate an instance of UI-Router.
 *
 * UI-Router (for each specific framework) will create an instance of this class during bootstrap.
 * This class instantiates and wires the UI-Router services together.
 *
 * After a new instance of the UIRouter class is created, it should be configured for your app.
 * For instance, app states should be registered with the [[UIRouter.stateRegistry]].
 *
 * ---
 *
 * Normally the framework code will bootstrap UI-Router.
 * If you are bootstrapping UIRouter manually, tell it to monitor the URL by calling
 * [[UrlService.listen]] then [[UrlService.sync]].
 */
class UIRouter$1 {
    /**
     * Creates a new `UIRouter` object
     *
     * \@internalapi
     * @param {?=} locationService a [[LocationServices]] implementation
     * @param {?=} locationConfig a [[LocationConfig]] implementation
     */
    constructor(locationService = UrlService$1.locationServiceStub, locationConfig = UrlService$1.locationConfigStub) {
        this.locationService = locationService;
        this.locationConfig = locationConfig;
        /**
         * @hidden
         */
        this.$id = _routerInstance++;
        /**
         * @hidden
         */
        this._disposed = false;
        /**
         * @hidden
         */
        this._disposables = [];
        /**
         * Provides trace information to the console
         */
        this.trace = trace$1;
        /**
         * Provides services related to ui-view synchronization
         */
        this.viewService = new ViewService$1();
        /**
         * Provides services related to Transitions
         */
        this.transitionService = new TransitionService$1(this);
        /**
         * Global router state
         */
        this.globals = new UIRouterGlobals$1();
        /**
         * Deprecated for public use. Use [[urlService]] instead.
         * @deprecated Use [[urlService]] instead
         */
        this.urlMatcherFactory = new UrlMatcherFactory$1();
        /**
         * Deprecated for public use. Use [[urlService]] instead.
         * @deprecated Use [[urlService]] instead
         */
        this.urlRouter = new UrlRouter$1(this);
        /**
         * Provides a registry for states, and related registration services
         */
        this.stateRegistry = new StateRegistry$1(this);
        /**
         * Provides services related to states
         */
        this.stateService = new StateService$1(this);
        /**
         * Provides services related to the URL
         */
        this.urlService = new UrlService$1(this);
        /**
         * @hidden
         */
        this._plugins = {};
        this.viewService._pluginapi._rootViewContext(this.stateRegistry.root());
        this.globals.$current = this.stateRegistry.root();
        this.globals.current = this.globals.$current.self;
        this.disposable(this.globals);
        this.disposable(this.stateService);
        this.disposable(this.stateRegistry);
        this.disposable(this.transitionService);
        this.disposable(this.urlRouter);
        this.disposable(locationService);
        this.disposable(locationConfig);
    }
    /**
     * Registers an object to be notified when the router is disposed
     * @param {?} disposable
     * @return {?}
     */
    disposable(disposable) {
        this._disposables.push(disposable);
    }
    /**
     * Disposes this router instance
     *
     * When called, clears resources retained by the router by calling `dispose(this)` on all
     * registered [[disposable]] objects.
     *
     * Or, if a `disposable` object is provided, calls `dispose(this)` on that object only.
     *
     * @param {?=} disposable (optional) the disposable to dispose
     * @return {?}
     */
    dispose(disposable) {
        if (disposable && isFunction$1(disposable.dispose)) {
            disposable.dispose(this);
            return undefined;
        }
        this._disposed = true;
        this._disposables.slice().forEach(d => {
            try {
                typeof d.dispose === 'function' && d.dispose(this);
                removeFrom$1(this._disposables, d);
            }
            catch (ignored) { }
        });
    }
    /**
     * Adds a plugin to UI-Router
     *
     * This method adds a UI-Router Plugin.
     * A plugin can enhance or change UI-Router behavior using any public API.
     *
     * #### Example:
     * ```js
     * import { MyCoolPlugin } from "ui-router-cool-plugin";
     *
     * var plugin = router.addPlugin(MyCoolPlugin);
     * ```
     *
     * ### Plugin authoring
     *
     * A plugin is simply a class (or constructor function) which accepts a [[UIRouter]] instance and (optionally) an options object.
     *
     * The plugin can implement its functionality using any of the public APIs of [[UIRouter]].
     * For example, it may configure router options or add a Transition Hook.
     *
     * The plugin can then be published as a separate module.
     *
     * #### Example:
     * ```js
     * export class MyAuthPlugin implements UIRouterPlugin {
     *   constructor(router: UIRouter, options: any) {
     *     this.name = "MyAuthPlugin";
     *     let $transitions = router.transitionService;
     *     let $state = router.stateService;
     *
     *     let authCriteria = {
     *       to: (state) => state.data && state.data.requiresAuth
     *     };
     *
     *     function authHook(transition: Transition) {
     *       let authService = transition.injector().get('AuthService');
     *       if (!authService.isAuthenticated()) {
     *         return $state.target('login');
     *       }
     *     }
     *
     *     $transitions.onStart(authCriteria, authHook);
     *   }
     * }
     * ```
     *
     * @template T
     * @param {?} plugin one of:
     *        - a plugin class which implements [[UIRouterPlugin]]
     *        - a constructor function for a [[UIRouterPlugin]] which accepts a [[UIRouter]] instance
     *        - a factory function which accepts a [[UIRouter]] instance and returns a [[UIRouterPlugin]] instance
     * @param {?=} options options to pass to the plugin class/factory
     * @return {?} the registered plugin instance
     */
    plugin(plugin, options = {}) {
        let /** @type {?} */ pluginInstance = new plugin(this, options);
        if (!pluginInstance.name)
            throw new Error("Required property `name` missing on plugin: " + pluginInstance);
        this._disposables.push(pluginInstance);
        return this._plugins[pluginInstance.name] = pluginInstance;
    }
    /**
     * @param {?=} pluginName
     * @return {?}
     */
    getPlugin(pluginName) {
        return pluginName ? this._plugins[pluginName] : values$1(this._plugins);
    }
}

/** @module hooks */ /** */
/**
 * @param {?} trans
 * @return {?}
 */
function addCoreResolvables(trans) {
    trans.addResolvable({ token: UIRouter$1, deps: [], resolveFn: () => trans.router, data: trans.router }, "");
    trans.addResolvable({ token: Transition$1, deps: [], resolveFn: () => trans, data: trans }, "");
    trans.addResolvable({ token: '$transition$', deps: [], resolveFn: () => trans, data: trans }, "");
    trans.addResolvable({ token: '$stateParams', deps: [], resolveFn: () => trans.params(), data: trans.params() }, "");
    trans.entering().forEach(state => {
        trans.addResolvable({ token: '$state$', deps: [], resolveFn: () => state, data: state }, state);
    });
}
const registerAddCoreResolvables = (transitionService) => transitionService.onCreate({}, addCoreResolvables);

/** @module hooks */ /** */
/**
 * A [[TransitionHookFn]] that redirects to a different state or params
 *
 * Registered using `transitionService.onStart({ to: (state) => !!state.redirectTo }, redirectHook);`
 *
 * See [[StateDeclaration.redirectTo]]
 */
const redirectToHook = (trans) => {
    let redirect = trans.to().redirectTo;
    if (!redirect)
        return;
    let $state = trans.router.stateService;
    function handleResult(result) {
        if (!result)
            return;
        if (result instanceof TargetState$1)
            return result;
        if (isString$1(result))
            return $state.target(result, trans.params(), trans.options());
        if (result['state'] || result['params'])
            return $state.target(result['state'] || trans.to(), result['params'] || trans.params(), trans.options());
    }
    if (isFunction$1(redirect)) {
        return services$1.$q.when(redirect(trans)).then(handleResult);
    }
    return handleResult(redirect);
};
const registerRedirectToHook = (transitionService) => transitionService.onStart({ to: (state) => !!state.redirectTo }, redirectToHook);

/** @module hooks */
/** for typedoc */
/**
 * A factory which creates an onEnter, onExit or onRetain transition hook function
 *
 * The returned function invokes the (for instance) state.onEnter hook when the
 * state is being entered.
 *
 * @hidden
 * @param {?} hookName
 * @return {?}
 */
function makeEnterExitRetainHook(hookName) {
    return (transition, state) => {
        let /** @type {?} */ _state = state.$$state();
        let /** @type {?} */ hookFn = _state[hookName];
        return hookFn(transition, state);
    };
}
/**
 * The [[TransitionStateHookFn]] for onExit
 *
 * When the state is being exited, the state's .onExit function is invoked.
 *
 * Registered using `transitionService.onExit({ exiting: (state) => !!state.onExit }, onExitHook);`
 *
 * See: [[IHookRegistry.onExit]]
 */
const onExitHook = makeEnterExitRetainHook('onExit');
const registerOnExitHook = (transitionService) => transitionService.onExit({ exiting: state => !!state.onExit }, onExitHook);
/**
 * The [[TransitionStateHookFn]] for onRetain
 *
 * When the state was already entered, and is not being exited or re-entered, the state's .onRetain function is invoked.
 *
 * Registered using `transitionService.onRetain({ retained: (state) => !!state.onRetain }, onRetainHook);`
 *
 * See: [[IHookRegistry.onRetain]]
 */
const onRetainHook = makeEnterExitRetainHook('onRetain');
const registerOnRetainHook = (transitionService) => transitionService.onRetain({ retained: state => !!state.onRetain }, onRetainHook);
/**
 * The [[TransitionStateHookFn]] for onEnter
 *
 * When the state is being entered, the state's .onEnter function is invoked.
 *
 * Registered using `transitionService.onEnter({ entering: (state) => !!state.onEnter }, onEnterHook);`
 *
 * See: [[IHookRegistry.onEnter]]
 */
const onEnterHook = makeEnterExitRetainHook('onEnter');
const registerOnEnterHook = (transitionService) => transitionService.onEnter({ entering: state => !!state.onEnter }, onEnterHook);

/** @module hooks */
/** for typedoc */
/**
 * A [[TransitionHookFn]] which resolves all EAGER Resolvables in the To Path
 *
 * Registered using `transitionService.onStart({}, eagerResolvePath);`
 *
 * When a Transition starts, this hook resolves all the EAGER Resolvables, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
const eagerResolvePath = (trans) => new ResolveContext$1(trans.treeChanges().to)
    .resolvePath("EAGER", trans)
    .then(noop$1);
const registerEagerResolvePath = (transitionService) => transitionService.onStart({}, eagerResolvePath, { priority: 1000 });
/**
 * A [[TransitionHookFn]] which resolves all LAZY Resolvables for the state (and all its ancestors) in the To Path
 *
 * Registered using `transitionService.onEnter({ entering: () => true }, lazyResolveState);`
 *
 * When a State is being entered, this hook resolves all the Resolvables for this state, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
const lazyResolveState = (trans, state) => new ResolveContext$1(trans.treeChanges().to)
    .subContext(state.$$state())
    .resolvePath("LAZY", trans)
    .then(noop$1);
const registerLazyResolveState = (transitionService) => transitionService.onEnter({ entering: val$1(true) }, lazyResolveState, { priority: 1000 });

/** @module hooks */ /** for typedoc */
/**
 * A [[TransitionHookFn]] which waits for the views to load
 *
 * Registered using `transitionService.onStart({}, loadEnteringViews);`
 *
 * Allows the views to do async work in [[ViewConfig.load]] before the transition continues.
 * In angular 1, this includes loading the templates.
 */
const loadEnteringViews = (transition) => {
    let $q$$1 = services$1.$q;
    let enteringViews = transition.views("entering");
    if (!enteringViews.length)
        return;
    return $q$$1.all(enteringViews.map(view => $q$$1.when(view.load()))).then(noop$1);
};
const registerLoadEnteringViews = (transitionService) => transitionService.onFinish({}, loadEnteringViews);
/**
 * A [[TransitionHookFn]] which activates the new views when a transition is successful.
 *
 * Registered using `transitionService.onSuccess({}, activateViews);`
 *
 * After a transition is complete, this hook deactivates the old views from the previous state,
 * and activates the new views from the destination state.
 *
 * See [[ViewService]]
 */
const activateViews = (transition) => {
    let enteringViews = transition.views("entering");
    let exitingViews = transition.views("exiting");
    if (!enteringViews.length && !exitingViews.length)
        return;
    let $view = transition.router.viewService;
    exitingViews.forEach((vc) => $view.deactivateViewConfig(vc));
    enteringViews.forEach((vc) => $view.activateViewConfig(vc));
    $view.sync();
};
const registerActivateViews = (transitionService) => transitionService.onSuccess({}, activateViews);

/** @module hooks */
/** for typedoc */
/**
 * A [[TransitionHookFn]] which updates global UI-Router state
 *
 * Registered using `transitionService.onBefore({}, updateGlobalState);`
 *
 * Before a [[Transition]] starts, updates the global value of "the current transition" ([[Globals.transition]]).
 * After a successful [[Transition]], updates the global values of "the current state"
 * ([[Globals.current]] and [[Globals.$current]]) and "the current param values" ([[Globals.params]]).
 *
 * See also the deprecated properties:
 * [[StateService.transition]], [[StateService.current]], [[StateService.params]]
 */
const updateGlobalState = (trans) => {
    let globals = trans.router.globals;
    const transitionSuccessful = () => {
        globals.successfulTransitions.enqueue(trans);
        globals.$current = trans.$to();
        globals.current = globals.$current.self;
        copy$1(trans.params(), globals.params);
    };
    const clearCurrentTransition = () => {
        // Do not clear globals.transition if a different transition has started in the meantime
        if (globals.transition === trans)
            globals.transition = null;
    };
    trans.onSuccess({}, transitionSuccessful, { priority: 10000 });
    trans.promise.then(clearCurrentTransition, clearCurrentTransition);
};
const registerUpdateGlobalState = (transitionService) => transitionService.onCreate({}, updateGlobalState);

/** @module hooks */ /** */
/**
 * A [[TransitionHookFn]] which updates the URL after a successful transition
 *
 * Registered using `transitionService.onSuccess({}, updateUrl);`
 */
const updateUrl = (transition) => {
    let options = transition.options();
    let $state = transition.router.stateService;
    let $urlRouter = transition.router.urlRouter;
    // Dont update the url in these situations:
    // The transition was triggered by a URL sync (options.source === 'url')
    // The user doesn't want the url to update (options.location === false)
    // The destination state, and all parents have no navigable url
    if (options.source !== 'url' && options.location && $state.$current.navigable) {
        var urlOptions = { replace: options.location === 'replace' };
        $urlRouter.push($state.$current.navigable.url, $state.params, urlOptions);
    }
    $urlRouter.update(true);
};
const registerUpdateUrl = (transitionService) => transitionService.onSuccess({}, updateUrl, { priority: 9999 });

/** @module hooks */ /** */
/**
 * A [[TransitionHookFn]] that performs lazy loading
 *
 * When entering a state "abc" which has a `lazyLoad` function defined:
 * - Invoke the `lazyLoad` function (unless it is already in process)
 *   - Flag the hook function as "in process"
 *   - The function should return a promise (that resolves when lazy loading is complete)
 * - Wait for the promise to settle
 *   - If the promise resolves to a [[LazyLoadResult]], then register those states
 *   - Flag the hook function as "not in process"
 * - If the hook was successful
 *   - Remove the `lazyLoad` function from the state declaration
 * - If all the hooks were successful
 *   - Retry the transition (by returning a TargetState)
 *
 * ```
 * .state('abc', {
 *   component: 'fooComponent',
 *   lazyLoad: () => System.import('./fooComponent')
 *   });
 * ```
 *
 * See [[StateDeclaration.lazyLoad]]
 */
const lazyLoadHook = (transition) => {
    let router = transition.router;
    function retryTransition() {
        if (transition.originalTransition().options().source !== 'url') {
            // The original transition was not triggered via url sync
            // The lazy state should be loaded now, so re-try the original transition
            let orig = transition.targetState();
            return router.stateService.target(orig.identifier(), orig.params(), orig.options());
        }
        // The original transition was triggered via url sync
        // Run the URL rules and find the best match
        let $url = router.urlService;
        let result = $url.match($url.parts());
        let rule = result && result.rule;
        // If the best match is a state, redirect the transition (instead
        // of calling sync() which supersedes the current transition)
        if (rule && rule.type === "STATE") {
            let state = rule.state;
            let params = result.match;
            return router.stateService.target(state, params, transition.options());
        }
        // No matching state found, so let .sync() choose the best non-state match/otherwise
        router.urlService.sync();
    }
    let promises = transition.entering()
        .filter(state => !!state.$$state().lazyLoad)
        .map(state => lazyLoadState(transition, state));
    return services$1.$q.all(promises).then(retryTransition);
};
const registerLazyLoadHook = (transitionService) => transitionService.onBefore({ entering: (state) => !!state.lazyLoad }, lazyLoadHook);
/**
 * Invokes a state's lazy load function
 *
 * @param {?} transition a Transition context
 * @param {?} state the state to lazy load
 * @return {?} A promise for the lazy load result
 */
function lazyLoadState(transition, state) {
    let /** @type {?} */ lazyLoadFn = state.$$state().lazyLoad;
    // Store/get the lazy load promise on/from the hookfn so it doesn't get re-invoked
    let /** @type {?} */ promise = lazyLoadFn['_promise'];
    if (!promise) {
        const /** @type {?} */ success = (result) => {
            delete state.lazyLoad;
            delete state.$$state().lazyLoad;
            delete lazyLoadFn['_promise'];
            return result;
        };
        const /** @type {?} */ error = (err) => {
            delete lazyLoadFn['_promise'];
            return services$1.$q.reject(err);
        };
        promise = lazyLoadFn['_promise'] =
            services$1.$q.when(lazyLoadFn(transition, state))
                .then(updateStateRegistry)
                .then(success, error);
    }
    /**
     * Register any lazy loaded state definitions
     * @param {?} result
     * @return {?}
     */
    function updateStateRegistry(result) {
        if (result && Array.isArray(result.states)) {
            result.states.forEach(state => transition.router.stateRegistry.register(state));
        }
        return result;
    }
    return promise;
}

/** @module transition */ /** */
/**
 * This class defines a type of hook, such as `onBefore` or `onEnter`.
 * Plugins can define custom hook types, such as sticky states does for `onInactive`.
 *
 * \@interalapi
 */
class TransitionEventType$1 {
    /**
     * @param {?} name
     * @param {?} hookPhase
     * @param {?} hookOrder
     * @param {?} criteriaMatchPath
     * @param {?=} reverseSort
     * @param {?=} getResultHandler
     * @param {?=} getErrorHandler
     * @param {?=} synchronous
     */
    constructor(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort = false, getResultHandler = TransitionHook$1.HANDLE_RESULT, getErrorHandler = TransitionHook$1.REJECT_ERROR, synchronous = false) {
        this.name = name;
        this.hookPhase = hookPhase;
        this.hookOrder = hookOrder;
        this.criteriaMatchPath = criteriaMatchPath;
        this.reverseSort = reverseSort;
        this.getResultHandler = getResultHandler;
        this.getErrorHandler = getErrorHandler;
        this.synchronous = synchronous;
    }
}

/** @module hooks */ /** */
/**
 * A [[TransitionHookFn]] that skips a transition if it should be ignored
 *
 * This hook is invoked at the end of the onBefore phase.
 *
 * If the transition should be ignored (because no parameter or states changed)
 * then the transition is ignored and not processed.
 * @param {?} trans
 * @return {?}
 */
function ignoredHook(trans) {
    const /** @type {?} */ ignoredReason = trans._ignoredReason();
    if (!ignoredReason)
        return;
    trace$1.traceTransitionIgnored(trans);
    const /** @type {?} */ pending = trans.router.globals.transition;
    // The user clicked a link going back to the *current state* ('A')
    // However, there is also a pending transition in flight (to 'B')
    // Abort the transition to 'B' because the user now wants to be back at 'A'.
    if (ignoredReason === 'SameAsCurrent' && pending) {
        pending.abort();
    }
    return Rejection$1.ignored().toPromise();
}
const registerIgnoredTransitionHook = (transitionService) => transitionService.onBefore({}, ignoredHook, { priority: -9999 });

/** @module hooks */ /** */
/**
 * A [[TransitionHookFn]] that rejects the Transition if it is invalid
 *
 * This hook is invoked at the end of the onBefore phase.
 * If the transition is invalid (for example, param values do not validate)
 * then the transition is rejected.
 * @param {?} trans
 * @return {?}
 */
function invalidTransitionHook(trans) {
    if (!trans.valid()) {
        throw new Error(trans.error());
    }
}
const registerInvalidTransitionHook = (transitionService) => transitionService.onBefore({}, invalidTransitionHook, { priority: -10000 });

/**
 * @coreapi
 * @module transition
 */
/** for typedoc */
/**
 * The default [[Transition]] options.
 *
 * Include this object when applying custom defaults:
 * let reloadOpts = { reload: true, notify: true }
 * let options = defaults(theirOpts, customDefaults, defaultOptions);
 */
let defaultTransOpts$1 = {
    location: true,
    relative: null,
    inherit: false,
    notify: true,
    reload: false,
    custom: {},
    current: () => null,
    source: "unknown"
};
/**
 * This class provides services related to Transitions.
 *
 * - Most importantly, it allows global Transition Hooks to be registered.
 * - It allows the default transition error handler to be set.
 * - It also has a factory function for creating new [[Transition]] objects, (used internally by the [[StateService]]).
 *
 * At bootstrap, [[UIRouter]] creates a single instance (singleton) of this class.
 */
class TransitionService$1 {
    /**
     * @hidden
     * @param {?} _router
     */
    constructor(_router) {
        /**
         * @hidden
         */
        this._transitionCount = 0;
        /**
         * @hidden The transition hook types, such as `onEnter`, `onStart`, etc
         */
        this._eventTypes = [];
        /**
         * @hidden The registered transition hooks
         */
        this._registeredHooks = {};
        /**
         * @hidden The  paths on a criteria object
         */
        this._criteriaPaths = {};
        this._router = _router;
        this.$view = _router.viewService;
        this._deregisterHookFns = {};
        this._pluginapi = createProxyFunctions$1(val$1(this), {}, val$1(this), [
            '_definePathType',
            '_defineEvent',
            '_getPathTypes',
            '_getEvents',
            'getHooks',
        ]);
        this._defineCorePaths();
        this._defineCoreEvents();
        this._registerCoreTransitionHooks();
    }
    /**
     * Registers a [[TransitionHookFn]], called *while a transition is being constructed*.
     *
     * Registers a transition lifecycle hook, which is invoked during transition construction.
     *
     * This low level hook should only be used by plugins.
     * This can be a useful time for plugins to add resolves or mutate the transition as needed.
     * The Sticky States plugin uses this hook to modify the treechanges.
     *
     * ### Lifecycle
     *
     * `onCreate` hooks are invoked *while a transition is being constructed*.
     *
     * ### Return value
     *
     * The hook's return value is ignored
     *
     * \@internalapi
     * @param {?} criteria defines which Transitions the Hook should be invoked for.
     * @param {?} callback the hook function which will be invoked.
     * @param {?=} options the registration options
     * @return {?} a function which deregisters the hook.
     */
    onCreate(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onBefore(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onStart(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onExit(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onRetain(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onEnter(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onFinish(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onSuccess(criteria, callback, options) { return; }
    /**
     * \@inheritdoc
     * @param {?} criteria
     * @param {?} callback
     * @param {?=} options
     * @return {?}
     */
    onError(criteria, callback, options) { return; }
    /**
     * dispose
     * \@internalapi
     * @param {?} router
     * @return {?}
     */
    dispose(router) {
        values$1(this._registeredHooks).forEach((hooksArray) => hooksArray.forEach(hook => {
            hook._deregistered = true;
            removeFrom$1(hooksArray, hook);
        }));
    }
    /**
     * Creates a new [[Transition]] object
     *
     * This is a factory function for creating new Transition objects.
     * It is used internally by the [[StateService]] and should generally not be called by application code.
     *
     * @param {?} fromPath the path to the current state (the from state)
     * @param {?} targetState the target state (destination)
     * @return {?} a Transition
     */
    create(fromPath, targetState) {
        return new Transition$1(fromPath, targetState, this._router);
    }
    /**
     * @hidden
     * @return {?}
     */
    _defineCoreEvents() {
        const /** @type {?} */ Phase = TransitionHookPhase$1;
        const /** @type {?} */ TH = TransitionHook$1;
        const /** @type {?} */ paths = this._criteriaPaths;
        const /** @type {?} */ NORMAL_SORT = false, /** @type {?} */ REVERSE_SORT = true;
        const /** @type {?} */ ASYNCHRONOUS = false, /** @type {?} */ SYNCHRONOUS = true;
        this._defineEvent("onCreate", Phase.CREATE, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.THROW_ERROR, SYNCHRONOUS);
        this._defineEvent("onBefore", Phase.BEFORE, 0, paths.to);
        this._defineEvent("onStart", Phase.RUN, 0, paths.to);
        this._defineEvent("onExit", Phase.RUN, 100, paths.exiting, REVERSE_SORT);
        this._defineEvent("onRetain", Phase.RUN, 200, paths.retained);
        this._defineEvent("onEnter", Phase.RUN, 300, paths.entering);
        this._defineEvent("onFinish", Phase.RUN, 400, paths.to);
        this._defineEvent("onSuccess", Phase.SUCCESS, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.LOG_ERROR, SYNCHRONOUS);
        this._defineEvent("onError", Phase.ERROR, 0, paths.to, NORMAL_SORT, TH.LOG_REJECTED_RESULT, TH.LOG_ERROR, SYNCHRONOUS);
    }
    /**
     * @hidden
     * @return {?}
     */
    _defineCorePaths() {
        const { STATE, TRANSITION } = TransitionHookScope$1;
        this._definePathType("to", TRANSITION);
        this._definePathType("from", TRANSITION);
        this._definePathType("exiting", STATE);
        this._definePathType("retained", STATE);
        this._definePathType("entering", STATE);
    }
    /**
     * @hidden
     * @param {?} name
     * @param {?} hookPhase
     * @param {?} hookOrder
     * @param {?} criteriaMatchPath
     * @param {?=} reverseSort
     * @param {?=} getResultHandler
     * @param {?=} getErrorHandler
     * @param {?=} synchronous
     * @return {?}
     */
    _defineEvent(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort = false, getResultHandler = TransitionHook$1.HANDLE_RESULT, getErrorHandler = TransitionHook$1.REJECT_ERROR, synchronous = false) {
        let /** @type {?} */ eventType = new TransitionEventType$1(name, hookPhase, hookOrder, criteriaMatchPath, reverseSort, getResultHandler, getErrorHandler, synchronous);
        this._eventTypes.push(eventType);
        makeEvent$1(this, this, eventType);
    }
    ;
    /**
     * @hidden
     * @param {?=} phase
     * @return {?}
     */
    _getEvents(phase) {
        let /** @type {?} */ transitionHookTypes = isDefined$1(phase) ?
            this._eventTypes.filter(type => type.hookPhase === phase) :
            this._eventTypes.slice();
        return transitionHookTypes.sort((l, r) => {
            let /** @type {?} */ cmpByPhase = l.hookPhase - r.hookPhase;
            return cmpByPhase === 0 ? l.hookOrder - r.hookOrder : cmpByPhase;
        });
    }
    /**
     * Adds a Path to be used as a criterion against a TreeChanges path
     *
     * For example: the `exiting` path in [[HookMatchCriteria]] is a STATE scoped path.
     * It was defined by calling `defineTreeChangesCriterion('exiting', TransitionHookScope.STATE)`
     * Each state in the exiting path is checked against the criteria and returned as part of the match.
     *
     * Another example: the `to` path in [[HookMatchCriteria]] is a TRANSITION scoped path.
     * It was defined by calling `defineTreeChangesCriterion('to', TransitionHookScope.TRANSITION)`
     * Only the tail of the `to` path is checked against the criteria and returned as part of the match.
     *
     * @hidden
     * @param {?} name
     * @param {?} hookScope
     * @return {?}
     */
    _definePathType(name, hookScope) {
        this._criteriaPaths[name] = { name, scope: hookScope };
    }
    /**
     * @hidden
     * @return {?}
     */
    _getPathTypes() {
        return this._criteriaPaths;
    }
    /**
     * @hidden
     * @param {?} hookName
     * @return {?}
     */
    getHooks(hookName) {
        return this._registeredHooks[hookName];
    }
    /**
     * @hidden
     * @return {?}
     */
    _registerCoreTransitionHooks() {
        let /** @type {?} */ fns = this._deregisterHookFns;
        fns.addCoreResolves = registerAddCoreResolvables(this);
        fns.ignored = registerIgnoredTransitionHook(this);
        fns.invalid = registerInvalidTransitionHook(this);
        // Wire up redirectTo hook
        fns.redirectTo = registerRedirectToHook(this);
        // Wire up onExit/Retain/Enter state hooks
        fns.onExit = registerOnExitHook(this);
        fns.onRetain = registerOnRetainHook(this);
        fns.onEnter = registerOnEnterHook(this);
        // Wire up Resolve hooks
        fns.eagerResolve = registerEagerResolvePath(this);
        fns.lazyResolve = registerLazyResolveState(this);
        // Wire up the View management hooks
        fns.loadViews = registerLoadEnteringViews(this);
        fns.activateViews = registerActivateViews(this);
        // Updates global state after a transition
        fns.updateGlobals = registerUpdateGlobalState(this);
        // After globals.current is updated at priority: 10000
        fns.updateUrl = registerUpdateUrl(this);
        // Lazy load state trees
        fns.lazyLoad = registerLazyLoadHook(this);
    }
}

/**
 * @coreapi
 * @module state
 */
/** */
/**
 * Provides state related service functions
 *
 * This class provides services related to ui-router states.
 * An instance of this class is located on the global [[UIRouter]] object.
 */
class StateService$1 {
    /**
     * \@internalapi
     * @param {?} router
     */
    constructor(router) {
        this.router = router;
        /**
         * \@internalapi
         */
        this.invalidCallbacks = [];
        /**
         * @hidden
         */
        this._defaultErrorHandler = function $defaultErrorHandler($error$) {
            if ($error$ instanceof Error && $error$.stack) {
                console.error($error$);
                console.error($error$.stack);
            }
            else if ($error$ instanceof Rejection$1) {
                console.error($error$.toString());
                if ($error$.detail && $error$.detail.stack)
                    console.error($error$.detail.stack);
            }
            else {
                console.error($error$);
            }
        };
        let getters = ['current', '$current', 'params', 'transition'];
        let boundFns = Object.keys(StateService$1.prototype).filter(not$1(inArray$1(getters)));
        createProxyFunctions$1(val$1(StateService$1.prototype), this, val$1(this), boundFns);
    }
    /**
     * The [[Transition]] currently in progress (or null)
     *
     * This is a passthrough through to [[UIRouterGlobals.transition]]
     * @return {?}
     */
    get transition() { return this.router.globals.transition; }
    /**
     * The latest successful state parameters
     *
     * This is a passthrough through to [[UIRouterGlobals.params]]
     * @return {?}
     */
    get params() { return this.router.globals.params; }
    /**
     * The current [[StateDeclaration]]
     *
     * This is a passthrough through to [[UIRouterGlobals.current]]
     * @return {?}
     */
    get current() { return this.router.globals.current; }
    /**
     * The current [[StateObject]]
     *
     * This is a passthrough through to [[UIRouterGlobals.$current]]
     * @return {?}
     */
    get $current() { return this.router.globals.$current; }
    /**
     * \@internalapi
     * @return {?}
     */
    dispose() {
        this.defaultErrorHandler(noop$1);
        this.invalidCallbacks = [];
    }
    /**
     * Handler for when [[transitionTo]] is called with an invalid state.
     *
     * Invokes the [[onInvalid]] callbacks, in natural order.
     * Each callback's return value is checked in sequence until one of them returns an instance of TargetState.
     * The results of the callbacks are wrapped in $q.when(), so the callbacks may return promises.
     *
     * If a callback returns an TargetState, then it is used as arguments to $state.transitionTo() and the result returned.
     *
     * \@internalapi
     * @param {?} fromPath
     * @param {?} toState
     * @return {?}
     */
    _handleInvalidTargetState(fromPath, toState) {
        let /** @type {?} */ fromState = PathUtils$1.makeTargetState(fromPath);
        let /** @type {?} */ globals = this.router.globals;
        const /** @type {?} */ latestThing = () => globals.transitionHistory.peekTail();
        let /** @type {?} */ latest = latestThing();
        let /** @type {?} */ callbackQueue = new Queue$1(this.invalidCallbacks.slice());
        let /** @type {?} */ injector = new ResolveContext$1(fromPath).injector();
        const /** @type {?} */ checkForRedirect = (result) => {
            if (!(result instanceof TargetState$1)) {
                return;
            }
            let /** @type {?} */ target = (result);
            // Recreate the TargetState, in case the state is now defined.
            target = this.target(target.identifier(), target.params(), target.options());
            if (!target.valid()) {
                return Rejection$1.invalid(target.error()).toPromise();
            }
            if (latestThing() !== latest) {
                return Rejection$1.superseded().toPromise();
            }
            return this.transitionTo(target.identifier(), target.params(), target.options());
        };
        /**
         * @return {?}
         */
        function invokeNextCallback() {
            let /** @type {?} */ nextCallback = callbackQueue.dequeue();
            if (nextCallback === undefined)
                return Rejection$1.invalid(toState.error()).toPromise();
            let /** @type {?} */ callbackResult = services$1.$q.when(nextCallback(toState, fromState, injector));
            return callbackResult.then(checkForRedirect).then(result => result || invokeNextCallback());
        }
        return invokeNextCallback();
    }
    /**
     * Registers an Invalid State handler
     *
     * Registers a [[OnInvalidCallback]] function to be invoked when [[StateService.transitionTo]]
     * has been called with an invalid state reference parameter
     *
     * Example:
     * ```js
     * stateService.onInvalid(function(to, from, injector) {
     *   if (to.name() === 'foo') {
     *     let lazyLoader = injector.get('LazyLoadService');
     *     return lazyLoader.load('foo')
     *         .then(() => stateService.target('foo'));
     *   }
     * });
     * ```
     *
     *   This function receives the (invalid) toState, the fromState, and an injector.
     *   The function may optionally return a [[TargetState]] or a Promise for a TargetState.
     *   If one is returned, it is treated as a redirect.
     *
     * @param {?} callback
     * @return {?} a function which deregisters the callback
     */
    onInvalid(callback) {
        this.invalidCallbacks.push(callback);
        return function deregisterListener() {
            removeFrom$1(this.invalidCallbacks)(callback);
        }.bind(this);
    }
    /**
     * Reloads the current state
     *
     * A method that force reloads the current state, or a partial state hierarchy.
     * All resolves are re-resolved, and components reinstantiated.
     *
     * #### Example:
     * ```js
     * let app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     $state.reload();
     *   }
     * });
     * ```
     *
     * Note: `reload()` is just an alias for:
     *
     * ```js
     * $state.transitionTo($state.current, $state.params, {
     *   reload: true, inherit: false
     * });
     * ```
     *
     * @param {?=} reloadState A state name or a state object.
     *    If present, this state and all its children will be reloaded, but ancestors will not reload.
     *
     * #### Example:
     * ```js
     * //assuming app application consists of 3 states: 'contacts', 'contacts.detail', 'contacts.detail.item'
     * //and current state is 'contacts.detail.item'
     * let app angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.reload = function(){
     *     //will reload 'contact.detail' and nested 'contact.detail.item' states
     *     $state.reload('contact.detail');
     *   }
     * });
     * ```
     *
     * @return {?} A promise representing the state of the new transition. See [[StateService.go]]
     */
    reload(reloadState) {
        return this.transitionTo(this.current, this.params, {
            reload: isDefined$1(reloadState) ? reloadState : true,
            inherit: false,
            notify: false,
        });
    }
    ;
    /**
     * Transition to a different state and/or parameters
     *
     * Convenience method for transitioning to a new state.
     *
     * `$state.go` calls `$state.transitionTo` internally but automatically sets options to
     * `{ location: true, inherit: true, relative: router.globals.$current, notify: true }`.
     * This allows you to use either an absolute or relative `to` argument (because of `relative: router.globals.$current`).
     * It also allows you to specify * only the parameters you'd like to update, while letting unspecified parameters
     * inherit from the current parameter values (because of `inherit: true`).
     *
     * #### Example:
     * ```js
     * let app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.go('contact.detail');
     *   };
     * });
     * ```
     *
     * @param {?} to Absolute state name, state object, or relative state path (relative to current state).
     *
     * Some examples:
     *
     * - `$state.go('contact.detail')` - will go to the `contact.detail` state
     * - `$state.go('^')` - will go to the parent state
     * - `$state.go('^.sibling')` - if current state is `home.child`, will go to the `home.sibling` state
     * - `$state.go('.child.grandchild')` - if current state is home, will go to the `home.child.grandchild` state
     *
     * @param {?=} params A map of the parameters that will be sent to the state, will populate $stateParams.
     *
     *    Any parameters that are not specified will be inherited from current parameter values (because of `inherit: true`).
     *    This allows, for example, going to a sibling state that shares parameters defined by a parent state.
     *
     * @param {?=} options Transition options
     *
     * @return {?}
     */
    go(to, params, options) {
        let /** @type {?} */ defautGoOpts = { relative: this.$current, inherit: true };
        let /** @type {?} */ transOpts = defaults$1(options, defautGoOpts, defaultTransOpts$1);
        return this.transitionTo(to, params, transOpts);
    }
    ;
    /**
     * Creates a [[TargetState]]
     *
     * This is a factory method for creating a TargetState
     *
     * This may be returned from a Transition Hook to redirect a transition, for example.
     * @param {?} identifier
     * @param {?=} params
     * @param {?=} options
     * @return {?}
     */
    target(identifier, params, options = {}) {
        // If we're reloading, find the state object to reload from
        if (isObject$1(options.reload) && !((options.reload)).name)
            throw new Error('Invalid reload state object');
        let /** @type {?} */ reg = this.router.stateRegistry;
        options.reloadState = options.reload === true ? reg.root() : reg.matcher.find(/** @type {?} */ (options.reload), options.relative);
        if (options.reload && !options.reloadState)
            throw new Error(`No such reload state '${(isString$1(options.reload) ? options.reload : ((options.reload)).name)}'`);
        let /** @type {?} */ stateDefinition = reg.matcher.find(identifier, options.relative);
        return new TargetState$1(identifier, stateDefinition, params, options);
    }
    ;
    /**
     * @return {?}
     */
    getCurrentPath() {
        let /** @type {?} */ globals = this.router.globals;
        let /** @type {?} */ latestSuccess = globals.successfulTransitions.peekTail();
        const /** @type {?} */ rootPath = () => [new PathNode$1(this.router.stateRegistry.root())];
        return latestSuccess ? latestSuccess.treeChanges().to : rootPath();
    }
    /**
     * Low-level method for transitioning to a new state.
     *
     * The [[go]] method (which uses `transitionTo` internally) is recommended in most situations.
     *
     * #### Example:
     * ```js
     * let app = angular.module('app', ['ui.router']);
     *
     * app.controller('ctrl', function ($scope, $state) {
     *   $scope.changeState = function () {
     *     $state.transitionTo('contact.detail');
     *   };
     * });
     * ```
     *
     * @param {?} to State name or state object.
     * @param {?=} toParams A map of the parameters that will be sent to the state,
     *      will populate $stateParams.
     * @param {?=} options Transition options
     *
     * @return {?} A promise representing the state of the new transition. See [[go]]
     */
    transitionTo(to, toParams = {}, options = {}) {
        let /** @type {?} */ router = this.router;
        let /** @type {?} */ globals = router.globals;
        options = defaults$1(options, defaultTransOpts$1);
        const /** @type {?} */ getCurrent = () => globals.transition;
        options = extend$1(options, { current: getCurrent });
        let /** @type {?} */ ref = this.target(to, toParams, options);
        let /** @type {?} */ currentPath = this.getCurrentPath();
        if (!ref.exists())
            return this._handleInvalidTargetState(currentPath, ref);
        if (!ref.valid())
            return (silentRejection$1(ref.error()));
        /**
         * Special handling for Ignored, Aborted, and Redirected transitions
         *
         * The semantics for the transition.run() promise and the StateService.transitionTo()
         * promise differ. For instance, the run() promise may be rejected because it was
         * IGNORED, but the transitionTo() promise is resolved because from the user perspective
         * no error occurred.  Likewise, the transition.run() promise may be rejected because of
         * a Redirect, but the transitionTo() promise is chained to the new Transition's promise.
         */
        const rejectedTransitionHandler = (transition) => (error) => {
            if (error instanceof Rejection$1) {
                const isLatest = router.globals.lastStartedTransitionId === transition.$id;
                if (error.type === RejectType$1.IGNORED) {
                    isLatest && router.urlRouter.update();
                    // Consider ignored `Transition.run()` as a successful `transitionTo`
                    return services$1.$q.when(globals.current);
                }
                const detail = error.detail;
                if (error.type === RejectType$1.SUPERSEDED && error.redirected && detail instanceof TargetState$1) {
                    // If `Transition.run()` was redirected, allow the `transitionTo()` promise to resolve successfully
                    // by returning the promise for the new (redirect) `Transition.run()`.
                    let redirect = transition.redirect(detail);
                    return redirect.run().catch(rejectedTransitionHandler(redirect));
                }
                if (error.type === RejectType$1.ABORTED) {
                    isLatest && router.urlRouter.update();
                    return services$1.$q.reject(error);
                }
            }
            let errorHandler = this.defaultErrorHandler();
            errorHandler(error);
            return services$1.$q.reject(error);
        };
        let /** @type {?} */ transition = this.router.transitionService.create(currentPath, ref);
        let /** @type {?} */ transitionToPromise = transition.run().catch(rejectedTransitionHandler(transition));
        silenceUncaughtInPromise$1(transitionToPromise); // issue #2676
        // Return a promise for the transition, which also has the transition object on it.
        return extend$1(transitionToPromise, { transition });
    }
    ;
    /**
     * Checks if the current state *is* the provided state
     *
     * Similar to [[includes]] but only checks for the full state name.
     * If params is supplied then it will be tested for strict equality against the current
     * active params object, so all params must match with none missing and no extras.
     *
     * #### Example:
     * ```js
     * $state.$current.name = 'contacts.details.item';
     *
     * // absolute name
     * $state.is('contact.details.item'); // returns true
     * $state.is(contactDetailItemStateObject); // returns true
     * ```
     *
     * // relative name (. and ^), typically from a template
     * // E.g. from the 'contacts.details' template
     * ```html
     * <div ng-class="{highlighted: $state.is('.item')}">Item</div>
     * ```
     *
     * @param {?} stateOrName The state name (absolute or relative) or state object you'd like to check.
     * @param {?=} params A param object, e.g. `{sectionId: section.id}`, that you'd like
     * to test against the current active state.
     * @param {?=} options An options object. The options are:
     *   - `relative`: If `stateOrName` is a relative state name and `options.relative` is set, .is will
     *     test relative to `options.relative` state (or name).
     *
     * @return {?} Returns true if it is the state.
     */
    is(stateOrName, params, options) {
        options = defaults$1(options, { relative: this.$current });
        let /** @type {?} */ state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
        if (!isDefined$1(state))
            return undefined;
        if (this.$current !== state)
            return false;
        if (!params)
            return true;
        let /** @type {?} */ schema = state.parameters({ inherit: true, matchingKeys: params });
        return Param$1.equals(schema, Param$1.values(schema, params), this.params);
    }
    ;
    /**
     * Checks if the current state *includes* the provided state
     *
     * A method to determine if the current active state is equal to or is the child of the
     * state stateName. If any params are passed then they will be tested for a match as well.
     * Not all the parameters need to be passed, just the ones you'd like to test for equality.
     *
     * #### Example when `$state.$current.name === 'contacts.details.item'`
     * ```js
     * // Using partial names
     * $state.includes("contacts"); // returns true
     * $state.includes("contacts.details"); // returns true
     * $state.includes("contacts.details.item"); // returns true
     * $state.includes("contacts.list"); // returns false
     * $state.includes("about"); // returns false
     * ```
     *
     * #### Glob Examples when `* $state.$current.name === 'contacts.details.item.url'`:
     * ```js
     * $state.includes("*.details.*.*"); // returns true
     * $state.includes("*.details.**"); // returns true
     * $state.includes("**.item.**"); // returns true
     * $state.includes("*.details.item.url"); // returns true
     * $state.includes("*.details.*.url"); // returns true
     * $state.includes("*.details.*"); // returns false
     * $state.includes("item.**"); // returns false
     * ```
     *
     * @param {?} stateOrName A partial name, relative name, glob pattern,
     *   or state object to be searched for within the current state name.
     * @param {?=} params A param object, e.g. `{sectionId: section.id}`,
     *   that you'd like to test against the current active state.
     * @param {?=} options An options object. The options are:
     *   - `relative`: If `stateOrName` is a relative state name and `options.relative` is set, .is will
     *     test relative to `options.relative` state (or name).
     *
     * @return {?}
     */
    includes(stateOrName, params, options) {
        options = defaults$1(options, { relative: this.$current });
        let /** @type {?} */ glob = isString$1(stateOrName) && Glob$1.fromString(/** @type {?} */ (stateOrName));
        if (glob) {
            if (!glob.matches(this.$current.name))
                return false;
            stateOrName = this.$current.name;
        }
        let /** @type {?} */ state = this.router.stateRegistry.matcher.find(stateOrName, options.relative), /** @type {?} */ include = this.$current.includes;
        if (!isDefined$1(state))
            return undefined;
        if (!isDefined$1(include[state.name]))
            return false;
        if (!params)
            return true;
        let /** @type {?} */ schema = state.parameters({ inherit: true, matchingKeys: params });
        return Param$1.equals(schema, Param$1.values(schema, params), this.params);
    }
    ;
    /**
     * Generates a URL for a state and parameters
     *
     * Returns the url for the given state populated with the given params.
     *
     * #### Example:
     * ```js
     * expect($state.href("about.person", { person: "bob" })).toEqual("/about/bob");
     * ```
     *
     * @param {?} stateOrName The state name or state object you'd like to generate a url from.
     * @param {?} params An object of parameter values to fill the state's required parameters.
     * @param {?=} options Options object. The options are:
     *
     * @return {?}
     */
    href(stateOrName, params, options) {
        let /** @type {?} */ defaultHrefOpts = {
            lossy: true,
            inherit: true,
            absolute: false,
            relative: this.$current,
        };
        options = defaults$1(options, defaultHrefOpts);
        params = params || {};
        let /** @type {?} */ state = this.router.stateRegistry.matcher.find(stateOrName, options.relative);
        if (!isDefined$1(state))
            return null;
        if (options.inherit)
            params = (this.params.$inherit(params, this.$current, state));
        let /** @type {?} */ nav = (state && options.lossy) ? state.navigable : state;
        if (!nav || nav.url === undefined || nav.url === null) {
            return null;
        }
        return this.router.urlRouter.href(nav.url, params, {
            absolute: options.absolute,
        });
    }
    ;
    /**
     * Sets or gets the default [[transitionTo]] error handler.
     *
     * The error handler is called when a [[Transition]] is rejected or when any error occurred during the Transition.
     * This includes errors caused by resolves and transition hooks.
     *
     * Note:
     * This handler does not receive certain Transition rejections.
     * Redirected and Ignored Transitions are not considered to be errors by [[StateService.transitionTo]].
     *
     * The built-in default error handler logs the error to the console.
     *
     * You can provide your own custom handler.
     *
     * #### Example:
     * ```js
     * stateService.defaultErrorHandler(function() {
     *   // Do not log transitionTo errors
     * });
     * ```
     *
     * @param {?=} handler a global error handler function
     * @return {?} the current global error handler
     */
    defaultErrorHandler(handler) {
        return this._defaultErrorHandler = handler || this._defaultErrorHandler;
    }
    /**
     * @param {?=} stateOrName
     * @param {?=} base
     * @return {?}
     */
    get(stateOrName, base) {
        let /** @type {?} */ reg = this.router.stateRegistry;
        if (arguments.length === 0)
            return reg.get();
        return reg.get(stateOrName, base || this.$current);
    }
    /**
     * Lazy loads a state
     *
     * Explicitly runs a state's [[StateDeclaration.lazyLoad]] function.
     *
     * @param {?} stateOrName the state that should be lazy loaded
     * @param {?=} transition the optional Transition context to use (if the lazyLoad function requires an injector, etc)
     * Note: If no transition is provided, a noop transition is created using the from the current state to the current state.
     * This noop transition is not actually run.
     *
     * @return {?} a promise to lazy load
     */
    lazyLoad(stateOrName, transition) {
        let /** @type {?} */ state = this.get(stateOrName);
        if (!state || !state.lazyLoad)
            throw new Error("Can not lazy load " + stateOrName);
        let /** @type {?} */ currentPath = this.getCurrentPath();
        let /** @type {?} */ target = PathUtils$1.makeTargetState(currentPath);
        transition = transition || this.router.transitionService.create(currentPath, target);
        return lazyLoadState(transition, state);
    }
}

/**
 * # Transition subsystem
 *
 * This module contains APIs related to a Transition.
 *
 * See:
 * - [[TransitionService]]
 * - [[Transition]]
 * - [[HookFn]], [[TransitionHookFn]], [[TransitionStateHookFn]], [[HookMatchCriteria]], [[HookResult]]
 *
 * @coreapi
 * @preferred
 * @module transition
 */ /** for typedoc */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * An angular1-like promise api
 *
 * This object implements four methods similar to the
 * [angular 1 promise api](https://docs.angularjs.org/api/ng/service/$q)
 *
 * UI-Router evolved from an angular 1 library to a framework agnostic library.
 * However, some of the `\@uirouter/core` code uses these ng1 style APIs to support ng1 style dependency injection.
 *
 * This API provides native ES6 promise support wrapped as a $q-like API.
 * Internally, UI-Router uses this $q object to perform promise operations.
 * The `angular-ui-router` (ui-router for angular 1) uses the $q API provided by angular.
 *
 * $q-like promise api
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A basic angular1-like injector api
 *
 * This object implements four methods similar to the
 * [angular 1 dependency injector](https://docs.angularjs.org/api/auto/service/$injector)
 *
 * UI-Router evolved from an angular 1 library to a framework agnostic library.
 * However, some of the `\@uirouter/core` code uses these ng1 style APIs to support ng1 style dependency injection.
 *
 * This object provides a naive implementation of a globally scoped dependency injection system.
 * It supports the following DI approaches:
 *
 * ### Function parameter names
 *
 * A function's `.toString()` is called, and the parameter names are parsed.
 * This only works when the parameter names aren't "mangled" by a minifier such as UglifyJS.
 *
 * ```js
 * function injectedFunction(FooService, BarService) {
 *   // FooService and BarService are injected
 * }
 * ```
 *
 * ### Function annotation
 *
 * A function may be annotated with an array of dependency names as the `$inject` property.
 *
 * ```js
 * injectedFunction.$inject = [ 'FooService', 'BarService' ];
 * function injectedFunction(fs, bs) {
 *   // FooService and BarService are injected as fs and bs parameters
 * }
 * ```
 *
 * ### Array notation
 *
 * An array provides the names of the dependencies to inject (as strings).
 * The function is the last element of the array.
 *
 * ```js
 * [ 'FooService', 'BarService', function (fs, bs) {
 *   // FooService and BarService are injected as fs and bs parameters
 * }]
 * ```
 *
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
const beforeAfterSubstr$2 = (char) => (str) => {
    if (!str)
        return ["", ""];
    let /** @type {?} */ idx = str.indexOf(char);
    if (idx === -1)
        return [str, ""];
    return [str.substr(0, idx), str.substr(idx + 1)];
};
const splitHash$1 = beforeAfterSubstr$2("#");
const splitQuery$1 = beforeAfterSubstr$2("?");
const splitEqual$1 = beforeAfterSubstr$2("=");

const keyValsToObjectR$1 = (accum, [key, val$$1]) => {
    if (!accum.hasOwnProperty(key)) {
        accum[key] = val$$1;
    }
    else if (isArray$1(accum[key])) {
        accum[key].push(val$$1);
    }
    else {
        accum[key] = [accum[key], val$$1];
    }
    return accum;
};
const getParams$1 = (queryString) => queryString.split("&").filter(identity$1).map(splitEqual$1).reduce(keyValsToObjectR$1, {});
/**
 * @param {?} url
 * @return {?}
 */
function parseUrl$2(url) {
    const /** @type {?} */ orEmptyString = x => x || "";
    let [beforehash, hash] = splitHash$1(url).map(orEmptyString);
    let [path, search] = splitQuery$1(beforehash).map(orEmptyString);
    return { path, search, hash, url };
}
const buildUrl$1 = (loc) => {
    let /** @type {?} */ path = loc.path();
    let /** @type {?} */ searchObject = loc.search();
    let /** @type {?} */ hash = loc.hash();
    let /** @type {?} */ search = Object.keys(searchObject).map(key => {
        let /** @type {?} */ param = searchObject[key];
        let /** @type {?} */ vals = isArray$1(param) ? param : [param];
        return vals.map(val$$1 => key + "=" + val$$1);
    }).reduce(unnestR$1, []).join("&");
    return path + (search ? "?" + search : "") + (hash ? "#" + hash : "");
};
/**
 * @param {?} name
 * @param {?} isHtml5
 * @param {?} serviceClass
 * @param {?} configurationClass
 * @return {?}
 */

/**
 * @internalapi
 * @module vanilla
 */ /** */
/**
 * A base `LocationServices`
 * @abstract
 */
class BaseLocationServices$1 {
    /**
     * @param {?} router
     * @param {?} fireAfterUpdate
     */
    constructor(router, fireAfterUpdate) {
        this.fireAfterUpdate = fireAfterUpdate;
        this._listener = evt => this._listeners.forEach(cb => cb(evt));
        this._listeners = [];
        this.hash = () => parseUrl$2(this._get()).hash;
        this.path = () => parseUrl$2(this._get()).path;
        this.search = () => getParams$1(parseUrl$2(this._get()).search);
        this._location = window && window.location;
        this._history = window && window.history;
    }
    /**
     * This should return the current internal URL representation.
     *
     * The internal URL includes only the portion that UI-Router matches.
     * It does not include:
     * - protocol
     * - server
     * - port
     * - base href or hash
     * @abstract
     * @return {?}
     */
    _get() { }
    /**
     * This should set the current URL.
     *
     * The `url` param should include only the portion that UI-Router matches on.
     * It should not include:
     * - protocol
     * - server
     * - port
     * - base href or hash
     *
     * However, after this function completes, the browser URL should reflect the entire (fully qualified)
     * HREF including those data.
     * @abstract
     * @param {?} state
     * @param {?} title
     * @param {?} url
     * @param {?} replace
     * @return {?}
     */
    _set(state, title, url, replace) { }
    /**
     * @param {?=} url
     * @param {?=} replace
     * @return {?}
     */
    url(url, replace = true) {
        if (isDefined$1(url) && url !== this._get()) {
            this._set(null, null, url, replace);
            if (this.fireAfterUpdate) {
                let /** @type {?} */ evt = extend$1(new Event("locationchange"), { url });
                this._listeners.forEach(cb => cb(evt));
            }
        }
        return buildUrl$1(this);
    }
    /**
     * @param {?} cb
     * @return {?}
     */
    onChange(cb) {
        this._listeners.push(cb);
        return () => removeFrom$1(this._listeners, cb);
    }
    /**
     * @param {?} router
     * @return {?}
     */
    dispose(router) {
        deregAll$1(this._listeners);
    }
}

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A `LocationServices` that uses the browser hash "#" to get/set the current location
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A `LocationServices` that gets/sets the current location from an in-memory object
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A `LocationServices` that gets/sets the current location using the browser's `location` and `history` apis
 *
 * Uses `history.pushState` and `history.replaceState`
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A `LocationConfig` mock that gets/sets all config from an in-memory object
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * A `LocationConfig` that delegates to the browser's `location` object
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */
/**
 * @param {?} router
 * @return {?}
 */

/**
 * A `UIRouterPlugin` uses the browser hash to get/set the current location
 */

/**
 * A `UIRouterPlugin` that gets/sets the current location using the browser's `location` and `history` apis
 */

/**
 * A `UIRouterPlugin` that gets/sets the current location from an in-memory object
 */

/**
 * @internalapi
 * @module vanilla
 */
/** */

/**
 * # Core classes and interfaces
 *
 * The classes and interfaces that are core to ui-router and do not belong
 * to a more specific subsystem (such as resolve).
 *
 * @coreapi
 * @preferred
 * @module core
 */ /** for typedoc */
/**
 * \@internalapi
 * @abstract
 */

/**
 * @coreapi
 * @module common
 */ /** */

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
let id$2 = 0;
class Ng2ViewConfig {
    /**
     * @param {?} path
     * @param {?} viewDecl
     */
    constructor(path, viewDecl) {
        this.path = path;
        this.viewDecl = viewDecl;
        this.$id = id$2++;
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
            config: undefined,
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
        if (isFunction$1(uiCanExitFn)) {
            const /** @type {?} */ state = parse$1("uiViewData.config.viewDecl.$context.self")(this);
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
        trace$1.traceUIViewConfigUpdated(this.uiViewData, config && config.viewDecl.$context);
        this.applyUpdatedConfig(config);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    applyUpdatedConfig(config) {
        ((this.uiViewData)).config = config;
        // Create the Injector for the routed component
        let /** @type {?} */ context = new ResolveContext$1(/** @type {?} */ (config.path));
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
        let /** @type {?} */ moduleInjector = context.getResolvable(NATIVE_INJECTOR_TOKEN$1).data;
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
            .filter(tuple => !inArray$1(explicitBoundProps, tuple.prop));
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
  `,
            },] },
];
/**
 * @nocollapse
 */
UIView.ctorParameters = () => [
    { type: UIRouter$1, },
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
    exiting: false,
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
    let targetPath = PathUtils$1.buildPath(target);
    let paramSchema = targetPath.map(node => node.paramSchema)
        .reduce(unnestR$1, [])
        .filter((param) => targetParamVals.hasOwnProperty(param.id));
    return (path) => {
        let tailNode = tail$1(path);
        if (!tailNode || tailNode.state !== state)
            return false;
        let paramValues = PathUtils$1.paramValues(path);
        return Param$1.equals(paramSchema, paramValues, targetParamVals);
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
    return appendPath.map(node => basePath.concat(PathUtils$1.subPath(appendPath, n => n.state === node.state)));
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
        .reduce(anyTrueR$1, false);
    const /** @type {?} */ isExact = () => pathMatchesTarget(activePath);
    const /** @type {?} */ isEntering = () => spreadToSubPaths(tc.retained, tc.entering)
        .map(pathMatchesTarget)
        .reduce(anyTrueR$1, false);
    const /** @type {?} */ isExiting = () => spreadToSubPaths(tc.retained, tc.exiting)
        .map(pathMatchesTarget)
        .reduce(anyTrueR$1, false);
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
        let /** @type {?} */ transEvents$ = switchMap.call(((this._globals)).start$, (trans) => {
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
    { type: UIRouterGlobals$1, },
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
    /**
     * @param {?} val
     * @return {?}
     */
    set activeEq(val$$1) { this._classesEq = val$$1.split("\s+"); }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
UISrefActive.decorators = [
    { type: Directive, args: [{
                selector: '[uiSrefActive],[uiSrefActiveEq]',
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
class Ng2LocationServices extends BaseLocationServices$1 {
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
        let { path, search, hash } = parseUrl$2(url);
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
    router.locationService = (new Ng2LocationServices(/** @type {?} */ (router), locationStrategy$$1, isPlatformBrowser(injector.get(PLATFORM_ID))));
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

export { uiRouterFactory, parentUIViewInjectFactory, _UIROUTER_INSTANCE_PROVIDERS, fnStateService, fnTransitionService, fnUrlMatcherFactory, fnUrlRouter, fnUrlService, fnViewService, fnStateRegistry, fnGlobals, _UIROUTER_SERVICE_PROVIDERS, UIROUTER_PROVIDERS, UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN, UIROUTER_STATES, onTransitionReady, makeRootProviders, makeChildProviders, locationStrategy, UIRouterModule, applyModuleConfig, applyRootModuleConfig, _UIROUTER_DIRECTIVES, UIROUTER_DIRECTIVES, UIView, AnchorUISref, UISref, UISrefStatus, UISrefActive, ng2ViewsBuilder, Ng2ViewConfig, ng2LazyLoadBuilder, loadNgModule, loadModuleFactory, applyNgModule, multiProviderParentChildDelta, fromJson, toJson, copy, forEach, extend, equals, identity, noop, Mapper, TypedMap, Predicate, IInjectable, Obj, createProxyFunctions, inherit, inArray, _inArray, removeFrom, _removeFrom, pushTo, _pushTo, deregAll, defaults, mergeR, ancestors, pick, omit, pluck, filter, find, mapObj, map, values, allTrueR, anyTrueR, unnestR, flattenR, pushR, uniqR, unnest, flatten, assertPredicate, assertMap, assertFn, pairs, arrayTuples, applyPairs, tail, _extend, sortfn, sortBy, composeSort, silenceUncaughtInPromise, silentRejection, notImplemented, $QLikeDeferred, $QLike, $InjectorLike, CoreServices, LocationServices, LocationConfig, services, Glob, curry, compose, pipe, prop, propEq, parse, not, and, or, all, any, is, eq, val, invoke, pattern, isUndefined, isDefined, isNull, isNullOrUndefined, isFunction, isNumber, isString, isObject, isArray, isDate, isRegExp, isState, isInjectable, isPromise, Queue, maxLength, padString, kebobString, functionToString, fnToString, stringify, beforeAfterSubstr, splitOnDelim, joinNeighborsR, Category, Trace, trace, RawParams, ParamsOrArray, ParamDeclaration, Replace, ParamTypeDefinition, DefType, Param, ParamTypes, StateParams, ParamType, PathNode, GetParamsFn, PathUtils, ProviderLike, ResolvableLiteral, ResolvePolicy, PolicyWhen, PolicyAsync, resolvePolicies, defaultResolvePolicy, Resolvable, NATIVE_INJECTOR_TOKEN, ResolveContext, StateOrName, TransitionPromise, TargetStateDef, ResolveTypes, _ViewDeclaration, RedirectToResult, StateDeclaration, LazyLoadResult, HrefOptions, _StateDeclaration, BuilderFunction, resolvablesBuilder, StateBuilder, StateObject, StateMatcher, StateQueueManager, StateRegistryListener, StateRegistry, OnInvalidCallback, StateService, TargetState, TransitionOptions, TransitionHookOptions, TreeChanges, IHookRegistration, TransitionHookFn, TransitionStateHookFn, TransitionCreateHookFn, HookFn, HookResult, HookRegOptions, IHookRegistry, IStateMatch, HookMatchCriteria, IMatchingNodes, RegisteredHooks, PathTypes, PathType, HookMatchCriterion, TransitionHookPhase, TransitionHookScope, HookBuilder, matchState, RegisteredHook, makeEvent, RejectType, Rejection, Transition, GetResultHandler, GetErrorHandler, ResultHandler, ErrorHandler, TransitionHook, TransitionEventType, defaultTransOpts, TransitionServicePluginAPI, TransitionService, ParamFactory, UrlConfigApi, UrlMatcherConfig, UrlSyncApi, UrlRulesApi, UrlParts, MatchResult, UrlRuleMatchFn, UrlRuleHandlerFn, UrlRuleType, UrlRule, MatcherUrlRule, StateRule, RegExpRule, UrlMatcher, UrlMatcherFactory, UrlRouter, UrlRuleFactory, BaseUrlRule, UrlService, ViewContext, ActiveUIView, ViewConfig, ViewConfigFactory, ViewServicePluginAPI, ViewService, UIRouterGlobals, UIRouter, PluginFactory, LocationPlugin, ServicesPlugin, LocationLike, HistoryLike, $q, $injector, BaseLocationServices, HashLocationService, MemoryLocationService, PushStateLocationService, MemoryLocationConfig, BrowserLocationConfig, splitHash, splitQuery, splitEqual, trimHashVal, keyValsToObjectR, getParams, parseUrl, buildUrl, locationPluginFactory, servicesPlugin, hashLocationPlugin, pushStateLocationPlugin, memoryLocationPlugin, UIInjector, UIRouterPlugin, UIRouterPluginBase, Disposable, UIRouter$1 as ɵa, UIRouterGlobals$1 as ɵb };
//# sourceMappingURL=angular.js.map
