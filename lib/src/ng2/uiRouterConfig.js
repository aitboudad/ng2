import { isDefined } from "ui-router-core";
export function applyModuleConfig(uiRouter, injector, options) {
    if (options.configClass) {
        injector.get(options.configClass);
    }
    var states = options.states || [];
    states.forEach(function (state) { return uiRouter.stateRegistry.register(state); });
}
export function applyRootModuleConfig(uiRouter, injector, config) {
    if (isDefined(config.deferIntercept)) {
        uiRouter.urlRouterProvider.deferIntercept(config.deferIntercept);
    }
    if (isDefined(config.otherwise)) {
        if (isDefined(config.otherwise['state'])) {
            uiRouter.urlRouterProvider.otherwise(function () {
                var _a = config.otherwise, state = _a.state, params = _a.params;
                uiRouter.stateService.go(state, params, { source: "otherwise" });
                return null;
            });
        }
        else {
            uiRouter.urlRouterProvider.otherwise(config.otherwise);
        }
    }
}
//# sourceMappingURL=uiRouterConfig.js.map