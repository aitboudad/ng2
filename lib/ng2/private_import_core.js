/** @module ng2 */
/**
 * @Kamshak It's imported like this in @angular/compiler as well.
 * Was going to mark it injectable as in
 * https://github.com/angular/angular/blob/42a287fabf6b035d51e00cf3006c27fec00f054a/modules/%40angular/compiler/src/ng_module_resolver.ts
 * but unfortunately not all platforms (namely browser-dynamic) provide it.
 */
"use strict";
var core_1 = require('@angular/core');
exports.reflector = core_1.__core_private__.reflector;
//# sourceMappingURL=private_import_core.js.map