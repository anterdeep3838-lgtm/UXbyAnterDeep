// app/kwick-data.ts
__maps[156]={};
__defs[156]=function(module,exports,require){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleNotifications = exports.trustItems = exports.technicians = exports.priorityServiceIds = exports.services = void 0;
exports.getQuestions = getQuestions;
exports.matchTechnicians = matchTechnicians;
exports.technicianForService = technicianForService;
exports.services = [
    { id: "ac", name: "AC Repair & Service", shortName: "AC", description: "Cooling, leaks, installation and routine care.", sprite: [0, 0], jobs: ["Installation", "Repair", "Maintenance"], popular: true },
    { id: "electrician", name: "Electrician", shortName: "Electrician", description: "Safe help for fixtures, wiring and switches.", sprite: [1, 0], jobs: ["Power Supply", "Inverter / UPS", "Wiring", "Switch/Socket", "Other"], popular: true },
    { id: "plumber", name: "Plumber", shortName: "Plumber", description: "Leaks, drainage, fittings and pipework.", sprite: [2, 0], jobs: ["Tap or Leak", "Drainage", "Pipework", "Installation"], popular: true },
    { id: "refrigerator", name: "Refrigerator Repair", shortName: "Refrigerator", description: "Cooling, power and unusual-noise issues.", sprite: [3, 0], jobs: ["Not Cooling", "Power Issue", "Excess Frost", "Unusual Noise"], popular: true },
    { id: "washing", name: "Washing Machine Repair", shortName: "Washing Machine", description: "Wash, drain, spin and installation support.", sprite: [0, 1], jobs: ["Repair", "Installation", "Maintenance"], popular: true },
    { id: "geyser", name: "Geyser", shortName: "Geyser", description: "Heating, leak, power and installation support.", sprite: [1, 1], jobs: ["No Heating", "Water Leak", "Power Issue", "Installation"], popular: true },
    { id: "tv", name: "TV", shortName: "TV", description: "Display, sound, power and mounting help.", sprite: [2, 1], jobs: ["Display Issue", "Sound Issue", "Power Issue", "Installation"] },
    { id: "chimney", name: "Chimney", shortName: "Chimney", description: "Cleaning, suction and installation support.", sprite: [3, 1], jobs: ["Deep Cleaning", "Low Suction", "Noise Issue", "Installation"] },
    { id: "fan-light", name: "Fan & Light", shortName: "Fan & Light", description: "Fixture repair, replacement and installation.", sprite: [0, 2], jobs: ["Fan", "Light", "Installation", "Other"] },
    { id: "cleaning", name: "House Cleaning", shortName: "House Cleaning", description: "Focused cleaning for key areas of your home.", sprite: [1, 2], jobs: ["Kitchen", "Bathroom", "Sofa", "Full Home"] },
];
exports.priorityServiceIds = ["ac", "electrician", "plumber", "refrigerator", "washing"];
const plumbingArea = (prompt) => ({
    id: "area",
    prompt,
    helper: "Choose the closest match.",
    options: ["Kitchen", "Bathroom", "Utility or balcony", "Outdoors"],
});
const withOther = (questions) => questions.map((question) => ({
    ...question,
    options: [...question.options.slice(0, 4), "Other"],
    otherPlaceholder: question.otherPlaceholder ?? "Describe the closest answer in your own words",
}));
const timingQuestion = {
    id: "when",
    prompt: "When did you first notice it?",
    options: ["Today", "Past few days", "Past few weeks", "Longer"],
};
const lastServiceQuestion = (prompt = "When was it last serviced?") => ({
    id: "last-service",
    prompt,
    options: ["Under 6 months", "6–12 months", "Over a year", "Not sure"],
});
const whenIs = (id, value) => (a) => a[id] === value;
const oneOf = (id, values) => (a) => values.includes(a[id]);
const safetyQuestion = {
    id: "safety",
    prompt: "Is there an immediate safety concern?",
    helper: "If there is smoke or fire, switch off power and contact emergency services.",
    options: ["No", "Sparks", "Burning smell", "Exposed wire"],
};
function getQuestions(service, job) {
    if (service.id === "ac") {
        if (job === "Installation")
            return withOther([
                { id: "unit", prompt: "What type of AC is being installed?", options: ["Split AC", "Window AC", "Cassette AC", "Not sure"] },
                { id: "site", prompt: "What is the installation site like?", options: ["Ready for installation", "Old unit needs removal", "Needs inspection", "Not sure"] },
                { id: "access", prompt: "Where will the outdoor unit be placed?", options: ["Balcony", "Exterior wall", "Roof", "Needs inspection"], when: oneOf("unit", ["Split AC", "Cassette AC", "Not sure"]) },
            ]);
        if (job === "Maintenance")
            return withOther([
                { id: "maintenance", prompt: "What maintenance does the AC need?", options: ["Routine service", "Filter cleaning", "Coil cleaning", "Performance check"] },
                { id: "performance", prompt: "How is the AC performing now?", options: ["Working normally", "Cooling is weaker", "Airflow is weaker", "Unusual smell"] },
                lastServiceQuestion(),
            ]);
        return withOther([
            { id: "issue", prompt: "What best describes the AC issue?", options: ["Not cooling", "Water leak", "Unusual noise", "Not starting"] },
            { id: "airflow", prompt: "How is the airflow?", options: ["Normal", "Weak", "No airflow", "Not sure"], when: whenIs("issue", "Not cooling") },
            { id: "leak-location", prompt: "Where is the water leaking from?", options: ["Indoor unit", "Drain pipe", "Outdoor unit", "Not sure"], when: whenIs("issue", "Water leak") },
            { id: "noise-location", prompt: "Where does the noise come from?", options: ["Indoor unit", "Outdoor unit", "Both", "Not sure"], when: whenIs("issue", "Unusual noise") },
            { id: "start-behaviour", prompt: "What happens when you switch it on?", options: ["Nothing at all", "Lights on, no cooling", "Remote does not respond", "Trips the power"], when: whenIs("issue", "Not starting") },
            timingQuestion,
        ]);
    }
    if (service.id === "electrician") {
        if (job === "Power Supply")
            return withOther([
                { id: "issue", prompt: "What is happening with the power supply?", options: ["No power at all", "Partial outage (some rooms)", "Intermittent or fluctuating supply", "MCB or trip switch keeps tripping"] },
                { id: "scope", prompt: "Do your neighbours have power?", options: ["Yes, only my home is affected", "No, the whole area is out", "Not sure"], when: oneOf("issue", ["No power at all", "Partial outage (some rooms)", "Intermittent or fluctuating supply"]) },
                { id: "trip-when", prompt: "When does the MCB or trip switch go off?", options: ["When one appliance is used", "At random times", "Straight after resetting", "Not sure"], when: whenIs("issue", "MCB or trip switch keeps tripping") },
                safetyQuestion,
                timingQuestion,
            ]);
        if (job === "Inverter / UPS")
            return withOther([
                { id: "issue", prompt: "What do you need help with?", options: ["New installation", "Connection or wiring", "No backup during power cuts", "Battery drains too quickly"] },
                { id: "system-new", prompt: "What would you like installed?", options: ["Inverter with battery", "UPS", "Solar inverter", "Need advice"], when: whenIs("issue", "New installation") },
                { id: "load", prompt: "What should the backup power run?", options: ["Lights and fans", "Most of the home", "Whole home including AC", "Not sure"], when: whenIs("issue", "New installation") },
                { id: "system", prompt: "What kind of backup system is it?", options: ["Inverter with battery", "UPS", "Solar inverter", "Not sure"], when: (answers) => answers.issue !== "New installation" },
                { id: "age", prompt: "How old is the battery?", options: ["Under 1 year", "1–3 years", "Over 3 years", "Not sure"], when: (answers) => answers.issue !== "New installation" },
                { ...safetyQuestion, when: (answers) => answers.issue !== "New installation" },
            ]);
        const symptoms = {
            Wiring: ["What is the wiring problem?", ["Power trips often", "Loose or damaged wiring", "Power lost in one area", "New wiring needed"]],
            "Switch/Socket": ["What is happening with the switch or socket?", ["Not working", "Loose in the wall", "Cracked or damaged", "Needs replacement"]],
            Other: ["What is the electrical problem?", ["Not working", "Works intermittently", "Visible damage", "Needs replacement"]],
        };
        const [prompt, options] = symptoms[job] ?? symptoms.Other;
        const planned = (answers) => ["New wiring needed", "Needs replacement"].includes(answers.issue);
        return withOther([
            { id: "issue", prompt, options },
            { id: "extent", prompt: job === "Wiring" ? "How much wiring is needed?" : job === "Switch/Socket" ? "How many need replacing?" : "How many points need work?", options: job === "Wiring" ? ["One room", "A few rooms", "Whole home", "Not sure"] : ["1", "2–3", "4–6", "More than 6"], when: planned },
            { ...safetyQuestion, when: (answers) => !planned(answers) },
            { ...timingQuestion, when: (answers) => !planned(answers) },
        ]);
    }
    if (service.id === "plumber") {
        if (job === "Installation")
            return withOther([
                { id: "issue", prompt: "What needs to be installed?", options: ["Tap or mixer", "Sink or basin", "Toilet fitting", "Water connection"] },
                { id: "fixture", prompt: "Do you already have the fixture?", options: ["Yes, I have it", "No, I need to buy it", "Replacing an existing one", "Not sure"], when: (answers) => answers.issue !== "Water connection" },
                { id: "connection-for", prompt: "What is the connection for?", options: ["Washing machine", "Water purifier", "Geyser", "New tap point"], when: whenIs("issue", "Water connection") },
                { ...plumbingArea("Where will it be installed?"), when: (answers) => answers.issue !== "Toilet fitting" },
            ]);
        const issueOptions = job === "Drainage" ? ["Slow drainage", "Fully blocked drain", "Water backing up", "Drain odour"]
            : job === "Pipework" ? ["Leaking pipe", "Damaged pipe", "Low water pressure", "Pipe replacement"]
                : ["Dripping tap", "Active leak", "Loose fitting", "Low water pressure"];
        return withOther([
            { id: "issue", prompt: job === "Drainage" ? "What is happening with the drain?" : job === "Pipework" ? "What is the pipework problem?" : "What best describes the plumbing issue?", options: issueOptions },
            { id: "control", prompt: "Can you stop the water flow?", options: ["Yes, the tap is closed", "Yes, the main valve is closed", "No, it is still flowing", "Not sure"], when: oneOf("issue", ["Active leak", "Leaking pipe"]) },
            plumbingArea("Where is the problem?"),
        ]);
    }
    if (service.id === "refrigerator") {
        const first = {
            "Not Cooling": ["Which part is not cooling properly?", ["Whole refrigerator", "Freezer only", "Fridge section only", "Cooling varies"]],
            "Power Issue": ["What is happening with the power?", ["No power at all", "Trips the power", "Switches off by itself", "Display on but not cooling"]],
            "Excess Frost": ["Where is the frost building up?", ["Freezer wall", "Around the door", "Food compartments", "Returns after defrosting"]],
            "Unusual Noise": ["What kind of noise do you hear?", ["Buzzing", "Rattling", "Clicking", "Loud motor sound"]],
        };
        const [prompt, options] = first[job] ?? first["Not Cooling"];
        return withOther([
            { id: "symptom", prompt, options },
            { id: "door", prompt: "Does the door close and seal properly?", options: ["Yes", "Seal is loose", "Door is misaligned", "Not sure"], when: () => job === "Not Cooling" || job === "Excess Frost" },
            { id: "socket", prompt: "Does the power socket work with other appliances?", options: ["Yes, it works", "No, it does not", "I have not tested it", "Not sure"], when: (answers) => job === "Power Issue" && answers.symptom !== "Display on but not cooling" },
            { id: "noise-timing", prompt: "When do you hear it?", options: ["All the time", "When the compressor starts", "Now and then", "Not sure"], when: () => job === "Unusual Noise" },
            timingQuestion,
        ]);
    }
    if (service.id === "washing") {
        if (job === "Installation")
            return withOther([
                { id: "machine", prompt: "What type of washing machine is being installed?", options: ["Front load", "Top load", "Semi-automatic", "Not sure"] },
                { id: "connections", prompt: "Which connections are ready?", options: ["Water and drain", "Water only", "Drain only", "Needs inspection"] },
                { id: "placement", prompt: "Where will it be installed?", options: ["Utility area", "Bathroom", "Kitchen", "Balcony"] },
            ]);
        if (job === "Maintenance")
            return withOther([
                { id: "maintenance", prompt: "What maintenance does the washing machine need?", options: ["Drum cleaning", "Filter cleaning", "Hose inspection", "Performance check"] },
                { id: "condition", prompt: "How is the machine working now?", options: ["Working normally", "Works with noise", "Drains slowly", "Not sure"] },
                lastServiceQuestion(),
            ]);
        return withOther([
            { id: "issue", prompt: "What best describes the washing-machine issue?", options: ["Not starting", "Not draining", "Not spinning", "Water leak"] },
            { id: "start-behaviour", prompt: "What happens when you press start?", options: ["No power or display", "Display on, will not start", "Door will not lock", "Stops soon after starting"], when: whenIs("issue", "Not starting") },
            { id: "drain-behaviour", prompt: "What happens to the water?", options: ["Stays in the drum", "Drains very slowly", "Drain pipe makes noise", "Drain pipe leaks"], when: whenIs("issue", "Not draining") },
            { id: "spin-behaviour", prompt: "What happens during the spin cycle?", options: ["Drum does not spin", "Spins slowly", "Shakes or is very noisy", "Clothes stay very wet"], when: whenIs("issue", "Not spinning") },
            { id: "leak-location", prompt: "Where is the water leaking from?", options: ["Door or front", "Bottom of the machine", "Inlet or drain hose", "Detergent drawer"], when: whenIs("issue", "Water leak") },
            timingQuestion,
        ]);
    }
    if (service.id === "geyser") {
        if (job === "Installation")
            return withOther([
                { id: "setup", prompt: "What geyser installation do you need?", options: ["New installation", "Replace existing", "Relocate unit", "Needs inspection"] },
                { id: "type", prompt: "What type of geyser is being installed?", options: ["Storage", "Instant", "Gas", "Not sure"] },
                { id: "connections", prompt: "Are the required water and energy connections ready?", options: ["Both ready", "Water only", "Energy supply only", "Needs inspection"] },
            ]);
        const first = {
            "No Heating": ["How is the water temperature?", ["Water stays cold", "Only lukewarm", "Heats, then turns cold", "Temperature varies"]],
            "Water Leak": ["Where is the water leaking from?", ["Pipe connection", "Tank body", "Valve", "Source unclear"]],
            "Power Issue": ["What is happening with the power?", ["No indicator light", "Trips the power", "Switches off by itself", "Switch feels hot"]],
        };
        const [prompt, options] = first[job] ?? first["No Heating"];
        return withOther([
            { id: "symptom", prompt, options },
            { id: "type", prompt: "What type of geyser is it?", options: ["Storage", "Instant", "Gas", "Not sure"] },
            { id: "control", prompt: "Have you switched off the geyser and water inlet?", options: ["Yes, both are off", "Only the power is off", "Not yet", "Not sure"], when: (answers) => job === "Water Leak" || answers.symptom === "Switch feels hot" },
            timingQuestion,
        ]);
    }
    if (service.id === "tv") {
        if (job === "Installation")
            return withOther([
                { id: "setup", prompt: "What TV setup do you need?", options: ["Wall mounting", "Stand setup", "Move existing TV", "Cable setup"] },
                { id: "size", prompt: "What is the TV screen size?", options: ["Up to 32 inches", "33–43 inches", "44–55 inches", "Over 55 inches"], when: (a) => a.setup !== "Cable setup" },
                { id: "connect", prompt: "What do you want connected?", options: ["Set-top box", "Soundbar or speakers", "Gaming console", "Not sure"], when: whenIs("setup", "Cable setup") },
                { id: "mount", prompt: "Do you have a compatible wall bracket?", options: ["Yes", "No", "Existing bracket needs checking", "Not sure"], when: whenIs("setup", "Wall mounting") },
            ]);
        const first = {
            "Display Issue": ["What is wrong with the picture?", ["Black screen", "Lines or patches", "Flickering", "Picture is dim"]],
            "Sound Issue": ["What is wrong with the sound?", ["No sound", "Distorted sound", "Sound cuts out", "Volume is very low"]],
            "Power Issue": ["What is happening with the power?", ["No power or light", "Standby light only", "Restarts repeatedly", "Switches off by itself"]],
        };
        const [prompt, options] = first[job] ?? first["Display Issue"];
        return withOther([
            { id: "symptom", prompt, options },
            { id: "input", prompt: "Does the issue happen on every input or app?", options: ["Every input", "One input only", "Streaming apps only", "Not sure"], when: () => job === "Display Issue" || job === "Sound Issue" },
            { id: "socket", prompt: "Does the power socket work with other devices?", options: ["Yes, it works", "No, it does not", "I have not tested it", "Not sure"], when: () => job === "Power Issue" },
            timingQuestion,
        ]);
    }
    if (service.id === "chimney") {
        if (job === "Installation")
            return withOther([
                { id: "setup", prompt: "What chimney installation do you need?", options: ["New installation", "Replace existing", "Relocate chimney", "Needs inspection"] },
                { id: "vent", prompt: "What ventilation is planned?", options: ["Ducted outside", "Recirculating", "Needs assessment", "Not sure"] },
                { id: "site", prompt: "Is the installation space ready?", options: ["Space and power ready", "Power point needed", "Duct opening needed", "Needs inspection"] },
            ]);
        const first = {
            "Deep Cleaning": ["What needs cleaning?", ["Filters", "Interior and grease tray", "Exterior surfaces", "Complete deep clean"]],
            "Low Suction": ["How would you describe the suction?", ["Very weak", "Uneven", "Stops after a while", "Filter seems blocked"]],
            "Noise Issue": ["What kind of noise do you hear?", ["Rattling", "Grinding", "Loud motor", "Vibration"]],
        };
        const [prompt, options] = first[job] ?? first["Deep Cleaning"];
        return withOther([
            { id: "symptom", prompt, options },
            { id: "vent", prompt: "How does the chimney vent?", options: ["Ducted outside", "Recirculating", "Not sure"], when: () => job === "Low Suction" },
            { id: "noise-timing", prompt: "When do you hear it?", options: ["At startup", "At high speed", "All the time", "Now and then"], when: () => job === "Noise Issue" },
            { ...lastServiceQuestion("When was it last cleaned or serviced?"), options: ["Under 3 months", "3–6 months", "Over 6 months", "Never / not sure"], when: () => job !== "Noise Issue" },
            { ...timingQuestion, when: () => job === "Noise Issue" },
        ]);
    }
    if (service.id === "fan-light") {
        if (job === "Installation")
            return withOther([
                { id: "fixture", prompt: "What do you want installed?", options: ["Ceiling fan", "Light fixture", "Exhaust fan", "Decorative light"] },
                { id: "issue", prompt: "Is this a new fixture or a replacement?", options: ["New fixture", "Replace existing fixture", "Relocate existing fixture", "Needs inspection"] },
                { id: "ceiling", prompt: "How high is the ceiling where it will be fitted?", options: ["Standard (8–10 ft)", "High (11–14 ft)", "Double height", "Not sure"] },
            ]);
        const first = {
            Fan: ["What is happening with the fan?", ["Not starting", "Runs slowly", "Unusual noise", "Wobbles or vibrates"]],
            Light: ["What is happening with the light?", ["Not turning on", "Flickering", "Too dim", "Buzzing sound"]],
            Other: ["What is happening with the fan or light fitting?", ["Not working", "Works intermittently", "Loose fitting", "Needs replacement"]],
        };
        const [prompt, options] = first[job] ?? first.Other;
        return withOther([{ id: "issue", prompt, options }, safetyQuestion, timingQuestion]);
    }
    if (service.id === "cleaning") {
        const scopes = {
            Kitchen: ["Standard clean", "Deep clean (grease and tiles)", "Cabinets and appliances", "Post-renovation clean"],
            Bathroom: ["Standard clean", "Deep clean (tiles and fittings)", "Stain and limescale removal", "Post-renovation clean"],
            Sofa: ["General upholstery clean", "Stain removal", "Odour treatment", "Dust and pet-hair removal"],
            "Full Home": ["Standard clean", "Deep clean", "Move-in or move-out clean", "Post-renovation clean"],
        };
        const sizePrompt = job === "Sofa" ? "How many sofa seats need cleaning?" : job === "Full Home" ? "How many bedrooms does the home have?" : job === "Bathroom" ? "How many bathrooms need cleaning?" : "How big is the kitchen?";
        const sizeOptions = job === "Sofa" ? ["1–2 seats", "3–4 seats", "5–6 seats", "More than 6 seats"]
            : job === "Full Home" ? ["Studio / 1 bedroom", "2 bedrooms", "3 bedrooms", "4 or more bedrooms"]
                : job === "Bathroom" ? ["1", "2", "3", "4 or more"]
                    : ["Compact", "Standard", "Large", "Not sure"];
        return withOther([
            { id: "scope", prompt: `What should the ${job.toLowerCase()} service cover?`, options: scopes[job] ?? scopes["Full Home"] },
            { id: "size", prompt: sizePrompt, options: sizeOptions },
            { id: "access", prompt: "Will someone be available to provide access?", options: ["Yes, I will be home", "Building staff will help", "Need to coordinate", "Not sure"] },
        ]);
    }
    return withOther([
        { id: "issue", prompt: `What best describes the ${service.shortName.toLowerCase()} request?`, options: ["Not working", "Works partly", "Visible damage", "Need installation"] },
        timingQuestion,
    ]);
}
const technicianPhotos = [
    "technicians/tech-01-unbranded.png", "technicians/tech-02-unbranded.png", "technicians/tech-03-unbranded.png", "technicians/tech-04-unbranded.png",
    "technicians/tech-05-unbranded.png", "technicians/tech-06-unbranded.png", "technicians/tech-07-unbranded.png", "technicians/tech-08-unbranded.png",
    "technicians/tech-09-unbranded.png", "technicians/tech-10-unbranded.png", "technicians/tech-11-unbranded.png", "technicians/tech-12-unbranded.png",
    "technicians/tech-13-unbranded.png", "technicians/tech-14-unbranded.png", "technicians/tech-15-unbranded.png", "technicians/tech-16-unbranded.png",
];
const names = [
    "Arjun Mehta", "Ravi Kumar", "Sameer Khan", "Vikram Joshi",
    "Rajesh Verma", "Kiran Patel", "Aman Singh", "Farhan Shaikh",
    "Manoj Nair", "Deepak Yadav", "Rohit Das", "Sanjay Rao",
    "Suresh Iyer", "Aditya Shah", "Nitin Pawar", "Kabir Anand",
];
exports.technicians = names.map((name, index) => ({
    id: index + 1,
    name,
    photo: technicianPhotos[index % technicianPhotos.length],
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    reviews: 48 + index * 7,
    experience: `${3 + (index % 8)} years`,
    specialization: ["Cooling systems", "Electrical repairs", "Leak repair", "Appliance care"][index % 4],
    skills: [
        ["Inspection", "Repair", "Maintenance"],
        ["Installation", "Fault finding", "Safety checks"],
        ["Leak tracing", "Fittings", "Pipework"],
        ["Diagnostics", "Part replacement", "Maintenance"],
    ][index % 4],
    estimate: 399 + (index % 6) * 75,
    eta: [`10–20 min`, `15–30 min`, `20–35 min`, `30–45 min`][index % 4],
    area: ["Indiranagar", "Koramangala", "HSR Layout", "Whitefield"][index % 4],
    jobs: 120 + index * 19,
    warranty: index % 2 === 0 ? "30-day service warranty (sample)" : "Warranty depends on confirmed work",
}));
const serviceSpecialties = {
    ac: { specialties: ["Cooling and gas", "AC installation", "AC servicing", "Leak and drain fixes"], skills: [["Gas and cooling checks", "Repair", "Servicing"], ["Installation", "Outdoor unit fitting", "Inspection"], ["Filter and coil cleaning", "Servicing", "Performance checks"], ["Drain clearing", "Leak tracing", "Repair"]] },
    electrician: { specialties: ["Wiring and fault finding", "Switches and sockets", "Safety checks", "Fittings and replacements"], skills: [["Fault finding", "Wiring", "Safety checks"], ["Switch and socket repair", "Replacement", "Inspection"], ["Earthing checks", "Circuit protection", "Inspection"], ["Fixture fitting", "Replacement", "Repair"]] },
    plumber: { specialties: ["Leak repair", "Drainage", "Pipework", "Fixture fitting"], skills: [["Leak tracing", "Tap repair", "Fittings"], ["Drain clearing", "Blockage removal", "Inspection"], ["Pipe repair", "Pipe replacement", "Pressure checks"], ["Tap and basin fitting", "Water connections", "Replacement"]] },
    refrigerator: { specialties: ["Cooling systems", "Compressor care", "Defrost and frost issues", "Door and seal repair"], skills: [["Cooling checks", "Diagnostics", "Repair"], ["Compressor checks", "Noise diagnosis", "Part replacement"], ["Defrost system repair", "Diagnostics", "Maintenance"], ["Seal replacement", "Door alignment", "Repair"]] },
    washing: { specialties: ["Drain and pump repair", "Drum and spin repair", "Installation", "Appliance care"], skills: [["Drain pump repair", "Hose checks", "Diagnostics"], ["Drum and bearing checks", "Spin repair", "Diagnostics"], ["Installation", "Water connections", "Levelling"], ["Maintenance", "Part replacement", "Diagnostics"]] },
    geyser: { specialties: ["Heating element repair", "Leak repair", "Geyser installation", "Appliance care"], skills: [["Element and thermostat checks", "Repair", "Safety checks"], ["Valve and tank checks", "Leak tracing", "Repair"], ["Installation", "Connection checks", "Safety checks"], ["Maintenance", "Part replacement", "Diagnostics"]] },
    tv: { specialties: ["Display repair", "Audio and power faults", "Wall mounting", "Setup and cabling"], skills: [["Display diagnostics", "Panel checks", "Repair"], ["Audio checks", "Power diagnostics", "Repair"], ["Wall mounting", "Bracket fitting", "Cable tidying"], ["Setup", "Cabling", "Input checks"]] },
    chimney: { specialties: ["Deep cleaning", "Suction and motor repair", "Chimney installation", "Appliance care"], skills: [["Filter cleaning", "Grease removal", "Deep cleaning"], ["Motor checks", "Duct checks", "Repair"], ["Installation", "Duct fitting", "Inspection"], ["Maintenance", "Part replacement", "Diagnostics"]] },
    "fan-light": { specialties: ["Fan repair", "Light and fitting repair", "Fixture installation", "Electrical safety"], skills: [["Fan repair", "Capacitor replacement", "Balancing"], ["Light repair", "Holder replacement", "Inspection"], ["Fixture installation", "Replacement", "Mounting"], ["Safety checks", "Wiring checks", "Inspection"]] },
    cleaning: { specialties: ["Kitchen cleaning", "Bathroom cleaning", "Sofa and upholstery", "Full-home cleaning"], skills: [["Grease removal", "Tile cleaning", "Appliance exteriors"], ["Limescale removal", "Tile and fittings", "Disinfecting"], ["Upholstery cleaning", "Stain treatment", "Odour treatment"], ["Deep cleaning", "Dusting", "Floor care"]] },
};
/** Per service and job: [exact specialist, related, related]. */
const jobProfiles = {
    ac: {
        Installation: [["AC installation", ["Split & window AC fitting", "Outdoor unit mounting", "Gas charging"]], ["Uninstall & reinstall", ["Old unit removal", "Copper piping", "Installation"]], ["AC servicing", ["Servicing", "Performance checks", "Inspection"]]],
        Repair: [["AC repair & diagnostics", ["Cooling & gas checks", "Fault finding", "Repair"]], ["Leak and drain fixes", ["Drain clearing", "Leak tracing", "Repair"]], ["Compressor & electrical", ["Compressor checks", "PCB diagnostics", "Repair"]]],
        Maintenance: [["AC servicing", ["Filter & coil cleaning", "Jet service", "Performance checks"]], ["Cooling and gas", ["Gas pressure checks", "Coil cleaning", "Repair"]], ["AC repair & diagnostics", ["Fault finding", "Repair", "Inspection"]]],
    },
    electrician: {
        "Power Supply": [["Power supply & MCB faults", ["Supply fault finding", "MCB & RCCB checks", "Load balancing"]], ["Wiring and fault finding", ["Fault finding", "Wiring", "Safety checks"]], ["Electrical safety checks", ["Earthing checks", "Circuit protection", "Inspection"]]],
        "Inverter / UPS": [["Inverter & UPS specialist", ["Inverter installation", "Battery health checks", "Backup wiring"]], ["Power backup wiring", ["Changeover wiring", "Load planning", "Safety checks"]], ["Wiring and fault finding", ["Fault finding", "Wiring", "Safety checks"]]],
        Wiring: [["Wiring and fault finding", ["Fault finding", "Rewiring", "Safety checks"]], ["Electrical safety checks", ["Earthing checks", "Circuit protection", "Inspection"]], ["Power supply & MCB faults", ["MCB & RCCB checks", "Load balancing", "Repair"]]],
        "Switch/Socket": [["Switches and sockets", ["Switch & socket repair", "Replacement", "Inspection"]], ["Fittings and replacements", ["Fixture fitting", "Replacement", "Repair"]], ["Electrical safety checks", ["Earthing checks", "Circuit protection", "Inspection"]]],
        Other: [["General electrical repair", ["Fault finding", "Repair", "Safety checks"]], ["Wiring and fault finding", ["Wiring", "Fault finding", "Inspection"]], ["Fittings and replacements", ["Fixture fitting", "Replacement", "Repair"]]],
    },
    plumber: {
        "Tap or Leak": [["Tap & leak repair", ["Leak tracing", "Tap & washer repair", "Fittings"]], ["Pipe repair & replacement", ["Pipe repair", "Pipe replacement", "Pressure checks"]], ["Fixture fitting", ["Tap & basin fitting", "Water connections", "Sealing"]]],
        Drainage: [["Drainage & blockages", ["Drain clearing", "Blockage removal", "Odour fixes"]], ["Pipe repair & replacement", ["Pipe repair", "Pipe replacement", "Pressure checks"]], ["Tap & leak repair", ["Leak tracing", "Fittings", "Sealing"]]],
        Pipework: [["Pipe repair & replacement", ["Pipe repair", "Pipe replacement", "Pressure checks"]], ["Tap & leak repair", ["Leak tracing", "Fittings", "Sealing"]], ["Drainage & blockages", ["Drain clearing", "Blockage removal", "Inspection"]]],
        Installation: [["Fixture installation", ["Tap & basin fitting", "Water connections", "Sealing"]], ["Bathroom fittings", ["Toilet & cistern fitting", "Shower fitting", "Sealing"]], ["Pipe repair & replacement", ["Pipe extension", "Pressure checks", "Repair"]]],
    },
    refrigerator: {
        "Not Cooling": [["Fridge cooling repair", ["Cooling checks", "Gas charging", "Thermostat repair"]], ["Compressor care", ["Compressor checks", "Relay & overload", "Part replacement"]], ["Door and seal repair", ["Seal replacement", "Door alignment", "Repair"]]],
        "Power Issue": [["Fridge electrical faults", ["Power diagnostics", "PCB & relay checks", "Repair"]], ["Compressor care", ["Compressor checks", "Relay & overload", "Part replacement"]], ["Fridge cooling repair", ["Cooling checks", "Diagnostics", "Repair"]]],
        "Excess Frost": [["Defrost and frost issues", ["Defrost system repair", "Thermostat checks", "Drain clearing"]], ["Door and seal repair", ["Seal replacement", "Door alignment", "Repair"]], ["Fridge cooling repair", ["Cooling checks", "Diagnostics", "Repair"]]],
        "Unusual Noise": [["Compressor & noise repair", ["Compressor checks", "Fan motor repair", "Noise diagnosis"]], ["Fridge cooling repair", ["Cooling checks", "Diagnostics", "Repair"]], ["Appliance care", ["Maintenance", "Part replacement", "Diagnostics"]]],
    },
    washing: {
        Repair: [["Washing machine repair", ["Diagnostics", "Motor & PCB checks", "Repair"]], ["Drain and pump repair", ["Drain pump repair", "Filter clearing", "Hose checks"]], ["Drum and spin repair", ["Drum & bearing checks", "Belt & motor repair", "Balancing"]]],
        Installation: [["Washing machine installation", ["Installation", "Water connections", "Levelling"]], ["Inlet & drain connections", ["Inlet fitting", "Drain routing", "Leak checks"]], ["Appliance care", ["Maintenance", "Diagnostics", "Repair"]]],
        Maintenance: [["Washing machine servicing", ["Drum cleaning", "Filter cleaning", "Hose inspection"]], ["Drain and pump repair", ["Drain pump repair", "Filter clearing", "Hose checks"]], ["Appliance care", ["Maintenance", "Part replacement", "Diagnostics"]]],
    },
    geyser: {
        "No Heating": [["Heating element repair", ["Element & thermostat checks", "Repair", "Safety checks"]], ["Geyser electrical faults", ["Power diagnostics", "Cut-out checks", "Repair"]], ["Appliance care", ["Descaling", "Part replacement", "Diagnostics"]]],
        "Water Leak": [["Geyser leak repair", ["Valve & tank checks", "Leak tracing", "Repair"]], ["Pipes & valves", ["Pressure valve fitting", "Pipe repair", "Sealing"]], ["Appliance care", ["Descaling", "Part replacement", "Diagnostics"]]],
        "Power Issue": [["Geyser electrical faults", ["Power diagnostics", "Thermostat & cut-out checks", "Safety checks"]], ["Heating element repair", ["Element checks", "Repair", "Safety checks"]], ["Appliance care", ["Maintenance", "Part replacement", "Diagnostics"]]],
        Installation: [["Geyser installation", ["Installation", "Pipe & valve fitting", "Safety checks"]], ["Pipes & valves", ["Inlet & outlet fitting", "Pressure valve", "Sealing"]], ["Geyser electrical faults", ["Power point checks", "Earthing", "Safety checks"]]],
    },
    tv: {
        "Display Issue": [["Display repair", ["Display diagnostics", "Panel & backlight checks", "Repair"]], ["Board-level repair", ["Mainboard diagnostics", "Power board repair", "Repair"]], ["Setup and cabling", ["Input checks", "Cabling", "Settings"]]],
        "Sound Issue": [["TV audio repair", ["Speaker checks", "Audio board repair", "Soundbar setup"]], ["Board-level repair", ["Mainboard diagnostics", "Repair", "Diagnostics"]], ["Setup and cabling", ["Input checks", "Cabling", "Settings"]]],
        "Power Issue": [["TV power faults", ["Power board repair", "Diagnostics", "Repair"]], ["Board-level repair", ["Mainboard diagnostics", "Repair", "Diagnostics"]], ["Display repair", ["Backlight checks", "Diagnostics", "Repair"]]],
        Installation: [["Wall mounting", ["Wall mounting", "Bracket fitting", "Cable tidying"]], ["Setup and cabling", ["Setup", "Cabling", "Input checks"]], ["Home theatre setup", ["Soundbar setup", "Speaker placement", "Cabling"]]],
    },
    chimney: {
        "Deep Cleaning": [["Chimney deep cleaning", ["Filter cleaning", "Grease removal", "Deep cleaning"]], ["Suction and motor repair", ["Motor checks", "Duct checks", "Repair"]], ["Appliance care", ["Maintenance", "Part replacement", "Diagnostics"]]],
        "Low Suction": [["Suction and motor repair", ["Motor checks", "Duct checks", "Filter clearing"]], ["Chimney deep cleaning", ["Filter cleaning", "Grease removal", "Deep cleaning"]], ["Appliance care", ["Maintenance", "Part replacement", "Diagnostics"]]],
        "Noise Issue": [["Motor & noise repair", ["Motor checks", "Blower balancing", "Repair"]], ["Suction and motor repair", ["Duct checks", "Repair", "Diagnostics"]], ["Chimney deep cleaning", ["Filter cleaning", "Grease removal", "Deep cleaning"]]],
        Installation: [["Chimney installation", ["Installation", "Duct fitting", "Inspection"]], ["Ducting & venting", ["Duct routing", "Wall cut-outs", "Sealing"]], ["Appliance care", ["Maintenance", "Diagnostics", "Repair"]]],
    },
    "fan-light": {
        Fan: [["Fan repair", ["Fan repair", "Capacitor replacement", "Balancing"]], ["Electrical safety checks", ["Wiring checks", "Regulator repair", "Inspection"]], ["Fixture installation", ["Fan installation", "Mounting", "Replacement"]]],
        Light: [["Light and fitting repair", ["Light repair", "Holder & driver replacement", "Inspection"]], ["Electrical safety checks", ["Wiring checks", "Switch repair", "Inspection"]], ["Fixture installation", ["Light installation", "Mounting", "Replacement"]]],
        Installation: [["Fixture installation", ["Fan & light installation", "Mounting", "Wiring checks"]], ["Fan repair", ["Fan repair", "Balancing", "Capacitor replacement"]], ["Light and fitting repair", ["Light repair", "Holder replacement", "Inspection"]]],
        Other: [["Fan & light repair", ["Fault finding", "Repair", "Replacement"]], ["Electrical safety checks", ["Wiring checks", "Inspection", "Repair"]], ["Fixture installation", ["Mounting", "Replacement", "Wiring checks"]]],
    },
    cleaning: {
        Kitchen: [["Kitchen cleaning", ["Counters & tiles", "Degreasing", "Cabinets & appliances"]], ["Home deep cleaning", ["Room-by-room cleaning", "Kitchen & bathrooms", "Floor scrubbing"]], ["Post-renovation cleaning", ["Dust & debris removal", "Paint-mark removal", "Deep cleaning"]]],
        Bathroom: [["Bathroom cleaning", ["Tile & grout cleaning", "Fittings polishing", "Sanitising"]], ["Stain & limescale removal", ["Hard-water stain removal", "Descaling", "Glass & mirror care"]], ["Home deep cleaning", ["Room-by-room cleaning", "Kitchen & bathrooms", "Floor scrubbing"]]],
        Sofa: [["Sofa & upholstery cleaning", ["Shampoo & extraction", "Stain removal", "Fabric-safe care"]], ["Odour & pet-hair treatment", ["Odour treatment", "Pet-hair removal", "Sanitising"]], ["Carpet & upholstery care", ["Carpet shampoo", "Upholstery care", "Spot cleaning"]]],
        "Full Home": [["Full home cleaning", ["Room-by-room cleaning", "Kitchen & bathrooms", "Floor care"]], ["Move-in / move-out cleaning", ["Empty-home cleaning", "Cupboards & shelves", "Deep cleaning"]], ["Post-renovation cleaning", ["Dust & debris removal", "Paint-mark removal", "Deep cleaning"]]],
    },
};
/** The first answer can narrow the specialist further (keyed `job|answer` or `answer`). */
const answerProfiles = {
    ac: {
        "Repair|Not cooling": ["Cooling and gas", ["Gas pressure checks", "Coil cleaning", "Cooling repair"]],
        "Repair|Water leak": ["Leak and drain fixes", ["Drain line clearing", "Leak tracing", "Tray & pump repair"]],
        "Repair|Unusual noise": ["Noise & vibration fixes", ["Fan & motor checks", "Mount tightening", "Noise diagnosis"]],
        "Repair|Not starting": ["AC electrical faults", ["PCB & capacitor checks", "Power diagnostics", "Repair"]],
        "Installation|Old unit needs removal": ["Uninstall & reinstall", ["Old unit removal", "Copper piping", "Installation"]],
    },
    electrician: {
        "MCB or trip switch keeps tripping": ["MCB & tripping faults", ["Tripping diagnosis", "MCB & RCCB replacement", "Load checks"]],
        "Intermittent or fluctuating supply": ["Voltage & fluctuation faults", ["Voltage checks", "Loose-connection fixes", "Stabiliser advice"]],
        "Partial outage (some rooms)": ["Partial outage repair", ["Circuit tracing", "Distribution board checks", "Repair"]],
        "New installation": ["Inverter & UPS installation", ["Inverter installation", "Battery sizing", "Backup wiring"]],
        "Battery drains too quickly": ["Battery & backup diagnostics", ["Battery health checks", "Charging checks", "Battery replacement"]],
        "No backup during power cuts": ["Backup failure repair", ["Changeover checks", "Inverter diagnostics", "Battery checks"]],
        "Wiring|Power trips often": ["Tripping & wiring faults", ["Tripping diagnosis", "Wiring repair", "Load checks"]],
        "Power lost in one area": ["Circuit & wiring faults", ["Circuit tracing", "Wiring repair", "Safety checks"]],
        "New wiring needed": ["New wiring & rewiring", ["Concealed wiring", "Conduit fitting", "Load planning"]],
    },
    plumber: {
        "Tap or Leak|Low water pressure": ["Water pressure fixes", ["Pressure checks", "Aerator & line cleaning", "Pipe repair"]],
        "Pipework|Low water pressure": ["Water pressure fixes", ["Pressure checks", "Aerator & line cleaning", "Pipe repair"]],
        "Toilet fitting": ["Toilet & cistern fitting", ["Toilet fitting", "Cistern & flush repair", "Sealing"]],
        "Water connection": ["Water line connections", ["Inlet connections", "Pipe extension", "Pressure checks"]],
        "Fully blocked drain": ["Blocked drain clearing", ["Drain clearing", "Blockage removal", "Jetting"]],
    },
    washing: {
        "Not draining": ["Drain and pump repair", ["Drain pump repair", "Filter clearing", "Hose checks"]],
        "Not spinning": ["Drum and spin repair", ["Drum & bearing checks", "Belt & motor repair", "Balancing"]],
        "Repair|Water leak": ["Leak & hose repair", ["Hose replacement", "Door seal repair", "Leak tracing"]],
        "Repair|Not starting": ["Power & start faults", ["Power diagnostics", "Door-lock repair", "PCB checks"]],
    },
    tv: {
        "Cable setup": ["Setup and cabling", ["Setup", "Cabling", "Input checks"]],
        "Wall mounting": ["Wall mounting", ["Wall mounting", "Bracket fitting", "Cable tidying"]],
        "Stand setup": ["TV setup & installation", ["Stand assembly", "Setup", "Cabling"]],
        "Move existing TV": ["TV relocation", ["Dismounting & remounting", "Bracket fitting", "Cable tidying"]],
    },
    "fan-light": {
        "Fan|Wobbles or vibrates": ["Fan balancing & mounting", ["Blade balancing", "Mount tightening", "Fan repair"]],
        "Fan|Unusual noise": ["Fan noise & bearing repair", ["Bearing replacement", "Balancing", "Fan repair"]],
        "Light|Flickering": ["Flicker & driver repair", ["LED driver replacement", "Holder checks", "Wiring checks"]],
        "Exhaust fan": ["Exhaust fan installation", ["Exhaust fan fitting", "Wall cut-outs", "Wiring checks"]],
        "Decorative light": ["Decorative lighting", ["Chandelier & pendant fitting", "Mounting", "Wiring checks"]],
    },
    cleaning: {
        "Kitchen|Deep clean (grease and tiles)": ["Kitchen degreasing & deep clean", ["Degreasing", "Tile & grout cleaning", "Chimney & hob exterior"]],
        "Kitchen|Cabinets and appliances": ["Kitchen cabinets & appliances", ["Cabinet cleaning", "Appliance exteriors", "Degreasing"]],
        "Bathroom|Deep clean (tiles and fittings)": ["Bathroom deep cleaning", ["Tile & grout cleaning", "Fittings polishing", "Sanitising"]],
        "Bathroom|Stain and limescale removal": ["Bathroom stain & limescale removal", ["Limescale removal", "Hard-water stain treatment", "Tile & fittings polish"]],
        "Sofa|Stain removal": ["Sofa stain removal", ["Stain treatment", "Shampoo & extraction", "Fabric-safe care"]],
        "Sofa|Odour treatment": ["Odour & pet-hair treatment", ["Odour treatment", "Sanitising", "Shampoo & extraction"]],
        "Sofa|Dust and pet-hair removal": ["Odour & pet-hair treatment", ["Pet-hair removal", "Vacuum extraction", "Sanitising"]],
        "Full Home|Deep clean": ["Full home deep cleaning", ["Deep cleaning", "Kitchen & bathrooms", "Floor scrubbing"]],
        "Full Home|Move-in or move-out clean": ["Move-in / move-out cleaning", ["Empty-home cleaning", "Cupboards & shelves", "Deep cleaning"]],
        "Kitchen|Post-renovation clean": ["Kitchen post-renovation cleaning", ["Dust & debris removal", "Cabinet & counter cleaning", "Tile & grout cleaning"]],
        "Bathroom|Post-renovation clean": ["Bathroom post-renovation cleaning", ["Cement & paint-mark removal", "Tile & grout cleaning", "Fittings polishing"]],
        "Post-renovation clean": ["Post-renovation cleaning", ["Dust & debris removal", "Paint-mark removal", "Deep cleaning"]],
    },
};
/**
 * Shortlist technicians for the exact request: every profile reflects the chosen job,
 * and the closest specialists (relevance 0) are tuned to the user's first answer.
 */
function matchTechnicians(serviceId, job, firstAnswer) {
    const byJob = serviceId ? jobProfiles[serviceId]?.[job] : undefined;
    if (!serviceId || !byJob)
        return exports.technicians.map((tech) => ({ ...technicianForService(tech, serviceId), relevance: 1 }));
    const refined = firstAnswer ? answerProfiles[serviceId]?.[`${job}|${firstAnswer}`] ?? answerProfiles[serviceId]?.[firstAnswer] : undefined;
    const profiles = refined ? [refined, ...byJob.filter(([name]) => name !== refined[0])].slice(0, 3) : byJob;
    // A balanced shortlist: roughly half specialists, the rest with related skills.
    const order = [0, 1, 0, 2, 0, 1, 0, 2];
    return exports.technicians.map((tech, index) => {
        const relevance = order[index % order.length];
        const [specialization, skills] = profiles[Math.min(relevance, profiles.length - 1)];
        return { ...tech, specialization, skills, relevance };
    });
}
function technicianForService(technician, serviceId) {
    const entry = serviceId ? serviceSpecialties[serviceId] : undefined;
    if (!entry)
        return technician;
    const slot = (technician.id - 1) % entry.specialties.length;
    return { ...technician, specialization: entry.specialties[slot], skills: entry.skills[slot] };
}
exports.trustItems = [
    ["Verified Providers", "Identity, experience and skill states are shown clearly."],
    ["Problem-Specific Matching", "Your confirmed answers guide the shortlist."],
    ["Transparent Pricing", "Estimates and approved changes stay separate."],
    ["No Hidden Charges", "Additional work requires your approval."],
    ["Fast Arrival", "Arrival is shown as an estimate, never a countdown."],
    ["Warranty", "Applicable service warranty is explained before booking."],
    ["Skilled Technicians", "Profiles show relevant service skills."],
];
exports.sampleNotifications = [
    { id: 1, title: "Booking Confirmed", message: "Your sample booking with Arjun Mehta has been confirmed.", time: "Today, 10:24 AM", unread: true },
    { id: 2, title: "Technician On the Way", message: "Your technician is on the way. Estimated arrival: 10–45 minutes.", time: "Today, 10:31 AM", unread: true },
    { id: 3, title: "Technician Arrived", message: "Your technician has reached your address.", time: "12 Sep, 4:10 PM", unread: false },
    { id: 4, title: "Service Completed", message: "Your service has been completed.", time: "02 Sep, 2:46 PM", unread: false },
    { id: 5, title: "Review Reminder", message: "Your service is complete. Share your experience with a quick review.", time: "02 Sep, 3:10 PM", unread: false },
];

};
