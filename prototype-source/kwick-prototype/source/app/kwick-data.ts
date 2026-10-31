export type Service = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  sprite: [number, number];
  jobs: string[];
  popular?: boolean;
};

export type Question = {
  id: string;
  prompt: string;
  helper?: string;
  options: string[];
  when?: (answers: Record<string, string>) => boolean;
};

export type Technician = {
  id: number;
  name: string;
  photo: string;
  rating: number;
  reviews: number;
  experience: string;
  specialization: string;
  skills: string[];
  estimate: number;
  eta: string;
  area: string;
  jobs: number;
  warranty: string;
};

export const services: Service[] = [
  { id: "ac", name: "AC Repair & Service", shortName: "AC", description: "Cooling, leaks, installation and routine care.", sprite: [0, 0], jobs: ["Installation", "Repair", "Maintenance"], popular: true },
  { id: "electrician", name: "Electrician", shortName: "Electrician", description: "Safe help for fixtures, wiring and switches.", sprite: [1, 0], jobs: ["Fan", "Light", "Wiring", "Switch/Socket", "Other"], popular: true },
  { id: "plumber", name: "Plumber", shortName: "Plumber", description: "Leaks, drainage, fittings and pipework.", sprite: [2, 0], jobs: ["Tap or Leak", "Drainage", "Pipework", "Installation"], popular: true },
  { id: "refrigerator", name: "Refrigerator Repair", shortName: "Refrigerator", description: "Cooling, power and unusual-noise issues.", sprite: [3, 0], jobs: ["Not Cooling", "Power Issue", "Water Leak", "Unusual Noise"], popular: true },
  { id: "washing", name: "Washing Machine Repair", shortName: "Washing Machine", description: "Wash, drain, spin and installation support.", sprite: [0, 1], jobs: ["Repair", "Installation", "Maintenance"], popular: true },
  { id: "geyser", name: "Geyser", shortName: "Geyser", description: "Heating, leak, power and installation support.", sprite: [1, 1], jobs: ["No Heating", "Water Leak", "Power Issue", "Installation"], popular: true },
  { id: "tv", name: "TV", shortName: "TV", description: "Display, sound, power and mounting help.", sprite: [2, 1], jobs: ["Display Issue", "Sound Issue", "Power Issue", "Installation" ] },
  { id: "chimney", name: "Chimney & Cleaning", shortName: "Chimney", description: "Cleaning, suction and installation support.", sprite: [3, 1], jobs: ["Deep Cleaning", "Low Suction", "Noise Issue", "Installation"] },
  { id: "fan-light", name: "Fan & Light", shortName: "Fan & Light", description: "Fixture repair, replacement and installation.", sprite: [0, 2], jobs: ["Fan", "Light", "Installation", "Other"] },
  { id: "cleaning", name: "Cleaning", shortName: "Cleaning", description: "Focused cleaning for key areas of your home.", sprite: [1, 2], jobs: ["Kitchen", "Bathroom", "Sofa", "Full Home"] },
  { id: "other", name: "Other Home Services", shortName: "Other Services", description: "Describe a home-service need not listed above.", sprite: [3, 2], jobs: ["Inspection", "Repair", "Installation", "Other"] },
];

export const priorityServiceIds = ["ac", "electrician", "plumber", "refrigerator", "washing"];

const areaQuestion: Question = {
  id: "area",
  prompt: "Where in your home is the issue?",
  helper: "Choose the closest match.",
  options: ["Kitchen", "Bathroom", "Bedroom", "Common area"],
};

export function getQuestions(service: Service, job: string): Question[] {
  if (service.id === "ac") {
    return job === "Installation"
      ? [
          { id: "unit", prompt: "What type of AC is being installed?", options: ["Split AC", "Window AC", "Cassette AC", "Not sure"] },
          { id: "site", prompt: "Is the installation location ready?", options: ["Yes", "Needs inspection", "Old unit to remove", "Not sure"] },
          { id: "access", prompt: "How easy is outdoor-unit access?", options: ["Balcony", "Window ledge", "Roof", "Needs inspection"] },
        ]
      : [
          { id: "issue", prompt: "What best describes the AC issue?", options: ["Not cooling", "Water leak", "Unusual noise", "Not starting"] },
          { id: "airflow", prompt: "How is the airflow?", options: ["Normal", "Weak", "No airflow", "Not sure"], when: (a) => a.issue !== "Not starting" },
          { id: "when", prompt: "When did you first notice it?", options: ["Today", "Past few days", "Past few weeks", "Longer"] },
        ];
  }

  if (service.id === "electrician" || service.id === "fan-light") {
    return [
      { id: "issue", prompt: `What is happening with the ${job.toLowerCase()}?`, options: ["Not working", "Intermittent", "Damaged", "Need installation"] },
      { id: "safety", prompt: "Is there an immediate safety concern?", helper: "If there is smoke or fire, switch off power and contact emergency services.", options: ["No", "Sparks", "Burning smell", "Exposed wire"] },
      areaQuestion,
    ];
  }

  if (service.id === "plumber") {
    return [
      { id: "issue", prompt: "What best describes the plumbing issue?", options: ["Dripping", "Active leak", "Blocked", "Low pressure"] },
      { id: "control", prompt: "Can the water be controlled?", options: ["Yes, tap is off", "Main valve is off", "Still flowing", "Not sure"], when: (a) => a.issue === "Active leak" || a.issue === "Dripping" },
      areaQuestion,
    ];
  }

  if (service.id === "cleaning") {
    return [
      { id: "scope", prompt: `What should the ${job.toLowerCase()} service cover?`, options: ["Standard clean", "Deep clean", "Stains", "Post-repair clean"] },
      { id: "size", prompt: "What is the approximate size?", options: ["Small", "Medium", "Large", "Not sure"] },
      { id: "access", prompt: "Will someone be available to provide access?", options: ["Yes", "Building staff", "Need to coordinate", "Not sure"] },
    ];
  }

  return [
    { id: "issue", prompt: `What best describes the ${service.shortName.toLowerCase()} issue?`, options: ["Not working", "Works partly", "Leak or damage", "Need installation"] },
    { id: "when", prompt: "When did you first notice it?", options: ["Today", "Past few days", "Past few weeks", "Longer"] },
    areaQuestion,
  ];
}

const photoIds = [
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1500648767791-00dcc994a43e",
  "photo-1531123897727-8f129e1688ce",
  "photo-1534528741775-53994a69daeb",
  "photo-1492562080023-ab3db95bfbce",
  "photo-1535713875002-d1d0cf377fde",
  "photo-1552058544-f2b08422138a",
  "photo-1560250097-0b93528c311a",
];

const names = [
  "Arjun Mehta", "Ravi Kumar", "Sameer Khan", "Vikram Joshi",
  "Neha Verma", "Kiran Patel", "Aman Singh", "Farhan Shaikh",
  "Priya Nair", "Deepak Yadav", "Rohit Das", "Sanjay Rao",
  "Meera Iyer", "Aditya Shah", "Nitin Pawar", "Kabir Anand",
];

export const technicians: Technician[] = names.map((name, index) => ({
  id: index + 1,
  name,
  photo: `https://images.unsplash.com/${photoIds[index % photoIds.length]}?auto=format&fit=crop&w=320&h=320&q=82`,
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

export const trustItems = [
  ["Verified Providers", "Identity, experience and skill states are shown clearly."],
  ["Problem-Specific Matching", "Your confirmed answers guide the shortlist."],
  ["Transparent Pricing", "Estimates and approved changes stay separate."],
  ["No Hidden Charges", "Additional work requires your approval."],
  ["Fast Arrival", "Arrival is shown as an estimate, never a countdown."],
  ["Warranty", "Applicable service warranty is explained before booking."],
  ["Skilled Technicians", "Profiles show relevant service skills."],
];

export const sampleNotifications = [
  { id: 1, title: "Booking Confirmed", message: "Your sample booking with Arjun Mehta has been confirmed.", time: "Today, 10:24 AM", unread: true },
  { id: 2, title: "Technician On the Way", message: "Your technician is on the way. Estimated arrival: 10–45 minutes.", time: "Today, 10:31 AM", unread: true },
  { id: 3, title: "Additional Work Approval", message: "Additional work requires your approval before proceeding.", time: "12 Sep, 4:10 PM", unread: false },
  { id: 4, title: "Service Completed", message: "Your service has been completed.", time: "02 Sep, 2:46 PM", unread: false },
  { id: 5, title: "Review Reminder", message: "Your service is complete. Share your experience with a quick review.", time: "02 Sep, 3:10 PM", unread: false },
];
