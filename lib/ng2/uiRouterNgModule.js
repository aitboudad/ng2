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
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var directives_1 = require("./directives/directives");
var uiView_1 = require("./directives/uiView");
var ui_router_core_1 = require("ui-router-core");
var common_2 = require("@angular/common");
var providers_1 = require("./providers");
/**
 * Creates UI-Router Modules
 *
 * This class has two static factory methods which create UIRouter Modules.
 * A UI-Router Module is an [Angular 2 NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
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
     * This factory function creates an [Angular 2 NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
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
     * @ NgModule({
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
     * @param config declarative UI-Router configuration
     * @returns an `NgModule` which provides the [[UIRouter]] singleton instance
     */
    UIRouterModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        var locationStrategy = config.useHash ? common_2.HashLocationStrategy : common_2.PathLocationStrategy;
        return {
            ngModule: UIRouterModule,
            providers: [
                providers_1._UIROUTER_INSTANCE_PROVIDERS,
                providers_1._UIROUTER_SERVICE_PROVIDERS,
                { provide: common_2.LocationStrategy, useClass: locationStrategy }
            ].concat(makeProviders(config, true))
        };
    };
    /**
     * Creates an `NgModule` for an UIRouter module
     *
     * This function creates an [Angular 2 NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
     * with UI-Router support.
     *
     * #### Example:
     * ```js
     * var homeState = { name: 'home', url: '/home', component: Home };
     * var aboutState = { name: 'about', url: '/about', component: About };
     *
     * @ NgModule({
     *   imports: [
     *     UIRouterModule.forChild({ states: [ homeState, aboutState ] }),
     *     SharedModule,
     *   ],
     *   declarations: [ Home, About ],
     * })
     * export class AppModule {};
     * ```
     *
     * @param module UI-Router module options
     * @returns an `NgModule`
     */
    UIRouterModule.forChild = function (module) {
        if (module === void 0) { module = {}; }
        return {
            ngModule: UIRouterModule,
            providers: makeProviders(module, false),
        };
    };
    UIRouterModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [directives_1._UIROUTER_DIRECTIVES],
            exports: [directives_1._UIROUTER_DIRECTIVES],
            entryComponents: [uiView_1.UIView],
        }), 
        __metadata('design:paramtypes', [])
    ], UIRouterModule);
    return UIRouterModule;
}());
exports.UIRouterModule = UIRouterModule;
/** @hidden */
function makeProviders(module, forRoot) {
    var providers = [module.configClass]
        .filter(ui_router_core_1.identity)
        .map(function (configClass) { return ({ provide: configClass, useClass: configClass }); });
    if (forRoot)
        providers.push({ provide: exports.UIROUTER_ROOT_MODULE, useValue: module, multi: true });
    providers.push({ provide: exports.UIROUTER_MODULE_TOKEN, useValue: module, multi: true });
    providers.push({ provide: core_1.ANALYZE_FOR_ENTRY_COMPONENTS, useValue: module.states || [], multi: true });
    return providers;
}
/** @hidden */
exports.UIROUTER_ROOT_MODULE = new core_1.OpaqueToken("UIRouter Root Module");
/** @hidden */
exports.UIROUTER_MODULE_TOKEN = new core_1.OpaqueToken("UIRouter Module");
//# sourceMappingURL=uiRouterNgModule.js.map