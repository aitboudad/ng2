"use strict";
/**
 * # UI-Router for Angular 2
 *
 * - [ui-router-ng2 home page](https://ui-router.github.io/ng2)
 * - [tutorials](https://ui-router.github.io/tutorial/ng2/helloworld)
 * - [quick start repository](http://github.com/ui-router/quickstart-ng2)
 *
 * Getting started:
 *
 * - Use npm. Add a dependency on latest `ui-router-ng2`
 * - Import UI-Router classes directly from `"ui-router-ng2"`
 *
 * ```js
 * import {StateRegistry} from "ui-router-ng2";
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
 * import {UIRouter} from "ui-router-ng2";
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
 */ /** */
var core_1 = require("@angular/core");
var ui_router_core_1 = require("ui-router-core");
var ui_router_core_2 = require("ui-router-core");
var ui_router_core_3 = require("ui-router-core");
var ui_router_core_4 = require("ui-router-core");
var ui_router_core_5 = require("ui-router-core");
var ui_router_core_6 = require("ui-router-core");
var ui_router_core_7 = require("ui-router-core");
var uiView_1 = require("./directives/uiView");
var views_1 = require("./statebuilders/views");
var uiRouterConfig_1 = require("./uiRouterConfig");
var ui_router_core_8 = require("ui-router-core");
var location_1 = require("./location");
var ui_router_core_9 = require("ui-router-core");
var ui_router_core_10 = require("ui-router-core");
var uiRouterNgModule_1 = require("./uiRouterNgModule");
var rx_1 = require("./rx");
var ui_router_core_11 = require("ui-router-core");
/**
 * This is a factory function for a UIRouter instance
 *
 * Creates a UIRouter instance and configures it for Angular 2, then invokes router bootstrap.
 * This function is used as an Angular 2 `useFactory` Provider.
 */
var uiRouterFactory = function (location, injector) {
    var rootModules = injector.get(uiRouterNgModule_1.UIROUTER_ROOT_MODULE);
    var modules = injector.get(uiRouterNgModule_1.UIROUTER_MODULE_TOKEN);
    if (rootModules.length !== 1) {
        throw new Error("Exactly one UIRouterModule.forRoot() should be in the bootstrapped app module's imports: []");
    }
    // ----------------- Monkey Patches ----------------
    // Monkey patch the services.$injector to the ng2 Injector
    ui_router_core_9.services.$injector.get = injector.get.bind(injector);
    // Monkey patch the services.$location with ng2 Location implementation
    location.init();
    // ----------------- Create router -----------------
    // Create a new ng2 UIRouter and configure it for ng2
    var router = new ui_router_core_1.UIRouter();
    new rx_1.UIRouterRx(router);
    var registry = router.stateRegistry;
    // ----------------- Configure for ng2 -------------
    // Apply ng2 ui-view handling code
    router.viewService.viewConfigFactory("ng2", function (path, config) { return new views_1.Ng2ViewConfig(path, config); });
    registry.decorator('views', views_1.ng2ViewsBuilder);
    // Apply statebuilder decorator for ng2 NgModule registration
    registry.stateQueue.flush(router.stateService);
    // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
    var ng2InjectorResolvable = ui_router_core_10.Resolvable.fromData(ui_router_core_11.NATIVE_INJECTOR_TOKEN, injector);
    registry.root().resolvables.push(ng2InjectorResolvable);
    // ----------------- Initialize router -------------
    // Allow states to be registered
    registry.stateQueue.autoFlush(router.stateService);
    setTimeout(function () {
        rootModules.forEach(function (moduleConfig) { return uiRouterConfig_1.applyRootModuleConfig(router, injector, moduleConfig); });
        modules.forEach(function (moduleConfig) { return uiRouterConfig_1.applyModuleConfig(router, injector, moduleConfig); });
        // Start monitoring the URL
        if (!router.urlRouterProvider.interceptDeferred) {
            router.urlRouter.listen();
            router.urlRouter.sync();
        }
    });
    return router;
};
exports._UIROUTER_INSTANCE_PROVIDERS = [
    { provide: ui_router_core_1.UIRouter, useFactory: uiRouterFactory, deps: [location_1.UIRouterLocation, core_1.Injector] },
    { provide: location_1.UIRouterLocation, useClass: location_1.UIRouterLocation },
    { provide: uiView_1.UIView.PARENT_INJECT, useFactory: function (r) { return { fqn: null, context: r.root() }; }, deps: [ui_router_core_2.StateRegistry] },
];
exports._UIROUTER_SERVICE_PROVIDERS = [
    { provide: ui_router_core_3.StateService, useFactory: function (r) { return r.stateService; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_4.TransitionService, useFactory: function (r) { return r.transitionService; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_5.UrlMatcherFactory, useFactory: function (r) { return r.urlMatcherFactory; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_6.UrlRouter, useFactory: function (r) { return r.urlRouter; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_7.ViewService, useFactory: function (r) { return r.viewService; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_2.StateRegistry, useFactory: function (r) { return r.stateRegistry; }, deps: [ui_router_core_1.UIRouter] },
    { provide: ui_router_core_8.Globals, useFactory: function (r) { return r.globals; }, deps: [ui_router_core_1.UIRouter] },
];
/**
 * The UI-Router providers, for use in your application bootstrap
 *
 * @deprecated use [[UIRouterModule.forRoot]]
 */
exports.UIROUTER_PROVIDERS = exports._UIROUTER_INSTANCE_PROVIDERS.concat(exports._UIROUTER_SERVICE_PROVIDERS);
//# sourceMappingURL=providers.js.map