// app/motion.tsx
__maps[159]={"react/jsx-runtime":1,"react":7,"./kwick-data":156};
__defs[159]=function(module,exports,require){
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingCharacter = TrackingCharacter;
exports.OnboardingScene = OnboardingScene;
exports.loaderKindFor = loaderKindFor;
exports.LoaderScene = LoaderScene;
exports.RouteStrip = RouteStrip;
exports.ThanksBadge = ThanksBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const kwick_data_1 = require("./kwick-data");
/* ------------------------------------------------------------------ */
/* Shared helpers                                                       */
/* ------------------------------------------------------------------ */
const origin = (x, y) => ({ transformOrigin: `${x}px ${y}px` });
/** Preloads every layer so the animated rig only appears once it is complete. */
function useLayersReady(sources) {
    const [ready, setReady] = (0, react_1.useState)(false);
    const key = sources.join("|");
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        setReady(false);
        Promise.all(sources.map((src) => new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(src));
            image.src = src;
        }))).then(() => { if (!cancelled)
            setReady(true); }).catch(() => { });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return ready;
}
const trackRigs = [
    { base: "motion/track0-base.webp", pose: "stand", ground: [256, 496, 112], parts: [
            { name: "point", src: "motion/track0-point.webp", x: 255, y: 235 },
            { name: "phone", src: "motion/track0-phone.webp", x: 362, y: 222 },
        ] },
    { base: "motion/track1-base.webp", pose: "stand", ground: [256, 496, 112], parts: [
            { name: "point", src: "motion/track1-point.webp", x: 240, y: 248 },
        ] },
    { base: "motion/track2-base.webp", pose: "ride", ground: [262, 488, 176], parts: [] },
    { base: "motion/track3-base.webp", pose: "stand", ground: [250, 466, 120], parts: [
            { name: "hand", src: "motion/track3-hand.webp", x: 346, y: 182 },
        ] },
    { base: "motion/track4-base.webp", pose: "kneel", ground: [272, 460, 196], parts: [
            { name: "tool", src: "motion/track4-tool.webp", x: 300, y: 262 },
        ] },
    { base: "motion/track5-base.webp", pose: "stand", ground: [256, 474, 118], parts: [
            { name: "thumb", src: "motion/track5-thumb.webp", x: 360, y: 195 },
        ] },
];
const sparkle = (x, y, size, className) => ((0, jsx_runtime_1.jsx)("path", { className: className, style: origin(x, y), d: `M${x} ${y - size}Q${x + size * 0.18} ${y - size * 0.18} ${x + size} ${y}Q${x + size * 0.18} ${y + size * 0.18} ${x} ${y + size}Q${x - size * 0.18} ${y + size * 0.18} ${x - size} ${y}Q${x - size * 0.18} ${y - size * 0.18} ${x} ${y - size}Z` }));
function trackEffects(index) {
    if (index === 0)
        return { front: (0, jsx_runtime_1.jsxs)("g", { className: "kw-fx", children: [(0, jsx_runtime_1.jsx)("circle", { className: "kw-ring kw-ring-a", cx: "364", cy: "160", r: "34", style: origin(364, 160) }), (0, jsx_runtime_1.jsx)("circle", { className: "kw-ring kw-ring-b", cx: "364", cy: "160", r: "34", style: origin(364, 160) })] }) };
    if (index === 1)
        return {
            inner: (0, jsx_runtime_1.jsxs)("g", { className: "kw-check-reveal", children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("clipPath", { id: "kwCheckClip", children: (0, jsx_runtime_1.jsx)("rect", { x: "320", y: "198", width: "0", height: "44", children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "width", dur: "3.4s", repeatCount: "indefinite", values: "0;0;50;50;50", keyTimes: "0;0.16;0.36;0.86;1" }) }) }) }), (0, jsx_runtime_1.jsx)("image", { href: "motion/track1-check.webp", width: "512", height: "512", clipPath: "url(#kwCheckClip)", children: (0, jsx_runtime_1.jsx)("animate", { attributeName: "opacity", dur: "3.4s", repeatCount: "indefinite", values: "1;1;0;0", keyTimes: "0;0.86;0.95;1" }) })] }),
            front: (0, jsx_runtime_1.jsx)("g", { className: "kw-fx", children: sparkle(372, 200, 9, "kw-spark kw-spark-a") }),
        };
    if (index === 2)
        return { behind: (0, jsx_runtime_1.jsxs)("g", { className: "kw-fx", children: [(0, jsx_runtime_1.jsxs)("g", { className: "kw-speed", children: [(0, jsx_runtime_1.jsx)("path", { className: "kw-speed-line s1", d: "M58 262 H118" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-speed-line s2", d: "M30 318 H104" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-speed-line s3", d: "M52 372 H112" })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-puffs", children: [(0, jsx_runtime_1.jsx)("circle", { className: "kw-puff p1", cx: "82", cy: "418", r: "10", style: origin(82, 418) }), (0, jsx_runtime_1.jsx)("circle", { className: "kw-puff p2", cx: "82", cy: "418", r: "8", style: origin(82, 418) })] }), (0, jsx_runtime_1.jsx)("g", { className: "kw-road", children: (0, jsx_runtime_1.jsx)("path", { d: "M64 500 H468" }) })] }), front: (0, jsx_runtime_1.jsx)("circle", { className: "kw-headlight", cx: "338", cy: "248", r: "26", style: origin(338, 248) }) };
    if (index === 3)
        return { front: (0, jsx_runtime_1.jsxs)("g", { className: "kw-fx kw-wave-arcs", children: [(0, jsx_runtime_1.jsx)("path", { className: "kw-arc a1", d: "M396 112 q10 14 0 30" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-arc a2", d: "M410 102 q16 22 0 48" })] }) };
    if (index === 4)
        return { front: (0, jsx_runtime_1.jsxs)("g", { className: "kw-fx", children: [sparkle(378, 196, 10, "kw-spark kw-spark-a"), sparkle(392, 222, 6, "kw-spark kw-spark-b")] }) };
    return { front: (0, jsx_runtime_1.jsxs)("g", { className: "kw-fx", children: [sparkle(404, 104, 11, "kw-spark kw-spark-a"), sparkle(326, 98, 7, "kw-spark kw-spark-b"), sparkle(416, 168, 6, "kw-spark kw-spark-c")] }) };
}
const statusLabels = ["Booked", "Confirmed", "On the Way", "Arrived", "In Progress", "Completed"];
function TrackingCharacter({ statusIndex }) {
    const index = Math.max(0, Math.min(5, statusIndex));
    const rig = trackRigs[index];
    const ready = useLayersReady([rig.base, ...rig.parts.map((part) => part.src), ...(index === 1 ? ["motion/track1-check.webp"] : [])]);
    const fx = trackEffects(index);
    const column = index % 3;
    const row = Math.floor(index / 3);
    const [gx, gy, grx] = rig.ground;
    return ((0, jsx_runtime_1.jsxs)("svg", { className: `kw-track kw-track-${index} kw-pose-${rig.pose}${ready ? " is-ready" : ""}`, viewBox: "0 0 512 512", role: "img", "aria-label": `${statusLabels[index]} service status illustration`, children: [(0, jsx_runtime_1.jsx)("ellipse", { className: "kw-ground", cx: gx, cy: gy, rx: grx, ry: grx * 0.09, style: origin(gx, gy) }), fx.behind, (0, jsx_runtime_1.jsxs)("g", { className: "kw-body", style: origin(gx, gy), children: [(0, jsx_runtime_1.jsx)("svg", { className: "kw-fallback", x: "0", y: "0", width: "512", height: "512", viewBox: `${column * 512} ${row * 512} 512 512`, children: (0, jsx_runtime_1.jsx)("image", { href: "tracking-characters-transparent.png", width: "1536", height: "1024" }) }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-rig", children: [(0, jsx_runtime_1.jsx)("image", { href: rig.base, width: "512", height: "512" }), rig.parts.map((part) => (0, jsx_runtime_1.jsx)("image", { className: `kw-part kw-part-${part.name}`, href: part.src, width: "512", height: "512", style: origin(part.x, part.y) }, part.name)), fx.inner] })] }), fx.front] }));
}
const sceneRigs = {
    welcome: { original: "onboarding-welcome-teal.webp", base: "motion/ob2-welcome-base.webp", parts: [
            { name: "plantl", src: "motion/ob2-welcome-plantl.webp", x: 292, y: 388 },
            { name: "plantr", src: "motion/ob2-welcome-plantr.webp", x: 832, y: 478 },
            { name: "tool", src: "motion/ob2-welcome-tool.webp", x: 365, y: 370 },
            { name: "head", src: "motion/ob2-welcome-head.webp", x: 436, y: 232 },
        ] },
    phone: { original: "onboarding-phone-teal.webp", base: "motion/ob2-phone-base.webp", parts: [
            { name: "plant", src: "motion/ob2-phone-plant.webp", x: 592, y: 334 },
            { name: "head", src: "motion/ob2-phone-head.webp", x: 378, y: 184 },
            { name: "phone", src: "motion/ob2-phone-phone.webp", x: 500, y: 250 },
            { name: "point", src: "motion/ob2-phone-point.webp", x: 428, y: 252 },
        ] },
    location: { original: "onboarding-location-teal.webp", base: "motion/ob2-location-base.webp", parts: [
            { name: "plants", src: "motion/ob2-location-plants.webp", x: 832, y: 242 },
            { name: "head", src: "motion/ob2-location-head.webp", x: 392, y: 228 },
            { name: "map", src: "motion/ob2-location-map.webp", x: 470, y: 282 },
            { name: "pin", src: "motion/ob2-location-pin.webp", x: 488, y: 268 },
        ] },
};
function sceneEffects(scene) {
    if (scene === "welcome")
        return (0, jsx_runtime_1.jsx)("circle", { className: "kw-lamp", cx: "343", cy: "147", r: "38", style: origin(343, 147) });
    if (scene === "phone")
        return (
        // The illustration already has a speech bubble; we only animate what is inside it.
        (0, jsx_runtime_1.jsxs)("g", { className: "kw-bubble-live", children: [(0, jsx_runtime_1.jsx)("rect", { x: "556", y: "95", width: "88", height: "27", rx: "13", className: "kw-bubble-cover" }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-typing", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "573", cy: "108", r: "7.5", className: "d1", style: origin(573, 108) }), (0, jsx_runtime_1.jsx)("circle", { cx: "600", cy: "108", r: "7.5", className: "d2", style: origin(600, 108) }), (0, jsx_runtime_1.jsx)("circle", { cx: "627", cy: "108", r: "7.5", className: "d3", style: origin(627, 108) })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-bubble-done", style: origin(600, 108), children: [(0, jsx_runtime_1.jsx)("circle", { cx: "571", cy: "108", r: "12", className: "kw-bubble-tick-bg" }), (0, jsx_runtime_1.jsx)("path", { d: "M565.5 108.5 l4 4.5 l8 -9", className: "kw-bubble-tick" }), (0, jsx_runtime_1.jsx)("rect", { x: "590", y: "102", width: "46", height: "12", rx: "6", className: "kw-bubble-code" })] })] }));
    return ((0, jsx_runtime_1.jsxs)("g", { className: "kw-pin-wrap", children: [(0, jsx_runtime_1.jsx)("ellipse", { className: "kw-pin-ripple", cx: "488", cy: "268", rx: "22", ry: "7", style: origin(488, 268) }), (0, jsx_runtime_1.jsx)("circle", { className: "kw-headlight-soft", cx: "695", cy: "338", r: "30", style: origin(695, 338) })] }));
}
function OnboardingScene({ scene, className = "", label }) {
    const rig = sceneRigs[scene];
    const ready = useLayersReady([rig.base, ...rig.parts.map((part) => part.src)]);
    return ((0, jsx_runtime_1.jsxs)("svg", { className: `kw-scene kw-scene-${scene} ${className}${ready ? " is-ready" : ""}`, viewBox: "0 0 1000 667", preserveAspectRatio: "xMidYMid meet", role: "img", "aria-label": label, children: [(0, jsx_runtime_1.jsx)("image", { className: "kw-fallback", href: rig.original, width: "1000", height: "667" }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-rig", children: [(0, jsx_runtime_1.jsx)("image", { href: rig.base, width: "1000", height: "667" }), rig.parts.map((part) => (0, jsx_runtime_1.jsx)("image", { className: `kw-part kw-part-${part.name}`, href: part.src, width: "1000", height: "667", style: origin(part.x, part.y) }, part.name))] }), sceneEffects(scene)] }));
}
function loaderKindFor(message) {
    if (/sign-in|signing you in|checking your code/i.test(message))
        return "secure";
    if (/setting up your kwick home/i.test(message))
        return "home";
    if (/^opening /i.test(message) || /^loading .+ services$/i.test(message))
        return "service";
    if (/tailoring/i.test(message))
        return "question";
    if (/finding a technician/i.test(message))
        return "match";
    if (/confirming your booking/i.test(message))
        return "booking";
    if (/notification/i.test(message))
        return "bell";
    if (/review/i.test(message))
        return "review";
    if (/signing you out/i.test(message))
        return "signout";
    return "default";
}
const avatarSpots = [[46, 50], [118, 46], [124, 118], [40, 112]];
/* ------------------------------------------------------------------ */
/* First-person 3D loaders: everything faces the viewer; depth comes   */
/* from bevels, layered thickness, specular light and contact shadows. */
/* ------------------------------------------------------------------ */
const SHIELD_OUTER = "M80 18 L128 35 V78 C128 108 106 129 80 142 C54 129 32 108 32 78 V35 Z";
const SHIELD_INNER = "M80 29 L118 42 V78 C118 102 101 119 80 130 C59 119 42 102 42 78 V42 Z";
function SecureScene() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-secure", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-fp-glow" }), (0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsx)("div", { className: "kw-fp-float", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 160 160", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwShRim", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#b2f8f1" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".42", stopColor: "#1ccbbe" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00514b" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwShFace", cx: ".38", cy: ".28", r: ".9", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#62efe3" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".5", stopColor: "#00b6a9" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00807a" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwShGloss", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#fff", stopOpacity: ".6" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#fff", stopOpacity: "0" })] }), (0, jsx_runtime_1.jsx)("clipPath", { id: "kwShClip", children: (0, jsx_runtime_1.jsx)("path", { d: SHIELD_INNER }) })] }), (0, jsx_runtime_1.jsx)("path", { d: SHIELD_OUTER, className: "kw-fp-thick", transform: "translate(0 5)" }), (0, jsx_runtime_1.jsx)("path", { d: SHIELD_OUTER, fill: "#0aa99d" }), (0, jsx_runtime_1.jsx)("path", { d: SHIELD_INNER, fill: "#00bfb2" }), (0, jsx_runtime_1.jsx)("path", { d: SHIELD_INNER, className: "kw-fp-inner-edge" }), (0, jsx_runtime_1.jsx)("g", { clipPath: "url(#kwShClip)", children: (0, jsx_runtime_1.jsx)("rect", { className: "kw-fp-sheen", x: "0", y: "0", width: "26", height: "170" }) }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-check-shade", d: "M60 83 L75 98 L102 69", pathLength: 1 }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-check", d: "M60 80 L75 95 L102 66", pathLength: 1 })] }) })] }));
}
function BellScene() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-bell", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-fp-glow" }), (0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 160 160", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwBellBody", x1: "0", y1: "0", x2: "1", y2: "0", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#077f77" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".2", stopColor: "#36d9cc" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".34", stopColor: "#a4f7ef" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".52", stopColor: "#14c2b5" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".82", stopColor: "#009087" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#005f59" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwBellRim", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#7eeee4" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".5", stopColor: "#00a89c" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#005d57" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwBellBall", cx: ".35", cy: ".3", r: ".8", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#5f8f8a" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".6", stopColor: "#1d3d3a" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#0c1f1d" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwBellBadge", cx: ".35", cy: ".3", r: ".8", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffb3a6" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".55", stopColor: "#f2544a" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#c62f27" })] })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-fp-waves", children: [(0, jsx_runtime_1.jsx)("path", { className: "w1", d: "M34 58 Q24 72 34 86" }), (0, jsx_runtime_1.jsx)("path", { className: "w2", d: "M24 50 Q10 72 24 94" }), (0, jsx_runtime_1.jsx)("path", { className: "w1", d: "M126 58 Q136 72 126 86" }), (0, jsx_runtime_1.jsx)("path", { className: "w2", d: "M136 50 Q150 72 136 94" })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-fp-bell-swing", children: [(0, jsx_runtime_1.jsx)("g", { className: "kw-fp-clapper", children: (0, jsx_runtime_1.jsx)("circle", { cx: "80", cy: "121", r: "9", fill: "url(#kwBellBall)" }) }), (0, jsx_runtime_1.jsx)("circle", { cx: "80", cy: "27", r: "7", fill: "url(#kwBellRim)" }), (0, jsx_runtime_1.jsx)("path", { d: "M80 31 C59 31 47 47 47 67 V88 C47 97 43 103 37 109 H123 C117 103 113 97 113 88 V67 C113 47 101 31 80 31 Z", fill: "url(#kwBellBody)" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-bell-spec", d: "M61 47 C57 57 56 72 56 90" }), (0, jsx_runtime_1.jsx)("rect", { x: "33", y: "105", width: "94", height: "13", rx: "6.5", fill: "url(#kwBellRim)" }), (0, jsx_runtime_1.jsx)("rect", { x: "38", y: "106.5", width: "84", height: "3", rx: "1.5", fill: "#fff", opacity: ".45" })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-fp-badge", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "112", cy: "40", r: "13", fill: "#fff" }), (0, jsx_runtime_1.jsx)("circle", { cx: "112", cy: "40", r: "10.5", fill: "#f04f45" })] })] })] }));
}
function WritingScene() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-write", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 160 160", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwPaper", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffffff" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#f1f8f6" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwPencilBody", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#7af0e6" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".35", stopColor: "#14c6b9" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".7", stopColor: "#00a094" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#006d66" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwPencilMetal", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#f4f7f7" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".5", stopColor: "#a9b6b4" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#6f7f7c" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwPencilWood", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffe2bd" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#d9a874" })] })] }), (0, jsx_runtime_1.jsx)("rect", { x: "40", y: "28", width: "86", height: "108", rx: "9", fill: "#d5efeb", transform: "rotate(-5 83 82)" }), (0, jsx_runtime_1.jsx)("rect", { x: "34", y: "27", width: "90", height: "112", rx: "9", fill: "#0f2b27", opacity: ".08" }), (0, jsx_runtime_1.jsx)("rect", { x: "34", y: "24", width: "90", height: "112", rx: "9", fill: "url(#kwPaper)" }), (0, jsx_runtime_1.jsx)("path", { d: "M110 24 H115 A9 9 0 0 1 124 33 V38 Z", fill: "#dff2ef" }), (0, jsx_runtime_1.jsx)("rect", { x: "45", y: "36", width: "34", height: "7", rx: "3.5", fill: "#00bfb2" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-rule", d: "M45 58 H113 M45 74 H113 M45 90 H113 M45 106 H113" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-ink l1", d: "M47 56 q4 -6 8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0 t8 0", pathLength: 1 }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-ink l2", d: "M47 72 q4 -6 8 0 t8 0 t8 0 t8 0 t8 0 t8 0", pathLength: 1 }), (0, jsx_runtime_1.jsx)("g", { className: "kw-fp-pencil", children: (0, jsx_runtime_1.jsxs)("g", { transform: "rotate(38)", children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 0 L9 -3.4 L9 3.4 Z", fill: "#26302e" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 -3.4 L21 -6.5 L21 6.5 L9 3.4 Z", fill: "url(#kwPencilWood)" }), (0, jsx_runtime_1.jsx)("rect", { x: "21", y: "-6.5", width: "46", height: "13", fill: "url(#kwPencilBody)" }), (0, jsx_runtime_1.jsx)("rect", { x: "21", y: "-4.6", width: "46", height: "1.6", fill: "#fff", opacity: ".45" }), (0, jsx_runtime_1.jsx)("rect", { x: "67", y: "-6.8", width: "9", height: "13.6", fill: "url(#kwPencilMetal)" }), (0, jsx_runtime_1.jsx)("path", { d: "M76 -6.5 H82 A6.5 6.5 0 0 1 82 6.5 H76 Z", fill: "#ff9d8f" })] }) })] })] }));
}
function CalendarScene() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("en-IN", { month: "short" }).toUpperCase();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-cal", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-fp-glow" }), (0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsxs)("div", { className: "kw-fp-cal-body", children: [(0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 140 140", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwCalHead", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#3be3d6" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00a196" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwCalCard", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffffff" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#eaf6f3" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwCalRing", x1: "0", y1: "0", x2: "1", y2: "0", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#8c9c9a" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".45", stopColor: "#f7fafa" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#7a8b88" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwCalTile", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#45e6d9" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00988e" })] })] }), (0, jsx_runtime_1.jsx)("rect", { x: "18", y: "36", width: "104", height: "96", rx: "16", fill: "#0b6a63" }), (0, jsx_runtime_1.jsx)("rect", { x: "18", y: "30", width: "104", height: "96", rx: "16", fill: "url(#kwCalCard)" }), (0, jsx_runtime_1.jsx)("path", { d: "M34 30 H106 A16 16 0 0 1 122 46 V54 H18 V46 A16 16 0 0 1 34 30 Z", fill: "url(#kwCalHead)" }), (0, jsx_runtime_1.jsx)("rect", { x: "24", y: "33", width: "92", height: "3", rx: "1.5", fill: "#fff", opacity: ".4" }), (0, jsx_runtime_1.jsx)("ellipse", { cx: "50", cy: "43", rx: "5", ry: "3", fill: "#00544e", opacity: ".55" }), (0, jsx_runtime_1.jsx)("ellipse", { cx: "90", cy: "43", rx: "5", ry: "3", fill: "#00544e", opacity: ".55" }), (0, jsx_runtime_1.jsx)("rect", { x: "46", y: "18", width: "8", height: "26", rx: "4", fill: "url(#kwCalRing)" }), (0, jsx_runtime_1.jsx)("rect", { x: "86", y: "18", width: "8", height: "26", rx: "4", fill: "url(#kwCalRing)" }), [0, 1, 2].flatMap((row) => [0, 1, 2, 3, 4].map((col) => (row === 1 && col === 2 ? null : (0, jsx_runtime_1.jsx)("rect", { x: 28 + col * 18, y: 64 + row * 19, width: "12", height: "11", rx: "3", fill: "#dcefeb" }, `${row}-${col}`)))), (0, jsx_runtime_1.jsxs)("g", { className: "kw-fp-cal-tile", children: [(0, jsx_runtime_1.jsx)("rect", { x: "57", y: "80", width: "26", height: "22", rx: "6", fill: "url(#kwCalTile)" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-cal-check", d: "M63 91 L68 96 L77 86", pathLength: 1 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "kw-fp-cal-page", children: [(0, jsx_runtime_1.jsx)("b", { children: day }), (0, jsx_runtime_1.jsx)("span", { children: month })] })] }), (0, jsx_runtime_1.jsx)("i", { className: "kw-fp-conf c1" }), (0, jsx_runtime_1.jsx)("i", { className: "kw-fp-conf c2" }), (0, jsx_runtime_1.jsx)("i", { className: "kw-fp-conf c3" }), (0, jsx_runtime_1.jsx)("i", { className: "kw-fp-conf c4" }), (0, jsx_runtime_1.jsx)("i", { className: "kw-fp-conf c5" })] }));
}
function DoorScene() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "kw-loader kw-fp kw-fp-door", "aria-hidden": "true", children: (0, jsx_runtime_1.jsxs)("div", { className: "kw-fp-door-stage", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "kw-fp-door-frame", viewBox: "0 0 140 150", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwDoorLight", cx: ".5", cy: ".45", r: ".7", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#fffdf2" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".55", stopColor: "#fff0c2" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#ffe08a" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwDoorFrame", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#3a6a65" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#13312e" })] }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwDoorSpill", x1: "0", y1: "0", x2: "0", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffe9a8", stopOpacity: ".85" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#ffe9a8", stopOpacity: "0" })] })] }), (0, jsx_runtime_1.jsx)("path", { className: "kw-fp-door-spill", d: "M43 136 H97 L124 150 H16 Z", fill: "url(#kwDoorSpill)" }), (0, jsx_runtime_1.jsx)("rect", { x: "34", y: "10", width: "72", height: "128", rx: "7", fill: "url(#kwDoorFrame)" }), (0, jsx_runtime_1.jsx)("rect", { x: "42", y: "18", width: "56", height: "118", rx: "3", fill: "url(#kwDoorLight)" }), (0, jsx_runtime_1.jsx)("path", { d: "M42 18 H98 V23 H47 V136 H42 Z", fill: "#0d2826", opacity: ".35" }), (0, jsx_runtime_1.jsx)("rect", { x: "36", y: "12", width: "68", height: "2", rx: "1", fill: "#fff", opacity: ".18" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "kw-fp-door-leaf", children: [(0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 56 118", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwDoorFace", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#21cfc2" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00837a" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwDoorKnob", cx: ".35", cy: ".3", r: ".8", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#fff8dc" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".5", stopColor: "#e9c25a" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#9a7420" })] })] }), (0, jsx_runtime_1.jsx)("rect", { width: "56", height: "118", rx: "2", fill: "url(#kwDoorFace)" }), (0, jsx_runtime_1.jsx)("rect", { x: "8", y: "10", width: "40", height: "40", rx: "3", className: "kw-fp-door-panel" }), (0, jsx_runtime_1.jsx)("rect", { x: "8", y: "60", width: "40", height: "48", rx: "3", className: "kw-fp-door-panel" }), (0, jsx_runtime_1.jsx)("circle", { cx: "46", cy: "62", r: "4", fill: "url(#kwDoorKnob)" })] }), (0, jsx_runtime_1.jsx)("span", { className: "kw-fp-door-shade" })] })] }) }));
}
const nearbyServices = [
    { id: "ac", sprite: [0, 0], x: 14, y: 16 },
    { id: "plumber", sprite: [2, 0], x: 104, y: 22 },
    { id: "electrician", sprite: [1, 0], x: 110, y: 96 },
];
function NeighbourhoodScene() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-map", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsxs)("div", { className: "kw-fp-map-card", children: [(0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 160 150", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsx)("clipPath", { id: "kwMapClip", children: (0, jsx_runtime_1.jsx)("rect", { x: "14", y: "14", width: "132", height: "118", rx: "18" }) }), (0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwMapPin", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#4ce9dc" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00958b" })] })] }), (0, jsx_runtime_1.jsx)("rect", { x: "14", y: "20", width: "132", height: "118", rx: "18", fill: "#a9ddd6" }), (0, jsx_runtime_1.jsx)("rect", { x: "14", y: "14", width: "132", height: "118", rx: "18", fill: "#eef9f7" }), (0, jsx_runtime_1.jsxs)("g", { clipPath: "url(#kwMapClip)", children: [(0, jsx_runtime_1.jsx)("path", { d: "M14 100 C50 92 70 118 146 104", className: "kw-map-river" }), (0, jsx_runtime_1.jsx)("rect", { x: "24", y: "24", width: "30", height: "22", rx: "5", fill: "#dbf0ec" }), (0, jsx_runtime_1.jsx)("rect", { x: "102", y: "58", width: "34", height: "24", rx: "5", fill: "#dbf0ec" }), (0, jsx_runtime_1.jsx)("rect", { x: "26", y: "66", width: "26", height: "22", rx: "5", fill: "#d3f0e2" }), (0, jsx_runtime_1.jsx)("path", { d: "M14 56 H146 M64 14 V132 M96 14 V132 M14 88 C40 84 60 92 146 84", className: "kw-map-road" }), (0, jsx_runtime_1.jsx)("path", { d: "M14 56 H146 M64 14 V132 M96 14 V132 M14 88 C40 84 60 92 146 84", className: "kw-map-road-line" })] }), (0, jsx_runtime_1.jsx)("path", { className: "kw-map-link k1", d: "M80 66 L36 34", pathLength: 1 }), (0, jsx_runtime_1.jsx)("path", { className: "kw-map-link k2", d: "M80 66 L124 40", pathLength: 1 }), (0, jsx_runtime_1.jsx)("path", { className: "kw-map-link k3", d: "M80 66 L128 112", pathLength: 1 }), (0, jsx_runtime_1.jsx)("ellipse", { className: "kw-map-ripple", cx: "80", cy: "80", rx: "10", ry: "4" }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-map-pin", children: [(0, jsx_runtime_1.jsx)("path", { transform: "translate(2 2)", d: "M80 80 C71 67 65 61 65 51 a15 15 0 1 1 30 0 c0 10 -6 16 -15 29Z", fill: "#00544e", opacity: ".55" }), (0, jsx_runtime_1.jsx)("path", { d: "M80 80 C71 67 65 61 65 51 a15 15 0 1 1 30 0 c0 10 -6 16 -15 29Z", fill: "url(#kwMapPin)" }), (0, jsx_runtime_1.jsx)("path", { d: "M72 44 C74 39 78 37 82 37", stroke: "#fff", strokeOpacity: ".7", strokeWidth: "2.4", fill: "none", strokeLinecap: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M73 54 L80 48 L87 54 V60 H73 Z", fill: "#fff" })] })] }), nearbyServices.map((item, index) => ((0, jsx_runtime_1.jsx)("span", { className: `kw-map-badge b${index + 1}`, style: { left: item.x, top: item.y }, children: (0, jsx_runtime_1.jsx)("span", { className: "popular-service-visual", "data-service": item.id, style: { backgroundPosition: `${item.sprite[0] * (100 / 3)}% ${item.sprite[1] * 50}%` } }) }, item.id)))] })] }));
}
function StarsScene({ count }) {
    const total = Math.min(5, Math.max(1, Math.round(count) || 5));
    const middle = (total - 1) / 2;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-fp kw-fp-stars", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("svg", { width: "0", height: "0", style: { position: "absolute" }, children: (0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("clipPath", { id: "kwSfpClip", children: (0, jsx_runtime_1.jsx)("path", { d: "M24.00 4.00 L29.41 17.56 L43.97 18.51 L32.75 27.84 L36.34 41.99 L24.00 34.20 L11.66 41.99 L15.25 27.84 L4.03 18.51 L18.59 17.56Z" }) }) }) }), (0, jsx_runtime_1.jsx)("span", { className: "kw-fp-shadow" }), (0, jsx_runtime_1.jsx)("div", { className: "kw-sfp-row", children: Array.from({ length: total }, (_, index) => {
                    const offset = index - middle;
                    return ((0, jsx_runtime_1.jsx)("span", { className: "kw-sfp", style: { "--i": index, "--fx": `${-offset * 56}px`, "--lift": `${-Math.abs(offset) * -6}px` }, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 48 48", children: [(0, jsx_runtime_1.jsx)("path", { className: "kw-sfp-back", d: "M24.00 4.00 L29.41 17.56 L43.97 18.51 L32.75 27.84 L36.34 41.99 L24.00 34.20 L11.66 41.99 L15.25 27.84 L4.03 18.51 L18.59 17.56Z" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L24.00 4.00 L29.41 17.56Z", fill: "#389b94" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L29.41 17.56 L43.97 18.51Z", fill: "#93e4dd" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L43.97 18.51 L32.75 27.84Z", fill: "#006e67" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L32.75 27.84 L36.34 41.99Z", fill: "#2d928b" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L36.34 41.99 L24.00 34.20Z", fill: "#278d86" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L24.00 34.20 L11.66 41.99Z", fill: "#006e67" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L11.66 41.99 L15.25 27.84Z", fill: "#8ee0d9" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L15.25 27.84 L4.03 18.51Z", fill: "#30958e" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L4.03 18.51 L18.59 17.56Z", fill: "#9aeae3" }), (0, jsx_runtime_1.jsx)("path", { d: "M24 25 L18.59 17.56 L24.00 4.00Z", fill: "#96e7e0" }), (0, jsx_runtime_1.jsx)("path", { className: "kw-sfp-edge", d: "M24.00 4.00 L29.41 17.56 L43.97 18.51 L32.75 27.84 L36.34 41.99 L24.00 34.20 L11.66 41.99 L15.25 27.84 L4.03 18.51 L18.59 17.56Z" }), (0, jsx_runtime_1.jsx)("g", { className: "kw-sfp-glint-wrap", clipPath: "url(#kwSfpClip)", children: (0, jsx_runtime_1.jsx)("rect", { className: "kw-sfp-glint", x: "0", y: "0", width: "10", height: "56" }) })] }) }, index));
                }) })] }));
}
function CoinBadge() {
    return ((0, jsx_runtime_1.jsxs)("span", { className: "kw-coinfp", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-coinfp-shadow" }), (0, jsx_runtime_1.jsx)("span", { className: "kw-coinfp-body", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 88 88", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { id: "kwCoinRim", x1: "0", y1: "0", x2: "1", y2: "1", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#b8f9f2" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".45", stopColor: "#14c3b6" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#00534d" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwCoinFace2", cx: ".38", cy: ".32", r: ".85", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#66f1e5" }), (0, jsx_runtime_1.jsx)("stop", { offset: ".55", stopColor: "#00b4a7" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#007c74" })] }), (0, jsx_runtime_1.jsx)("clipPath", { id: "kwCoinClip2", children: (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "44", r: "33" }) })] }), (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "47", r: "40", fill: "#00413c", opacity: ".55" }), (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "44", r: "40", fill: "#0aa99d" }), (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "44", r: "33", fill: "#00bfb2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "44.8", r: "28", fill: "none", stroke: "#fff", strokeOpacity: ".35", strokeWidth: "1.2" }), (0, jsx_runtime_1.jsx)("circle", { cx: "44", cy: "44", r: "28", fill: "none", stroke: "#005f58", strokeOpacity: ".45", strokeWidth: "1.4" }), (0, jsx_runtime_1.jsxs)("g", { clipPath: "url(#kwCoinClip2)", children: [(0, jsx_runtime_1.jsx)("ellipse", { cx: "33", cy: "25", rx: "20", ry: "11", transform: "rotate(-28 33 25)", fill: "#fff", opacity: ".22" }), (0, jsx_runtime_1.jsx)("rect", { className: "kw-coinfp-sheen", x: "0", y: "0", width: "20", height: "96" })] }), (0, jsx_runtime_1.jsx)("path", { className: "kw-coinfp-check-shade", d: "M29 46 L39 56 L60 34", pathLength: 1 }), (0, jsx_runtime_1.jsx)("path", { className: "kw-coinfp-check", d: "M29 44 L39 54 L60 32", pathLength: 1 })] }) }), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {})] }));
}
function LoaderScene({ kind, image, count = 5 }) {
    if (kind === "match")
        return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-loader-match", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsxs)("div", { className: "kw-radar", children: [(0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("i", {}), (0, jsx_runtime_1.jsx)("b", {})] }), (0, jsx_runtime_1.jsx)("span", { className: "kw-radar-home", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { d: "M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z" }) }) }), avatarSpots.map(([x, y], index) => (0, jsx_runtime_1.jsx)("img", { className: `kw-radar-avatar a${index + 1}`, style: { left: x, top: y }, src: kwick_data_1.technicians[index * 3].photo, alt: "" }, index))] }));
    if (kind === "secure")
        return (0, jsx_runtime_1.jsx)(SecureScene, {});
    if (kind === "home")
        return (0, jsx_runtime_1.jsx)(NeighbourhoodScene, {});
    if (kind === "review")
        return (0, jsx_runtime_1.jsx)(StarsScene, { count: count });
    if (kind === "bell")
        return (0, jsx_runtime_1.jsx)(BellScene, {});
    if (kind === "question")
        return (0, jsx_runtime_1.jsx)(WritingScene, {});
    if (kind === "booking")
        return (0, jsx_runtime_1.jsx)(CalendarScene, {});
    if (kind === "signout")
        return (0, jsx_runtime_1.jsx)(DoorScene, {});
    if (kind === "service")
        return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-loader kw-loader-svc", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsxs)("div", { className: "kw-svc-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "kw-svc-sheen" }), image ? (0, jsx_runtime_1.jsx)("img", { src: image, alt: "" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "kw-svc-list", children: [(0, jsx_runtime_1.jsxs)("i", { children: [(0, jsx_runtime_1.jsx)("b", {}), (0, jsx_runtime_1.jsx)("em", {})] }), (0, jsx_runtime_1.jsxs)("i", { children: [(0, jsx_runtime_1.jsx)("b", {}), (0, jsx_runtime_1.jsx)("em", {})] }), (0, jsx_runtime_1.jsxs)("i", { children: [(0, jsx_runtime_1.jsx)("b", {}), (0, jsx_runtime_1.jsx)("em", {})] })] })] }));
    return ((0, jsx_runtime_1.jsx)("svg", { className: `kw-loader kw-loader-${kind}`, viewBox: "0 0 160 160", "aria-hidden": "true", children: kind === "default" ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("circle", { className: "kw-l-orbit", cx: "80", cy: "80", r: "56" }), (0, jsx_runtime_1.jsx)("circle", { className: "kw-l-core", cx: "80", cy: "80", r: "22", style: origin(80, 80) })] }) : null }));
}
/* ------------------------------------------------------------------ */
/* Route strip — shown while the technician is on the way              */
/* ------------------------------------------------------------------ */
function RouteStrip({ eta }) {
    const route = "M34 62 C 92 62, 96 22, 156 26 S 236 66, 286 34";
    return ((0, jsx_runtime_1.jsxs)("div", { className: "kw-route", role: "img", "aria-label": `Technician on the way. Estimated arrival ${eta}`, children: [(0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 320 84", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("pattern", { id: "kwRouteGrid", width: "16", height: "16", patternUnits: "userSpaceOnUse", children: (0, jsx_runtime_1.jsx)("path", { d: "M16 0H0V16", fill: "none", stroke: "#d9ebe8", strokeWidth: "1" }) }) }), (0, jsx_runtime_1.jsx)("rect", { x: "0", y: "0", width: "320", height: "84", rx: "16", fill: "url(#kwRouteGrid)" }), (0, jsx_runtime_1.jsx)("path", { d: route, className: "kw-route-base" }), (0, jsx_runtime_1.jsx)("path", { d: route, className: "kw-route-done", pathLength: 1 }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-route-start", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "34", cy: "62", r: "9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "34", cy: "62", r: "3.5", className: "kw-route-start-core" })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-route-home", style: origin(286, 34), children: [(0, jsx_runtime_1.jsx)("circle", { cx: "286", cy: "34", r: "16", className: "kw-route-home-ring", style: origin(286, 34) }), (0, jsx_runtime_1.jsx)("path", { d: "M286 18 C278 18 273 24 273 30 c0 9 13 20 13 20 s13 -11 13 -20 c0 -6 -5 -12 -13 -12z", className: "kw-route-pin" }), (0, jsx_runtime_1.jsx)("path", { d: "M280.5 31.5 L286 27 l5.5 4.5 V37 h-11 Z", className: "kw-route-house" })] }), (0, jsx_runtime_1.jsxs)("g", { className: "kw-route-rider", children: [(0, jsx_runtime_1.jsx)("circle", { r: "15", className: "kw-route-rider-halo" }), (0, jsx_runtime_1.jsx)("circle", { r: "9", className: "kw-route-rider-bg" }), (0, jsx_runtime_1.jsx)("circle", { r: "3.5", className: "kw-route-rider-core" }), (0, jsx_runtime_1.jsx)("animateMotion", { dur: "6s", repeatCount: "indefinite", keyPoints: "0;0.78;0.78", keyTimes: "0;0.85;1", calcMode: "linear", path: route })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "kw-route-eta", children: [(0, jsx_runtime_1.jsx)("b", { children: eta }), "away"] })] }));
}
/** Thank-you badge: a solid teal coin that spins in, then a white check draws on. */
function ThanksBadge() {
    return (0, jsx_runtime_1.jsx)(CoinBadge, {});
}

};
