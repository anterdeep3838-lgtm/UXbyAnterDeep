// artifact-entry.tsx
__maps[0]={"react/jsx-runtime":1,"react-dom/client":3,"./app/page":11};
__defs[0]=function(module,exports,require){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("react-dom/client");
const page_1 = __importDefault(require("./app/page"));
const root = (0, client_1.createRoot)(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(page_1.default, {}));

};
