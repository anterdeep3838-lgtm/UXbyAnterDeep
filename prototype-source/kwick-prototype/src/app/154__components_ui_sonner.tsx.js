// components/ui/sonner.tsx
__maps[154]={"react/jsx-runtime":1,"lucide-react":12,"next-themes":155,"sonner":13};
__defs[154]=function(module,exports,require){
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const next_themes_1 = require("next-themes");
const sonner_1 = require("sonner");
const Toaster = ({ ...props }) => {
    const { theme = "system" } = (0, next_themes_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(sonner_1.Toaster, { theme: theme, className: "toaster group", icons: {
            success: (0, jsx_runtime_1.jsx)(lucide_react_1.CircleCheckIcon, { className: "size-4" }),
            info: (0, jsx_runtime_1.jsx)(lucide_react_1.InfoIcon, { className: "size-4" }),
            warning: (0, jsx_runtime_1.jsx)(lucide_react_1.TriangleAlertIcon, { className: "size-4" }),
            error: (0, jsx_runtime_1.jsx)(lucide_react_1.OctagonXIcon, { className: "size-4" }),
            loading: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2Icon, { className: "size-4 animate-spin" }),
        }, style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
        }, ...props }));
};
exports.Toaster = Toaster;

};
