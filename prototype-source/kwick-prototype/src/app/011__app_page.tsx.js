// app/page.tsx
__maps[11]={"react/jsx-runtime":1,"react":7,"lucide-react":12,"sonner":13,"@/components/ui/button":14,"@/components/ui/sheet":152,"@/components/ui/tabs":153,"@/components/ui/sonner":154,"./kwick-data":156,"./indian-locations":157,"./help-content":158,"./motion":159,"./home-screen":160};
__defs[11]=function(module,exports,require){
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const sonner_1 = require("sonner");
const button_1 = require("@/components/ui/button");
const sheet_1 = require("@/components/ui/sheet");
const tabs_1 = require("@/components/ui/tabs");
const sonner_2 = require("@/components/ui/sonner");
const kwick_data_1 = require("./kwick-data");
const indian_locations_1 = require("./indian-locations");
const help_content_1 = require("./help-content");
const motion_1 = require("./motion");
const home_screen_1 = require("./home-screen");
const mainTabs = [
    { id: "home", label: "Home", icon: lucide_react_1.Home },
    { id: "explore", label: "Explore", icon: lucide_react_1.Compass },
    { id: "activity", label: "Activity", icon: lucide_react_1.Clock3 },
    { id: "profile", label: "Profile", icon: lucide_react_1.UserRound },
];
const statusSteps = ["Booked", "Confirmed", "On the Way", "Arrived", "In Progress", "Completed"];
const defaultProfilePhoto = "profile-user.png";
const serviceLoadingLabel = {
    ac: "AC repair", electrician: "electrician", plumber: "plumbing", refrigerator: "refrigerator repair", washing: "washing machine repair",
    geyser: "geyser", tv: "TV repair", chimney: "chimney", "fan-light": "fan & light", cleaning: "house cleaning",
};
const serviceArt = {
    ac: "ac-character.png", electrician: "electrician-character.png", plumber: "plumber-character.png",
    refrigerator: "refrigerator-character.png", washing: "washing-character.png", geyser: "geyser-character.png",
    tv: "tv-character.png", chimney: "chimney-character.png", "fan-light": "fan-light-character.png", cleaning: "cleaning-character.png",
};
const validMobile = (value) => /^\d{10}$/.test(value);
const mobileError = "Enter your 10-digit mobile number.";
const OTP_LENGTH = 4;
const formatPhone = (value) => value.length > 5 ? `${value.slice(0, 5)} ${value.slice(5)}` : value;
const sampleRecords = [
    { id: "past-ac", serviceId: "ac", job: "Repair", tech: (0, kwick_data_1.technicianForService)(kwick_data_1.technicians[0], "ac"), problem: "Not cooling · Weak airflow", summary: "Cooling issue resolved · sample record", status: "Completed", cost: 649, rating: 5 },
    { id: "past-plumber", serviceId: "plumber", job: "Tap or Leak", tech: (0, kwick_data_1.technicianForService)(kwick_data_1.technicians[2], "plumber"), problem: "Dripping tap · Kitchen", summary: "Dripping tap fixed · sample record", status: "Completed", cost: 499, rating: 4 },
];
const contextQuestionIds = ["safety", "area", "when", "last-service", "access", "size", "placement", "type", "connections", "site", "mount", "fixture", "control", "door", "socket", "input", "vent", "setup"];
function OtpBoxes({ value, onChange, length = OTP_LENGTH }) {
    const refs = (0, react_1.useRef)([]);
    const latest = (0, react_1.useRef)(value);
    latest.current = value;
    const pending = (0, react_1.useRef)(null);
    const focusAt = (index) => { pending.current = Math.max(0, Math.min(length - 1, index)); };
    const jump = (index) => { const target = refs.current[Math.max(0, Math.min(length - 1, index))]; target?.focus(); target?.select(); };
    (0, react_1.useEffect)(() => { jump(0); }, []);
    (0, react_1.useEffect)(() => {
        if (pending.current === null)
            return;
        const index = pending.current;
        pending.current = null;
        refs.current[index]?.focus();
    }, [value]);
    const write = (index, digits) => {
        const chars = latest.current.padEnd(length, " ").split("");
        digits.split("").forEach((digit, offset) => { if (index + offset < length)
            chars[index + offset] = digit; });
        const next = chars.join("").replace(/\s+$/, "");
        latest.current = next.replace(/\s/g, "");
        onChange(latest.current);
        focusAt(Math.min(index + digits.length, length - 1));
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "ob-otp", role: "group", "aria-label": `${length}-digit verification code`, children: Array.from({ length }, (_, index) => ((0, jsx_runtime_1.jsx)("input", { ref: (node) => { refs.current[index] = node; }, className: value[index] ? "filled" : "", inputMode: "numeric", autoComplete: index === 0 ? "one-time-code" : "off", "aria-label": `Digit ${index + 1}`, maxLength: length, value: value[index] ?? "", onFocus: (event) => { if (index > value.length)
                jump(value.length);
            else
                event.currentTarget.select(); }, onChange: (event) => { const raw = event.target.value.replace(/\D/g, ""); if (!raw)
                return; write(index, raw.length === 2 && latest.current[index] ? raw.slice(-1) : raw); }, onPaste: (event) => { event.preventDefault(); const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length); if (digits) {
                latest.current = digits;
                onChange(digits);
                focusAt(digits.length);
            } }, onKeyDown: (event) => {
                if (event.key === "Backspace") {
                    event.preventDefault();
                    const current = latest.current;
                    if (current[index]) {
                        latest.current = current.slice(0, index) + current.slice(index + 1);
                        onChange(latest.current);
                    }
                    else if (index > 0) {
                        latest.current = current.slice(0, index - 1) + current.slice(index);
                        onChange(latest.current);
                        focusAt(index - 1);
                    }
                }
                else if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    jump(index - 1);
                }
                else if (event.key === "ArrowRight") {
                    event.preventDefault();
                    jump(index + 1);
                }
            } }, index))) }));
}
function ServiceVisual({ service, className = "" }) {
    const standaloneArt = {
        ac: "ac-character.png",
        electrician: "electrician-character.png",
        plumber: "plumber-character.png",
        refrigerator: "refrigerator-character.png",
        washing: "washing-character.png",
        geyser: "geyser-character.png",
        tv: "tv-character.png",
        chimney: "chimney-character.png",
        "fan-light": "fan-light-character.png",
        cleaning: "cleaning-character.png",
    };
    const inset = service.id === "electrician" ? 30 : 0;
    const topInset = service.id === "washing" ? 30 : service.id === "chimney" ? 42 : 0;
    const x = service.sprite[0] * 362 + inset;
    const y = service.sprite[1] * 362 + topInset;
    return ((0, jsx_runtime_1.jsx)("span", { className: `service-visual ${className}`, "data-service": service.id, role: "img", "aria-label": `${service.name} technician`, children: standaloneArt[service.id] ? (0, jsx_runtime_1.jsx)("img", { src: standaloneArt[service.id], alt: "" }) : (0, jsx_runtime_1.jsx)("svg", { viewBox: `${x} ${y} ${362 - inset} ${356 - topInset}`, preserveAspectRatio: "xMidYMax meet", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("image", { href: "service-characters-v2.png", width: "1448", height: "1086" }) }) }));
}
function PopularServiceVisual({ service }) {
    return (0, jsx_runtime_1.jsx)("span", { className: "popular-service-visual", "data-service": service.id, role: "img", "aria-label": `${service.name} icon`, style: { backgroundPosition: `${service.sprite[0] * (100 / 3)}% ${service.sprite[1] * 50}%` } });
}
function customFollowUp(service, job, response, questionId) {
    const detail = response.length > 52 ? `${response.slice(0, 49)}…` : response;
    const normalized = response.toLocaleLowerCase("en-IN");
    const electrical = !["plumber", "cleaning"].includes(service.id);
    let prompt = `How often do you notice “${detail}”?`;
    let options = ["Every time", "Sometimes", "Only recently", "Not sure"];
    if (job === "Installation" || /install|mount|relocat/.test(normalized)) {
        prompt = `What is the setup for “${detail}”?`;
        options = ["New fitting", "Replacing existing", "Location needs preparation", "Not sure"];
    }
    else if (service.id === "cleaning") {
        prompt = `How large is the area for “${detail}”?`;
        options = job === "Sofa" ? ["One seat", "The whole sofa", "More than one sofa", "Not sure"]
            : job === "Full Home" ? ["A few rooms", "Most of the home", "The entire home", "Not sure"]
                : ["One small area", "Several areas", "The entire room", "Not sure"];
    }
    else if (electrical && /spark|shock|burn|smoke|wire|electric|trip|short circuit|power/.test(normalized)) {
        prompt = `What is the current power or safety situation with “${detail}”?`;
        options = ["Power is switched off", "Works intermittently", "Visible damage or sparks", "Not sure"];
    }
    else if (/leak|water|drip|drain|pipe|\btap\b/.test(normalized)) {
        prompt = `When does “${detail}” happen?`;
        options = ["Constantly", "Only while in use", "After use", "Not sure"];
    }
    else if (/noise|sound|rattl|buzz|vibrat|grind/.test(normalized)) {
        prompt = `When do you hear “${detail}”?`;
        options = ["At startup", "During use", "When stopping", "Intermittently"];
    }
    else if (/cool|cold|heat|warm|temperature|frost/.test(normalized)) {
        prompt = `When do you notice “${detail}”?`;
        options = ["Always", "After running a while", "Only sometimes", "Not sure"];
    }
    return {
        id: `${questionId}-other-followup`,
        prompt,
        helper: `Tell us more about this ${service.shortName.toLowerCase()} request.`,
        options: [...options, "Other"],
        otherPlaceholder: "Add a detail that helps explain the problem",
    };
}
function TrackingIllustration({ statusIndex }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "tracking-illustration kw-track-wrap", children: (0, jsx_runtime_1.jsx)(motion_1.TrackingCharacter, { statusIndex: statusIndex }, statusIndex) }));
}
function JobTypeIcon({ job, service }) {
    const label = job.toLowerCase();
    const installationIcons = {
        ac: lucide_react_1.ThermometerSnowflake, electrician: lucide_react_1.Zap, plumber: lucide_react_1.Droplets,
        refrigerator: lucide_react_1.ThermometerSnowflake, washing: lucide_react_1.Waves, geyser: lucide_react_1.ThermometerSnowflake,
        tv: lucide_react_1.Play, chimney: lucide_react_1.Wind, "fan-light": lucide_react_1.Lightbulb, cleaning: lucide_react_1.BrushCleaning,
    };
    const Icon = label.includes("install") ? (installationIcons[service?.id ?? ""] ?? lucide_react_1.Construction)
        : label.includes("repair") ? lucide_react_1.Hammer
            : label.includes("maintenance") ? lucide_react_1.Settings
                : label.includes("inverter") || label.includes("ups") ? lucide_react_1.BatteryCharging
                    : label.includes("power supply") ? lucide_react_1.PlugZap
                        : label.includes("fan") ? lucide_react_1.Fan
                            : label.includes("light") ? lucide_react_1.Lightbulb
                                : label.includes("wiring") ? lucide_react_1.Cable
                                    : label.includes("switch") || label.includes("socket") || label.includes("power") ? lucide_react_1.Zap
                                        : label.includes("tap") || label.includes("leak") ? lucide_react_1.Droplets
                                            : label.includes("drain") ? lucide_react_1.Waves
                                                : label.includes("pipe") ? lucide_react_1.Construction
                                                    : label.includes("cool") || label.includes("heating") ? lucide_react_1.ThermometerSnowflake
                                                        : label.includes("noise") || label.includes("sound") ? lucide_react_1.Volume2
                                                            : label.includes("suction") ? lucide_react_1.Wind
                                                                : label.includes("bathroom") ? lucide_react_1.Bath
                                                                    : label.includes("sofa") ? lucide_react_1.Sofa
                                                                        : label.includes("kitchen") ? lucide_react_1.CookingPot
                                                                            : label.includes("full home") ? lucide_react_1.Home
                                                                                : label.includes("frost") ? lucide_react_1.Snowflake
                                                                                    : label.includes("display") ? lucide_react_1.MonitorPlay
                                                                                        : label.includes("clean") ? lucide_react_1.BrushCleaning
                                                                                            : label.includes("inspection") ? lucide_react_1.Search
                                                                                                : label.includes("other") ? lucide_react_1.CircleHelp
                                                                                                    : lucide_react_1.Settings;
    return (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" });
}
function BackHeader({ title, onBack, action }) {
    return ((0, jsx_runtime_1.jsxs)("header", { className: "secondary-header", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "ghost", size: "icon", onClick: onBack, "aria-label": "Go back", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {}) }), (0, jsx_runtime_1.jsx)("h1", { children: title }), (0, jsx_runtime_1.jsx)("div", { className: "secondary-action-slot", children: action })] }));
}
const exploreFilters = [["all", "All"], ["appliances", "Appliances"], ["repairs", "Home repairs"], ["cleaning", "Cleaning"]];
const serviceGroups = {
    ac: "appliances", refrigerator: "appliances", washing: "appliances", geyser: "appliances", tv: "appliances", chimney: "appliances",
    electrician: "repairs", plumber: "repairs", "fan-light": "repairs", cleaning: "cleaning",
};
const notificationIcons = { 1: lucide_react_1.BadgeCheck, 2: lucide_react_1.Navigation, 3: lucide_react_1.IndianRupee, 4: lucide_react_1.Check, 5: lucide_react_1.Star };
const notificationTones = { 1: "teal", 2: "sky", 3: "amber", 4: "green", 5: "indigo" };
const supportIcons = [lucide_react_1.Wrench, lucide_react_1.IndianRupee, lucide_react_1.Clock3, lucide_react_1.ShieldCheck, lucide_react_1.MessageCircle];
const providerBenefits = [
    ["Jobs matched to your skills", "Requests arrive with a clear problem summary."],
    ["Choose your service area", "Work in the neighbourhoods that suit you."],
    ["Clear scope before every visit", "Extra work is always approved by the customer first."],
];
const jobHints = {
    Installation: "New setup, replacement or relocation",
    Repair: "Something isn’t working as it should",
    Maintenance: "Routine care, cleaning and checks",
    Other: "Describe it in your own words",
    Fan: "Not running, noisy, slow or wobbly",
    Light: "Not turning on, flickering or dim",
    "Power Supply": "No power, partial outage or intermittent supply.",
    "Inverter / UPS": "Installation, connection or backup power issues.",
    Wiring: "Tripping, damaged or new wiring",
    "Switch/Socket": "Loose, damaged or not working",
    "Tap or Leak": "Drips, leaks and loose fittings",
    Drainage: "Slow, blocked or smelly drains",
    Pipework: "Leaking, damaged or low-pressure pipes",
    "Not Cooling": "Warm sections or uneven cooling",
    "Power Issue": "No power, tripping or switching off",
    "Excess Frost": "Ice building up inside",
    "Unusual Noise": "Buzzing, rattling or clicking",
    "No Heating": "Cold or only lukewarm water",
    "Water Leak": "Leaks from a pipe, tank or valve",
    "Display Issue": "Black screen, lines or flicker",
    "Sound Issue": "No sound or distorted audio",
    "Deep Cleaning": "Filters, grease and a full clean",
    "Low Suction": "Weak or uneven suction",
    "Noise Issue": "Rattling, grinding or vibration",
    Kitchen: "Counters, tiles, cabinets and appliances",
    Bathroom: "Tiles, fittings and limescale",
    Sofa: "Upholstery, stains and odour",
    "Full Home": "Every room, top to bottom",
};
const jobHint = (job) => jobHints[job] ?? "Choose this if it matches best";
const statusDetails = ["Request received", "Technician assigned", "Heading to your address", "Reached your doorstep", "Inspection and repair", "Job finished"];
const techSortOptions = [["recommended", "Recommended"], ["rating", "Top rated"], ["price", "Lowest price"], ["eta", "Fastest arrival"]];
const sampleReviews = [
    { name: "Priya S.", rating: 5, text: "Explained the problem clearly and asked before replacing any part." },
    { name: "Rahul K.", rating: 4, text: "Arrived within the estimate and left the area clean." },
];
function Home() {
    const [screen, setScreen] = (0, react_1.useState)("auth");
    const [history, setHistory] = (0, react_1.useState)([]);
    const [sheet, setSheet] = (0, react_1.useState)(null);
    const [profile, setProfile] = (0, react_1.useState)({ name: "Arjun", phone: "9876543210", location: "Indiranagar, Bengaluru" });
    const [profilePhoto, setProfilePhoto] = (0, react_1.useState)(defaultProfilePhoto);
    const [selectedNotification, setSelectedNotification] = (0, react_1.useState)(null);
    const [openSupport, setOpenSupport] = (0, react_1.useState)(null);
    const [ratingPulse, setRatingPulse] = (0, react_1.useState)(0);
    const [phone, setPhone] = (0, react_1.useState)("");
    const [otp, setOtp] = (0, react_1.useState)("");
    const [resendIn, setResendIn] = (0, react_1.useState)(30);
    const [nameInput, setNameInput] = (0, react_1.useState)("");
    const [locationQuery, setLocationQuery] = (0, react_1.useState)("");
    const [locationSuggestionsOpen, setLocationSuggestionsOpen] = (0, react_1.useState)(false);
    const [addressSuggestionsOpen, setAddressSuggestionsOpen] = (0, react_1.useState)(false);
    const [selectedService, setSelectedService] = (0, react_1.useState)(null);
    const [selectedJob, setSelectedJob] = (0, react_1.useState)("");
    const [questionIndex, setQuestionIndex] = (0, react_1.useState)(0);
    const [answers, setAnswers] = (0, react_1.useState)({});
    const [otherResponses, setOtherResponses] = (0, react_1.useState)({});
    const [description, setDescription] = (0, react_1.useState)("");
    const [media, setMedia] = (0, react_1.useState)([]);
    const [recording, setRecording] = (0, react_1.useState)(false);
    const [voiceUrl, setVoiceUrl] = (0, react_1.useState)("");
    const [selectedTech, setSelectedTech] = (0, react_1.useState)(null);
    const [bookingCreated, setBookingCreated] = (0, react_1.useState)(false);
    const [statusIndex, setStatusIndex] = (0, react_1.useState)(0);
    const [payment, setPayment] = (0, react_1.useState)("Cash");
    const [rating, setRating] = (0, react_1.useState)(0);
    const [reviewTags, setReviewTags] = (0, react_1.useState)([]);
    const [review, setReview] = (0, react_1.useState)("");
    const [notifications, setNotifications] = (0, react_1.useState)(kwick_data_1.sampleNotifications);
    const [editProfile, setEditProfile] = (0, react_1.useState)(false);
    const [profileDraft, setProfileDraft] = (0, react_1.useState)(profile);
    const [profileOtpNeeded, setProfileOtpNeeded] = (0, react_1.useState)(false);
    const [profileOtp, setProfileOtp] = (0, react_1.useState)("");
    const [transition, setTransition] = (0, react_1.useState)(null);
    const [sheetDrag, setSheetDrag] = (0, react_1.useState)(0);
    const [greeting, setGreeting] = (0, react_1.useState)("Hello");
    const [legalTab, setLegalTab] = (0, react_1.useState)("terms");
    const [viewRecord, setViewRecord] = (0, react_1.useState)(null);
    const [techSort, setTechSort] = (0, react_1.useState)("recommended");
    const [exploreFilter, setExploreFilter] = (0, react_1.useState)("all");
    const [sheetDragging, setSheetDragging] = (0, react_1.useState)(false);
    const [sheetDismissing, setSheetDismissing] = (0, react_1.useState)(false);
    const transitionTimerRef = (0, react_1.useRef)(null);
    const lastTabRef = (0, react_1.useRef)(0);
    const sheetDragStartRef = (0, react_1.useRef)(null);
    const recorderRef = (0, react_1.useRef)(null);
    const recorderStreamRef = (0, react_1.useRef)(null);
    const voiceChunksRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(() => () => {
        if (transitionTimerRef.current)
            window.clearTimeout(transitionTimerRef.current);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!sheet)
            return;
        setSheetDrag(0);
        setSheetDismissing(false);
        setSheetDragging(false);
    }, [sheet]);
    /** Drag handle for bottom sheets: drag down to dismiss, release early to spring back. */
    const sheetGrabber = (onClose = () => setSheet(null)) => ((0, jsx_runtime_1.jsx)("div", { className: "sheet-drag-zone", "aria-hidden": "true", onPointerDown: (event) => { sheetDragStartRef.current = event.clientY; setSheetDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }, onPointerMove: (event) => { if (sheetDragStartRef.current !== null)
            setSheetDrag(Math.max(0, event.clientY - sheetDragStartRef.current)); }, onPointerUp: (event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId))
                event.currentTarget.releasePointerCapture(event.pointerId);
            sheetDragStartRef.current = null;
            setSheetDragging(false);
            if (sheetDrag > 80) {
                setSheetDismissing(true);
                setSheetDrag(window.innerHeight);
                window.setTimeout(onClose, 240);
            }
            else
                setSheetDrag(0);
        }, onPointerCancel: () => { sheetDragStartRef.current = null; setSheetDragging(false); setSheetDrag(0); }, children: (0, jsx_runtime_1.jsx)("span", {}) }));
    const sheetMotion = `${sheetDragging ? " is-dragging" : ""}${sheetDismissing ? " is-dismissing" : ""}`;
    const sheetStyle = { "--drag": `${sheetDrag}px` };
    const runTransition = (message, duration, action, detail, image) => {
        if (transition)
            return;
        setTransition({ message, detail, duration, image });
        transitionTimerRef.current = window.setTimeout(() => {
            action();
            setTransition(null);
            transitionTimerRef.current = null;
        }, duration);
    };
    (0, react_1.useEffect)(() => {
        const hour = new Date().getHours();
        setGreeting(hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");
        const saved = window.localStorage.getItem("kwick-profile");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setProfile((current) => ({ ...current, ...parsed }));
            }
            catch { /* ignore invalid local preview data */ }
        }
        const savedPhoto = window.localStorage.getItem("kwick-profile-photo");
        if (savedPhoto?.startsWith("data:image/"))
            setProfilePhoto(savedPhoto);
    }, []);
    (0, react_1.useEffect)(() => {
        setProfileDraft(profile);
    }, [profile]);
    (0, react_1.useEffect)(() => {
        const index = mainTabs.findIndex((item) => item.id === screen);
        if (index >= 0)
            lastTabRef.current = index;
    }, [screen]);
    (0, react_1.useEffect)(() => {
        if (screen !== "otp" || resendIn <= 0)
            return;
        const timer = window.setTimeout(() => setResendIn((value) => value - 1), 1000);
        return () => window.clearTimeout(timer);
    }, [screen, resendIn]);
    const navigate = (next) => {
        setHistory((items) => [...items, screen]);
        setScreen(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const goBack = () => {
        setHistory((items) => {
            const next = [...items];
            setScreen(next.pop() ?? "home");
            return next;
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const goToTab = (tab) => {
        if (screen === tab)
            return;
        setHistory([]);
        setScreen(tab);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const chooseService = (service) => {
        runTransition(`Loading ${serviceLoadingLabel[service.id] ?? service.shortName.toLowerCase()} services`, 1200, () => {
            setSelectedService(service);
            setSelectedJob("");
            setSheet("job");
        }, "Fetching the right job types for you", serviceArt[service.id]);
    };
    const startRequest = (job) => {
        setSelectedJob(job);
        setAnswers({});
        setOtherResponses({});
        setQuestionIndex(0);
        setDescription("");
        setMedia([]);
        setVoiceUrl("");
        setSheet(null);
        navigate("questions");
    };
    const openNotifications = () => runTransition("Loading your notifications", 2000, () => navigate("notifications"), "Gathering your latest KwicK updates");
    const enterPrototype = () => runTransition("Signing you in to KwicK", 2000, () => {
        setScreen("home");
        setHistory([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, "Preparing your home-service experience");
    const activeQuestions = (0, react_1.useMemo)(() => {
        if (!selectedService || !selectedJob)
            return [];
        const base = (0, kwick_data_1.getQuestions)(selectedService, selectedJob).filter((question) => !question.when || question.when(answers));
        return base.flatMap((question) => {
            const response = otherResponses[question.id]?.trim();
            if (answers[question.id] !== "Other" || !response || question.id.endsWith("-other-followup"))
                return [question];
            return [question, customFollowUp(selectedService, selectedJob, response, question.id)];
        });
    }, [selectedService, selectedJob, answers, otherResponses]);
    const currentQuestion = activeQuestions[Math.min(questionIndex, Math.max(0, activeQuestions.length - 1))];
    const answerText = (questionId) => answers[questionId] === "Other"
        ? otherResponses[questionId]?.trim() || "Other"
        : answers[questionId];
    const answeredQuestions = activeQuestions.filter((question) => answers[question.id]);
    const second = answeredQuestions[1];
    const includeSecond = second && (selectedJob === "Installation" || !contextQuestionIds.includes(second.id));
    const coreProblem = answeredQuestions[0]
        ? `${answerText(answeredQuestions[0].id)}${includeSecond ? ` · ${answerText(second.id)}` : ""}`
        : "Details confirmed by the user";
    const problemLine = description.trim() ? `${coreProblem} · ${description.trim()}` : coreProblem;
    const finalAmount = selectedTech?.estimate ?? 0;
    (0, react_1.useEffect)(() => {
        if (!bookingCreated || statusIndex >= statusSteps.length - 1)
            return;
        const timer = window.setTimeout(() => {
            setStatusIndex((current) => Math.min(current + 1, statusSteps.length - 1));
        }, 5000);
        return () => window.clearTimeout(timer);
    }, [bookingCreated, statusIndex]);
    const handleMedia = (event, kind) => {
        const file = event.target.files?.[0];
        if (!file)
            return;
        const url = URL.createObjectURL(file);
        setMedia((items) => [...items.filter((item) => item.kind !== kind), { id: `${kind}-${Date.now()}`, kind, name: file.name, url }]);
        event.target.value = "";
    };
    const removeMedia = (id) => {
        setMedia((items) => {
            const target = items.find((item) => item.id === id);
            if (target)
                URL.revokeObjectURL(target.url);
            return items.filter((item) => item.id !== id);
        });
    };
    const toggleVoice = async () => {
        if (recording && recorderRef.current) {
            recorderRef.current.stop();
            setRecording(false);
            return;
        }
        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            sonner_1.toast.error("Voice recording is not supported in this browser.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recorderStreamRef.current = stream;
            voiceChunksRef.current = [];
            const recorder = new MediaRecorder(stream);
            recorder.ondataavailable = (event) => { if (event.data.size)
                voiceChunksRef.current.push(event.data); };
            recorder.onstop = () => {
                const blob = new Blob(voiceChunksRef.current, { type: recorder.mimeType || "audio/webm" });
                if (voiceUrl)
                    URL.revokeObjectURL(voiceUrl);
                setVoiceUrl(URL.createObjectURL(blob));
                recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
                sonner_1.toast.success("Voice note added.");
            };
            recorderRef.current = recorder;
            recorder.start();
            setRecording(true);
        }
        catch {
            sonner_1.toast.error("Microphone access was not granted.");
        }
    };
    const confirmBooking = () => {
        setSheet(null);
        runTransition("Confirming your booking", 2000, () => {
            setBookingCreated(true);
            setStatusIndex(0);
            setRating(0);
            setReviewTags([]);
            setReview("");
            setPayment("Cash");
            setScreen("tracking");
            setHistory(["home", "activity"]);
            window.scrollTo({ top: 0, behavior: "smooth" });
            sonner_1.toast.success("Prototype booking confirmed.");
        }, selectedTech ? `Preparing your service with ${selectedTech.name}` : "Preparing your service details");
    };
    const backFromQuestion = () => {
        if (questionIndex > 0)
            setQuestionIndex((value) => value - 1);
        else
            goBack();
    };
    const resetToHome = () => {
        setSheet(null);
        // The completed booking stays available under Activity > Past.
        setRating(0);
        setReviewTags([]);
        setReview("");
        goToTab("home");
    };
    const renderAuth = () => ((0, jsx_runtime_1.jsxs)("main", { className: "auth-shell", children: [(0, jsx_runtime_1.jsxs)("section", { className: "auth-visual", "aria-label": "KwicK welcome", children: [(0, jsx_runtime_1.jsx)("img", { className: "auth-wordmark", src: "kwick-wordmark-transparent.png", alt: "KwicK" }), (0, jsx_runtime_1.jsxs)("div", { className: "auth-visual-copy", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Home help, thoughtfully matched" }), (0, jsx_runtime_1.jsx)("h1", { children: "Reliable service starts with a clear problem." }), (0, jsx_runtime_1.jsx)("p", { children: "Tell us what is happening. KwicK keeps the request focused and lets you confirm every important detail." })] }), (0, jsx_runtime_1.jsx)(motion_1.OnboardingScene, { scene: "welcome", className: "auth-person", label: "KwicK technician arriving at your home" }), (0, jsx_runtime_1.jsxs)("div", { className: "trust-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "AI assists. You confirm the important facts." })] })] }), (0, jsx_runtime_1.jsx)("section", { className: "auth-panel", children: (0, jsx_runtime_1.jsxs)("div", { className: "auth-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "mobile-brand", children: (0, jsx_runtime_1.jsx)("img", { src: "kwick-wordmark-transparent.png", alt: "KwicK" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "auth-heading", children: [(0, jsx_runtime_1.jsx)("div", { className: "onboarding-art welcome-art", children: (0, jsx_runtime_1.jsx)(motion_1.OnboardingScene, { scene: "welcome", className: "welcome-scene", label: "A friendly KwicK technician at your doorstep" }) }), (0, jsx_runtime_1.jsx)("h2", { children: "Welcome To KwicK" }), (0, jsx_runtime_1.jsx)("p", { children: "Sign in or create an account to continue." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "auth-actions", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { className: "primary-action", size: "lg", onClick: () => runTransition("Opening secure sign-in", 2000, () => navigate("phone"), "Preparing phone verification"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { "aria-hidden": "true" }), "Continue with Phone"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "secondary-action", variant: "outline", size: "lg", onClick: () => sonner_1.toast.info("Connect Google authentication before using this option."), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Globe2, { "aria-hidden": "true" }), "Continue with Google"] })] }), (0, jsx_runtime_1.jsx)("button", { className: "prototype-link", type: "button", onClick: enterPrototype, children: "Open interactive prototype" }), (0, jsx_runtime_1.jsxs)("p", { className: "legal-copy", children: ["By continuing, you agree to KwicK\u2019s ", (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setLegalTab("terms"); navigate("legal"); }, children: "Terms" }), " and ", (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setLegalTab("privacy"); navigate("legal"); }, children: "Privacy Policy" }), "."] })] }) })] }));
    const renderOnboarding = () => {
        const copy = {
            phone: ["Continue with phone", "Enter your 10-digit mobile number to sign in or create an account."],
            otp: ["Enter the code", ""],
            name: ["What should we call you?", "This keeps your bookings personal."],
            location: ["Choose your location", "Search for your area or use your current location."],
        }[screen];
        const suggestions = locationSuggestionsOpen && locationQuery.trim().length > 1 && locationQuery.trim() !== profile.location
            ? (0, indian_locations_1.searchIndianLocations)(locationQuery)
            : [];
        return ((0, jsx_runtime_1.jsx)("main", { className: "onboarding-shell", children: (0, jsx_runtime_1.jsxs)("section", { className: "onboarding-card", children: [(0, jsx_runtime_1.jsx)("img", { className: "onboarding-logo", src: "kwick-wordmark-transparent.png", alt: "KwicK" }), (0, jsx_runtime_1.jsxs)("button", { className: "back-link ob-back", type: "button", onClick: goBack, "aria-label": "Go back", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "Back" })] }), (0, jsx_runtime_1.jsx)("div", { className: "onboarding-art", children: (0, jsx_runtime_1.jsx)(motion_1.OnboardingScene, { scene: screen === "location" ? "location" : screen === "name" ? "welcome" : "phone", className: "onboarding-scene", label: screen === "location" ? "KwicK technician finding your neighbourhood" : screen === "name" ? "Your KwicK technician ready to help" : "KwicK technician checking a service request on his phone" }, screen) }), (0, jsx_runtime_1.jsx)("p", { className: "step-label", children: "Account setup" }), (0, jsx_runtime_1.jsx)("h1", { children: copy[0] }), screen === "otp" ? (0, jsx_runtime_1.jsxs)("p", { className: "screen-subtitle", children: ["We\u2019ll check the ", OTP_LENGTH, "-digit code for ", (0, jsx_runtime_1.jsxs)("b", { children: ["+91 ", formatPhone(phone)] }), ". ", (0, jsx_runtime_1.jsx)("button", { type: "button", className: "ob-change", onClick: () => { setOtp(""); goBack(); }, children: "Change number" })] }) : (0, jsx_runtime_1.jsx)("p", { className: "screen-subtitle", children: copy[1] }), screen === "phone" ? ((0, jsx_runtime_1.jsxs)("form", { onSubmit: (event) => { event.preventDefault(); if (!validMobile(phone))
                            return; setOtp(""); setResendIn(30); navigate("otp"); }, className: "stack-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "phone", children: "Phone number" }), (0, jsx_runtime_1.jsxs)("div", { className: "phone-field", children: [(0, jsx_runtime_1.jsx)("span", { children: "+91" }), (0, jsx_runtime_1.jsx)("input", { id: "phone", inputMode: "numeric", autoComplete: "tel", value: phone, maxLength: 10, onChange: (event) => setPhone(event.target.value.replace(/\D/g, "")), placeholder: "98765 43210" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", className: "full-button", disabled: !validMobile(phone), children: ["Continue", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })) : null, screen === "otp" ? ((0, jsx_runtime_1.jsxs)("form", { onSubmit: (event) => { event.preventDefault(); if (otp.length !== OTP_LENGTH)
                            return; runTransition("Checking your code", 2000, () => navigate("name"), "Verifying your number securely"); }, className: "stack-form ob-otp-form", children: [(0, jsx_runtime_1.jsx)(OtpBoxes, { value: otp, onChange: setOtp }), (0, jsx_runtime_1.jsxs)("p", { className: "ob-otp-hint", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), "Prototype: any ", OTP_LENGTH, " digits work. No SMS is sent."] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", className: "full-button", disabled: otp.length !== OTP_LENGTH, children: ["Verify and continue", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }), (0, jsx_runtime_1.jsx)("p", { className: "ob-resend", children: resendIn > 0 ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Resend code in 0:", String(resendIn).padStart(2, "0")] }) : (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setOtp(""); setResendIn(30); sonner_1.toast.success("A new code is on its way (prototype)."); }, children: "Resend code" }) })] })) : null, screen === "name" ? ((0, jsx_runtime_1.jsxs)("form", { onSubmit: (event) => { event.preventDefault(); if (nameInput.trim().length < 2)
                            return sonner_1.toast.error("Enter your name."); setProfile((item) => ({ ...item, name: nameInput.trim(), phone, location: "" })); navigate("location"); }, className: "stack-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "Name" }), (0, jsx_runtime_1.jsx)("input", { id: "name", className: "text-field", autoComplete: "name", value: nameInput, onChange: (event) => setNameInput(event.target.value), placeholder: "Your name" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { type: "submit", className: "full-button", children: ["Continue", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })) : null, screen === "location" ? ((0, jsx_runtime_1.jsxs)("div", { className: "stack-form", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "location-search", children: "Search area or city" }), (0, jsx_runtime_1.jsxs)("div", { className: "search-field", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, {}), (0, jsx_runtime_1.jsx)("input", { id: "location-search", value: locationQuery, onChange: (event) => { setLocationQuery(event.target.value); setLocationSuggestionsOpen(true); }, onFocus: () => { if (locationQuery.trim() !== profile.location)
                                            setLocationSuggestionsOpen(true); }, placeholder: "Start typing a location" })] }), suggestions.length ? (0, jsx_runtime_1.jsx)("div", { className: "suggestions", role: "listbox", "aria-label": "Location suggestions", children: suggestions.map((item) => (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: (event) => { setLocationSuggestionsOpen(false); setLocationQuery(item); setProfile((value) => ({ ...value, location: item })); event.currentTarget.closest(".stack-form")?.querySelector("input")?.blur(); window.getSelection()?.removeAllRanges(); }, children: [item, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {})] }, item)) }) : locationSuggestionsOpen && locationQuery.trim().length > 1 && locationQuery.trim() !== profile.location ? (0, jsx_runtime_1.jsx)("p", { className: "tb-loc-empty", children: "No matching place yet. Try a city or area name, such as \u201CKoramangala\u201D or \u201CPune\u201D." }) : null, (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "current-location", onClick: () => {
                                    if (!navigator.geolocation)
                                        return sonner_1.toast.error("Current location is not supported in this browser.");
                                    navigator.geolocation.getCurrentPosition(() => { setLocationSuggestionsOpen(false); setLocationQuery("Current location"); setProfile((value) => ({ ...value, location: "Current location" })); sonner_1.toast.success("Current location selected."); }, () => sonner_1.toast.error("Location access was not granted."));
                                }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Navigation, {}), "Use current location"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "full-button", disabled: !profile.location, onClick: () => runTransition("Setting up your KwicK home", 2000, () => { window.localStorage.setItem("kwick-profile", JSON.stringify(profile)); setScreen("home"); setHistory([]); window.scrollTo({ top: 0, behavior: "smooth" }); }, "Personalizing services for your location"), children: ["Finish setup", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })) : null] }) }));
    };
    const unreadCount = notifications.filter((item) => item.unread).length;
    const renderTabHeader = (title, subtitle) => ((0, jsx_runtime_1.jsxs)("header", { className: "tb-header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: title }), (0, jsx_runtime_1.jsx)("p", { children: subtitle })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "tb-bell", "aria-label": "Open notifications", onClick: openNotifications, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { "aria-hidden": "true" }), unreadCount ? (0, jsx_runtime_1.jsx)("i", { "aria-hidden": "true" }) : null] })] }));
    const activeTabIndex = Math.max(0, mainTabs.findIndex((item) => item.id === screen));
    const renderBottomNav = () => ((0, jsx_runtime_1.jsxs)("nav", { className: "bottom-nav", "aria-label": "Primary navigation", style: { "--from": lastTabRef.current, "--to": activeTabIndex }, children: [(0, jsx_runtime_1.jsx)("i", { className: "nav-glider", "aria-hidden": "true" }, screen), mainTabs.map((item) => {
                const Icon = item.icon;
                const active = screen === item.id;
                return (0, jsx_runtime_1.jsxs)("button", { type: "button", className: active ? "active" : "", "aria-label": item.label, "aria-current": active ? "page" : undefined, onClick: () => goToTab(item.id), children: [(0, jsx_runtime_1.jsx)(Icon, {}), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: item.label })] }, item.id);
            })] }));
    const renderHome = () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(home_screen_1.HomeScreen, { name: profile.name, location: profile.location, greeting: greeting, hasUnread: notifications.some((item) => item.unread), onOpenNotifications: openNotifications, onOpenLocation: () => { setLocationQuery(profile.location); setLocationSuggestionsOpen(false); navigate("location"); }, onChooseService: chooseService, onExploreAll: () => goToTab("explore"), renderIcon: (service) => (0, jsx_runtime_1.jsx)(PopularServiceVisual, { service: service }), renderArt: (service) => (0, jsx_runtime_1.jsx)(ServiceVisual, { service: service }) }), renderBottomNav()] }));
    const renderExplore = () => {
        const filtered = kwick_data_1.services.filter((service) => exploreFilter === "all" || serviceGroups[service.id] === exploreFilter);
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("main", { className: "app-content tb-page explore-content", children: [renderTabHeader("Explore", `${kwick_data_1.services.length} home services · pick one to start`), (0, jsx_runtime_1.jsx)(home_screen_1.ServiceSearch, { onChoose: chooseService, renderIcon: (service) => (0, jsx_runtime_1.jsx)(PopularServiceVisual, { service: service }) }), (0, jsx_runtime_1.jsx)("div", { className: "tb-chips", role: "group", "aria-label": "Filter services", children: exploreFilters.map(([value, label]) => (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": exploreFilter === value, className: exploreFilter === value ? "active" : "", onClick: () => setExploreFilter(value), children: label }, value)) }), (0, jsx_runtime_1.jsx)(home_screen_1.ExploreMasonry, { items: filtered, onChoose: chooseService, renderArt: (service) => (0, jsx_runtime_1.jsx)(ServiceVisual, { service: service }) })] }), renderBottomNav()] }));
    };
    const BookingCard = ({ record }) => {
        if (record) {
            const recordService = kwick_data_1.services.find((item) => item.id === record.serviceId);
            const past = record.status === "Completed";
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: "booking-card tb-booking", onClick: () => { setViewRecord(record); navigate("booking-detail"); }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "tb-bk-top", children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-bk-icon", children: recordService ? (0, jsx_runtime_1.jsx)(PopularServiceVisual, { service: recordService }) : null }), (0, jsx_runtime_1.jsxs)("span", { className: "booking-card-copy", children: [(0, jsx_runtime_1.jsx)("span", { className: `tb-status ${past ? "done" : "upcoming"}`, children: past ? "Completed" : "Upcoming · prototype" }), (0, jsx_runtime_1.jsx)("h3", { children: recordService?.name }), (0, jsx_runtime_1.jsx)("p", { children: record.summary })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-bk-foot", children: [(0, jsx_runtime_1.jsx)("img", { src: record.tech.photo, alt: "" }), (0, jsx_runtime_1.jsx)("b", { children: record.tech.name }), (0, jsx_runtime_1.jsx)("i", { children: past ? `₹${record.cost} · Sample` : record.when })] })] }));
        }
        if (!selectedTech)
            return null;
        const done = statusIndex === statusSteps.length - 1;
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: `booking-card tb-booking ${done ? "" : "booking-active"}`, onClick: () => { setViewRecord(null); navigate("booking-detail"); }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "tb-bk-top", children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-bk-icon", children: selectedService ? (0, jsx_runtime_1.jsx)(PopularServiceVisual, { service: selectedService }) : null }), (0, jsx_runtime_1.jsxs)("span", { className: "booking-card-copy", children: [(0, jsx_runtime_1.jsx)("span", { className: `tb-status ${done ? "done" : "live"}`, children: statusSteps[statusIndex] }), (0, jsx_runtime_1.jsx)("h3", { children: selectedService?.name }), (0, jsx_runtime_1.jsx)("p", { children: problemLine })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }), !done ? (0, jsx_runtime_1.jsx)("span", { className: "tb-bk-progress", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("i", { style: { width: `${((statusIndex + 1) / statusSteps.length) * 100}%` } }) }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "tb-bk-foot", children: [(0, jsx_runtime_1.jsx)("img", { src: selectedTech.photo, alt: "" }), (0, jsx_runtime_1.jsx)("b", { children: selectedTech.name }), (0, jsx_runtime_1.jsx)("i", { children: done ? `₹${finalAmount}` : `Arrives in ${selectedTech.eta}` })] })] }));
    };
    const renderActivity = () => {
        const liveDone = bookingCreated && statusIndex === statusSteps.length - 1;
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("main", { className: "app-content tb-page activity-content", children: [renderTabHeader("Activity", "Track, review and rebook your services"), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { defaultValue: "active", className: "activity-tabs tb-tabs", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "active", children: "Active" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "past", children: "Past" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "active", children: (0, jsx_runtime_1.jsx)("div", { className: "activity-list", children: bookingCreated && !liveDone ? (0, jsx_runtime_1.jsx)(BookingCard, {}) : (0, jsx_runtime_1.jsxs)("div", { className: "activity-empty tb-empty", children: [(0, jsx_runtime_1.jsxs)("span", { className: "tb-empty-art", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("img", { src: "activity-empty-body.webp", alt: "" }), (0, jsx_runtime_1.jsx)("img", { className: "tb-empty-head", src: "activity-empty-head.webp", alt: "" }), (0, jsx_runtime_1.jsx)("img", { src: "activity-empty-hand.webp", alt: "" })] }), (0, jsx_runtime_1.jsx)("h2", { children: "No active bookings" }), (0, jsx_runtime_1.jsx)("p", { children: "Your confirmed bookings and live progress will appear here." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => goToTab("home"), children: "Choose a service" })] }) }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "past", children: (0, jsx_runtime_1.jsxs)("div", { className: "activity-list", children: [liveDone ? (0, jsx_runtime_1.jsx)(BookingCard, {}) : null, sampleRecords.filter((record) => record.status === "Completed").map((record) => (0, jsx_runtime_1.jsx)(BookingCard, { record: record }, record.id))] }) })] })] }), renderBottomNav()] }));
    };
    const accountRows = [
        { label: "Personal Information", hint: "Name, phone and address", icon: lucide_react_1.UserRound, tone: "teal", action: () => navigate("personal") },
        { label: "Notifications", hint: unreadCount ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""}` : "Booking updates", icon: lucide_react_1.Bell, tone: "amber", action: () => openNotifications() },
    ];
    const infoRows = [
        { label: "Become a Service Provider", hint: "Coming soon · grow your work with KwicK", icon: lucide_react_1.Briefcase, tone: "rose", action: () => navigate("provider") },
        { label: "Help & Support", hint: "Answers to common questions", icon: lucide_react_1.CircleHelp, tone: "indigo", action: () => navigate("support") },
        { label: "Terms & Privacy", hint: "How the prototype handles data", icon: lucide_react_1.FileText, tone: "sky", action: () => { setLegalTab("terms"); navigate("legal"); } },
        { label: "About", hint: "Version and principles", icon: lucide_react_1.Info, tone: "green", action: () => navigate("about") },
    ];
    const renderRows = (rows) => rows.map((row) => {
        const Icon = row.icon;
        return (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": row.label, className: "tb-row", onClick: row.action, children: [(0, jsx_runtime_1.jsx)("span", { className: `tb-row-icon tone-${row.tone}`, children: (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-row-text", children: [(0, jsx_runtime_1.jsx)("b", { children: row.label }), (0, jsx_runtime_1.jsx)("small", { children: row.hint })] }), row.label === "Notifications" && unreadCount ? (0, jsx_runtime_1.jsx)("em", { className: "tb-badge", children: unreadCount }) : null, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }, row.label);
    });
    const renderProfile = () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("main", { className: "app-content tb-page profile-content", children: [renderTabHeader("Profile", "Manage your account and preferences"), (0, jsx_runtime_1.jsxs)("section", { className: "tb-profile-card", children: [(0, jsx_runtime_1.jsx)("img", { className: "tb-avatar", src: profilePhoto, alt: `${profile.name}'s profile` }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { children: profile.name }), (0, jsx_runtime_1.jsxs)("p", { children: ["+91 ", profile.phone] }), (0, jsx_runtime_1.jsxs)("p", { className: "tb-loc", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { "aria-hidden": "true" }), profile.location || "Location not set"] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "fx-link", onClick: () => navigate("personal"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, { "aria-hidden": "true" }), "Edit"] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "tb-group", "aria-label": "Account", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Account" }), (0, jsx_runtime_1.jsx)("div", { children: renderRows(accountRows) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "tb-group", "aria-label": "More", children: [(0, jsx_runtime_1.jsx)("h3", { children: "More" }), (0, jsx_runtime_1.jsx)("div", { children: renderRows(infoRows) })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "tb-logout", onClick: () => setSheet("logout"), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { "aria-hidden": "true" }), "Log Out"] }), (0, jsx_runtime_1.jsx)("p", { className: "tb-version", children: "KwicK interactive prototype \u00B7 version 1.0" })] }), renderBottomNav()] }));
    const renderQuestions = () => currentQuestion && selectedService ? ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: selectedService.shortName, onBack: backFromQuestion }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container fx-q", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-q-top", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-chip-service", children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-chip-art", children: (0, jsx_runtime_1.jsx)(ServiceVisual, { service: selectedService }) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("small", { children: selectedService.name }), (0, jsx_runtime_1.jsx)("b", { children: selectedJob })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "question-progress fx-progress", role: "progressbar", "aria-valuemin": 1, "aria-valuemax": activeQuestions.length, "aria-valuenow": questionIndex + 1, "aria-label": `Question ${questionIndex + 1} of ${activeQuestions.length}`, children: [(0, jsx_runtime_1.jsxs)("span", { children: ["Question ", questionIndex + 1, " ", (0, jsx_runtime_1.jsxs)("em", { children: ["of ", activeQuestions.length] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fx-seg", children: activeQuestions.map((question, index) => (0, jsx_runtime_1.jsx)("i", { className: index < questionIndex ? "done" : index === questionIndex ? "current" : "" }, question.id)) })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "question-panel fx-q-panel", children: [(0, jsx_runtime_1.jsx)("h1", { children: currentQuestion.prompt }), currentQuestion.helper ? (0, jsx_runtime_1.jsx)("p", { className: "fx-q-helper", children: currentQuestion.helper }) : null, (0, jsx_runtime_1.jsx)("div", { className: "answer-grid fx-answers", children: currentQuestion.options.map((option, index) => { const active = answers[currentQuestion.id] === option; return (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": active, className: active ? "selected" : "", style: { "--i": index }, onClick: () => setAnswers((items) => ({ ...items, [currentQuestion.id]: option })), children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-radio", "aria-hidden": "true", children: active ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}) : null }), (0, jsx_runtime_1.jsx)("span", { children: option })] }, option); }) }), (answers[currentQuestion.id] === "Other" || (questionIndex === 0 && ["fan-light", "cleaning"].includes(selectedService.id))) ? (0, jsx_runtime_1.jsxs)("label", { className: "other-answer fx-other", children: [(0, jsx_runtime_1.jsx)("span", { children: answers[currentQuestion.id] === "Other" ? "Tell us about the problem" : selectedService.id === "cleaning" ? "Anything specific to clean? (optional)" : selectedJob === "Installation" ? "Anything we should know about the installation? (optional)" : "Describe your fan or light problem (optional)" }), (0, jsx_runtime_1.jsx)("textarea", { value: otherResponses[currentQuestion.id] ?? "", onChange: (event) => { setOtherResponses((items) => ({ ...items, [currentQuestion.id]: event.target.value })); if (!answers[currentQuestion.id])
                                            setAnswers((items) => ({ ...items, [currentQuestion.id]: "Other" })); }, maxLength: 280, placeholder: answers[currentQuestion.id] === "Other" ? currentQuestion.otherPlaceholder : selectedService.id === "cleaning" ? "For example: stained corner, balcony door, behind the sofa" : selectedJob === "Installation" ? "For example: ceiling height, wall type, preferred position" : "Describe the fan or light issue" }), (0, jsx_runtime_1.jsxs)("small", { children: [(otherResponses[currentQuestion.id] ?? "").length, "/280"] })] }) : null, (0, jsx_runtime_1.jsxs)("p", { className: "fx-q-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), "We only ask what helps describe this request."] })] }, currentQuestion.id)] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-actionbar", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: backFromQuestion, children: "Back" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: !answers[currentQuestion.id] || (answers[currentQuestion.id] === "Other" && !otherResponses[currentQuestion.id]?.trim()), onClick: () => runTransition("Tailoring the next question", 1000, () => questionIndex < activeQuestions.length - 1 ? setQuestionIndex((value) => value + 1) : navigate("details"), `Using your ${selectedService.shortName} details`), children: ["Continue", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })] })) : null;
    const renderDetails = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Add details", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container fx-details", children: [(0, jsx_runtime_1.jsxs)("section", { className: "fx-page-head", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Add anything that would help (Optional Details)" }), (0, jsx_runtime_1.jsx)("p", { children: "Text, a voice note or a photo gives your technician useful context. All of it is optional." })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card details-main", children: [(0, jsx_runtime_1.jsxs)("label", { className: "fx-label", htmlFor: "problem-description", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, { "aria-hidden": "true" }), "Describe the problem"] }), (0, jsx_runtime_1.jsx)("textarea", { id: "problem-description", value: description, onChange: (event) => setDescription(event.target.value), maxLength: 500, placeholder: `What did you notice with your ${selectedService?.shortName.toLowerCase() ?? "service"}?` }), (0, jsx_runtime_1.jsxs)("div", { className: "field-meta", children: [(0, jsx_runtime_1.jsx)("span", { children: "Only include details you observed." }), (0, jsx_runtime_1.jsxs)("span", { children: [description.length, "/500"] })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: `voice-control ${recording ? "recording" : ""}`, onClick: toggleVoice, children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip", children: recording ? (0, jsx_runtime_1.jsx)(lucide_react_1.Square, {}) : (0, jsx_runtime_1.jsx)(lucide_react_1.Mic, {}) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: recording ? "Stop recording" : voiceUrl ? "Replace voice note" : "Add a voice note" }), (0, jsx_runtime_1.jsx)("small", { children: recording ? "Recording now…" : "Optional · used only for this request" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }), voiceUrl ? (0, jsx_runtime_1.jsxs)("div", { className: "voice-preview", children: [(0, jsx_runtime_1.jsx)("audio", { controls: true, src: voiceUrl }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { URL.revokeObjectURL(voiceUrl); setVoiceUrl(""); }, "aria-label": "Remove voice note", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {}) })] }) : null] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card media-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Photo or video" }), (0, jsx_runtime_1.jsx)("p", { children: "Show visible damage or the sound, if it is safe to do so." }), (0, jsx_runtime_1.jsxs)("div", { className: "media-actions", children: [(0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Camera, {}) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Add photo" }), (0, jsx_runtime_1.jsx)("small", { children: "Camera or gallery" })] }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: (event) => handleMedia(event, "photo") })] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {}) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Add video" }), (0, jsx_runtime_1.jsx)("small", { children: "Record or choose" })] }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "video/*", onChange: (event) => handleMedia(event, "video") })] })] }), media.map((item) => (0, jsx_runtime_1.jsxs)("div", { className: "media-preview", children: [item.kind === "photo" ? (0, jsx_runtime_1.jsx)("img", { src: item.url, alt: "Selected problem preview" }) : (0, jsx_runtime_1.jsx)("video", { src: item.url, controls: true }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: item.name }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => removeMedia(item.id), children: "Remove" })] })] }, item.id)), (0, jsx_runtime_1.jsxs)("div", { className: "safe-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, {}), (0, jsx_runtime_1.jsx)("span", { children: "Only capture the issue when it is safe. Never approach exposed wires, smoke or active hazards." })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-actionbar", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: goBack, children: "Back" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => navigate("summary"), children: ["Review problem", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })] }));
    const renderSummary = () => {
        const editAnswers = () => { setQuestionIndex(0); navigate("questions"); };
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Problem summary", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container fx-summary", children: [(0, jsx_runtime_1.jsxs)("section", { className: "fx-summary-hero", children: [selectedService ? (0, jsx_runtime_1.jsx)("span", { className: "fx-summary-art", children: (0, jsx_runtime_1.jsx)(ServiceVisual, { service: selectedService }) }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Confirm before matching" }), (0, jsx_runtime_1.jsx)("h1", { children: "Here\u2019s what you told us" }), (0, jsx_runtime_1.jsxs)("p", { children: [selectedService?.name, " \u00B7 ", selectedJob] })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "fx-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Info, { "aria-hidden": "true" }), "KwicK has not diagnosed anything. This is only what you selected and described."] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-card-head", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Your answers" }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "fx-link", onClick: editAnswers, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, { "aria-hidden": "true" }), "Edit"] })] }), (0, jsx_runtime_1.jsxs)("dl", { className: "summary-list fx-qa", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Service" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedService?.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Job" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedJob })] }), activeQuestions.map((question) => answers[question.id] ? (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: question.prompt }), (0, jsx_runtime_1.jsx)("dd", { children: answerText(question.id) })] }, question.id) : null), selectedService && ["fan-light", "cleaning"].includes(selectedService.id) && activeQuestions[0] && answers[activeQuestions[0].id] !== "Other" && otherResponses[activeQuestions[0].id]?.trim() ? (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Additional details" }), (0, jsx_runtime_1.jsx)("dd", { children: otherResponses[activeQuestions[0].id].trim() })] }) : null, description ? (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Your description" }), (0, jsx_runtime_1.jsx)("dd", { children: description })] }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Media" }), (0, jsx_runtime_1.jsx)("dd", { children: media.length ? `${media.length} file${media.length > 1 ? "s" : ""}${voiceUrl ? " + voice note" : ""}` : voiceUrl ? "1 voice note" : "None added" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-actionbar", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: editAnswers, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, {}), "Edit"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => runTransition("Finding a technician for you", 4000, () => navigate("technicians"), selectedService ? `Matching your ${selectedService.shortName} request with relevant help` : "Matching your request with relevant help"), children: ["Find Technician", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })] }));
    };
    const renderTechnicians = () => {
        const firstAnswer = activeQuestions[0] ? answerText(activeQuestions[0].id) : undefined;
        const matched = (0, kwick_data_1.matchTechnicians)(selectedService?.id, selectedJob, firstAnswer);
        const etaMinutes = (tech) => Number.parseInt(tech.eta, 10) || 99;
        const techList = [...matched].sort((a, b) => techSort === "rating" ? b.rating - a.rating || b.reviews - a.reviews
            : techSort === "price" ? a.estimate - b.estimate
                : techSort === "eta" ? etaMinutes(a) - etaMinutes(b)
                    : (a.relevance ?? 1) - (b.relevance ?? 1) || b.rating - a.rating || b.reviews - a.reviews);
        const openProfile = (tech) => { setSelectedTech(tech); navigate("technician-profile"); };
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page technician-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Choose a technician", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container technicians-container fx-techs", children: [(0, jsx_runtime_1.jsxs)("section", { className: "fx-request", children: [selectedService ? (0, jsx_runtime_1.jsx)("span", { className: "fx-chip-art", children: (0, jsx_runtime_1.jsx)(ServiceVisual, { service: selectedService }) }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("small", { children: "Your request" }), (0, jsx_runtime_1.jsxs)("b", { children: [selectedService?.name, " \u00B7 ", selectedJob] }), (0, jsx_runtime_1.jsx)("p", { className: "request-context", children: problemLine })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-techs-head", children: [(0, jsx_runtime_1.jsxs)("h1", { children: [techList.length, " pros matched"] }), (0, jsx_runtime_1.jsxs)("p", { children: [matched.filter((tech) => tech.relevance === 0).length, " specialists for ", selectedJob.toLowerCase(), " \u00B7 sample profiles"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fx-sort", role: "group", "aria-label": "Sort technicians", children: techSortOptions.map(([value, label]) => (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": techSort === value, className: techSort === value ? "active" : "", onClick: () => setTechSort(value), children: label }, value)) }), (0, jsx_runtime_1.jsx)("div", { className: "technician-grid fx-tech-list", children: techList.map((tech, index) => ((0, jsx_runtime_1.jsxs)("article", { className: "technician-card fx-tech", onClick: () => openProfile(tech), children: [techSort === "recommended" && index === 0 && tech.relevance === 0 ? (0, jsx_runtime_1.jsxs)("span", { className: "fx-best", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { "aria-hidden": "true" }), "Best match"] }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "fx-tech-top", children: [(0, jsx_runtime_1.jsx)("div", { className: "tech-photo-wrap fx-tech-photo", children: (0, jsx_runtime_1.jsx)("img", { src: tech.photo, alt: `${tech.name}, sample technician portrait` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-tech-id", children: [(0, jsx_runtime_1.jsxs)("h2", { children: [tech.name, (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { "aria-label": "Verified sample profile" })] }), (0, jsx_runtime_1.jsx)("p", { className: "specialization", children: tech.specialization }), (0, jsx_runtime_1.jsxs)("p", { className: "fx-tech-rating", children: [(0, jsx_runtime_1.jsxs)("span", { className: "fx-rate", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), tech.rating] }), (0, jsx_runtime_1.jsxs)("span", { children: [tech.reviews, " reviews"] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-tech-stats", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: tech.experience }), (0, jsx_runtime_1.jsx)("small", { children: "Experience" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: tech.jobs }), (0, jsx_runtime_1.jsx)("small", { children: "Jobs done" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: tech.area }), (0, jsx_runtime_1.jsx)("small", { children: "Based in" })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fx-skills", children: tech.skills.map((skill) => (0, jsx_runtime_1.jsx)("span", { children: skill }, skill)) }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-tech-foot", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-tech-meta", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock3, { "aria-hidden": "true" }), "Arrives in ", tech.eta] }), (0, jsx_runtime_1.jsxs)("span", { className: "fx-price", children: ["\u20B9", tech.estimate, (0, jsx_runtime_1.jsx)("small", { children: "estimate" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card-actions", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: (event) => { event.stopPropagation(); openProfile(tech); }, children: "View profile" }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: (event) => { event.stopPropagation(); setSelectedTech(tech); setSheet("booking"); }, children: "Book Technician" })] })] })] }, tech.id))) }), (0, jsx_runtime_1.jsx)("p", { className: "fx-footnote", children: "Profiles, ratings and estimates are sample prototype data. Availability is not live." })] })] }));
    };
    const renderTechnicianProfile = () => selectedTech ? ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Technician profile", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tech-profile fx-profile", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tech-profile-hero fx-pro-hero", children: [(0, jsx_runtime_1.jsx)("div", { className: "profile-photo-large fx-pro-photo", children: (0, jsx_runtime_1.jsx)("img", { src: selectedTech.photo, alt: `${selectedTech.name}, sample technician portrait` }) }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-pro-id", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: selectedTech.relevance === 0 ? "Specialist for your request" : "Related experience" }), (0, jsx_runtime_1.jsxs)("h1", { children: [selectedTech.name, (0, jsx_runtime_1.jsx)(lucide_react_1.BadgeCheck, { "aria-label": "Verified sample profile" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "profile-rating", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), selectedTech.rating, " \u00B7 ", selectedTech.reviews, " sample reviews"] }), (0, jsx_runtime_1.jsxs)("p", { className: "fx-pro-spec", children: [selectedTech.specialization, " \u00B7 ", selectedService?.name] }), (0, jsx_runtime_1.jsxs)("div", { className: "verification-row", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}), "Identity"] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}), "Experience"] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}), "Skill"] })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-pro-stats", "aria-label": "Profile highlights", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: selectedTech.experience }), (0, jsx_runtime_1.jsx)("small", { children: "Experience" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: selectedTech.jobs }), (0, jsx_runtime_1.jsx)("small", { children: "Jobs done" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsxs)("b", { children: [selectedTech.rating, (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsx)("small", { children: "Rating" })] }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: selectedTech.area }), (0, jsx_runtime_1.jsx)("small", { children: "Service area" })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Skills for this job" }), (0, jsx_runtime_1.jsx)("div", { className: "skill-list", children: selectedTech.skills.map((skill) => (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { "aria-hidden": "true" }), skill] }, skill)) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card cost-panel fx-cost", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-cost-top", children: [(0, jsx_runtime_1.jsx)("span", { children: "Estimated service cost" }), (0, jsx_runtime_1.jsxs)("strong", { children: ["\u20B9", selectedTech.estimate] })] }), (0, jsx_runtime_1.jsx)("p", { children: "Includes the initial inspection and the selected service scope. Parts or additional work are separate and need your approval." }), (0, jsx_runtime_1.jsxs)("dl", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("dt", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock3, { "aria-hidden": "true" }), "Arrival estimate"] }), (0, jsx_runtime_1.jsx)("dd", { children: selectedTech.eta })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("dt", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), "Warranty"] }), (0, jsx_runtime_1.jsx)("dd", { children: selectedTech.warranty })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card fx-reviews", children: [(0, jsx_runtime_1.jsx)("h2", { children: "What customers say" }), sampleReviews.map((item) => (0, jsx_runtime_1.jsxs)("article", { children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-avatar", children: item.name.slice(0, 1) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { className: "fx-review-head", children: [(0, jsx_runtime_1.jsx)("b", { children: item.name }), (0, jsx_runtime_1.jsxs)("span", { className: "fx-rate", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), item.rating] })] }), (0, jsx_runtime_1.jsx)("p", { children: item.text })] })] }, item.name)), (0, jsx_runtime_1.jsx)("small", { className: "fx-sample-tag", children: "Prototype review content" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-actionbar fx-pro-bar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fx-bar-price", children: [(0, jsx_runtime_1.jsx)("small", { children: "Estimate" }), (0, jsx_runtime_1.jsxs)("b", { children: ["\u20B9", selectedTech.estimate] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", "aria-label": "Call technician", onClick: () => sonner_1.toast.info("Calling is not available in this prototype."), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {}) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", "aria-label": "Message technician", onClick: () => sonner_1.toast.info("Messaging is not available in this prototype."), children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {}) }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => setSheet("booking"), children: ["Book Now", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] })] })] })) : null;
    const renderTracking = () => {
        if (!selectedTech)
            return null;
        const firstName = selectedTech.name.split(" ")[0];
        const headline = [
            ["Booking received", `We are confirming ${firstName} for your ${selectedService?.shortName ?? "service"} request.`],
            [`${firstName} confirmed your booking`, "They will head out to your address shortly."],
            [`${firstName} is on the way`, `Estimated arrival: ${selectedTech.eta}.`],
            [`${firstName} has arrived`, "Please let them in and show them the problem."],
            ["Work in progress", `${firstName} is working on your request.`],
            ["Your service is complete.", "Review the final summary and share your feedback."],
        ][statusIndex];
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page tracking-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Booking tracking", onBack: () => goToTab("activity") }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tracking-container fx-track", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tracking-hero fx-track-hero", children: [(0, jsx_runtime_1.jsx)(TrackingIllustration, { statusIndex: statusIndex }), (0, jsx_runtime_1.jsxs)("div", { className: "tracking-copy", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: statusSteps[statusIndex] }), (0, jsx_runtime_1.jsx)("h1", { children: headline[0] }), (0, jsx_runtime_1.jsx)("p", { children: headline[1] })] }), statusIndex === 2 ? (0, jsx_runtime_1.jsx)(motion_1.RouteStrip, { eta: selectedTech.eta }) : null] }), (0, jsx_runtime_1.jsxs)("section", { className: "tracking-tech fx-tech-row", children: [(0, jsx_runtime_1.jsx)("img", { src: selectedTech.photo, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: selectedTech.name }), (0, jsx_runtime_1.jsxs)("small", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), " ", selectedTech.rating, " \u00B7 ", selectedTech.specialization] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", "aria-label": "Call technician", onClick: () => sonner_1.toast.info("Calling is not available in this prototype."), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {}) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", size: "icon", "aria-label": "Message technician", onClick: () => sonner_1.toast.info("Messaging is not available in this prototype."), children: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {}) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card status-card", "aria-label": `Booking status: ${statusSteps[statusIndex]}`, children: [(0, jsx_runtime_1.jsx)("h2", { children: "Booking status" }), (0, jsx_runtime_1.jsx)("ol", { className: "fx-timeline", children: statusSteps.map((status, index) => (0, jsx_runtime_1.jsxs)("li", { className: index < statusIndex || statusIndex === statusSteps.length - 1 ? "done" : index === statusIndex ? "current" : "", "aria-current": index === statusIndex ? "step" : undefined, children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-dot", children: index < statusIndex || (index === statusIndex && statusIndex === statusSteps.length - 1) ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { "aria-hidden": "true" }) : null }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("b", { children: status }), (0, jsx_runtime_1.jsx)("small", { children: statusDetails[index] })] }), index === statusIndex && statusIndex < statusSteps.length - 1 ? (0, jsx_runtime_1.jsx)("em", { children: "Now" }) : null] }, status)) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card tracking-grid", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Service request" }), (0, jsx_runtime_1.jsxs)("dl", { className: "summary-list compact", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Service" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedService?.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Job" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedJob })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Problem" }), (0, jsx_runtime_1.jsx)("dd", { children: problemLine })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Estimated cost" }), (0, jsx_runtime_1.jsxs)("dd", { children: ["\u20B9", selectedTech.estimate] })] })] })] })] }), statusIndex === statusSteps.length - 1 ? (0, jsx_runtime_1.jsx)("div", { className: "fx-actionbar", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => navigate("completion"), children: ["Continue with payment", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }) }) : null] }));
    };
    const renderCompletion = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page completion-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Service complete", onBack: () => goToTab("activity") }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container completion-layout fx-complete", children: [(0, jsx_runtime_1.jsxs)("section", { className: "fx-complete-hero", children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-done-mark", "aria-hidden": "true", children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 52 52", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "26", cy: "26", r: "23" }), (0, jsx_runtime_1.jsx)("path", { d: "M15 27 l7 7 l15 -16" })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Completed" }), (0, jsx_runtime_1.jsx)("h1", { children: "Job done!" }), (0, jsx_runtime_1.jsxs)("p", { children: [selectedTech?.name, " completed your ", selectedService?.shortName ?? "service", " request."] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card fx-receipt", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Bill summary" }), (0, jsx_runtime_1.jsxs)("dl", { className: "summary-list", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Technician" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedTech?.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Service" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedService?.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Service estimate" }), (0, jsx_runtime_1.jsxs)("dd", { children: ["\u20B9", selectedTech?.estimate] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Payment" }), (0, jsx_runtime_1.jsx)("dd", { children: payment })] }), (0, jsx_runtime_1.jsxs)("div", { className: "total-row", children: [(0, jsx_runtime_1.jsx)("dt", { children: "Final amount" }), (0, jsx_runtime_1.jsxs)("dd", { children: ["\u20B9", finalAmount] })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card payment-panel", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Pay with" }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-pay", role: "radiogroup", "aria-label": "Payment method", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": payment === "Cash", className: payment === "Cash" ? "selected" : "", onClick: () => setPayment("Cash"), children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Banknote, {}) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "Cash" }), (0, jsx_runtime_1.jsx)("small", { children: "Pay the technician after the job" })] }), (0, jsx_runtime_1.jsx)("span", { className: "fx-radio", "aria-hidden": "true", children: payment === "Cash" ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}) : null })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": payment === "UPI", className: payment === "UPI" ? "selected" : "", onClick: () => setPayment("UPI"), children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip", children: (0, jsx_runtime_1.jsx)(lucide_react_1.QrCode, {}) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: "UPI" }), (0, jsx_runtime_1.jsx)("small", { children: "Continue in your UPI app" })] }), (0, jsx_runtime_1.jsx)("span", { className: "fx-radio", "aria-hidden": "true", children: payment === "UPI" ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}) : null })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "fx-fine", children: "Payment is simulated in this prototype. No money is collected." })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fx-actionbar", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => { sonner_1.toast.success(`Payment confirmed · ${payment}`); setSheet("rating"); }, children: ["Confirm payment & rate", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }) })] }));
    const renderBookingDetail = () => {
        const record = viewRecord;
        const tech = record?.tech ?? selectedTech ?? kwick_data_1.technicians[0];
        const detailService = record ? kwick_data_1.services.find((item) => item.id === record.serviceId) : selectedService;
        const upcoming = record?.status === "Upcoming";
        const liveDone = !record && statusIndex === statusSteps.length - 1;
        const status = record ? record.status : statusSteps[statusIndex];
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Booking details", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tb-detail booking-detail", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-detail-hero", children: [detailService ? (0, jsx_runtime_1.jsx)("span", { className: "fx-summary-art", children: (0, jsx_runtime_1.jsx)(ServiceVisual, { service: detailService }) }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: `eyebrow tb-status ${record ? (upcoming ? "upcoming" : "done") : liveDone ? "done" : "live"}`, children: record ? `${record.status} · sample record` : statusSteps[statusIndex] }), (0, jsx_runtime_1.jsx)("h1", { children: detailService?.name }), (0, jsx_runtime_1.jsx)("p", { children: record ? record.job : selectedJob })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-tech-row", children: [(0, jsx_runtime_1.jsx)("img", { src: tech.photo, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: tech.name }), (0, jsx_runtime_1.jsxs)("small", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), " ", tech.rating, " \u00B7 Sample technician profile"] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Booking summary" }), (0, jsx_runtime_1.jsxs)("dl", { className: "summary-list fx-qa", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Problem" }), (0, jsx_runtime_1.jsx)("dd", { children: record ? record.problem : problemLine })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Status" }), (0, jsx_runtime_1.jsx)("dd", { children: status })] }), record?.when ? (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Scheduled" }), (0, jsx_runtime_1.jsx)("dd", { children: record.when })] }) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: upcoming ? "Estimated cost" : "Cost" }), (0, jsx_runtime_1.jsxs)("dd", { children: ["\u20B9", record ? record.cost : finalAmount, " \u00B7 sample"] })] }), record && !upcoming ? (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Your rating" }), (0, jsx_runtime_1.jsxs)("dd", { children: [record.rating, " stars \u00B7 sample record"] })] }) : null] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fx-actionbar", children: record ? (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => { if (detailService) {
                            setSelectedService(detailService);
                            startRequest(record.job);
                        } }, children: ["Rebook", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }) : (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => liveDone ? navigate("completion") : navigate("tracking"), children: [liveDone ? "View final summary" : "Open tracking", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }) })] }));
    };
    const renderPersonal = () => {
        const saveProfile = () => {
            if (profileDraft.name.trim().length < 2 || !validMobile(profileDraft.phone))
                return sonner_1.toast.error(profileDraft.name.trim().length < 2 ? "Enter a valid name." : mobileError);
            if (!profileDraft.location?.trim())
                return sonner_1.toast.error("Enter an address or location.");
            if (profileDraft.phone !== profile.phone && !profileOtpNeeded) {
                setProfileOtpNeeded(true);
                return sonner_1.toast.info("Enter any six digits to confirm this preview change.");
            }
            if (profileDraft.phone !== profile.phone && !/^\d{6}$/.test(profileOtp))
                return sonner_1.toast.error("Enter a six-digit code.");
            const updated = { ...profileDraft, name: profileDraft.name.trim(), location: profileDraft.location.trim() };
            setProfile(updated);
            window.localStorage.setItem("kwick-profile", JSON.stringify(updated));
            setEditProfile(false);
            setProfileOtpNeeded(false);
            setProfileOtp("");
            setAddressSuggestionsOpen(false);
            sonner_1.toast.success("Personal information saved.");
        };
        const changePhoto = async (event) => {
            const input = event.target;
            const file = input.files?.[0];
            input.value = "";
            if (!file)
                return;
            const looksLikeImage = file.type.startsWith("image/") || /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp)$/i.test(file.name);
            if (!looksLikeImage)
                return sonner_1.toast.error("Choose a photo (JPG, PNG, WEBP or HEIC).");
            if (file.size > 25 * 1024 * 1024)
                return sonner_1.toast.error("Choose a photo smaller than 25 MB.");
            const toastId = sonner_1.toast.loading("Updating your photo…");
            try {
                // Decode with EXIF orientation where supported (phone photos), fall back to an <img>.
                let source;
                let width;
                let height;
                if (typeof createImageBitmap === "function") {
                    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
                    source = bitmap;
                    width = bitmap.width;
                    height = bitmap.height;
                }
                else {
                    const url = URL.createObjectURL(file);
                    const picture = await new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = url; });
                    URL.revokeObjectURL(url);
                    source = picture;
                    width = picture.naturalWidth;
                    height = picture.naturalHeight;
                }
                const canvas = document.createElement("canvas");
                canvas.width = 400;
                canvas.height = 400;
                const context = canvas.getContext("2d");
                if (!context)
                    throw new Error("no canvas");
                const side = Math.min(width, height);
                context.drawImage(source, (width - side) / 2, (height - side) / 2, side, side, 0, 0, 400, 400);
                const photo = canvas.toDataURL("image/jpeg", .86);
                setProfilePhoto(photo);
                try {
                    window.localStorage.setItem("kwick-profile-photo", photo);
                }
                catch { /* still shown for this session */ }
                sonner_1.toast.success("Profile photo updated.", { id: toastId });
            }
            catch {
                sonner_1.toast.error("This photo could not be opened. Try a JPG or PNG.", { id: toastId });
            }
        };
        const addressMatches = addressSuggestionsOpen && profileDraft.location.trim().length > 1 && profileDraft.location.trim() !== profile.location ? (0, indian_locations_1.searchIndianLocations)(profileDraft.location) : [];
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow personal-screen", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Personal Information", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tb-personal", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-identity", children: [(0, jsx_runtime_1.jsxs)("label", { className: "tb-avatar-wrap", "aria-label": "Change profile picture", children: [(0, jsx_runtime_1.jsx)("img", { className: "tb-avatar big", src: profilePhoto, alt: `${profile.name}'s profile` }), (0, jsx_runtime_1.jsx)("span", { className: "tb-avatar-cam", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Camera, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: changePhoto })] }), (0, jsx_runtime_1.jsx)("h1", { children: profile.name }), (0, jsx_runtime_1.jsxs)("p", { children: ["+91 ", profile.phone] }), !editProfile ? (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => setEditProfile(true), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, {}), "Edit Profile"] }) : null] }), editProfile ? (0, jsx_runtime_1.jsxs)("form", { className: "tb-form", onSubmit: (event) => { event.preventDefault(); saveProfile(); }, children: [(0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Contact details" }), (0, jsx_runtime_1.jsxs)("label", { className: "tb-field", children: ["Name", (0, jsx_runtime_1.jsx)("input", { autoComplete: "name", value: profileDraft.name, onChange: (event) => setProfileDraft((item) => ({ ...item, name: event.target.value })) })] }), (0, jsx_runtime_1.jsxs)("label", { className: "tb-field", children: ["Phone number", (0, jsx_runtime_1.jsxs)("span", { className: "tb-phone", children: [(0, jsx_runtime_1.jsx)("span", { children: "+91" }), (0, jsx_runtime_1.jsx)("input", { inputMode: "numeric", maxLength: 10, value: profileDraft.phone, onChange: (event) => setProfileDraft((item) => ({ ...item, phone: event.target.value.replace(/\D/g, "") })) })] })] }), profileOtpNeeded ? (0, jsx_runtime_1.jsxs)("label", { className: "tb-field", children: ["Confirm phone change", (0, jsx_runtime_1.jsx)("small", { children: "Enter any six digits for this preview." }), (0, jsx_runtime_1.jsx)("input", { inputMode: "numeric", maxLength: 6, value: profileOtp, onChange: (event) => setProfileOtp(event.target.value.replace(/\D/g, "")), placeholder: "OTP" })] }) : null] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Location / Address" }), (0, jsx_runtime_1.jsxs)("label", { className: "tb-field", htmlFor: "personal-address", children: ["Saved address", (0, jsx_runtime_1.jsxs)("span", { className: "tb-search-input", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("input", { id: "personal-address", autoComplete: "street-address", value: profileDraft.location, onChange: (event) => { setProfileDraft((item) => ({ ...item, location: event.target.value })); setAddressSuggestionsOpen(true); }, placeholder: "Search area or city" })] })] }), addressSuggestionsOpen && profileDraft.location.trim().length > 1 && profileDraft.location.trim() !== profile.location ? (0, jsx_runtime_1.jsx)("div", { className: "suggestions address-suggestions tb-suggest", children: addressMatches.length ? addressMatches.map((place) => (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => { setProfileDraft((item) => ({ ...item, location: place })); setAddressSuggestionsOpen(false); }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: place }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }, place)) : (0, jsx_runtime_1.jsx)("p", { children: "No matching place yet. Try a city or area name, such as \u201CKoramangala\u201D or \u201CPune\u201D." }) }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "tb-form-actions", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", onClick: () => { setProfileDraft(profile); setEditProfile(false); setProfileOtpNeeded(false); setProfileOtp(""); setAddressSuggestionsOpen(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", children: "Save changes" })] })] }) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-group", "aria-label": "Your information", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Your information" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "tb-row", onClick: () => setEditProfile(true), children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-row-icon tone-teal", children: (0, jsx_runtime_1.jsx)(lucide_react_1.UserRound, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-row-text", children: [(0, jsx_runtime_1.jsx)("small", { children: "Name" }), (0, jsx_runtime_1.jsx)("b", { children: profile.name })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "tb-row", onClick: () => setEditProfile(true), children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-row-icon tone-indigo", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-row-text", children: [(0, jsx_runtime_1.jsx)("small", { children: "Phone number" }), (0, jsx_runtime_1.jsxs)("b", { children: ["+91 ", profile.phone] })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "tb-row", onClick: () => setEditProfile(true), children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-row-icon tone-amber", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-row-text", children: [(0, jsx_runtime_1.jsx)("small", { children: "Location / Address" }), (0, jsx_runtime_1.jsx)("b", { children: profile.location || "Not set" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "fx-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), "Your details are stored only in this browser for the prototype."] })] })] })] }));
    };
    const renderNotifications = () => {
        const groups = [["Today", notifications.filter((item) => item.time.startsWith("Today"))], ["Earlier", notifications.filter((item) => !item.time.startsWith("Today"))]];
        return ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Notifications", onBack: goBack, action: unreadCount ? (0, jsx_runtime_1.jsx)("button", { type: "button", className: "fx-link", onClick: () => setNotifications((items) => items.map((item) => ({ ...item, unread: false }))), children: "Mark all read" }) : undefined }), (0, jsx_runtime_1.jsx)("div", { className: "flow-container tb-notifs", children: groups.map(([label, items]) => items.length ? (0, jsx_runtime_1.jsxs)("section", { className: "tb-notif-group", children: [(0, jsx_runtime_1.jsx)("h3", { children: label }), (0, jsx_runtime_1.jsx)("div", { className: "notification-list tb-notif-list", children: items.map((item) => { const Icon = notificationIcons[item.id] ?? lucide_react_1.Bell; return (0, jsx_runtime_1.jsxs)("button", { type: "button", className: item.unread ? "unread" : "", onClick: () => { setSelectedNotification(item); setNotifications((list) => list.map((notice) => notice.id === item.id ? { ...notice, unread: false } : notice)); setSheet("notification"); }, children: [(0, jsx_runtime_1.jsx)("span", { className: `tb-n-icon tone-${notificationTones[item.id] ?? "teal"}`, children: (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "tb-n-text", children: [(0, jsx_runtime_1.jsx)("strong", { children: item.title }), (0, jsx_runtime_1.jsx)("span", { children: item.message }), (0, jsx_runtime_1.jsx)("time", { children: item.time })] }), item.unread ? (0, jsx_runtime_1.jsx)("i", { className: "tb-unread", "aria-label": "Unread" }) : null] }, item.id); }) })] }, label) : null) })] }));
    };
    const renderSupport = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Help & Support", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tb-support", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-help-hero", children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-help-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CircleHelp, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", { children: "How can we help?" }), (0, jsx_runtime_1.jsx)("p", { children: "Find clear answers, one topic at a time." })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "support-accordion tb-accordion", children: Object.entries(help_content_1.supportArticles).map(([title, article], index) => { const Icon = supportIcons[index % supportIcons.length]; const open = openSupport === title; return (0, jsx_runtime_1.jsxs)("section", { className: open ? "open" : "", children: [(0, jsx_runtime_1.jsx)("h2", { children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-expanded": open, "aria-controls": `help-${index}`, onClick: () => setOpenSupport(open ? null : title), children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-row-icon tone-teal", children: (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsx)("span", { children: title }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { "aria-hidden": "true" })] }) }), (0, jsx_runtime_1.jsx)("div", { id: `help-${index}`, hidden: !open, children: (0, jsx_runtime_1.jsx)("p", { children: article }) })] }, title); }) }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card tb-contact", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Still need help?" }), (0, jsx_runtime_1.jsx)("p", { children: "Live support is not connected in this prototype. A released app would offer chat and call support here." }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", onClick: () => sonner_1.toast.info("Calling is not available in this prototype."), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {}), "Call us"] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => sonner_1.toast.info("Chat support is not available in this prototype."), children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {}), "Chat with us"] })] })] })] })] }));
    const renderProvider = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Become a Service Provider", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tb-provider", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-provider-hero", children: [(0, jsx_runtime_1.jsx)("img", { src: "provider-ac-3d.png", alt: "3D KwicK technician repairing a split AC" }), (0, jsx_runtime_1.jsx)("span", { className: "tb-soon", children: "Coming soon" }), (0, jsx_runtime_1.jsx)("h1", { children: "Grow your work with KwicK" }), (0, jsx_runtime_1.jsx)("p", { children: "A thoughtful provider experience is on the way. KwicK is not accepting provider registrations in this prototype." })] }), (0, jsx_runtime_1.jsxs)("section", { className: "fx-card", children: [(0, jsx_runtime_1.jsx)("h2", { children: "What providers will get" }), (0, jsx_runtime_1.jsx)("ul", { className: "tb-benefits", children: providerBenefits.map(([title, copy]) => (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("span", { className: "tb-row-icon tone-teal", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: title }), (0, jsx_runtime_1.jsx)("small", { children: copy })] })] }, title)) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-actionbar", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", onClick: goBack, children: "Back" }), (0, jsx_runtime_1.jsxs)(button_1.Button, { onClick: () => sonner_1.toast.info("Provider sign-ups are not open in this prototype."), children: ["Notify me", (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, {})] })] })] }));
    const renderLegal = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "Terms & Privacy", onBack: goBack }), (0, jsx_runtime_1.jsx)("div", { className: "flow-container tb-legal legal-page", children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { value: legalTab, onValueChange: setLegalTab, className: "tb-tabs", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "terms", children: "Terms" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: "privacy", children: "Privacy Policy" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "terms", children: (0, jsx_runtime_1.jsxs)("article", { className: "fx-card tb-article", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Prototype terms" }), (0, jsx_runtime_1.jsx)("h1", { children: "Terms" }), (0, jsx_runtime_1.jsx)("p", { children: "This interactive experience demonstrates KwicK\u2019s product flow. It does not create bookings, accounts, payments or service-provider relationships." }), (0, jsx_runtime_1.jsx)("h2", { children: "Service information" }), (0, jsx_runtime_1.jsx)("p", { children: "Live technician identity, verification, pricing, availability, warranty and service coverage would need to come from connected operational systems and human confirmation." }), (0, jsx_runtime_1.jsx)("h2", { children: "User confirmation" }), (0, jsx_runtime_1.jsx)("p", { children: "Users remain responsible for confirming service scope, estimates and any additional work before approval." })] }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "privacy", children: (0, jsx_runtime_1.jsxs)("article", { className: "fx-card tb-article", children: [(0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Prototype privacy" }), (0, jsx_runtime_1.jsx)("h1", { children: "Privacy Policy" }), (0, jsx_runtime_1.jsx)("p", { children: "This prototype stores only editable profile information in your browser. Uploaded media previews stay on your device and are not sent to a server." }), (0, jsx_runtime_1.jsx)("h2", { children: "Live product requirements" }), (0, jsx_runtime_1.jsx)("p", { children: "A production release would need clear consent, secure authentication, retention controls and documented data-processing practices." })] }) })] }) })] }));
    const renderAbout = () => ((0, jsx_runtime_1.jsxs)("main", { className: "flow-page fx-flow", children: [(0, jsx_runtime_1.jsx)(BackHeader, { title: "About", onBack: goBack }), (0, jsx_runtime_1.jsxs)("div", { className: "flow-container tb-about", children: [(0, jsx_runtime_1.jsxs)("section", { className: "tb-about-hero", children: [(0, jsx_runtime_1.jsx)("img", { src: "kwick-wordmark-transparent.png", alt: "KwicK" }), (0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Clear service requests. Human confirmation." }), (0, jsx_runtime_1.jsx)("h1", { children: "KwicK helps you describe home-service needs and compare relevant help clearly." }), (0, jsx_runtime_1.jsx)("p", { children: "This is an interactive product prototype for India. It demonstrates the user journey with clearly marked sample data." })] }), (0, jsx_runtime_1.jsx)("section", { className: "fx-card", children: (0, jsx_runtime_1.jsxs)("dl", { className: "summary-list fx-qa", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Version" }), (0, jsx_runtime_1.jsx)("dd", { children: "Prototype 1.0" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Payments" }), (0, jsx_runtime_1.jsx)("dd", { children: "Cash + UPI only" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Principle" }), (0, jsx_runtime_1.jsx)("dd", { children: "AI assists. Humans confirm important facts." })] })] }) })] })] }));
    const renderScreen = () => {
        if (screen === "auth")
            return renderAuth();
        if (["phone", "otp", "name", "location"].includes(screen))
            return renderOnboarding();
        if (screen === "home")
            return renderHome();
        if (screen === "explore")
            return renderExplore();
        if (screen === "activity")
            return renderActivity();
        if (screen === "profile")
            return renderProfile();
        if (screen === "questions")
            return renderQuestions();
        if (screen === "details")
            return renderDetails();
        if (screen === "summary")
            return renderSummary();
        if (screen === "technicians")
            return renderTechnicians();
        if (screen === "technician-profile")
            return renderTechnicianProfile();
        if (screen === "tracking")
            return renderTracking();
        if (screen === "completion")
            return renderCompletion();
        if (screen === "booking-detail")
            return renderBookingDetail();
        if (screen === "personal")
            return renderPersonal();
        if (screen === "notifications")
            return renderNotifications();
        if (screen === "support")
            return renderSupport();
        if (screen === "provider")
            return renderProvider();
        if (screen === "legal")
            return renderLegal();
        if (screen === "about")
            return renderAbout();
        return renderHome();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("svg", { width: "0", height: "0", "aria-hidden": "true", style: { position: "absolute", pointerEvents: "none" }, children: (0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwGround", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#0d4d47", stopOpacity: ".3" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#0d4d47", stopOpacity: "0" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwBeam", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#fff6c8", stopOpacity: ".95" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#fff6c8", stopOpacity: "0" })] }), (0, jsx_runtime_1.jsxs)("radialGradient", { id: "kwLamp", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", stopColor: "#ffd98a", stopOpacity: ".9" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", stopColor: "#ffd98a", stopOpacity: "0" })] }), (0, jsx_runtime_1.jsx)("filter", { id: "popular-teal", colorInterpolationFilters: "sRGB", children: (0, jsx_runtime_1.jsx)("feColorMatrix", { type: "matrix", values: "0.78 0.03 0.03 0 0  0.03 0.91 0.06 0 0  0.02 0.09 0.87 0 0  0 0 0 1 0" }) })] }) }), (0, jsx_runtime_1.jsx)(react_1.Fragment, { children: renderScreen() }, screen), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "job", onOpenChange: (open) => !open && setSheet(null), children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet fx-sheet job-sheet${sheetMotion}`, style: sheetStyle, children: [sheetGrabber(), (0, jsx_runtime_1.jsxs)("div", { className: "fx-sheet-service", children: [selectedService ? (0, jsx_runtime_1.jsx)("span", { className: "fx-sheet-art", children: (0, jsx_runtime_1.jsx)(ServiceVisual, { service: selectedService }) }) : null, (0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "What do you need help with?" }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetDescription, { children: [selectedService?.name, " \u00B7 choose the closest job type"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "job-options fx-jobs", children: selectedService?.jobs.map((job) => (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": job, "aria-pressed": selectedJob === job, className: selectedJob === job ? "selected" : "", onClick: () => setSelectedJob(job), children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-job-icon", children: (0, jsx_runtime_1.jsx)(JobTypeIcon, { job: job, service: selectedService }) }), (0, jsx_runtime_1.jsxs)("span", { className: "fx-job-text", children: [(0, jsx_runtime_1.jsx)("b", { children: job }), (0, jsx_runtime_1.jsx)("small", { children: jobHint(job) })] }), (0, jsx_runtime_1.jsx)("span", { className: "fx-radio", "aria-hidden": "true", children: selectedJob === job ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {}) : null })] }, job)) }), (0, jsx_runtime_1.jsx)(sheet_1.SheetFooter, { children: (0, jsx_runtime_1.jsxs)(button_1.Button, { disabled: !selectedJob, onClick: () => startRequest(selectedJob), children: ["Continue", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {})] }) })] }) }), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "booking", onOpenChange: (open) => !open && setSheet(null), children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet booking-sheet fx-sheet${sheetMotion}`, style: sheetStyle, children: [sheetGrabber(), (0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "Confirm booking" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: "Review the details before you confirm." })] }), selectedTech ? (0, jsx_runtime_1.jsxs)("div", { className: "booking-confirm fx-confirm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "confirm-tech", children: [(0, jsx_runtime_1.jsx)("img", { src: selectedTech.photo, alt: "" }), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("b", { children: selectedTech.name }), (0, jsx_runtime_1.jsxs)("small", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Star, { "aria-hidden": "true" }), " ", selectedTech.rating, " \u00B7 ", selectedTech.specialization] })] }), (0, jsx_runtime_1.jsx)("em", { children: "Sample" })] }), (0, jsx_runtime_1.jsxs)("dl", { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Service" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedService?.name })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Job" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedJob })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Problem" }), (0, jsx_runtime_1.jsx)("dd", { children: problemLine })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Arrival estimate" }), (0, jsx_runtime_1.jsx)("dd", { children: selectedTech.eta })] }), (0, jsx_runtime_1.jsxs)("div", { className: "fx-cost-row", children: [(0, jsx_runtime_1.jsx)("dt", { children: "Estimated cost" }), (0, jsx_runtime_1.jsxs)("dd", { children: ["\u20B9", selectedTech.estimate] })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "fx-fine", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { "aria-hidden": "true" }), "This estimate covers the inspection and the selected job scope."] })] }) : null, (0, jsx_runtime_1.jsxs)(sheet_1.SheetFooter, { className: "sheet-actions booking-actions", children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetClose, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", children: "Cancel" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: confirmBooking, children: "Confirm Booking" })] })] }) }), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "rating", onOpenChange: (open) => !open && setSheet(null), children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet rating-sheet fx-sheet${sheetMotion}`, style: sheetStyle, children: [sheetGrabber(), (0, jsx_runtime_1.jsxs)("div", { className: "fx-rate-head", children: [selectedTech ? (0, jsx_runtime_1.jsx)("img", { src: selectedTech.photo, alt: "" }) : null, (0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "How was your service?" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: selectedTech ? `Rate ${selectedTech.name.split(" ")[0]} · feedback is optional` : "Feedback is optional" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rating-content fx-rating", children: [(0, jsx_runtime_1.jsx)("div", { className: "star-row", "aria-label": "Choose a rating", children: [1, 2, 3, 4, 5].map((value) => (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => { setRating(value); setRatingPulse((pulse) => pulse + 1); }, "aria-label": `${value} star${value > 1 ? "s" : ""}`, "aria-pressed": rating === value, className: value <= rating ? "active" : "", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Star, { className: value === rating && ratingPulse > 0 ? "rating-pop" : "" }, value === rating ? ratingPulse : 0) }, value)) }), (0, jsx_runtime_1.jsx)("p", { className: "fx-rating-word", "aria-live": "polite", children: ["Tap a star to rate", "Poor", "Could be better", "Good", "Great", "Excellent!"][rating] }), (0, jsx_runtime_1.jsx)("div", { className: "review-tags", children: ["Clear explanation", "On time", "Careful work", "Professional", "Fair pricing"].map((tag) => (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-pressed": reviewTags.includes(tag), className: reviewTags.includes(tag) ? "selected" : "", onClick: () => setReviewTags((items) => items.includes(tag) ? items.filter((item) => item !== tag) : [...items, tag]), children: [reviewTags.includes(tag) ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, { "aria-hidden": "true" }) : null, tag] }, tag)) }), (0, jsx_runtime_1.jsx)("textarea", { value: review, onChange: (event) => setReview(event.target.value), "aria-label": "Write a review", placeholder: "Tell others about your experience (optional)", maxLength: 500 })] }), (0, jsx_runtime_1.jsx)(sheet_1.SheetFooter, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: !rating, onClick: () => runTransition("Saving your review", 2000, () => { setSheet("thanks"); sonner_1.toast.success("Review saved."); }, "Thank you for sharing your experience"), children: "Submit Review" }) })] }) }), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "thanks", onOpenChange: (open) => !open && resetToHome(), children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet thanks-sheet fx-sheet fx-thanks${sheetMotion}`, style: sheetStyle, showCloseButton: false, children: [sheetGrabber(resetToHome), (0, jsx_runtime_1.jsx)(motion_1.ThanksBadge, {}), (0, jsx_runtime_1.jsx)("p", { className: "eyebrow", children: "Thank you" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "Your feedback makes service better." }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: "Your review helps us support clearer, more thoughtful service experiences." }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: resetToHome, children: "Return Home" })] }) }), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "logout", onOpenChange: (open) => !open && setSheet(null), children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet fx-sheet logout-sheet${sheetMotion}`, style: sheetStyle, children: [sheetGrabber(), (0, jsx_runtime_1.jsxs)("div", { className: "fx-sheet-alert", children: [(0, jsx_runtime_1.jsx)("span", { className: "fx-icon-chip danger", children: (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: "Log out of KwicK?" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: "Your prototype profile stays saved on this device." })] })] }), (0, jsx_runtime_1.jsxs)(sheet_1.SheetFooter, { className: "sheet-actions", children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetClose, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", children: "Cancel" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "destructive", onClick: () => { setSheet(null); runTransition("Signing you out securely", 2000, () => { setPhone(""); setOtp(""); setNameInput(""); setLocationQuery(""); setLocationSuggestionsOpen(false); setScreen("auth"); setHistory([]); window.scrollTo({ top: 0, behavior: "smooth" }); }, "See you again soon"); }, children: "Log Out" })] })] }) }), (0, jsx_runtime_1.jsx)(sheet_1.Sheet, { open: sheet === "notification", onOpenChange: (open) => { if (!open)
                    setSheet(null); }, children: (0, jsx_runtime_1.jsxs)(sheet_1.SheetContent, { side: "bottom", className: `bottom-sheet fx-sheet notification-sheet${sheetMotion}`, style: sheetStyle, children: [sheetGrabber(), (0, jsx_runtime_1.jsxs)("div", { className: "fx-sheet-alert", children: [selectedNotification ? (() => { const Icon = notificationIcons[selectedNotification.id] ?? lucide_react_1.Bell; return (0, jsx_runtime_1.jsx)("span", { className: `tb-n-icon tone-${notificationTones[selectedNotification.id] ?? "teal"}`, children: (0, jsx_runtime_1.jsx)(Icon, { "aria-hidden": "true" }) }); })() : null, (0, jsx_runtime_1.jsxs)(sheet_1.SheetHeader, { children: [(0, jsx_runtime_1.jsx)(sheet_1.SheetTitle, { children: selectedNotification?.title }), (0, jsx_runtime_1.jsx)(sheet_1.SheetDescription, { children: selectedNotification?.time })] })] }), (0, jsx_runtime_1.jsx)("p", { className: "tb-notif-body", children: selectedNotification ? help_content_1.notificationDetails[selectedNotification.id] : "" }), (0, jsx_runtime_1.jsx)(sheet_1.SheetFooter, { children: (0, jsx_runtime_1.jsx)(sheet_1.SheetClose, { asChild: true, children: (0, jsx_runtime_1.jsx)(button_1.Button, { children: "Got it" }) }) })] }) }), transition ? (0, jsx_runtime_1.jsxs)("div", { className: "kwick-transition", role: "status", "aria-live": "polite", "aria-label": transition.message, style: { "--kwick-transition-duration": `${transition.duration}ms` }, children: [(0, jsx_runtime_1.jsx)(motion_1.LoaderScene, { kind: (0, motion_1.loaderKindFor)(transition.message), image: transition.image, count: rating || 5 }), (0, jsx_runtime_1.jsx)("strong", { children: transition.message }), (0, jsx_runtime_1.jsx)("span", { children: transition.detail ?? "Just a moment while we get things ready" }), (0, jsx_runtime_1.jsx)("div", { className: "kwick-transition-progress", children: (0, jsx_runtime_1.jsx)("b", {}) })] }) : null, (0, jsx_runtime_1.jsx)(sonner_2.Toaster, { position: "top-center" })] }));
}

};
