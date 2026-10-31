// ../../mnt/kwick-site/node_modules/react-remove-scroll/dist/es5/Combination.js
__maps[52]={"tslib":51,"react":7,"./UI":53,"./sidecar":74};
__defs[52]=function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var UI_1 = require("./UI");
var sidecar_1 = tslib_1.__importDefault(require("./sidecar"));
var ReactRemoveScroll = React.forwardRef(function (props, ref) { return (React.createElement(UI_1.RemoveScroll, tslib_1.__assign({}, props, { ref: ref, sideCar: sidecar_1.default }))); });
ReactRemoveScroll.classNames = UI_1.RemoveScroll.classNames;
exports.default = ReactRemoveScroll;

};
