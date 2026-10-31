"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Banknote, Bell, Briefcase, Camera,
  Check, ChevronRight, CircleCheck, CircleHelp, Clock3, Compass, Edit3,
  FileText, Globe2, Home as HomeIcon, ImagePlus, Info, IndianRupee,
  LogOut, MapPin, MessageCircle, Mic, Navigation, Phone, Play, QrCode,
  Search, ShieldCheck, Sparkles, Square, Star, Trash2, UserRound, Video,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter,
  SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import {
  getQuestions, priorityServiceIds, sampleNotifications, services,
  technicians, trustItems, type Service, type Technician,
} from "./kwick-data";

type Screen =
  | "auth" | "phone" | "otp" | "name" | "location"
  | "home" | "explore" | "activity" | "profile"
  | "questions" | "details" | "summary" | "technicians"
  | "technician-profile" | "tracking" | "completion" | "booking-detail"
  | "personal" | "notifications" | "support" | "provider" | "legal" | "about";

type MainTab = "home" | "explore" | "activity" | "profile";
type SheetMode = "job" | "booking" | "additional" | "rating" | "thanks" | "logout" | null;
type MediaItem = { id: string; kind: "photo" | "video"; name: string; url: string };

const mainTabs: { id: MainTab; label: string; icon: typeof HomeIcon }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "activity", label: "Activity", icon: Clock3 },
  { id: "profile", label: "Profile", icon: UserRound },
];

const statusSteps = ["Booked", "Confirmed", "On the Way", "Arrived", "In Progress", "Completed"];
const indianLocations = [
  "Indiranagar, Bengaluru", "Koramangala, Bengaluru", "HSR Layout, Bengaluru",
  "Whitefield, Bengaluru", "Andheri West, Mumbai", "Baner, Pune",
  "Saket, New Delhi", "Salt Lake, Kolkata", "Anna Nagar, Chennai",
];

const profilePhoto = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=320&h=320&q=82";

function ServiceVisual({ service, className = "" }: { service: Service; className?: string }) {
  const x = service.sprite[0] * (100 / 3);
  const y = service.sprite[1] * 50;
  return (
    <span
      className={`service-visual ${className}`}
      role="img"
      aria-label={`${service.name} service object`}
      style={{ backgroundPosition: `${x}% ${y}%` }}
    />
  );
}

function BackHeader({ title, onBack, action }: { title: string; onBack: () => void; action?: React.ReactNode }) {
  return (
    <header className="secondary-header">
      <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back"><ArrowLeft /></Button>
      <h1>{title}</h1>
      <div className="secondary-action-slot">{action}</div>
    </header>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("auth");
  const [history, setHistory] = useState<Screen[]>([]);
  const [sheet, setSheet] = useState<SheetMode>(null);
  const [profile, setProfile] = useState({ name: "Aarohi", phone: "9876543210", location: "Indiranagar, Bengaluru" });
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [recording, setRecording] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState("");
  const [selectedTech, setSelectedTech] = useState<Technician | null>(null);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [statusIndex, setStatusIndex] = useState(1);
  const [additionalApproved, setAdditionalApproved] = useState<boolean | null>(null);
  const [payment, setPayment] = useState<"Cash" | "UPI">("Cash");
  const [rating, setRating] = useState(0);
  const [reviewTags, setReviewTags] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [editProfile, setEditProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(profile);
  const [profileOtpNeeded, setProfileOtpNeeded] = useState(false);
  const [profileOtp, setProfileOtp] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recorderStreamRef = useRef<MediaStream | null>(null);
  const voiceChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem("kwick-profile");
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch { /* ignore invalid local preview data */ }
    }
  }, []);

  useEffect(() => {
    setProfileDraft(profile);
  }, [profile]);

  const navigate = (next: Screen) => {
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

  const goToTab = (tab: MainTab) => {
    setHistory([]);
    setScreen(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseService = (service: Service) => {
    setSelectedService(service);
    setSelectedJob("");
    setSheet("job");
  };

  const startRequest = (job: string) => {
    setSelectedJob(job);
    setAnswers({});
    setQuestionIndex(0);
    setDescription("");
    setMedia([]);
    setVoiceUrl("");
    setSheet(null);
    navigate("questions");
  };

  const activeQuestions = useMemo(() => {
    if (!selectedService || !selectedJob) return [];
    return getQuestions(selectedService, selectedJob).filter((question) => !question.when || question.when(answers));
  }, [selectedService, selectedJob, answers]);

  const currentQuestion = activeQuestions[Math.min(questionIndex, Math.max(0, activeQuestions.length - 1))];
  const problemLine = description.trim() || (Object.values(answers)[0] ? `${Object.values(answers)[0]} · ${Object.values(answers)[1] ?? "Details confirmed"}` : "Details confirmed by the user");
  const finalAmount = (selectedTech?.estimate ?? 0) + (additionalApproved ? 650 : 0);

  const handleMedia = (event: React.ChangeEvent<HTMLInputElement>, kind: "photo" | "video") => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMedia((items) => [...items.filter((item) => item.kind !== kind), { id: `${kind}-${Date.now()}`, kind, name: file.name, url }]);
    event.target.value = "";
  };

  const removeMedia = (id: string) => {
    setMedia((items) => {
      const target = items.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.url);
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
      toast.error("Voice recording is not supported in this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderStreamRef.current = stream;
      voiceChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => { if (event.data.size) voiceChunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(voiceChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        if (voiceUrl) URL.revokeObjectURL(voiceUrl);
        setVoiceUrl(URL.createObjectURL(blob));
        recorderStreamRef.current?.getTracks().forEach((track) => track.stop());
        toast.success("Voice note added.");
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      toast.error("Microphone access was not granted.");
    }
  };

  const confirmBooking = () => {
    setBookingCreated(true);
    setStatusIndex(1);
    setSheet(null);
    setScreen("tracking");
    setHistory(["home", "activity"]);
    toast.success("Prototype booking confirmed.");
  };

  const resetToHome = () => {
    setSheet(null);
    setScreen("home");
    setHistory([]);
    setSelectedService(null);
    setSelectedJob("");
    setAnswers({});
    setDescription("");
    setMedia([]);
    setRating(0);
    setReview("");
    setReviewTags([]);
  };

  const renderAuth = () => (
    <main className="auth-shell">
      <section className="auth-visual" aria-label="KwicK welcome">
        <img className="auth-wordmark" src="/kwick-wordmark.png" alt="KwicK" />
        <div className="auth-visual-copy">
          <p className="eyebrow">Home help, thoughtfully matched</p>
          <h1>Reliable service starts with a clear problem.</h1>
          <p>Tell us what is happening. KwicK keeps the request focused and lets you confirm every important detail.</p>
        </div>
        <img className="auth-person" src="/editorial-human.png" alt="A homeowner holding a phone beside a home-service toolbox" />
        <div className="trust-note"><ShieldCheck aria-hidden="true" /><span>AI assists. You confirm the important facts.</span></div>
      </section>
      <section className="auth-panel">
        <div className="auth-card">
          <div className="mobile-brand"><img src="/kwick-wordmark.png" alt="KwicK" /></div>
          <div className="auth-heading">
            <p className="eyebrow">Welcome to KwicK</p>
            <h2>Let’s get your home sorted.</h2>
            <p>Sign in or create an account to continue.</p>
          </div>
          <div className="auth-actions">
            <Button className="primary-action" size="lg" onClick={() => navigate("phone")}>
              <Phone aria-hidden="true" />Continue with Phone<ArrowRight aria-hidden="true" />
            </Button>
            <Button className="secondary-action" variant="outline" size="lg" onClick={() => toast.info("Connect Google authentication before using this option.")}>
              <Globe2 aria-hidden="true" />Continue with Google
            </Button>
          </div>
          <button className="prototype-link" type="button" onClick={() => { setProfile({ name: "Aarohi", phone: "9876543210", location: "Indiranagar, Bengaluru" }); setScreen("home"); setHistory([]); }}>
            Open interactive prototype
          </button>
          <div className="location-preview"><MapPin aria-hidden="true" /><div><strong>India-ready location setup</strong><span>Search only when you’re ready to choose your area.</span></div></div>
          <p className="legal-copy">By continuing, you agree to KwicK’s <button type="button" onClick={() => navigate("legal")}>Terms</button> and <button type="button" onClick={() => navigate("legal")}>Privacy Policy</button>.</p>
        </div>
      </section>
    </main>
  );

  const renderOnboarding = () => {
    const copy = {
      phone: ["Continue with phone", "Enter your 10-digit Indian mobile number."],
      otp: ["Enter the code", "Prototype only: no SMS is sent. Use 123456."],
      name: ["What should we call you?", "This keeps your bookings personal."],
      location: ["Choose your location", "Search for your area or use your current location."],
    }[screen as "phone" | "otp" | "name" | "location"];
    const suggestions = locationQuery.trim().length > 1
      ? indianLocations.filter((item) => item.toLowerCase().includes(locationQuery.toLowerCase())).slice(0, 5)
      : [];
    return (
      <main className="onboarding-shell">
        <section className="onboarding-card">
          <img className="onboarding-logo" src="/kwick-wordmark.png" alt="KwicK" />
          <button className="back-link" type="button" onClick={goBack}><ArrowLeft /> Back</button>
          <p className="step-label">Account setup</p>
          <h1>{copy[0]}</h1>
          <p className="screen-subtitle">{copy[1]}</p>

          {screen === "phone" ? (
            <form onSubmit={(event) => { event.preventDefault(); if (phone.length !== 10) return toast.error("Enter a valid 10-digit phone number."); navigate("otp"); }} className="stack-form">
              <label htmlFor="phone">Phone number</label>
              <div className="phone-field"><span>+91</span><input id="phone" inputMode="numeric" autoComplete="tel" value={phone} maxLength={10} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ""))} placeholder="98765 43210" /></div>
              <Button type="submit" className="full-button">Continue<ArrowRight /></Button>
            </form>
          ) : null}

          {screen === "otp" ? (
            <form onSubmit={(event) => { event.preventDefault(); if (otp !== "123456") return toast.error("For this prototype, enter 123456."); navigate("name"); }} className="stack-form">
              <label htmlFor="otp">6-digit code</label>
              <input id="otp" className="text-field otp-field" inputMode="numeric" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} placeholder="123456" />
              <button type="button" className="text-action" onClick={() => toast.info("No SMS is sent in this prototype. Use 123456.")}>Resend code</button>
              <Button type="submit" className="full-button">Verify prototype code<ArrowRight /></Button>
            </form>
          ) : null}

          {screen === "name" ? (
            <form onSubmit={(event) => { event.preventDefault(); if (nameInput.trim().length < 2) return toast.error("Enter your name."); setProfile((item) => ({ ...item, name: nameInput.trim(), phone, location: "" })); navigate("location"); }} className="stack-form">
              <label htmlFor="name">Name</label>
              <input id="name" className="text-field" autoComplete="name" value={nameInput} onChange={(event) => setNameInput(event.target.value)} placeholder="Your name" />
              <Button type="submit" className="full-button">Continue<ArrowRight /></Button>
            </form>
          ) : null}

          {screen === "location" ? (
            <div className="stack-form">
              <label htmlFor="location-search">Search area or city</label>
              <div className="search-field"><Search /><input id="location-search" value={locationQuery} onChange={(event) => setLocationQuery(event.target.value)} placeholder="Start typing a location" /></div>
              {suggestions.length ? <div className="suggestions" role="listbox" aria-label="Location suggestions">{suggestions.map((item) => <button type="button" key={item} onClick={() => { setLocationQuery(item); setProfile((value) => ({ ...value, location: item })); }}>{item}<ChevronRight /></button>)}</div> : null}
              <Button variant="outline" className="current-location" onClick={() => {
                if (!navigator.geolocation) return toast.error("Current location is not supported in this browser.");
                navigator.geolocation.getCurrentPosition(() => { setLocationQuery("Current location"); setProfile((value) => ({ ...value, location: "Current location" })); toast.success("Current location selected."); }, () => toast.error("Location access was not granted."));
              }}><Navigation />Use current location</Button>
              <Button className="full-button" disabled={!profile.location} onClick={() => { window.localStorage.setItem("kwick-profile", JSON.stringify(profile)); setScreen("home"); setHistory([]); }}>Finish setup<ArrowRight /></Button>
            </div>
          ) : null}
          <p className="prototype-note"><Info /> Prototype authentication only. No account or SMS is created.</p>
        </section>
      </main>
    );
  };

  const renderAppHeader = () => (
    <header className="app-header">
      <div className="header-brand"><img src="/kwick-wordmark.png" alt="KwicK" /></div>
      <div className="header-greeting"><span>Good evening, {profile.name}</span><button type="button" onClick={() => navigate("location")}><MapPin />{profile.location}<ChevronRight /></button></div>
      <Button variant="ghost" size="icon" className="notification-button" aria-label="Open notifications" onClick={() => navigate("notifications")}>
        <Bell />{notifications.some((item) => item.unread) ? <span /> : null}
      </Button>
    </header>
  );

  const renderBottomNav = () => (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {mainTabs.map((item) => {
        const Icon = item.icon;
        const active = screen === item.id;
        return <button key={item.id} type="button" className={active ? "active" : ""} aria-current={active ? "page" : undefined} onClick={() => goToTab(item.id)}><Icon /><span>{item.label}</span></button>;
      })}
    </nav>
  );

  const renderHome = () => {
    const priority = priorityServiceIds.map((id) => services.find((service) => service.id === id)!).filter(Boolean);
    const popular = services.filter((service) => service.popular).slice(0, 6);
    return (
      <>
        {renderAppHeader()}
        <main className="app-content home-content">
          <section className="home-intro"><div><p className="eyebrow">Trusted help for your home</p><h1>What needs attention today?</h1></div><p>No search. Choose a focused service to begin.</p></section>
          <section aria-labelledby="priority-title">
            <div className="section-heading"><div><p>Start here</p><h2 id="priority-title">Priority services</h2></div><span>Swipe to explore</span></div>
            <div className="priority-carousel">
              {priority.map((service, index) => (
                <button type="button" key={service.id} className="priority-card" onClick={() => chooseService(service)}>
                  <div className="priority-number">0{index + 1}</div><ServiceVisual service={service} />
                  <div className="priority-copy"><h3>{service.name}</h3><p>{service.description}</p><span>Choose service <ArrowRight /></span></div>
                </button>
              ))}
            </div>
          </section>
          <section aria-labelledby="popular-title" className="popular-section">
            <div className="section-heading"><div><p>Frequently requested</p><h2 id="popular-title">Popular services</h2></div><button type="button" onClick={() => goToTab("explore")}>View All <ArrowRight /></button></div>
            <div className="popular-grid">{popular.map((service) => <button type="button" key={service.id} className="popular-tile" onClick={() => chooseService(service)}><ServiceVisual service={service} /><span>{service.shortName}</span><ChevronRight /></button>)}</div>
          </section>
          <section aria-labelledby="trust-title" className="trust-section">
            <div className="section-heading"><div><p>Clear at every step</p><h2 id="trust-title">Why people choose KwicK</h2></div></div>
            <div className="trust-carousel">{trustItems.map(([title, copy], index) => <article key={title} className="trust-card"><span>{String(index + 1).padStart(2, "0")}</span><ShieldCheck /><h3>{title}</h3><p>{copy}</p></article>)}</div>
          </section>
        </main>
        {renderBottomNav()}
      </>
    );
  };

  const renderExplore = () => (
    <>
      {renderAppHeader()}
      <main className="app-content explore-content">
        <section className="catalogue-heading"><p className="eyebrow">Complete catalogue</p><h1>Explore home services</h1><p>Choose the closest service. You’ll confirm the exact job next.</p></section>
        <section className="masonry-grid" aria-label="Service catalogue">
          {services.map((service, index) => <button type="button" key={service.id} className={`masonry-card size-${index % 4}`} onClick={() => chooseService(service)}><ServiceVisual service={service} /><div><span>{String(index + 1).padStart(2, "0")}</span><h2>{service.name}</h2><p>{service.description}</p><b>Choose <ArrowRight /></b></div></button>)}
        </section>
      </main>
      {renderBottomNav()}
    </>
  );

  const BookingCard = ({ past = false, upcoming = false }: { past?: boolean; upcoming?: boolean }) => {
    const tech = selectedTech ?? technicians[0];
    return (
      <button type="button" className={`booking-card ${!past && !upcoming ? "booking-active" : ""}`} onClick={() => navigate("booking-detail")}>
        <img src={tech.photo} alt="Sample technician portrait" />
        <div className="booking-card-copy"><span>{past ? "Completed" : upcoming ? "Upcoming · prototype" : statusSteps[statusIndex]}</span><h3>{selectedService?.name ?? "AC Repair & Service"}</h3><p>{past ? "Cooling issue resolved · sample record" : upcoming ? "Maintenance visit · sample record" : problemLine}</p><div><b>{tech.name}</b><i>{past ? "₹649 · Sample" : upcoming ? "Tomorrow, 10:00 AM" : tech.eta}</i></div></div>
        <ChevronRight />
      </button>
    );
  };

  const renderActivity = () => (
    <>
      {renderAppHeader()}
      <main className="app-content activity-content">
        <div className="catalogue-heading"><p className="eyebrow">Every booking in one place</p><h1>Activity</h1></div>
        <Tabs defaultValue="active" className="activity-tabs">
          <TabsList><TabsTrigger value="active">Active</TabsTrigger><TabsTrigger value="upcoming">Upcoming</TabsTrigger><TabsTrigger value="past">Past</TabsTrigger></TabsList>
          <TabsContent value="active"><div className="activity-list">{bookingCreated ? <BookingCard /> : <div className="activity-empty"><img src="/editorial-human.png" alt="Homeowner ready to request a service" /><h2>No active bookings</h2><p>Your confirmed bookings and service progress will appear here.</p><Button onClick={() => goToTab("home")}>Choose a service</Button></div>}</div></TabsContent>
          <TabsContent value="upcoming"><div className="activity-list"><BookingCard upcoming /></div></TabsContent>
          <TabsContent value="past"><div className="activity-list"><BookingCard past /><BookingCard past /></div></TabsContent>
        </Tabs>
      </main>
      {renderBottomNav()}
    </>
  );

  const profileItems = [
    ["Personal Information", UserRound, "personal"], ["Notifications", Bell, "notifications"],
    ["Help & Support", CircleHelp, "support"], ["Become a Service Provider", Briefcase, "provider"],
    ["Terms & Privacy", FileText, "legal"], ["About", Info, "about"], ["Log Out", LogOut, "logout"],
  ] as const;

  const renderProfile = () => (
    <>
      {renderAppHeader()}
      <main className="app-content profile-content">
        <div className="profile-hero"><img src={profilePhoto} alt={`${profile.name}'s profile`} /><div><p className="eyebrow">Your account</p><h1>{profile.name}</h1><span>+91 {profile.phone}</span></div></div>
        <div className="profile-menu">{profileItems.map(([label, Icon, target]) => <button type="button" key={label} onClick={() => target === "logout" ? setSheet("logout") : navigate(target)}><span><Icon /><b>{label}</b></span><ChevronRight /></button>)}</div>
      </main>
      {renderBottomNav()}
    </>
  );

  const renderQuestions = () => currentQuestion && selectedService ? (
    <main className="flow-page">
      <BackHeader title={selectedService.shortName} onBack={goBack} />
      <div className="flow-container question-layout">
        <aside className="flow-context"><ServiceVisual service={selectedService} /><p>{selectedService.name}</p><h2>{selectedJob}</h2><span>We only ask what helps describe this request.</span></aside>
        <section className="question-panel">
          <div className="question-progress"><span>Question {questionIndex + 1} of {activeQuestions.length}</span><div><i style={{ width: `${((questionIndex + 1) / activeQuestions.length) * 100}%` }} /></div></div>
          <p className="eyebrow">A clearer request gets a better match</p><h1>{currentQuestion.prompt}</h1>{currentQuestion.helper ? <p className="screen-subtitle">{currentQuestion.helper}</p> : null}
          <div className="answer-grid">{currentQuestion.options.map((option) => { const active = answers[currentQuestion.id] === option; return <button type="button" className={active ? "selected" : ""} key={option} onClick={() => setAnswers((items) => ({ ...items, [currentQuestion.id]: option }))}><span>{option}</span>{active ? <CircleCheck /> : <span className="choice-circle" />}</button>; })}</div>
          <div className="flow-actions"><Button variant="outline" onClick={goBack}>Back</Button><Button disabled={!answers[currentQuestion.id]} onClick={() => questionIndex < activeQuestions.length - 1 ? setQuestionIndex((value) => value + 1) : navigate("details")}>Continue<ArrowRight /></Button></div>
        </section>
      </div>
    </main>
  ) : null;

  const renderDetails = () => (
    <main className="flow-page">
      <BackHeader title="Add details" onBack={goBack} />
      <div className="flow-container details-layout">
        <section className="details-main"><p className="eyebrow">Optional details</p><h1>Add anything that would help.</h1><p className="screen-subtitle">Text, voice and media help with context. None of them are required.</p>
          <label className="field-label" htmlFor="problem-description">Describe the problem</label>
          <textarea id="problem-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={500} placeholder="For example: the AC cools for a few minutes, then starts blowing warm air…" />
          <div className="field-meta"><span>Only include details you observed.</span><span>{description.length}/500</span></div>
          <button type="button" className={`voice-control ${recording ? "recording" : ""}`} onClick={toggleVoice}>{recording ? <Square /> : <Mic />}<span><b>{recording ? "Stop recording" : voiceUrl ? "Replace voice note" : "Add voice note"}</b><small>{recording ? "Recording now" : "Optional · processed only for this request"}</small></span></button>
          {voiceUrl ? <div className="voice-preview"><audio controls src={voiceUrl} /><button type="button" onClick={() => { URL.revokeObjectURL(voiceUrl); setVoiceUrl(""); }} aria-label="Remove voice note"><Trash2 /></button></div> : null}
        </section>
        <aside className="media-panel"><h2>Photo or video</h2><p>Show visible damage or sound if it’s safe to do so.</p><div className="media-actions"><label><Camera /><span><b>Add photo</b><small>Camera or gallery</small></span><input type="file" accept="image/*" onChange={(event) => handleMedia(event, "photo")} /></label><label><Video /><span><b>Add video</b><small>Record or choose</small></span><input type="file" accept="video/*" onChange={(event) => handleMedia(event, "video")} /></label></div>
          {media.map((item) => <div className="media-preview" key={item.id}>{item.kind === "photo" ? <img src={item.url} alt="Selected problem preview" /> : <video src={item.url} controls />}<div><span>{item.name}</span><button type="button" onClick={() => removeMedia(item.id)}>Remove</button></div></div>)}
          <div className="safe-note"><ShieldCheck /><span>Only capture the issue when it is safe. Never approach exposed wires, smoke or active hazards.</span></div>
        </aside>
      </div>
      <div className="sticky-flow-actions"><Button variant="outline" onClick={goBack}>Back</Button><Button onClick={() => navigate("summary")}>Review problem<ArrowRight /></Button></div>
    </main>
  );

  const renderSummary = () => (
    <main className="flow-page">
      <BackHeader title="Problem summary" onBack={goBack} />
      <div className="flow-container summary-layout"><section><p className="eyebrow">Confirm before matching</p><h1>Here’s what you told us.</h1><p className="screen-subtitle">KwicK has not diagnosed the problem. This summary contains only your selections and description.</p>
        <dl className="summary-list"><div><dt>Service</dt><dd>{selectedService?.name}</dd></div><div><dt>Job</dt><dd>{selectedJob}</dd></div>{activeQuestions.map((question) => answers[question.id] ? <div key={question.id}><dt>{question.prompt}</dt><dd>{answers[question.id]}</dd></div> : null)}{description ? <div><dt>Your description</dt><dd>{description}</dd></div> : null}<div><dt>Media</dt><dd>{media.length ? `${media.length} file${media.length > 1 ? "s" : ""}${voiceUrl ? " + voice note" : ""}` : voiceUrl ? "1 voice note" : "None added"}</dd></div></dl>
        <div className="summary-actions"><Button variant="outline" onClick={() => { setQuestionIndex(0); navigate("questions"); }}><Edit3 />Edit answers</Button><Button onClick={() => navigate("technicians")}>Find technicians<ArrowRight /></Button></div></section>
        {selectedService ? <aside className="summary-object"><ServiceVisual service={selectedService} /><span>{selectedService.name}</span><b>{selectedJob}</b></aside> : null}</div>
    </main>
  );

  const renderTechnicians = () => (
    <main className="flow-page technician-page">
      <BackHeader title="Technicians" onBack={goBack} action={<span className="result-count">16 matches</span>} />
      <div className="flow-container technicians-container"><div className="catalogue-heading"><p className="eyebrow">Matched to your confirmed request</p><h1>Choose who feels right.</h1><p>Compare sample profiles without fake live availability or urgency.</p></div>
        <div className="prototype-banner"><Info /><span><b>Interactive prototype data</b> Portraits are real stock photography. Names, reviews, verification states, ETAs and estimates are sample UI data—not live claims.</span></div>
        <div className="technician-grid">{technicians.map((tech) => <article className="technician-card" key={tech.id}><div className="tech-photo-wrap"><img src={tech.photo} alt="Stock portrait used for a sample technician profile" /><span>Sample profile</span></div><div className="tech-main"><div className="tech-title"><div><h2>{tech.name}</h2><p><Star />{tech.rating} <span>({tech.reviews} sample reviews)</span></p></div><BadgeCheck /></div><p className="specialization">Recommended for {selectedService?.shortName} · {tech.specialization}</p><div className="skill-list">{tech.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div><dl className="tech-facts"><div><dt>Experience</dt><dd>{tech.experience} · sample</dd></div><div><dt>Area</dt><dd>{tech.area}</dd></div><div><dt>Arrival estimate</dt><dd>{tech.eta}</dd></div><div><dt>Price estimate</dt><dd>₹{tech.estimate}</dd></div></dl><div className="verification-row"><span><Check />Identity</span><span><Check />Experience</span><span><Check />Skill</span></div><div className="card-actions"><Button variant="outline" onClick={() => { setSelectedTech(tech); navigate("technician-profile"); }}>View profile</Button><Button onClick={() => { setSelectedTech(tech); setSheet("booking"); }}>Book Technician</Button></div></div></article>)}</div>
      </div>
    </main>
  );

  const renderTechnicianProfile = () => selectedTech ? (
    <main className="flow-page">
      <BackHeader title="Technician profile" onBack={goBack} />
      <div className="flow-container tech-profile"><section className="tech-profile-hero"><div className="profile-photo-large"><img src={selectedTech.photo} alt="Stock portrait used for a sample technician profile" /><span>Sample profile</span></div><div><p className="eyebrow">Recommended match</p><h1>{selectedTech.name}</h1><p className="profile-rating"><Star />{selectedTech.rating} · {selectedTech.reviews} sample reviews</p><p>{selectedTech.specialization} · {selectedService?.name}</p><div className="verification-row"><span><Check />Identity</span><span><Check />Experience</span><span><Check />Skill</span></div></div></section>
        <div className="prototype-banner"><Info /><span>This is a prototype profile. Details, verification states, reviews, ETA and price are sample content.</span></div>
        <div className="profile-columns"><section><h2>Experience & skills</h2><dl className="profile-facts"><div><dt>Experience</dt><dd>{selectedTech.experience}</dd></div><div><dt>Relevant jobs</dt><dd>{selectedTech.jobs} sample jobs</dd></div><div><dt>Service area</dt><dd>{selectedTech.area}</dd></div></dl><div className="skill-list">{selectedTech.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><h2>Sample review</h2><blockquote>“Explained the work clearly and asked before replacing the part.”<span>Prototype review content</span></blockquote></section><aside className="cost-panel"><span>Estimated service cost</span><strong>₹{selectedTech.estimate}</strong><p>Includes initial inspection and the selected service scope. Parts or additional work are separate and require approval.</p><dl><div><dt>Arrival estimate</dt><dd>{selectedTech.eta}</dd></div><div><dt>Warranty</dt><dd>{selectedTech.warranty}</dd></div></dl></aside></div>
        <div className="profile-sticky-actions"><Button variant="outline" onClick={() => toast.info("Calling requires a connected phone service.")}><Phone />Call</Button><Button variant="outline" onClick={() => toast.info("Messaging requires a connected service.")}><MessageCircle />Message</Button><Button onClick={() => setSheet("booking")}>Book Now<ArrowRight /></Button></div>
      </div>
    </main>
  ) : null;

  const renderTracking = () => selectedTech ? (
    <main className="flow-page tracking-page">
      <BackHeader title="Booking tracking" onBack={() => goToTab("activity")} action={<span className="sample-state">Prototype</span>} />
      <div className="flow-container tracking-container"><section className="tracking-hero"><div><p className="eyebrow">{statusSteps[statusIndex]}</p><h1>{statusIndex < 5 ? `${selectedTech.name} is handling your request.` : "Your service is complete."}</h1><p>{statusIndex === 2 ? `Estimated arrival: ${selectedTech.eta}. This is a range, not a live countdown.` : "Status changes are controlled with the prototype button below."}</p></div><div className="tracking-tech"><img src={selectedTech.photo} alt="Sample technician portrait" /><span><b>{selectedTech.name}</b><small><Star /> {selectedTech.rating} · Sample profile</small></span><Button variant="outline" size="icon" aria-label="Call technician" onClick={() => toast.info("Calling requires a connected phone service.")}><Phone /></Button><Button variant="outline" size="icon" aria-label="Message technician" onClick={() => toast.info("Messaging requires a connected service.")}><MessageCircle /></Button></div></section>
        <section className="status-card"><div className="status-track">{statusSteps.map((status, index) => <div key={status} className={index <= statusIndex ? "done" : ""}><span>{index < statusIndex ? <Check /> : index + 1}</span><b>{status}</b></div>)}</div><div className="status-motion" aria-hidden="true"><span style={{ width: `${(statusIndex / (statusSteps.length - 1)) * 100}%` }} /></div></section>
        <div className="tracking-grid"><section><h2>Service request</h2><dl className="summary-list compact"><div><dt>Service</dt><dd>{selectedService?.name}</dd></div><div><dt>Job</dt><dd>{selectedJob}</dd></div><div><dt>Problem</dt><dd>{problemLine}</dd></div><div><dt>Estimated cost</dt><dd>₹{selectedTech.estimate}</dd></div></dl></section><aside><h2>Prototype controls</h2><p>Advance the status to review every connected state. This does not represent live technician movement.</p>{statusIndex === 4 && additionalApproved === null ? <Button variant="outline" onClick={() => setSheet("additional")}><IndianRupee />Review additional work</Button> : null}<Button disabled={statusIndex >= 5} onClick={() => { if (statusIndex < 5) { const next = statusIndex + 1; setStatusIndex(next); if (next === 5) setTimeout(() => setScreen("completion"), 220); } }}>Advance demo status<ArrowRight /></Button><button type="button" className="text-action" onClick={() => { setBookingCreated(false); setStatusIndex(1); goToTab("home"); toast.info("Booking cancelled in the prototype."); }}>Cancel & find another technician</button></aside></div>
      </div>
    </main>
  ) : null;

  const renderCompletion = () => (
    <main className="flow-page completion-page">
      <BackHeader title="Service complete" onBack={() => goToTab("activity")} />
      <div className="flow-container completion-layout"><section><div className="completion-mark"><CircleCheck /></div><p className="eyebrow">Completed</p><h1>Review the final service summary.</h1><p className="screen-subtitle">Choose a payment method for this prototype, then share optional feedback.</p><dl className="summary-list"><div><dt>Technician</dt><dd>{selectedTech?.name}</dd></div><div><dt>Service</dt><dd>{selectedService?.name}</dd></div><div><dt>Original estimate</dt><dd>₹{selectedTech?.estimate}</dd></div><div><dt>Approved additional work</dt><dd>{additionalApproved ? "₹650" : "None"}</dd></div><div className="total-row"><dt>Final amount</dt><dd>₹{finalAmount}</dd></div></dl></section><aside className="payment-panel"><h2>Payment method</h2><button type="button" className={payment === "Cash" ? "selected" : ""} onClick={() => setPayment("Cash")}><Banknote /><span><b>Cash</b><small>Pay the final approved amount</small></span>{payment === "Cash" ? <CircleCheck /> : null}</button><button type="button" className={payment === "UPI" ? "selected" : ""} onClick={() => setPayment("UPI")}><QrCode /><span><b>UPI</b><small>Continue in your UPI app</small></span>{payment === "UPI" ? <CircleCheck /> : null}</button><p>Payment is simulated in this interactive prototype. No money is collected.</p><Button onClick={() => setSheet("rating")}>Continue to review<ArrowRight /></Button></aside></div>
    </main>
  );

  const renderBookingDetail = () => {
    const tech = selectedTech ?? technicians[0];
    return <main className="flow-page"><BackHeader title="Booking detail" onBack={goBack} /><div className="flow-container booking-detail"><section className="booking-detail-head"><img src={tech.photo} alt="Sample technician portrait" /><div><p className="eyebrow">{bookingCreated ? statusSteps[statusIndex] : "Completed · sample record"}</p><h1>{selectedService?.name ?? "AC Repair & Service"}</h1><p>{tech.name} · Sample technician profile</p></div></section><dl className="summary-list"><div><dt>Job</dt><dd>{selectedJob || "Repair"}</dd></div><div><dt>Problem</dt><dd>{problemLine}</dd></div><div><dt>Status</dt><dd>{bookingCreated ? statusSteps[statusIndex] : "Completed"}</dd></div><div><dt>Cost</dt><dd>₹{bookingCreated ? finalAmount : 649} · sample</dd></div>{!bookingCreated ? <div><dt>Your rating</dt><dd>5 stars · sample record</dd></div> : null}</dl><div className="summary-actions">{bookingCreated ? <Button onClick={() => setScreen("tracking")}>Open tracking<ArrowRight /></Button> : <Button onClick={() => { setSelectedService(services[0]); setSelectedJob("Repair"); setAnswers({ issue: "Not cooling" }); setDescription("Cooling issue from previous sample booking"); navigate("summary"); }}>Rebook<ArrowRight /></Button>}</div></div></main>;
  };

  const renderPersonal = () => {
    const saveProfile = () => {
      if (profileDraft.name.trim().length < 2 || profileDraft.phone.length !== 10) return toast.error("Enter a valid name and 10-digit phone number.");
      if (profileDraft.phone !== profile.phone && !profileOtpNeeded) { setProfileOtpNeeded(true); return toast.info("Enter the prototype code 123456 to confirm the phone change."); }
      if (profileDraft.phone !== profile.phone && profileOtp !== "123456") return toast.error("For this prototype, enter 123456.");
      const updated = { ...profileDraft, name: profileDraft.name.trim() };
      setProfile(updated); window.localStorage.setItem("kwick-profile", JSON.stringify(updated)); setEditProfile(false); setProfileOtpNeeded(false); setProfileOtp(""); toast.success("Personal information saved.");
    };
    return <main className="flow-page"><BackHeader title="Personal Information" onBack={goBack} action={!editProfile ? <Button variant="ghost" onClick={() => setEditProfile(true)}><Edit3 />Edit</Button> : undefined} /><div className="flow-container personal-page"><div className="personal-photo"><img src={profilePhoto} alt={`${profile.name}'s profile`} /><span>Profile photo</span></div><div className="personal-form"><label>Name<input disabled={!editProfile} value={profileDraft.name} onChange={(event) => setProfileDraft((item) => ({ ...item, name: event.target.value }))} /></label><label>Phone Number<div className="phone-field"><span>+91</span><input disabled={!editProfile} inputMode="numeric" maxLength={10} value={profileDraft.phone} onChange={(event) => setProfileDraft((item) => ({ ...item, phone: event.target.value.replace(/\D/g, "") }))} /></div></label>{profileOtpNeeded ? <label>Confirm phone change <small>Prototype code: 123456</small><input inputMode="numeric" maxLength={6} value={profileOtp} onChange={(event) => setProfileOtp(event.target.value.replace(/\D/g, ""))} placeholder="6-digit code" /></label> : null}{editProfile ? <div className="form-actions"><Button variant="outline" onClick={() => { setProfileDraft(profile); setEditProfile(false); setProfileOtpNeeded(false); }}>Cancel</Button><Button onClick={saveProfile}>Save changes</Button></div> : null}</div></div></main>;
  };

  const renderNotifications = () => (
    <main className="flow-page"><BackHeader title="Notifications" onBack={goBack} /><div className="flow-container notification-page"><div className="catalogue-heading"><p className="eyebrow">Booking updates</p><h1>Notifications</h1><p>Tap an item to change its read state in this prototype.</p></div><div className="notification-list">{notifications.map((item) => <button type="button" key={item.id} className={item.unread ? "unread" : ""} onClick={() => setNotifications((items) => items.map((note) => note.id === item.id ? { ...note, unread: !note.unread } : note))}><span className="notification-icon"><Bell /></span><div><h2>{item.title}</h2><p>{item.message}</p><time>{item.time}</time></div>{item.unread ? <i aria-label="Unread" /> : null}</button>)}</div></div></main>
  );

  const renderSupport = () => (
    <main className="flow-page"><BackHeader title="Help & Support" onBack={goBack} /><div className="flow-container narrow-page"><p className="eyebrow">How can we help?</p><h1>Support</h1><p className="screen-subtitle">Choose a topic. Connected support channels are required before messages can be sent.</p><div className="simple-menu">{["Booking Help", "Payment Help", "Cancellation Help", "Service Issue", "Contact Support"].map((item) => <button key={item} type="button" onClick={() => toast.info(`${item} requires a connected support service.`)}><span><CircleHelp />{item}</span><ChevronRight /></button>)}</div></div></main>
  );

  const renderProvider = () => (
    <main className="flow-page"><BackHeader title="Become a Service Provider" onBack={goBack} /><div className="flow-container coming-soon"><div><p className="eyebrow">Coming Soon</p><h1>A thoughtful provider experience is on the way.</h1><p>Future onboarding will help service professionals share their skills, service areas and required verification information. KwicK is not accepting provider registrations in this prototype.</p><Button variant="outline" onClick={goBack}><ArrowLeft />Back to profile</Button></div><img src="/editorial-human.png" alt="Person beside a home-service toolbox" /></div></main>
  );

  const renderLegal = () => (
    <main className="flow-page"><BackHeader title="Terms & Privacy" onBack={goBack} /><div className="flow-container legal-page"><Tabs defaultValue="terms"><TabsList><TabsTrigger value="terms">Terms</TabsTrigger><TabsTrigger value="privacy">Privacy Policy</TabsTrigger></TabsList><TabsContent value="terms"><article><p className="eyebrow">Prototype terms</p><h1>Terms</h1><p>This interactive experience demonstrates KwicK’s product flow. It does not create bookings, accounts, payments or service-provider relationships.</p><h2>Service information</h2><p>Live technician identity, verification, pricing, availability, warranty and service coverage would need to come from connected operational systems and human confirmation.</p><h2>User confirmation</h2><p>Users remain responsible for confirming service scope, estimates and any additional work before approval.</p></article></TabsContent><TabsContent value="privacy"><article><p className="eyebrow">Prototype privacy</p><h1>Privacy Policy</h1><p>This prototype stores only editable profile information in your browser. Uploaded media previews stay on your device and are not sent to a server.</p><h2>Live product requirements</h2><p>A production release would need clear consent, secure authentication, retention controls and documented data-processing practices.</p></article></TabsContent></Tabs></div></main>
  );

  const renderAbout = () => (
    <main className="flow-page"><BackHeader title="About" onBack={goBack} /><div className="flow-container about-page"><img src="/kwick-wordmark.png" alt="KwicK" /><p className="eyebrow">Clear service requests. Human confirmation.</p><h1>KwicK helps people describe a home-service need and compare relevant help without inventing certainty.</h1><p>This is an interactive product prototype for India. It demonstrates the user journey with clearly marked sample data.</p><dl><div><dt>Version</dt><dd>Prototype 1.0</dd></div><div><dt>Payments</dt><dd>Cash + UPI only</dd></div><div><dt>Principle</dt><dd>AI assists. Humans confirm important facts.</dd></div></dl></div></main>
  );

  const renderScreen = () => {
    if (screen === "auth") return renderAuth();
    if (["phone", "otp", "name", "location"].includes(screen)) return renderOnboarding();
    if (screen === "home") return renderHome();
    if (screen === "explore") return renderExplore();
    if (screen === "activity") return renderActivity();
    if (screen === "profile") return renderProfile();
    if (screen === "questions") return renderQuestions();
    if (screen === "details") return renderDetails();
    if (screen === "summary") return renderSummary();
    if (screen === "technicians") return renderTechnicians();
    if (screen === "technician-profile") return renderTechnicianProfile();
    if (screen === "tracking") return renderTracking();
    if (screen === "completion") return renderCompletion();
    if (screen === "booking-detail") return renderBookingDetail();
    if (screen === "personal") return renderPersonal();
    if (screen === "notifications") return renderNotifications();
    if (screen === "support") return renderSupport();
    if (screen === "provider") return renderProvider();
    if (screen === "legal") return renderLegal();
    if (screen === "about") return renderAbout();
    return renderHome();
  };

  return (
    <>
      {renderScreen()}
      <Sheet open={sheet === "job"} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className="bottom-sheet">
          <SheetHeader><SheetTitle>What do you need help with?</SheetTitle><SheetDescription>{selectedService?.name} · choose the closest job type.</SheetDescription></SheetHeader>
          <div className="job-options">{selectedService?.jobs.map((job) => <button type="button" key={job} className={selectedJob === job ? "selected" : ""} onClick={() => setSelectedJob(job)}><span><Wrench />{job}</span>{selectedJob === job ? <CircleCheck /> : <ChevronRight />}</button>)}</div>
          <SheetFooter><Button disabled={!selectedJob} onClick={() => startRequest(selectedJob)}>Continue<ArrowRight /></Button></SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={sheet === "booking"} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className="bottom-sheet booking-sheet">
          <SheetHeader><SheetTitle>Confirm booking</SheetTitle><SheetDescription>Review the sample booking before confirming.</SheetDescription></SheetHeader>
          {selectedTech ? <div className="booking-confirm"><div className="confirm-tech"><img src={selectedTech.photo} alt="Sample technician portrait" /><span><b>{selectedTech.name}</b><small>{selectedTech.specialization} · Sample profile</small></span></div><dl><div><dt>Service</dt><dd>{selectedService?.name}</dd></div><div><dt>Job</dt><dd>{selectedJob}</dd></div><div><dt>Problem</dt><dd>{problemLine}</dd></div><div><dt>Arrival estimate</dt><dd>{selectedTech.eta}</dd></div><div><dt>Estimated cost</dt><dd>₹{selectedTech.estimate}</dd></div></dl><p>Final charges may change only if additional work is required and approved by the user.</p><div className="prototype-inline"><Info />This confirmation uses sample prototype data.</div></div> : null}
          <SheetFooter className="sheet-actions"><SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose><Button onClick={confirmBooking}>Confirm Booking</Button></SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={sheet === "additional"} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className="bottom-sheet">
          <SheetHeader><SheetTitle>Additional work approval</SheetTitle><SheetDescription>Prototype scenario · nothing is added without your decision.</SheetDescription></SheetHeader>
          <div className="additional-work"><dl><div><dt>Original estimate</dt><dd>₹{selectedTech?.estimate}</dd></div><div><dt>Reason</dt><dd>A part replacement is recommended after inspection.</dd></div><div><dt>Additional work</dt><dd>Replacement part + fitting</dd></div><div><dt>Additional amount</dt><dd>₹650</dd></div><div className="total-row"><dt>Revised total</dt><dd>₹{(selectedTech?.estimate ?? 0) + 650}</dd></div></dl><p>This is a sample approval state. A production booking would show the technician’s confirmed breakdown.</p></div>
          <SheetFooter className="sheet-actions"><Button variant="outline" onClick={() => { setAdditionalApproved(false); setSheet(null); toast.info("Additional work declined."); }}>Decline</Button><Button onClick={() => { setAdditionalApproved(true); setSheet(null); toast.success("Additional work approved in the prototype."); }}>Approve ₹650</Button></SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={sheet === "rating"} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className="bottom-sheet rating-sheet">
          <SheetHeader><SheetTitle>How was your service?</SheetTitle><SheetDescription>Feedback is optional and should reflect your own experience.</SheetDescription></SheetHeader>
          <div className="rating-content"><img src="/editorial-human.png" alt="Person ready to share feedback" /><div><div className="star-row" aria-label="Choose a rating">{[1,2,3,4,5].map((value) => <button type="button" key={value} onClick={() => setRating(value)} aria-label={`${value} star${value > 1 ? "s" : ""}`} className={value <= rating ? "active" : ""}><Star /></button>)}</div><div className="review-tags">{["Clear explanation", "On time", "Careful work", "Professional"].map((tag) => <button type="button" key={tag} className={reviewTags.includes(tag) ? "selected" : ""} onClick={() => setReviewTags((items) => items.includes(tag) ? items.filter((item) => item !== tag) : [...items, tag])}>{tag}</button>)}</div><textarea value={review} onChange={(event) => setReview(event.target.value)} placeholder="Add an optional review" /></div></div>
          <SheetFooter><Button disabled={!rating} onClick={() => { setSheet("thanks"); toast.success("Review saved in this prototype."); }}>Submit Review</Button></SheetFooter>
        </SheetContent>
      </Sheet>

      <Sheet open={sheet === "thanks"} onOpenChange={(open) => !open && resetToHome()}>
        <SheetContent side="bottom" className="bottom-sheet thanks-sheet" showCloseButton={false}>
          <img src="/editorial-human.png" alt="Person acknowledging a completed service" /><div><p className="eyebrow">Thank you</p><SheetTitle>Your feedback helps keep service clear and human.</SheetTitle><SheetDescription>Your prototype review is complete.</SheetDescription><Button onClick={resetToHome}>Close and return Home</Button></div>
        </SheetContent>
      </Sheet>

      <Sheet open={sheet === "logout"} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className="bottom-sheet logout-sheet"><SheetHeader><SheetTitle>Log out of KwicK?</SheetTitle><SheetDescription>Your prototype profile remains saved on this device.</SheetDescription></SheetHeader><SheetFooter className="sheet-actions"><SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose><Button variant="destructive" onClick={() => { setSheet(null); setScreen("auth"); setHistory([]); }}>Log Out</Button></SheetFooter></SheetContent>
      </Sheet>
      <Toaster position="top-center" />
    </>
  );
}
