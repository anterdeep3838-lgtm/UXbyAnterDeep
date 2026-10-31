// components/ui/tabs.tsx
__maps[153]={"react/jsx-runtime":1,"react":7,"class-variance-authority":15,"radix-ui":17,"@/lib/utils":150};
__defs[153]=function(module,exports,require){
"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabsListVariants = void 0;
exports.Tabs = Tabs;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.TabsContent = TabsContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const class_variance_authority_1 = require("class-variance-authority");
const radix_ui_1 = require("radix-ui");
const utils_1 = require("@/lib/utils");
function Tabs({ className, orientation = "horizontal", ...props }) {
    return ((0, jsx_runtime_1.jsx)(radix_ui_1.Tabs.Root, { "data-slot": "tabs", "data-orientation": orientation, orientation: orientation, className: (0, utils_1.cn)("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className), ...props }));
}
const tabsListVariants = (0, class_variance_authority_1.cva)("group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none", {
    variants: {
        variant: {
            default: "bg-muted",
            line: "gap-1 bg-transparent",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
exports.tabsListVariants = tabsListVariants;
function TabsList({ className, variant = "default", ...props }) {
    return ((0, jsx_runtime_1.jsx)(radix_ui_1.Tabs.List, { "data-slot": "tabs-list", "data-variant": variant, className: (0, utils_1.cn)(tabsListVariants({ variant }), className), ...props }));
}
function TabsTrigger({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)(radix_ui_1.Tabs.Trigger, { "data-slot": "tabs-trigger", className: (0, utils_1.cn)("relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent", "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground", "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100", className), ...props }));
}
function TabsContent({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)(radix_ui_1.Tabs.Content, { "data-slot": "tabs-content", className: (0, utils_1.cn)("flex-1 outline-none", className), ...props }));
}

};
