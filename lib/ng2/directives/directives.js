"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * The UI-Router Angular 2 directives:
 *
 * - [[UIView]]: A viewport for routed components
 * - [[UISref]]: A state ref to a target state; navigates when clicked
 * - [[UISrefActive]]: (and `UISrefActiveEq`) Adds a css class when a UISref's target state (or a child state) is active
 *
 * @preferred @module directives
 */ /** */
var uiSref_1 = require("./uiSref");
var uiSrefActive_1 = require("./uiSrefActive");
var uiView_1 = require("./uiView");
var uiSrefStatus_1 = require("./uiSrefStatus");
__export(require("./uiView"));
__export(require("./uiSref"));
__export(require("./uiSrefStatus"));
__export(require("./uiSrefActive"));
/** @internalapi */
exports._UIROUTER_DIRECTIVES = [uiSref_1.UISref, uiSref_1.AnchorUISref, uiView_1.UIView, uiSrefActive_1.UISrefActive, uiSrefStatus_1.UISrefStatus];
/**
 * References to the UI-Router directive classes, for use within a @Component's `directives:` property
 * @deprecated use [[UIRouterModule]]
 * @internalapi
 */
exports.UIROUTER_DIRECTIVES = exports._UIROUTER_DIRECTIVES;
//# sourceMappingURL=directives.js.map