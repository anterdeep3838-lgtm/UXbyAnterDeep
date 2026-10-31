// app/home-screen.tsx
__maps[160]={"react/jsx-runtime":1,"react":7,"lucide-react":12,"./kwick-data":156,"./motion":159};
__defs[160]=function(module,exports,require){
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSearch = ServiceSearch;
exports.HomeScreen = HomeScreen;
exports.ExploreMasonry = ExploreMasonry;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const kwick_data_1 = require("./kwick-data");
const motion_1 = require("./motion");
const heroSlides = [
    { rig: 2, eyebrow: "Arriving with care", title: "Help at your door, right on time", points: ["Arrival estimate before you book", "Live status from booking to done"] },
    { rig: 1, eyebrow: "Verified professionals", title: "Skilled pros, checked for you", points: ["Identity, experience and skill checks", "Profiles matched to your problem"] },
    { rig: 5, eyebrow: "Peace of mind", title: "No surprise charges, ever", points: ["Extra work only after your approval", "Warranty on eligible jobs"] },
];
const seasonal = [
    { id: "summer", serviceId: "ac", tag: "Before summer", title: "Pre-summer AC service", line: "Clean filters and check cooling before the heat hits" },
    { id: "monsoon", serviceId: "plumber", tag: "Before monsoon", title: "Monsoon leak & damp check", line: "Seal taps, drains and pipes before the rains" },
    { id: "winter", serviceId: "geyser", tag: "Before winter", title: "Geyser health check", line: "Safe, steady hot water for the colder months" },
];
const steps = [
    { icon: lucide_react_1.ClipboardList, title: "Describe it", copy: "A few quick questions." },
    { icon: lucide_react_1.UserCheck, title: "Pick your pro", copy: "Compare verified pros." },
    { icon: lucide_react_1.Navigation, title: "Track it live", copy: "Live updates till done." },
];
const searchHints = ["AC service", "tap leak", "fan repair", "kitchen cleaning", "geyser not heating"];
function useReveal() {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const root = ref.current;
        if (!root)
            return;
        const items = Array.from(root.querySelectorAll("[data-reveal]"));
        if (typeof IntersectionObserver === "undefined") {
            items.forEach((item) => item.classList.add("is-in"));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);
    return ref;
}
function ServiceSearch({ onChoose, renderIcon }) {
    const [query, setQuery] = (0, react_1.useState)("");
    const [focused, setFocused] = (0, react_1.useState)(false);
    const [hint, setHint] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        if (focused || query)
            return;
        const timer = window.setInterval(() => setHint((value) => (value + 1) % searchHints.length), 2600);
        return () => window.clearInterval(timer);
    }, [focused, query]);
    const results = (0, react_1.useMemo)(() => {
        const term = query.trim().toLocaleLowerCase("en-IN");
        if (term.length < 2)
            return [];
        const has = (text) => text.toLocaleLowerCase("en-IN").includes(term);
        return kwick_data_1.services
            .map((service) => ({ service, score: (has(service.name) || has(service.shortName) ? 3 : 0) + (service.jobs.some(has) ? 2 : 0) + (has(service.description) ? 1 : 0) }))
            .filter((item) => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5)
            .map((item) => item.service);
    }, [query]);
    const open = focused && query.trim().length >= 2;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "hm-search", role: "search", children: [(0, jsx_runtime_1.jsxs)("label", { className: "hm-search-field", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Search services" }), (0, jsx_runtime_1.jsx)("input", { value: query, onChange: (event) => setQuery(event.target.value), onFocus: () => setFocused(true), onBlur: () => window.setTimeout(() => setFocused(false), 150), placeholder: `Search for “${searchHints[hint]}”`, autoComplete: "off", enterKeyHint: "search", onKeyDown: (event) => { if (event.key === "Enter" && results[0]) {
                            onChoose(results[0]);
                            setQuery("");
                        } } }), query ? (0, jsx_runtime_1.jsx)("button", { type: "button", className: "hm-search-clear", "aria-label": "Clear search", onClick: () => setQuery(""), children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}) }) : null] }), open ? ((0, jsx_runtime_1.jsx)("div", { className: "hm-search-results", role: "listbox", "aria-label": "Matching services", children: results.length ? results.map((service) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "option", "aria-selected": "false", onMouseDown: (event) => event.preventDefault(), onClick: () => { onChoose(service); setQuery(""); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-search-icon", children: renderIcon(service) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: service.name }), (0, jsx_runtime_1.jsx)("small", { children: service.jobs.slice(0, 3).join(" · ") })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }, service.id))) : (0, jsx_runtime_1.jsx)("p", { className: "hm-search-empty", children: "No matching service yet. Try \u201CAC\u201D, \u201Cleak\u201D or \u201Ccleaning\u201D." }) })) : null] }));
}
function HeroCarousel({ onExplore }) {
    const trackRef = (0, react_1.useRef)(null);
    const [active, setActive] = (0, react_1.useState)(0);
    const pausedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        const track = trackRef.current;
        if (!track)
            return;
        const onScroll = () => setActive(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
        track.addEventListener("scroll", onScroll, { passive: true });
        return () => track.removeEventListener("scroll", onScroll);
    }, []);
    (0, react_1.useEffect)(() => {
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
            return;
        const timer = window.setInterval(() => {
            const track = trackRef.current;
            if (!track || pausedRef.current || document.hidden)
                return;
            const next = (Math.round(track.scrollLeft / Math.max(1, track.clientWidth)) + 1) % heroSlides.length;
            track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
        }, 5200);
        return () => window.clearInterval(timer);
    }, []);
    const goTo = (index) => trackRef.current?.scrollTo({ left: index * trackRef.current.clientWidth, behavior: "smooth" });
    return ((0, jsx_runtime_1.jsxs)("section", { className: "hm-hero", "aria-roledescription": "carousel", "aria-label": "Why KwicK", onPointerEnter: () => { pausedRef.current = true; }, onPointerLeave: () => { pausedRef.current = false; }, onTouchStart: () => { pausedRef.current = true; }, onTouchEnd: () => { window.setTimeout(() => { pausedRef.current = false; }, 4000); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "hm-hero-track", ref: trackRef, children: heroSlides.map((slide, index) => ((0, jsx_runtime_1.jsxs)("article", { className: `hm-hero-slide tone-${index}`, "aria-roledescription": "slide", "aria-label": `${index + 1} of ${heroSlides.length}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "hm-hero-copy", children: [(0, jsx_runtime_1.jsx)("p", { children: slide.eyebrow }), (0, jsx_runtime_1.jsx)("h2", { children: slide.title }), (0, jsx_runtime_1.jsx)("ul", { children: slide.points.map((point) => (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { "aria-hidden": "true" }), point] }, point)) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onExplore, children: ["Explore services ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { "aria-hidden": "true" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "hm-hero-art", "aria-hidden": "true", children: Math.abs(active - index) <= 1 ? (0, jsx_runtime_1.jsx)(motion_1.TrackingCharacter, { statusIndex: slide.rig }) : null })] }, slide.title))) }), (0, jsx_runtime_1.jsx)("div", { className: "hm-dots", role: "tablist", "aria-label": "Choose slide", children: heroSlides.map((slide, index) => (0, jsx_runtime_1.jsx)("button", { type: "button", role: "tab", "aria-selected": active === index, "aria-label": `Show slide ${index + 1}`, className: active === index ? "active" : "", onClick: () => goTo(index) }, slide.title)) })] }));
}
function HomeScreen(props) {
    const { name, location, greeting, hasUnread, onOpenNotifications, onOpenLocation, onChooseService, onExploreAll, renderIcon, renderArt } = props;
    const rootRef = useReveal();
    const firstName = name.trim().split(/\s+/)[0] || "there";
    const shortLocation = (location || "Set location").split(",")[0];
    return ((0, jsx_runtime_1.jsxs)("main", { className: "app-content home-content hm", ref: rootRef, children: [(0, jsx_runtime_1.jsxs)("header", { className: "hm-top", children: [(0, jsx_runtime_1.jsx)("img", { className: "hm-logo", src: "kwick-wordmark-transparent.png", alt: "KwicK" }), (0, jsx_runtime_1.jsxs)("div", { className: "hm-top-actions", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "hm-location", onClick: onOpenLocation, "aria-label": `Change location. Current location: ${location || "not set"}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: shortLocation }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "hm-bell", onClick: onOpenNotifications, "aria-label": "Open notifications", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { "aria-hidden": "true" }), hasUnread ? (0, jsx_runtime_1.jsx)("i", { "aria-hidden": "true" }) : null] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "hm-hello", children: [(0, jsx_runtime_1.jsxs)("p", { children: [greeting, ", ", firstName] }), (0, jsx_runtime_1.jsx)("h1", { children: "What needs fixing today?" })] }), (0, jsx_runtime_1.jsx)(ServiceSearch, { onChoose: onChooseService, renderIcon: renderIcon }), (0, jsx_runtime_1.jsx)(HeroCarousel, { onExplore: onExploreAll }), (0, jsx_runtime_1.jsxs)("section", { className: "hm-section", "aria-labelledby": "hm-pick", "data-reveal": true, children: [(0, jsx_runtime_1.jsx)("div", { className: "hm-heading", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "hm-pick", children: "Pick a service" }), (0, jsx_runtime_1.jsx)("p", { children: "Tap a service to see what we can do" })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "hm-grid", children: [kwick_data_1.services.map((service) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "hm-tile", onClick: () => onChooseService(service), children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-tile-icon", children: renderIcon(service) }), (0, jsx_runtime_1.jsx)("span", { className: "hm-tile-label", children: service.shortName })] }, service.id))), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "hm-tile hm-tile-all", onClick: onExploreAll, children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-tile-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutGrid, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsx)("span", { className: "hm-tile-label", children: "All services" })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "hm-section", "aria-labelledby": "hm-seasonal", "data-reveal": true, children: [(0, jsx_runtime_1.jsx)("div", { className: "hm-heading", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "hm-seasonal", children: "Seasonal care" }), (0, jsx_runtime_1.jsx)("p", { children: "Get your home ready before the season changes" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "hm-priority", role: "list", children: seasonal.map((item, index) => {
                            const service = kwick_data_1.services.find((entry) => entry.id === item.serviceId);
                            if (!service)
                                return null;
                            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "listitem", className: `hm-pcard tone-${index + 1}`, "data-service": service.id, onClick: () => onChooseService(service), children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-pcard-pattern", "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "hm-pcard-copy", children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-pcard-tag", children: item.tag }), (0, jsx_runtime_1.jsx)("span", { className: "hm-pcard-title", children: item.title }), (0, jsx_runtime_1.jsx)("span", { className: "hm-pcard-line", children: item.line }), (0, jsx_runtime_1.jsxs)("span", { className: "hm-pcard-cta", children: ["Book now ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { "aria-hidden": "true" })] })] }), (0, jsx_runtime_1.jsx)("span", { className: "hm-pcard-art", "aria-hidden": "true", children: renderArt(service) })] }, item.id));
                        }) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "hm-section hm-how", "aria-labelledby": "hm-how", "data-reveal": true, children: [(0, jsx_runtime_1.jsx)("div", { className: "hm-heading", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { id: "hm-how", children: "How KwicK works" }), (0, jsx_runtime_1.jsx)("p", { children: "Three simple steps from problem to fixed" })] }) }), (0, jsx_runtime_1.jsx)("ol", { className: "hm-steps", children: steps.map((step, index) => {
                            const Icon = step.icon;
                            return ((0, jsx_runtime_1.jsxs)("li", { style: { "--i": index }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "hm-step-node", children: [(0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("b", { children: index + 1 })] }), (0, jsx_runtime_1.jsxs)("span", { className: "hm-step-copy", children: [(0, jsx_runtime_1.jsx)("strong", { children: step.title }), (0, jsx_runtime_1.jsx)("small", { children: step.copy })] })] }, step.title));
                        }) })] }), (0, jsx_runtime_1.jsx)("section", { className: "hm-section hm-promise", "aria-labelledby": "hm-promise", "data-reveal": true, children: (0, jsx_runtime_1.jsxs)("div", { className: "hm-promise-hero", children: [(0, jsx_runtime_1.jsx)("span", { className: "hm-promise-pattern", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { className: "hm-promise-badge", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, {}) }), (0, jsx_runtime_1.jsx)("p", { className: "hm-promise-eyebrow", children: "Why people choose KwicK" }), (0, jsx_runtime_1.jsx)("h2", { id: "hm-promise", children: "The KwicK promise" }), (0, jsx_runtime_1.jsx)("p", { className: "hm-promise-copy", children: "Every booking stays clear, verified and in your control, from the first question to the final check." }), (0, jsx_runtime_1.jsxs)("div", { className: "hm-promise-chips", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "6-step" }), " live tracking"] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "\u20B90" }), " hidden charges"] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "100%" }), " verified pros"] })] })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "hm-footnote", children: "KwicK interactive prototype \u00B7 technician profiles, estimates and tracking use sample data." })] }));
}
const masonryHeights = ["h-0", "h-1", "h-2", "h-3", "h-4"];
const masonryArt = [150, 118, 136, 162, 126];
/** Staggered two-to-four column catalogue (keeps reading order left-to-right). */
function ExploreMasonry({ items, onChoose, renderArt }) {
    const [columnCount, setColumnCount] = (0, react_1.useState)(2);
    (0, react_1.useEffect)(() => {
        const wide = window.matchMedia("(min-width: 1024px)");
        const medium = window.matchMedia("(min-width: 640px)");
        const update = () => setColumnCount(wide.matches ? 4 : medium.matches ? 3 : 2);
        update();
        wide.addEventListener("change", update);
        medium.addEventListener("change", update);
        return () => { wide.removeEventListener("change", update); medium.removeEventListener("change", update); };
    }, []);
    // Place each card in the currently shortest column so the columns end at a similar height.
    const columns = Array.from({ length: columnCount }, () => []);
    const columnHeights = Array.from({ length: columnCount }, () => 0);
    const charsPerLine = columnCount === 2 ? 22 : 34;
    items.forEach((service, index) => {
        const estimate = 64 + masonryArt[index % masonryArt.length] + 22 * Math.ceil(service.name.length / (charsPerLine - 6)) + 18 * Math.ceil(service.description.length / charsPerLine);
        const target = columnHeights.indexOf(Math.min(...columnHeights));
        columns[target].push({ service, index });
        columnHeights[target] += estimate + 14;
    });
    return ((0, jsx_runtime_1.jsx)("section", { className: "tb-masonry", "aria-label": "Service catalogue", children: columns.map((column, columnIndex) => ((0, jsx_runtime_1.jsx)("div", { className: "tb-masonry-col", children: column.map(({ service, index }) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "data-service": service.id, className: `masonry-card tb-mcard ${masonryHeights[index % masonryHeights.length]}`, onClick: () => onChoose(service), children: [(0, jsx_runtime_1.jsxs)("span", { className: "tb-mc-copy", children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-mc-title", children: service.name }), (0, jsx_runtime_1.jsx)("span", { className: "tb-mc-desc", children: service.description })] }), (0, jsx_runtime_1.jsx)("span", { className: "tb-mc-art", "aria-hidden": "true", children: renderArt(service) })] }, service.id))) }, columnIndex))) }));
}

};
