"use strict";
/** @module core */ /** */
var core_1 = require("@angular/core");
var ui_router_core_1 = require("ui-router-core");
var uiRouterNgModule_1 = require("./uiRouterNgModule");
var uiRouterConfig_1 = require("./uiRouterConfig");
/**
 * Returns a function which lazy loads a nested module
 *
 * Use this function as a [[StateDeclaration.lazyLoad]] property to lazy load an NgModule and its state.
 *
 * Example using `System.import()`:
 * ```js
 * {
 *   name: 'home',
 *   url: '/home',
 *   lazyLoad: loadNgModule(() => System.import('./home.module').then(result => result.HomeModule))
 * }
 * ```
 *
 * Example using `NgModuleFactoryLoader`:
 * ```js
 * {
 *   name: 'home',
 *   url: '/home',
 *   lazyLoad: loadNgModule('./home.module')
 * }
 * ```
 *
 * @param moduleToLoad
 *    If a string, it should be the path to the NgModule code, which will then be loaded by the `NgModuleFactoryLoader`.
 *    If a function, the function should load the NgModule code and return a reference to the `NgModule` class being loaded.
 *
 * @returns A function which takes a transition, which:
 * - Gets the Injector (scoped properly for the destination state)
 * - Loads and creates the NgModule
 * - Finds the "replacement state" for the target state, and adds the new NgModule Injector to it (as a resolve)
 * - Returns the new states array
 */
function loadNgModule(moduleToLoad) {
    return function (transition) {
        var ng2Injector = transition.injector().get(ui_router_core_1.NATIVE_INJECTOR_TOKEN);
        var createModule = function (factory) {
            return factory.create(ng2Injector);
        };
        var applyModule = function (moduleRef) {
            return applyNgModule(transition, moduleRef);
        };
        return loadModuleFactory(moduleToLoad, ng2Injector)
            .then(createModule)
            .then(applyModule);
    };
}
exports.loadNgModule = loadNgModule;
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
 * @internalapi
 */
function loadModuleFactory(moduleToLoad, ng2Injector) {
    if (ui_router_core_1.isString(moduleToLoad)) {
        return ng2Injector.get(core_1.NgModuleFactoryLoader).load(moduleToLoad);
    }
    var compiler = ng2Injector.get(core_1.Compiler);
    var offlineMode = compiler instanceof core_1.Compiler;
    var loadChildrenPromise = Promise.resolve(moduleToLoad());
    var compileAsync = function (moduleType) {
        return compiler.compileModuleAsync(moduleType);
    };
    return offlineMode ? loadChildrenPromise : loadChildrenPromise.then(compileAsync);
}
exports.loadModuleFactory = loadModuleFactory;
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
 * @internalapi
 */
function applyNgModule(transition, ng2Module) {
    var injector = ng2Module.injector;
    var parentInjector = ng2Module.injector['parent'];
    var uiRouter = injector.get(ui_router_core_1.UIRouter);
    var originalName = transition.to().name;
    var originalState = uiRouter.stateRegistry.get(originalName);
    var rootModules = injector.get(uiRouterNgModule_1.UIROUTER_ROOT_MODULE);
    var parentRootModules = parentInjector.get(uiRouterNgModule_1.UIROUTER_ROOT_MODULE);
    var newRootModules = rootModules.filter(function (module) { return parentRootModules.indexOf(module) === -1; });
    if (newRootModules.length) {
        console.log(rootModules);
        throw new Error('Lazy loaded modules should not contain a UIRouterModule.forRoot() module');
    }
    var modules = injector.get(uiRouterNgModule_1.UIROUTER_MODULE_TOKEN);
    modules.forEach(function (module) { return uiRouterConfig_1.applyModuleConfig(uiRouter, injector, module); });
    var replacementState = uiRouter.stateRegistry.get(originalName);
    if (replacementState === originalState) {
        throw new Error("The module that was lazy loaded by activating " + originalName + " should also have a ui-router state named '" + originalName + "'");
    }
    // Supply the newly loaded states with the Injector from the lazy loaded NgModule
    replacementState.$$state().resolvables.push(ui_router_core_1.Resolvable.fromData(ui_router_core_1.NATIVE_INJECTOR_TOKEN, injector));
    return {};
}
exports.applyNgModule = applyNgModule;
//# sourceMappingURL=lazyLoadNgModule.js.map