import { Injector } from "@angular/core";
import { UIRouter } from "ui-router-core";
import { StateRegistry } from "ui-router-core";
import { StateService } from "ui-router-core";
import { TransitionService } from "ui-router-core";
import { UrlMatcherFactory } from "ui-router-core";
import { UrlRouter } from "ui-router-core";
import { ViewService } from "ui-router-core";
import { UIView } from "./directives/uiView";
import { ng2ViewsBuilder, Ng2ViewConfig } from "./statebuilders/views";
import { applyRootModuleConfig, applyModuleConfig } from "./uiRouterConfig";
import { Globals } from "ui-router-core";
import { UIRouterLocation } from "./location";
import { services } from "ui-router-core";
import { Resolvable } from "ui-router-core";
import { UIROUTER_ROOT_MODULE, UIROUTER_MODULE_TOKEN } from "./uiRouterNgModule";
import { UIRouterRx } from "./rx";
import { NATIVE_INJECTOR_TOKEN } from "ui-router-core";
/**
 * This is a factory function for a UIRouter instance
 *
 * Creates a UIRouter instance and configures it for Angular 2, then invokes router bootstrap.
 * This function is used as an Angular 2 `useFactory` Provider.
 */
export function uiRouterFactory(location, injector) {
    var rootModules = injector.get(UIROUTER_ROOT_MODULE);
    var modules = injector.get(UIROUTER_MODULE_TOKEN);
    if (rootModules.length !== 1) {
        throw new Error("Exactly one UIRouterModule.forRoot() should be in the bootstrapped app module's imports: []");
    }
    // ----------------- Monkey Patches ----------------
    // Monkey patch the services.$injector to the ng2 Injector
    services.$injector.get = injector.get.bind(injector);
    // Monkey patch the services.$location with ng2 Location implementation
    location.init();
    // ----------------- Create router -----------------
    // Create a new ng2 UIRouter and configure it for ng2
    var router = new UIRouter();
    new UIRouterRx(router);
    var registry = router.stateRegistry;
    // ----------------- Configure for ng2 -------------
    // Apply ng2 ui-view handling code
    router.viewService.viewConfigFactory("ng2", function (path, config) { return new Ng2ViewConfig(path, config); });
    registry.decorator('views', ng2ViewsBuilder);
    // Apply statebuilder decorator for ng2 NgModule registration
    registry.stateQueue.flush(router.stateService);
    // Prep the tree of NgModule by placing the root NgModule's Injector on the root state.
    var ng2InjectorResolvable = Resolvable.fromData(NATIVE_INJECTOR_TOKEN, injector);
    registry.root().resolvables.push(ng2InjectorResolvable);
    // ----------------- Initialize router -------------
    // Allow states to be registered
    registry.stateQueue.autoFlush(router.stateService);
    setTimeout(function () {
        rootModules.forEach(function (moduleConfig) { return applyRootModuleConfig(router, injector, moduleConfig); });
        modules.forEach(function (moduleConfig) { return applyModuleConfig(router, injector, moduleConfig); });
        // Start monitoring the URL
        if (!router.urlRouterProvider.interceptDeferred) {
            router.urlRouter.listen();
            router.urlRouter.sync();
        }
    });
    return router;
}
;
export function parentUIViewInjectFactory(r) {
    return { fqn: null, context: r.root() };
}
;
export var _UIROUTER_INSTANCE_PROVIDERS = [
    { provide: UIRouter, useFactory: uiRouterFactory, deps: [UIRouterLocation, Injector] },
    { provide: UIRouterLocation, useClass: UIRouterLocation },
    { provide: UIView.PARENT_INJECT, useFactory: parentUIViewInjectFactory, deps: [StateRegistry] },
];
export function stateService(r) { r.stateService; }
export function transitionService(r) { r.transitionService; }
export function urlMatcherFactory(r) { r.urlMatcherFactory; }
export function urlRouter(r) { r.urlRouter; }
export function viewService(r) { r.viewService; }
export function stateRegistry(r) { r.stateRegistry; }
export function globals(r) { r.globals; }
export var _UIROUTER_SERVICE_PROVIDERS = [
    { provide: StateService, useFactory: stateService, deps: [UIRouter] },
    { provide: TransitionService, useFactory: transitionService, deps: [UIRouter] },
    { provide: UrlMatcherFactory, useFactory: urlMatcherFactory, deps: [UIRouter] },
    { provide: UrlRouter, useFactory: urlRouter, deps: [UIRouter] },
    { provide: ViewService, useFactory: viewService, deps: [UIRouter] },
    { provide: StateRegistry, useFactory: stateRegistry, deps: [UIRouter] },
    { provide: Globals, useFactory: globals, deps: [UIRouter] },
];
/**
 * The UI-Router providers, for use in your application bootstrap
 *
 * @deprecated use [[UIRouterModule.forRoot]]
 */
export var UIROUTER_PROVIDERS = _UIROUTER_INSTANCE_PROVIDERS.concat(_UIROUTER_SERVICE_PROVIDERS);
//# sourceMappingURL=providers.js.map