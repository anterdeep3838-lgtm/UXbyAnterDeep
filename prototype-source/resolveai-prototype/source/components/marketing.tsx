"use client";
import {useEffect,useMemo,useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {Menu,Check,Headphones,ShieldCheck,BookOpen,Workflow,Lock,Package,ChartNoAxesCombined,MessageSquare,ChevronRight,ArrowRight,Sparkles,RefreshCw,Pencil,X,ArrowRightLeft,Wallet,Undo2,Users,KeyRound,FileText,Globe,CloudUpload,CircleAlert,Eye,ScrollText,Truck,CreditCard,Store,Mail,Play,ChevronLeft,Search} from 'lucide-react';
import {Hero,useStoryStep} from './hero';
import {useProduct} from './product-state';
import {Brand,BrandMark,Button,Segments,Avatar,ChannelIcon,Input,SearchField,Status,EmptyState} from './product-ui';
import {Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger} from '@/components/ui/sheet';
import {Accordion,AccordionItem,AccordionTrigger,AccordionContent} from '@/components/ui/accordion';
import {Switch} from '@/components/ui/switch';
import {articles,guideWorkflow,channels,suggestedReplies,seedConversations} from '@/lib/product';

type Go=(path:string)=>void;
const nav=[['Product','/features'],['Solutions','/solutions'],['Integrations','/integrations'],['Pricing','/pricing'],['Resources','/resources']];

function SectionHead({label,title,copy,center=false,dark=false}:{label:string;title:React.ReactNode;copy?:string;center?:boolean;dark?:boolean}){
  return <div className={'rx-head'+(center?' center':'')+(dark?' dark':'')}><span className="rx-label">{label}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>
}

/* 02 — honest trust strip: channels and connected tools, no invented customers */
function TrustStrip(){
  return <section className="rx-trust" aria-label="Channels and tools ResolveAI connects">
    <div className="rx-trust-inner">
      <p>Built for commerce support teams working across</p>
      <div className="rx-trust-row">{channels.map(c=><span key={c}><ChannelIcon channel={c} size={17}/>{c==='Messenger'?'Messenger':c}</span>)}</div>
      <div className="rx-trust-row tools"><span><Store size={16}/>Shopify</span><span><Store size={16}/>WooCommerce</span><span><CreditCard size={16}/>Stripe</span><span><Truck size={16}/>DHL</span><span><Truck size={16}/>FedEx</span><span><Package size={16}/>ShipStation</span></div>
    </div>
  </section>
}

/* 03 — six channels converge into one Inbox */
function OmnichannelSection({go}:{go:Go}){
  const counts=[62,48,41,37,29,31];
  return <section className="rx-section rx-omni" id="product">
    <div className="rx-wrap rx-split">
      <div className="rx-copy">
        <SectionHead label="01 · Unified Inbox" title={<>Six channels.<br/>One conversation.</>} copy="Chat, email, WhatsApp, Instagram, Messenger and forms arrive in one shared Inbox, with a clear owner and the order beside every message."/>
        <ul className="rx-ticks"><li><Check size={16}/>One queue, filtered by urgency, owner and handler</li><li><Check size={16}/>Customers keep their thread when channels change</li><li><Check size={16}/>Deep links to the exact conversation</li></ul>
        <Button className="rx-btn-quiet" onClick={()=>go('/app/inbox')}>Open the live Inbox<ArrowRight size={15}/></Button>
      </div>
      <div className="rx-omni-visual" aria-label="Six channels feed one Inbox">
        <div className="rx-omni-sources">{channels.map((c,i)=><button key={c} className="rx-source" onClick={()=>go('/app/inbox')} style={{'--i':i} as React.CSSProperties}><span className="rx-icon-box"><ChannelIcon channel={c} size={18}/></span><span>{c}</span><b>{counts[i]}</b></button>)}</div>
        <svg className="rx-omni-lines" viewBox="0 0 120 360" preserveAspectRatio="none" aria-hidden="true">{[30,90,150,210,270,330].map((y,i)=><path key={y} d={`M0 ${y} C60 ${y} 60 180 120 180`} style={{animationDelay:i*.4+'s'}}/>)}</svg>
        <div className="rx-omni-inbox">
          <div className="rx-mini-head"><BrandMark size={22}/><b>Inbox</b><span>248 open</span></div>
          {[['Sarah Miller','Where is my order?','Website Chat','AI Handling'],['Emily Carter','I was charged twice.','Email','Urgent'],['David Shah','Delivery is late.','WhatsApp','Human'],['Aisha Khan','Refund status?','Instagram','Human']].map(([n,t,c,s])=><div className="rx-mini-row" key={n}><Avatar name={n} size={26}/><div><b>{n}</b><small>{t}</small></div><span className={'rx-tag '+(s==='AI Handling'?'ai':s==='Urgent'?'urgent':'human')}>{s}</span><ChannelIcon channel={c} size={13}/></div>)}
        </div>
      </div>
    </div>
  </section>
}

/* 04 — who handles what: an explicit responsibility map */
function CollaborationSection(){
  return <section className="rx-section rx-collab" id="solutions">
    <div className="rx-wrap">
      <SectionHead center label="02 · AI + Human" title={<>Let AI handle the routine.<br/>Keep people on what matters.</>} copy="Clear boundaries, set by you. AI takes predictable, low-risk work. Anything sensitive, financial or emotional goes to a person."/>
      <div className="rx-duty">
        <div className="rx-duty-col ai"><div className="rx-duty-top"><span className="rx-duty-icon"><Sparkles size={18}/></span><div><h3>AI can handle</h3><p>Predictable and low-risk</p></div></div>
          <ul>{['Order tracking and “Where is my order?”','Shipping and delivery updates','Return-policy and FAQ answers','Refund-status checks','Product and size information'].map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul></div>
        <div className="rx-duty-axis" aria-hidden="true"><span>Handoff</span><i/><ArrowRightLeft size={18}/><i/><span>Same thread</span></div>
        <div className="rx-duty-col human"><div className="rx-duty-top"><span className="rx-duty-icon"><Headphones size={18}/></span><div><h3>A person handles</h3><p>Judgment, money and trust</p></div></div>
          <ul>{['Refund approvals and payment disputes','Duplicate charges and fraud','Security and account access','Frustrated customers and exceptions','Anything where AI confidence is low'].map(t=><li key={t}><Check size={15}/>{t}</li>)}</ul></div>
      </div>
    </div>
  </section>
}

/* 05 — contextual support */
function ContextSection({go}:{go:Go}){
  return <section className="rx-section rx-context">
    <div className="rx-wrap rx-split reverse">
      <div className="rx-context-visual">
        <div className="rx-panel rx-context-panel">
          <div className="rx-context-top"><Avatar name="David Shah" size={36}/><div><b>David Shah</b><small>david.shah@outlook.com</small></div><span className="rx-tag human">Human Assigned</span></div>
          <div className="rx-context-order">
            <div className="rx-order-art"><Package size={22}/></div>
            <div><small>Current order</small><b>Classic Denim Jacket (L)</b><span>#NW-4790 · ₹3,299</span></div>
            <span className="rx-tag warn">Delayed</span>
          </div>
          <ol className="rx-timeline"><li className="done"><span/>Order placed<small>Sep 22</small></li><li className="done"><span/>Shipped<small>Sep 24</small></li><li className="now"><span/>Delayed in transit<small>Today</small></li><li><span/>Delivered<small>Pending</small></li></ol>
          <div className="rx-context-facts"><div><small>Issue</small><b>Delivery</b></div><div><small>Sentiment</small><b>Negative</b></div><div><small>AI confidence</small><b>High</b></div><div><small>Previous chats</small><b>4</b></div></div>
        </div>
        <div className="rx-float-note"><CircleAlert size={15}/><span>Never ask “What’s your order number?” when it’s already known.</span></div>
      </div>
      <div className="rx-copy">
        <SectionHead label="03 · Contextual support" title={<>The full story.<br/>Before the first reply.</>} copy="Orders, delivery status, past conversations and sentiment sit next to the message. Agents act on facts, and customers never repeat themselves."/>
        <ul className="rx-ticks"><li><Check size={16}/>Verified order data kept apart from AI suggestions</li><li><Check size={16}/>Compact context in the Inbox, full profile one click away</li><li><Check size={16}/>Shopify, Stripe and carriers in the same view</li></ul>
        <Button className="rx-btn-quiet" onClick={()=>go('/app/customers')}>See customer profiles<ArrowRight size={15}/></Button>
      </div>
    </div>
  </section>
}

/* 06 — signature section: Smart Handoff */
const handoffSteps=[
  {t:'AI answers the routine question',d:'Sarah asks where her order is. AI checks verified tracking and replies in seconds.',tag:'AI Handling'},
  {t:'Confidence drops',d:'Second delay, negative sentiment and a deadline. AI stops before it guesses.',tag:'Confidence: Low'},
  {t:'A handoff summary is written',d:'Issue, order, what was tried and the recommended next step, ready for a person.',tag:'Summary ready'},
  {t:'Maya joins the same conversation',d:'No new ticket, no repeated questions. The customer just sees a person arrive.',tag:'Human Assigned'},
];
function HandoffSection({go}:{go:Go}){
  const auto=useStoryStep(4,3400);
  const [picked,setPicked]=useState<number|null>(null);
  const step=picked??auto;
  return <section className="rx-handoff" id="handoff">
    <div className="rx-handoff-bg" aria-hidden="true"><div className="rx-ribs soft"/><div className="rx-glow warm"/><div className="rx-grain"/></div>
    <div className="rx-wrap">
      <SectionHead dark center label="04 · Smart Handoff" title={<>When AI should stop,<br/>a person picks up. Mid-sentence.</>} copy="Handoffs happen in the same thread with a summary attached. The customer never starts again, and your agent never starts from zero."/>
      <div className="rx-handoff-grid">
        <ol className="rx-handoff-steps">{handoffSteps.map((s,i)=><li key={s.t}><button className={(i===step?'active ':'')+(i<step?'done ':'')+(i===3?'human':'')} onClick={()=>setPicked(i)} aria-pressed={i===step}>
          <span className="rx-step-n">{i<step?<Check size={14}/>:i+1}</span><span><b>{s.t}</b><small>{s.d}</small></span></button></li>)}</ol>
        <div className="rx-handoff-stage">
          <div className="rx-handoff-window">
            <div className="rx-convo-head light"><div><b>Sarah Miller</b><small>Website Chat · #NW-4821</small></div><span className={'rx-handler '+(step===3?'human':'ai')}>{step===3?<><Headphones size={11}/>Maya Patel</>:<><Sparkles size={11}/>AI Handling</>}</span></div>
            <div className="rx-thread roomy">
              <div className="rx-msg customer">Where is my order? It was due yesterday.</div>
              <div className="rx-msg ai"><span className="rx-author"><Sparkles size={10}/>NovaWear AI</span>It’s delayed at your local hub. I don’t have a confirmed new date yet.</div>
              {step>=1&&<div className="rx-msg customer">Second delay this month. I need it by Saturday.</div>}
              {step>=1&&<div className="rx-event amber"><CircleAlert size={11}/>AI confidence dropped to Low</div>}
              {step>=3&&<div className="rx-event"><ArrowRightLeft size={11}/>AI handed off to General Support · Maya joined</div>}
              {step>=3&&<div className="rx-msg human"><span className="rx-author"><Headphones size={10}/>Maya · Human</span>Hi Sarah, I’m Maya. I can see both delays. Let me confirm Saturday with the carrier now.</div>}
            </div>
          </div>
          <div className={'rx-summary-card'+(step>=2?' on':'')}>
            <div className="rx-float-head"><span>AI Handoff Summary</span><em className="low">Needs a person</em></div>
            <dl><div><dt>Customer</dt><dd>Sarah Miller</dd></div><div><dt>Issue</dt><dd>Delayed order</dd></div><div><dt>Order</dt><dd>#NW-4821</dd></div><div><dt>Tried</dt><dd>Shared tracking information</dd></div><div className="wide"><dt>Recommended next action</dt><dd>Confirm the latest ETA and whether Saturday is possible.</dd></div></dl>
          </div>
        </div>
      </div>
      <div className="rx-handoff-foot"><span><ShieldCheck size={15}/>Take Over is always one click away, even while AI is replying.</span><Button className="rx-btn-glass" onClick={()=>go('/app/inbox?id=conv-19')}>Try Take Over in the demo<ArrowRight size={15}/></Button></div>
    </div>
  </section>
}

/* 07 — AI Copilot with working regenerate */
function CopilotSection({go}:{go:Go}){
  const sarah=useMemo(()=>seedConversations()[18],[]);
  const replies=useMemo(()=>suggestedReplies(sarah),[sarah]);
  const [i,setI]=useState(0);const [busy,setBusy]=useState(false);const [editing,setEditing]=useState(false);const [text,setText]=useState(replies[0]);const [state,setState]=useState<'draft'|'dismissed'|'used'>('draft');
  const regenerate=()=>{setBusy(true);setEditing(false);setTimeout(()=>{const n=(i+1)%replies.length;setI(n);setText(replies[n]);setBusy(false);setState('draft')},650)};
  return <section className="rx-section rx-copilot">
    <div className="rx-wrap rx-split">
      <div className="rx-copy">
        <SectionHead label="05 · AI Copilot" title={<>A useful draft.<br/>Your final word.</>} copy="Suggestions are grounded in the order and your approved knowledge. Edit, regenerate or dismiss them. Nothing is sent until a person decides."/>
        <ul className="rx-ticks"><li><Check size={16}/>Five different drafts before any repeat</li><li><Check size={16}/>Sources shown with every suggestion</li><li><Check size={16}/>Never auto-sent</li></ul>
        <Button className="rx-btn-quiet" onClick={()=>go('/app/inbox?id=conv-19')}>Try it on a real conversation<ArrowRight size={15}/></Button>
      </div>
      <div className="rx-copilot-visual">
        <div className="rx-panel rx-draft">
          <div className="rx-draft-head"><span className="rx-duty-icon sm"><Sparkles size={14}/></span><b>AI Suggested Reply</b><span className="rx-tag ai">Draft {i+1} of 5</span></div>
          {state==='dismissed'?<div className="rx-draft-empty"><p>Suggestion dismissed. Write your own reply, or ask for a new draft.</p><Button className="rx-btn-quiet sm" onClick={regenerate}><RefreshCw size={14}/>New suggestion</Button></div>:
          busy?<div className="rx-draft-loading" aria-live="polite"><span/><span/><span className="short"/><small><Sparkles size={12}/>Writing a new draft from order #NW-4821…</small></div>:
          editing?<textarea className="rx-draft-edit" value={text} onChange={e=>setText(e.target.value)} aria-label="Edit suggested reply"/>:<p className="rx-draft-text" aria-live="polite">{text}</p>}
          <div className="rx-draft-source"><BookOpen size={13}/>Shipping & Delivery Policy · Verified order #NW-4821</div>
          <div className="rx-draft-actions">
            <Button variant="ghost" size="sm" onClick={()=>setEditing(e=>!e)} disabled={busy||state==='dismissed'}><Pencil size={14}/>{editing?'Done':'Edit'}</Button>
            <Button variant="ghost" size="sm" onClick={regenerate} disabled={busy}><RefreshCw size={14} className={busy?'spin':''}/>Regenerate</Button>
            <Button variant="ghost" size="sm" onClick={()=>setState('dismissed')} disabled={busy||state==='dismissed'}><X size={14}/>Dismiss</Button>
            <Button size="sm" className="rx-btn-solid sm" onClick={()=>setState('used')} disabled={busy||state==='dismissed'}>{state==='used'?<><Check size={14}/>In composer</>:'Use response'}</Button>
          </div>
        </div>
        <div className={'rx-composer-demo'+(state==='used'?' filled':'')}><span className="rx-mode">Reply to Customer</span><p>{state==='used'?text:'Your reply…'}</p><span className="rx-send">{state==='used'?'Ready to send · you decide':'Send'}</span></div>
      </div>
    </div>
  </section>
}

/* 08 — knowledge */
function KnowledgeSection({go}:{go:Go}){
  const [synced,setSynced]=useState(false);const [syncing,setSyncing]=useState(false);
  const rows=[['NovaWear Website','Website','42 pages','Healthy'],['Shipping & Delivery Policy','Policy','4 pages','Healthy'],['Refund Policy','PDF','3 pages','Healthy'],['Product Catalogue','Website',synced?'36 pages':'0 pages',synced?'Healthy':syncing?'Syncing':'Sync failed']];
  return <section className="rx-section rx-knowledge">
    <div className="rx-wrap rx-split reverse">
      <div className="rx-panel rx-kb">
        <div className="rx-kb-head"><b>Knowledge sources</b><span>{synced?'6 of 6 healthy':'5 of 6 healthy'}</span></div>
        {rows.map(([n,t,p,s])=><div className="rx-kb-row" key={n}><span className="rx-icon-box sm">{t==='PDF'?<FileText size={15}/>:t==='Policy'?<BookOpen size={15}/>:<Globe size={15}/>}</span><div><b>{n}</b><small>{t} · {p}</small></div>
          {s==='Sync failed'?<button className="rx-retry" onClick={()=>{setSyncing(true);setTimeout(()=>{setSyncing(false);setSynced(true)},1300)}}><RefreshCw size={13}/>Retry sync</button>:<span className={'rx-tag '+(s==='Healthy'?'ok':'ai')}>{s==='Syncing'?<><RefreshCw size={11} className="spin"/>Syncing</>:s}</span>}</div>)}
        <div className="rx-kb-test"><small>Test a question</small><p>“Can I return a sale item?”</p><div><Sparkles size={13}/>Answered from <b>Returns & Exchanges</b> · confidence High</div></div>
      </div>
      <div className="rx-copy">
        <SectionHead label="06 · Knowledge Base" title={<>Answers from your policies.<br/>Not from guesswork.</>} copy="Import your site, upload PDFs and write articles. ResolveAI shows what is indexed, what failed and why. If no approved source answers a question, AI hands off."/>
        <ul className="rx-ticks"><li><CloudUpload size={16}/>PDF, DOCX, TXT and CSV uploads</li><li><RefreshCw size={16}/>Scheduled sync with health checks</li><li><ShieldCheck size={16}/>Only approved content reaches customers</li></ul>
        <Button className="rx-btn-quiet" onClick={()=>go('/app/knowledge')}>Open Knowledge Base<ArrowRight size={15}/></Button>
      </div>
    </div>
  </section>
}

/* 09 — automation */
function AutomationSection({go}:{go:Go}){
  const [rules,setRules]=useState([
    {n:'Negative sentiment escalation',d:'Hands strongly negative conversations to a person when AI should stop.',on:true,human:true},
    {n:'Delivery questions',d:'Lets AI answer standard delivery questions when confidence is high.',on:true,human:false},
    {n:'Delayed refund alert',d:'Raises refunds unresolved after 7 days and routes them to Billing.',on:false,human:true},
  ]);
  return <section className="rx-section rx-automation">
    <div className="rx-wrap">
      <div className="rx-auto-grid">
        <SectionHead label="07 · Automation" title={<>Rules you can read<br/>in one line.</>} copy="Routing, handoffs and alerts written in plain language. Financial and security actions always stay with people, whatever the rule says."/>
        <div className="rx-rules">{rules.map((r,i)=><div className={'rx-rule'+(r.on?' on':'')} key={r.n}>
          <span className={'rx-icon-box sm '+(r.human?'human':'ai')}>{r.human?<Headphones size={15}/>:<Sparkles size={15}/>}</span>
          <div><b>{r.n}</b><p>{r.d}</p>{r.human&&<small><ShieldCheck size={12}/>Human review required</small>}</div>
          <Switch checked={r.on} onCheckedChange={v=>setRules(rs=>rs.map((x,j)=>j===i?{...x,on:v}:x))} aria-label={r.n}/>
        </div>)}
        <button className="rx-rule-more" onClick={()=>go('/app/automation')}>Open AI & Automation<ArrowRight size={14}/></button></div>
      </div>
    </div>
  </section>
}

/* 10 — analytics with the single glass column chart */
const week=[['Thu',148,96],['Fri',171,104],['Sat',139,92],['Sun',118,79],['Mon',192,121],['Tue',181,113],['Wed',174,112]] as const;
function AnalyticsSection({go}:{go:Go}){
  const [hover,setHover]=useState(6);
  const max=200;const total=week.reduce((a,w)=>a+w[1],0);
  const d=week[hover];
  return <section className="rx-analytics">
    <div className="rx-analytics-bg" aria-hidden="true"><div className="rx-glow"/><div className="rx-grain"/></div>
    <div className="rx-wrap rx-split">
      <div className="rx-copy">
        <SectionHead dark label="08 · Analytics" title={<>See where AI helps.<br/>And where people do.</>} copy="Volume, resolution, CSAT and the AI → human handoff rate, all changing with the date range you pick. Human work gets real weight, not a grey afterthought."/>
        <div className="rx-stat-row"><div><b>63%</b><small>AI resolution rate</small></div><div><b>18%</b><small>AI → Human handoff</small></div><div><b>4.7</b><small>CSAT out of 5</small></div></div>
        <Button className="rx-btn-glass" onClick={()=>go('/app/analytics')}>Explore Analytics<ArrowRight size={15}/></Button>
      </div>
      <div className="rx-glass-chart" role="group" aria-label="Conversations per day, last 7 days, NovaWear demo">
        <div className="rx-glass-chart-head"><div><small>Conversations · last 7 days</small><b>{total.toLocaleString()}</b></div><div className="rx-legend"><span className="ai">AI resolved</span><span className="human">Human</span></div></div>
        <div className="rx-columns">{week.map(([day,v,ai],i)=><button key={day} className={'rx-col'+(i===hover?' active':'')} onMouseEnter={()=>setHover(i)} onFocus={()=>setHover(i)} aria-label={`${day}: ${v} conversations, ${ai} resolved by AI`}>
          <span className="rx-col-glass" style={{height:v/max*100+'%'}}><span className="rx-col-ai" style={{height:ai/v*100+'%'}}/><span className="rx-col-cap"/></span><small>{day}</small></button>)}</div>
        <div className="rx-chart-tip"><b>{d[0]}</b><span>{d[1]} conversations</span><span className="ai">AI resolved {d[2]}</span><span className="human">Human {d[1]-d[2]}</span></div>
        <small className="rx-demo-note">Illustrative NovaWear demo data</small>
      </div>
    </div>
  </section>
}

/* 11 — the customer-facing widget, shown with one slight tilt */
function WidgetSection(){
  const {setWidgetOpen}=useProduct();
  return <section className="rx-section rx-widget-sec">
    <div className="rx-wrap rx-split reverse">
      <div className="rx-widget-visual">
        <div className="rx-store" aria-hidden="true"><div className="rx-store-bar"><b>NOVAWEAR</b><span>Orders</span></div><div className="rx-store-body"><span className="rx-store-img"/><div><small>Order #NW-4821</small><b>Classic Denim Jacket</b><span className="rx-tag warn">Delayed</span></div></div></div>
        <div className="rx-widget-card">
          <div className="rx-widget-top"><b>NovaWear Support</b><span><i/>Online</span></div>
          <div className="rx-widget-body"><p className="hi">Hi Sarah 👋</p><div className="rx-widget-ctx"><small>Need help with Order #NW-4821?</small><b>Current status · Delayed</b></div>
            <div className="rx-widget-actions">{['Track latest status','Delivery is late','Change delivery address','Talk to support'].map(t=><button key={t} onClick={()=>setWidgetOpen(true)}>{t}<ChevronRight size={13}/></button>)}</div></div>
          <div className="rx-widget-input">Type your question…</div>
        </div>
      </div>
      <div className="rx-copy">
        <SectionHead label="09 · Customer widget" title={<>Support that already<br/>knows the order.</>} copy="Your customers see NovaWear, not us. The widget opens with the order they’re viewing, offers useful next steps and brings in a person in the same chat."/>
        <ul className="rx-ticks"><li><Check size={16}/>Your brand colours, greeting and hours</li><li><Check size={16}/>Context-aware quick actions</li><li><Check size={16}/>Human handoff without a new chat</li></ul>
        <Button className="rx-btn-quiet" onClick={()=>setWidgetOpen(true)}>Try NovaWear Support<ArrowRight size={15}/></Button>
      </div>
    </div>
  </section>
}

/* 12 — integrations */
export function IntegrationSection({full=false}:{full?:boolean}){
  const {go}=useProduct();
  const groups:any[]=[['Commerce',[['Shopify','Orders, customers and products'],['WooCommerce','Orders and customers']]],['Payments',[['Stripe','Payments and refund status, read only']]],['Shipping',[['DHL','Tracking and delivery events'],['FedEx','Tracking and exceptions'],['ShipStation','Shipments and labels']]]];
  return <section className="rx-section rx-integrations" id="integrations">
    <div className="rx-wrap">
      <SectionHead center label={full?'Integrations':'10 · Integrations'} title={<>Connected to the way<br/>your store already works.</>} copy="Order, payment and delivery data flows into every conversation. Read access by default, and every permission is visible."/>
      <div className="rx-int-grid">{groups.map(([g,items])=><div className="rx-int-group" key={g}><span className="rx-label">{g}</span>{items.map(([n,d]:string[])=><button key={n} className="rx-int" onClick={()=>go('/app/integrations?selected='+n)}><span className={'rx-int-logo l-'+n.toLowerCase()}>{n==='Shopify'?'S':n==='WooCommerce'?'Woo':n==='Stripe'?'S':n==='DHL'?'DHL':n==='FedEx'?'FdX':'SS'}</span><div><b>{n}</b><small>{d}</small></div><ChevronRight size={15}/></button>)}</div>)}
        <div className="rx-int-group channels"><span className="rx-label">Channels</span><div className="rx-int-channels">{channels.map(c=><span key={c}><ChannelIcon channel={c} size={17}/>{c}</span>)}</div><p>Instagram and Messenger connect through Meta. We never ask for your password.</p></div>
      </div>
    </div>
  </section>
}

/* 13 — trust and security bento */
function SecuritySection({go}:{go:Go}){
  return <section className="rx-security">
    <div className="rx-wrap">
      <SectionHead dark label="11 · Trust & security" title={<>Human control,<br/>built into the product.</>}/>
      <div className="rx-bento">
        <div className="rx-tile big"><Wallet size={22}/><h3>No automatic refunds. Ever.</h3><p>AI can check eligibility and prepare a recommendation. Only an authorised person can press Approve Refund, and every decision is recorded in the conversation.</p>
          <div className="rx-approve"><div><small>AI recommendation</small><b>Refund ₹2,499 · #NW-4821</b></div><span className="rx-fake-btn ghost">Reject</span><span className="rx-fake-btn">Approve Refund</span></div></div>
        <div className="rx-tile"><ScrollText size={20}/><h3>Visible audit trail</h3><p>Takeovers, handoffs, escalations and approvals appear as events in the thread.</p></div>
        <div className="rx-tile"><KeyRound size={20}/><h3>Roles & 2FA</h3><p>Permissions by role, two-factor sign-in and active-session control.</p></div>
        <div className="rx-tile"><Eye size={20}/><h3>Fair by design</h3><p>Urgency comes from risk, sentiment and time waiting, never from how much a customer spends.</p></div>
        <div className="rx-tile"><Lock size={20}/><h3>Scoped access</h3><p>Integrations request read access first. You can see and revoke every permission.</p></div>
      </div>
      <button className="rx-link-light" onClick={()=>go('/documentation')}>Read the security documentation<ArrowRight size={14}/></button>
    </div>
  </section>
}

/* 14 — pricing; gradient only on the Growth border */
const plans=[
  {name:'Starter',cost:49,desc:'A connected foundation for small teams.',features:['3 agent seats','500 AI conversations / month','Unified omnichannel Inbox','Knowledge base & AI drafts','Human approval safeguards']},
  {name:'Growth',cost:149,desc:'More context, capacity and control.',features:['10 agent seats','5,000 AI conversations / month','Everything in Starter','Routing, handoff & automation','Analytics and approvals']},
  {name:'Enterprise',cost:0,desc:'Shaped around your operation.',features:['Custom seats & AI capacity','Everything in Growth','Security & SSO controls','Tailored onboarding','Dedicated support']},
];
const compare=[['Agent seats','3','10','Custom'],['AI conversations / month','500','5,000','Custom'],['Unified Inbox & six channels',true,true,true],['AI suggested replies',true,true,true],['Human handoff & Take Over',true,true,true],['Specialist escalation',false,true,true],['Automation rules','3','Unlimited','Unlimited'],['Analytics & CSV export','Basic',true,true],['SSO & advanced roles',false,false,true]] as const;
export function Pricing({full=false}:{full?:boolean}){
  const {go}=useProduct();const [period,setPeriod]=useState('Monthly');
  return <section className="rx-pricing" id="pricing">
    <div className="rx-pricing-bg" aria-hidden="true"><div className="rx-glow"/><div className="rx-grain"/></div>
    <div className="rx-wrap">
      <SectionHead dark center label={full?'Pricing':'12 · Pricing'} title={<>Simple plans.<br/>Room to grow.</>} copy="Start with the team you have. Every plan keeps humans in control."/>
      <div className="rx-period"><Segments value={period} onChange={setPeriod} items={['Monthly','Annually']}/><span>Save 20% annually</span></div>
      <div className="rx-plans">{plans.map((p,i)=>{const price=period==='Annually'?Math.round(p.cost*.8):p.cost;return <div key={p.name} className={'rx-plan'+(i===1?' featured':'')}>
        <div className="rx-plan-top"><b>{p.name}</b>{i===1&&<span className="rx-tag bright">Most popular</span>}</div>
        <div className="rx-price">{p.cost?<><span>${price}</span><small>per month{period==='Annually'?', billed yearly':''}</small></>:<span className="talk">Let’s talk</span>}</div>
        <p>{p.desc}</p>
        <Button className={i===1?'rx-btn-primary full':'rx-btn-glass full'} onClick={()=>go(p.cost?'/start-trial?plan='+p.name:'/book-demo')}>{p.cost?'Start Free Trial':'Book Demo'}</Button>
        <ul>{p.features.map(f=><li key={f}><Check size={15}/>{f}</li>)}</ul>
      </div>})}</div>
      {full&&<div className="rx-compare" role="region" aria-label="Plan comparison" tabIndex={0}><table><thead><tr><th>Compare plans</th>{plans.map(p=><th key={p.name}>{p.name}</th>)}</tr></thead><tbody>{compare.map(([f,...v])=><tr key={f}><td>{f}</td>{v.map((x,j)=><td key={j}>{x===true?<Check size={16} aria-label="Included"/>:x===false?<span className="rx-dash" aria-label="Not included">—</span>:x}</td>)}</tr>)}</tbody></table></div>}
      <p className="rx-proto-note"><ShieldCheck size={14}/>Illustrative prototype pricing. No payment is taken and no account is charged.</p>
      {!full&&<button className="rx-link-light center" onClick={()=>go('/pricing')}>Compare all features<ArrowRight size={14}/></button>}
    </div>
  </section>
}

/* 15 + 16 — final CTA overlapping the footer */
function FinalCTA({go,tone='light'}:{go:Go;tone?:string}){
  return <section className={'rx-final '+tone}><div className="rx-final-card">
    <div className="rx-final-bg" aria-hidden="true"><div className="rx-ribs"/><div className="rx-grain"/></div>
    <span className="rx-label light">Ready when you are</span>
    <h2>Faster support.<br/>Still human.</h2>
    <p>Bring your channels together in an afternoon. Keep your team in charge of every decision that matters.</p>
    <div className="rx-ctas center"><Button className="rx-btn-primary" onClick={()=>go('/start-trial')}>Start Free Trial<ArrowRight size={16}/></Button><Button className="rx-btn-glass" onClick={()=>go('/book-demo')}>Book Demo</Button></div>
  </div></section>
}
function Footer({go}:{go:Go}){
  const [email,setEmail]=useState('');const [state,setState]=useState<'idle'|'busy'|'done'|'error'>('idle');
  const cols:any[]=[['Product',[['Features','/features'],['Integrations','/integrations'],['Pricing','/pricing'],['Product Demo','/demo']]],['Solutions',[['Order tracking','/solutions'],['Returns & refunds','/solutions'],['Payment issues','/solutions'],['Book a Demo','/book-demo']]],['Resources',[['Documentation','/documentation'],['Help Center','/app/help'],['Start Free Trial','/start-trial'],['Sign In','/sign-in']]],['Legal',[['Privacy','/privacy'],['Terms','/terms']]]];
  return <footer className="rx-footer">
    <div className="rx-footer-inner">
      <div className="rx-footer-visual" aria-hidden="true"><div className="rx-footer-ribs"/><div className="rx-grain"/><p>Every conversation,<br/>a little more human.</p></div>
      <div className="rx-footer-main">
        <div className="rx-footer-top"><form className="rx-news" onSubmit={e=>{e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setState('error');return}setState('busy');setTimeout(()=>setState('done'),700)}} noValidate>
          <label htmlFor="rx-news">Notes on better support, monthly.</label>
          <div><Input id="rx-news" type="email" value={email} onChange={e=>{setEmail(e.target.value);setState('idle')}} placeholder="Work email" aria-invalid={state==='error'}/><Button type="submit" className="rx-btn-solid" disabled={state==='busy'}>{state==='busy'?'Subscribing…':state==='done'?<><Check size={14}/>Subscribed</>:'Subscribe'}</Button></div>
          <small className={state==='error'?'err':''}>{state==='error'?'Enter a valid work email, for example you@company.com.':state==='done'?'Saved in this prototype only. No email will be sent.':'Prototype form. Nothing is sent.'}</small>
        </form><button className="rx-footer-logo" onClick={()=>go('/')} aria-label="ResolveAI home"><Brand/></button></div>
        <div className="rx-footer-cols">{cols.map(([h,links])=><div key={h}><span>{h}</span>{links.map(([t,p]:string[])=><button key={t} onClick={()=>go(p)}>{t}</button>)}</div>)}</div>
        <div className="rx-footer-bottom"><small>© 2026 ResolveAI. A fictional product prototype. NovaWear is a fictional demo company.</small><div className="rx-social">{[['X',<SocialX key="x"/>],['LinkedIn',<SocialIn key="in"/>],['Instagram',<ChannelIcon key="ig" channel="Instagram" size={15}/>],['Email',<Mail key="m" size={15}/>]].map(([l,icon]:any)=><button key={l} title={l+' (prototype link)'} aria-label={'ResolveAI on '+l+' (prototype link)'} onClick={()=>go('/documentation')}>{icon}</button>)}</div></div>
      </div>
    </div>
    <div className="rx-footer-word" aria-hidden="true">ResolveAI</div>
  </footer>
}

function SocialX(){return <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>}
function SocialIn(){return <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
/* Product walkthrough: a real guided tour, never a redirect */
const chapters=[
  {t:'The unified Inbox',d:'Every channel arrives in one list. Filter by urgency, owner or handler, and open a conversation without leaving the queue.',steps:['Pick a view such as Urgent or AI Handling','Open a conversation; it loads in the centre','See order and handler in the context strip'],path:'/app/inbox?view=Urgent'},
  {t:'AI suggested replies',d:'Drafts use verified order data and approved knowledge. Edit, regenerate or dismiss. Nothing sends by itself.',steps:['Review the AI draft under the thread','Regenerate for a different approach','Use it in the composer, then decide to send'],path:'/app/inbox?id=conv-20'},
  {t:'Take Over and handoff',d:'Take Over stops AI immediately and puts you in charge. Handoffs arrive with a summary and a recommended next step.',steps:['Open an AI-handled conversation','Press Take Over; a system event is added','Reply as yourself in the same thread'],path:'/app/inbox?id=conv-19'},
  {t:'Refund approval',d:'AI can recommend a refund. Only an authorised person can approve it, after checking order, return and inspection.',steps:['Open the refund recommendation','Check amount, return status and inspection','Approve or reject; the decision is recorded'],path:'/app/inbox?id=conv-3'},
  {t:'Analytics',d:'Six headline metrics, AI vs human handling and team workload, all updating with the date range.',steps:['Choose a date range','Compare AI and human handling','Export a CSV report'],path:'/app/analytics'},
];
function Walkthrough({go}:{go:Go}){
  const params=useSearchParams();const fromHelp=params?.get('from')==='help';const [c,setC]=useState(0);const ch=chapters[c];
  return <section className="rx-demo">
    <div className="rx-wrap">
      <div className="rx-demo-top">{fromHelp?<button className="rx-back" onClick={()=>go('/app/help')}><ChevronLeft size={15}/>Back to Help</button>:<span className="rx-label">Product walkthrough</span>}<h1>See ResolveAI work, step by step.</h1><p>Five short chapters using the NovaWear demo data. Open any chapter in the live product when you’re ready.</p></div>
      <div className="rx-demo-grid">
        <ol className="rx-chapters">{chapters.map((x,i)=><li key={x.t}><button className={i===c?'active':''} onClick={()=>setC(i)} aria-current={i===c?'step':undefined}><span>{String(i+1).padStart(2,'0')}</span>{x.t}</button></li>)}</ol>
        <div className="rx-demo-stage">
          <div className="rx-demo-visual">{c===0?<OmniMini/>:c===1?<DraftMini/>:c===2?<TakeoverMini/>:c===3?<RefundMini/>:<AnalyticsMini/>}</div>
          <div className="rx-demo-copy"><small>Chapter {c+1} of {chapters.length}</small><h2>{ch.t}</h2><p>{ch.d}</p><ol>{ch.steps.map(s=><li key={s}>{s}</li>)}</ol>
            <div className="rx-demo-actions"><Button variant="ghost" disabled={c===0} onClick={()=>setC(c-1)}><ChevronLeft size={15}/>Previous</Button>{c<chapters.length-1?<Button className="rx-btn-solid" onClick={()=>setC(c+1)}>Next chapter<ChevronRight size={15}/></Button>:<Button className="rx-btn-solid" onClick={()=>go(fromHelp?'/app/help':'/start-trial')}>{fromHelp?'Finish and return to Help':'Start Free Trial'}</Button>}<Button variant="outline" onClick={()=>go(ch.path)}>Open this in the app<ArrowRight size={15}/></Button></div></div>
        </div>
      </div>
    </div>
  </section>
}
function OmniMini(){return <div className="rx-mini-list">{[['Emily Carter','I was charged twice.','Email','Urgent'],['James Wilson','I don’t recognise a sign-in.','WhatsApp','Urgent'],['Sarah Miller','Where is my order?','Website Chat','AI Handling'],['David Shah','Delivery is late.','WhatsApp','Human']].map(([n,t,c,s])=><div className="rx-mini-row" key={n}><Avatar name={n} size={28}/><div><b>{n}</b><small>{t}</small></div><span className={'rx-tag '+(s==='AI Handling'?'ai':s==='Urgent'?'urgent':'human')}>{s}</span><ChannelIcon channel={c} size={13}/></div>)}</div>}
function DraftMini(){return <div className="rx-panel rx-draft flat"><div className="rx-draft-head"><span className="rx-duty-icon sm"><Sparkles size={14}/></span><b>AI Suggested Reply</b><span className="rx-tag ai">Draft</span></div><p className="rx-draft-text">Hi David, I’ve reviewed #NW-4790. Tracking confirms a transit delay. I’ll check the next update and explain the available options.</p><div className="rx-draft-actions static"><span>Edit</span><span>Regenerate</span><span>Dismiss</span><span className="solid">Use response</span></div></div>}
function TakeoverMini(){return <div className="rx-mini-convo"><div className="rx-ai-bar"><Sparkles size={13}/>AI is handling this conversation<span className="rx-fake-btn warm">Take Over</span></div><div className="rx-msg customer">My order was supposed to arrive yesterday.</div><div className="rx-event"><Headphones size={11}/>Ryan took over from AI</div><div className="rx-msg human"><span className="rx-author"><Headphones size={10}/>Ryan · Human</span>Hi Sarah, I’m Ryan. I’ll confirm the latest delivery date now.</div></div>}
function RefundMini(){return <div className="rx-panel rx-refund"><small>AI Recommendation</small><h3>Aisha appears eligible for a ₹2,499 refund.</h3><dl><div><dt>Order</dt><dd>#NW-5002</dd></div><div><dt>Return</dt><dd>Received</dd></div><div><dt>Inspection</dt><dd>Approved</dd></div></dl><div className="rx-approve"><span className="rx-fake-btn ghost">Reject</span><span className="rx-fake-btn">Approve Refund</span></div><p><ShieldCheck size={13}/>Only an authorised person can approve.</p></div>}
function AnalyticsMini(){return <div className="rx-mini-kpis">{[['Conversations','4,812'],['Resolution Rate','92%'],['Avg. Response','2m 14s'],['CSAT','4.7 / 5'],['AI Resolution','63%'],['AI → Human','18%']].map(([l,v])=><div key={l}><small>{l}</small><b>{v}</b></div>)}</div>}

/* Solutions: commerce workflows and who owns them */
function Solutions({go}:{go:Go}){
  const flows=[['Where is my order?','AI','Checks carrier tracking and replies with verified status.','/app/inbox?view=AI%20Handling',Truck],['Late or failed delivery','AI → Human','AI shares tracking; repeated delays or deadlines hand off with a summary.','/app/inbox?id=conv-19',ArrowRightLeft],['Return request','AI','Explains policy, checks eligibility and starts the return.','/app/knowledge',Undo2],['Refund approval','Human','AI prepares a recommendation; a person approves or rejects.','/app/inbox?id=conv-3',Wallet],['Duplicate charge','Human','Routed to Billing as urgent, with payment context attached.','/app/inbox?id=conv-1',CreditCard],['Account security','Human','Escalated to Security; AI never changes account access.','/app/inbox?id=conv-2',KeyRound]] as const;
  return <><div className="rx-sub-hero"><div className="rx-hero-bg" aria-hidden="true"><div className="rx-glow"/><div className="rx-grain"/></div><div className="rx-wrap"><span className="rx-label light">Solutions for commerce</span><h1>The moments that decide<br/>whether customers come back.</h1><p>From “where’s my order?” to a disputed payment, each workflow has a clear owner.</p></div></div>
  <section className="rx-section"><div className="rx-wrap"><div className="rx-flows">{flows.map(([t,o,d,p,I])=><button key={t} className="rx-flow" onClick={()=>go(p)}><span className={'rx-icon-box '+(o==='Human'?'human':'ai')}><I size={18}/></span><div><b>{t}</b><p>{d}</p></div><span className={'rx-tag '+(o==='AI'?'ai':o==='Human'?'human':'mixed')}>{o}</span><ChevronRight size={16}/></button>)}</div></div></section>
  <CollaborationSection/></>
}

function Docs({go}:{go:Go}){
  const [search,setSearch]=useState('');const [doc,setDoc]=useState(articles[0]);
  const cats=Array.from(new Set(articles.map(a=>a.category)));
  const matched=articles.filter(a=>(a.title+' '+a.category+' '+a.body).toLowerCase().includes(search.toLowerCase()));
  const active=matched.find(a=>a.title===doc.title)||matched[0];
  return <section className="rx-docs"><div className="rx-wrap">
    <div className="rx-docs-head"><span className="rx-label">Documentation</span><h1>Clear answers for your support operation.</h1><div className="rx-docs-search"><SearchField value={search} onChange={setSearch} placeholder="Search guides, e.g. Instagram"/></div></div>
    <div className="rx-docs-grid">
      <nav aria-label="Documentation">{cats.map(c=>{const list=matched.filter(a=>a.category===c);if(!list.length)return null;return <div key={c}><span>{c}</span>{list.map(a=><button key={a.title} className={active?.title===a.title?'active':''} onClick={()=>setDoc(a)}>{a.title}</button>)}</div>})}</nav>
      {active?<article><div className="rx-crumbs"><button onClick={()=>setSearch('')}>Docs</button><ChevronRight size={13}/><span>{active.category}</span><ChevronRight size={13}/><b>{active.title}</b></div><h2>{active.title}</h2><p className="lead">{active.body}</p>
        <div className="rx-doc-callout"><ShieldCheck size={16}/><p>In this prototype, actions use NovaWear demo data. No customer, payment or external service is contacted.</p></div>
        <Button className="rx-btn-solid" onClick={()=>go(guideWorkflow(active.category))}>Open this workflow<ArrowRight size={15}/></Button>
        <h3>Related articles</h3><div className="rx-related">{articles.filter(a=>a.category===active.category&&a.title!==active.title).concat(articles.filter(a=>a.category!==active.category).slice(0,2)).slice(0,3).map(a=><button key={a.title} onClick={()=>setDoc(a)}><small>{a.category}</small><b>{a.title}</b><ChevronRight size={14}/></button>)}</div></article>
      :<EmptyState title="No matching guides" description="Try a different word, such as “refund” or “Instagram”."><Button variant="outline" onClick={()=>setSearch('')}>Clear search</Button></EmptyState>}
    </div>
  </div></section>
}

function MarketingNav({go,path}:{go:Go;path:string}){
  const [menu,setMenu]=useState(false);const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const on=()=>setScrolled(window.scrollY>24);on();window.addEventListener('scroll',on,{passive:true});return()=>window.removeEventListener('scroll',on)},[]);
  return <header className={'rx-nav'+(scrolled?' scrolled':'')}>
    <div className="rx-nav-inner">
      <button className="rx-nav-brand" onClick={()=>go('/')} aria-label="ResolveAI home"><Brand/></button>
      <nav aria-label="Main">{nav.map(([t,p])=><button key={t} className={path===p||(p==='/resources'&&path==='/documentation')?'active':''} onClick={()=>go(p)}>{t}</button>)}</nav>
      <div className="rx-nav-actions"><button className="rx-nav-link" onClick={()=>go('/sign-in')}>Sign In</button><Button className="rx-btn-primary sm" onClick={()=>go('/start-trial')}>Start Free Trial</Button>
        <Sheet open={menu} onOpenChange={setMenu}><SheetTrigger asChild><Button className="rx-burger" variant="ghost" size="icon" aria-label="Open navigation"><Menu/></Button></SheetTrigger>
          <SheetContent className="rx-sheet"><SheetHeader><SheetTitle><Brand/></SheetTitle></SheetHeader><div className="rx-sheet-links">{nav.map(([t,p])=><button key={t} onClick={()=>{setMenu(false);go(p)}}>{t}<ChevronRight size={16}/></button>)}<button onClick={()=>{setMenu(false);go('/demo')}}>Product Demo<ChevronRight size={16}/></button></div><div className="rx-sheet-ctas"><Button className="rx-btn-solid full" onClick={()=>{setMenu(false);go('/start-trial')}}>Start Free Trial</Button><Button variant="outline" className="full" onClick={()=>{setMenu(false);go('/book-demo')}}>Book Demo</Button><Button variant="ghost" className="full" onClick={()=>{setMenu(false);go('/sign-in')}}>Sign In</Button></div></SheetContent></Sheet></div>
    </div>
  </header>
}

function SubHero({label,title,copy,go,demo=true}:{label:string;title:React.ReactNode;copy:string;go:Go;demo?:boolean}){
  return <div className="rx-sub-hero"><div className="rx-hero-bg" aria-hidden="true"><div className="rx-glow"/><div className="rx-ribs soft"/><div className="rx-grain"/></div><div className="rx-wrap"><span className="rx-label light">{label}</span><h1>{title}</h1><p>{copy}</p>{demo&&<div className="rx-ctas"><Button className="rx-btn-primary" onClick={()=>go('/start-trial')}>Start Free Trial<ArrowRight size={16}/></Button><Button className="rx-btn-glass" onClick={()=>go('/demo')}><Play size={15}/>Watch the walkthrough</Button></div>}</div></div>
}

export function Marketing({path}:{path:string}){
  const {go}=useProduct();
  const legal=path==='/privacy'||path==='/terms';
  const isDocs=path==='/documentation'||path==='/resources';
  let page:React.ReactNode;
  if(path==='/')page=<><Hero go={go}/><TrustStrip/><OmnichannelSection go={go}/><CollaborationSection/><ContextSection go={go}/><HandoffSection go={go}/><CopilotSection go={go}/><KnowledgeSection go={go}/><AutomationSection go={go}/><AnalyticsSection go={go}/><WidgetSection/><IntegrationSection/><SecuritySection go={go}/><Pricing/></>;
  else if(path==='/features')page=<><SubHero go={go} label="Product" title={<>One workspace for AI<br/>and the people behind it.</>} copy="Unified Inbox, customer context, AI Copilot, automation, knowledge and analytics, with human control built into every step."/><OmnichannelSection go={go}/><ContextSection go={go}/><HandoffSection go={go}/><CopilotSection go={go}/><KnowledgeSection go={go}/><AutomationSection go={go}/><AnalyticsSection go={go}/><SecuritySection go={go}/></>;
  else if(path==='/solutions')page=<Solutions go={go}/>;
  else if(path==='/integrations')page=<><SubHero go={go} demo={false} label="Integrations" title={<>Bring the context<br/>your team needs.</>} copy="Commerce, payments, shipping and six customer channels, connected to the same conversation."/><IntegrationSection full/></>;
  else if(path==='/pricing')page=<><Pricing full/><section className="rx-section rx-faq"><div className="rx-wrap narrow"><SectionHead center label="Questions" title="Before you start"/><Accordion type="single" collapsible>{[['Is there a free trial?','Yes. The trial needs no credit card. In this prototype, sign-up is simulated and no account is created.'],['Can AI issue refunds?','No. AI can recommend and prepare a refund. Only an authorised person can approve it, on every plan.'],['What counts as an AI conversation?','A conversation where AI sends at least one reply. Handoffs to people are not counted twice.'],['Can we change plans later?','Yes, at any time from Settings → Billing. Changes show a review step first.']].map(([q,a])=><AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent>{a}</AccordionContent></AccordionItem>)}</Accordion></div></section></>;
  else if(path==='/demo')page=<Walkthrough go={go}/>;
  else if(isDocs)page=<Docs go={go}/>;
  else if(legal)page=<section className="rx-legal"><div className="rx-wrap narrow"><span className="rx-label">Prototype information</span><h1>{path==='/privacy'?'Privacy':'Terms of use'}</h1><p>ResolveAI is a fictional product prototype, and NovaWear is a fictional demo company. Sign-in, integrations, messages and financial approvals are simulated. No customer messages, demo requests or charges are sent to any external service.</p><p>Preferences are kept in this browser session only. This page is illustrative and is not a legal policy for a commercial service.</p><Button className="rx-btn-solid" onClick={()=>go('/')}>Return to Homepage</Button></div></section>;
  else page=<section className="rx-legal"><div className="rx-wrap narrow"><span className="rx-label">Page not found</span><h1>This page doesn’t exist.</h1><p>The link may be outdated. Try the homepage or the documentation.</p><div className="rx-ctas"><Button className="rx-btn-solid" onClick={()=>go('/')}>Homepage</Button><Button variant="outline" onClick={()=>go('/documentation')}>Documentation</Button></div></div></section>;
  const dark=path==='/'||path==='/features'||path==='/solutions'||path==='/integrations'||path==='/pricing';
  return <div className={'rx-marketing'+(dark?' over-dark':'')}>
    <MarketingNav go={go} path={path}/>
    <main id="main-content">{page}{!legal&&path!=='/demo'&&<FinalCTA go={go} tone={path==='/'||path==='/features'?'dark':path==='/solutions'?'white':'light'}/>}</main>
    <Footer go={go}/>
  </div>
}
