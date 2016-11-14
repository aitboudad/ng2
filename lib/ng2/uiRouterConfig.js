"use strict";
var ui_router_core_1 = require("ui-router-core");
function applyModuleConfig(uiRouter, injector, options) {
    if (options.configClass) {
        injector.get(options.configClass);
    }
    var states = options.states || [];
    states.forEach(function (state) { return uiRouter.stateRegistry.register(state); });
}
exports.applyModuleConfig = applyModuleConfig;
function applyRootModuleConfig(uiRouter, injector, config) {
    if (ui_router_core_1.isDefined(config.deferIntercept)) {
        uiRouter.urlRouterProvider.deferIntercept(config.deferIntercept);
    }
    if (ui_router_core_1.isDefined(config.otherwise)) {
        if (ui_router_core_1.isDefined(config.otherwise['state'])) {
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
exports.applyRootModuleConfig = applyRootModuleConfig;
//# sourceMappingURL=uiRouterConfig.js.map