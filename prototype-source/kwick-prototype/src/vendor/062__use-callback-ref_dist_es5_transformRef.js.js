// ../../mnt/kwick-site/node_modules/use-callback-ref/dist/es5/transformRef.js
__maps[62]={"./assignRef":56,"./createRef":58};
__defs[62]=function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformRef = void 0;
var assignRef_1 = require("./assignRef");
var createRef_1 = require("./createRef");
/**
 * Transforms one ref to another
 * @example
 * ```tsx
 * const ResizableWithRef = forwardRef((props, ref) =>
 *   <Resizable {...props} ref={transformRef(ref, i => i ? i.resizable : null)}/>
 * );
 * ```
 */
function transformRef(ref, transformer) {
    return (0, createRef_1.createCallbackRef)(function (value) { return (0, assignRef_1.assignRef)(ref, transformer(value)); });
}
exports.transformRef = transformRef;

};
