"use client";
import {useEffect,useState} from 'react';
import {Check,ShieldCheck,Headphones,Search,Paperclip,Send,Sparkles,ArrowRight,Package,Clock3,ArrowRightLeft} from 'lucide-react';
import {Brand,Button,Avatar,ChannelIcon} from './product-ui';

/* Plays a short support story in a loop: AI answers, confidence drops, Maya joins the same thread. */
export function useStoryStep(total:number,interval=2600){
  const [step,setStep]=useState(total-1);
  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){setStep(total-1);return}
    setStep(0);
    const id=window.setInterval(()=>setStep(s=>(s+1)%(total+1)),interval);
    return()=>window.clearInterval(id);
  },[total,interval]);
  return Math.min(step,total-1);
}

const people=[
  {name:'Sarah Miller',text:'My order was supposed to arrive yesterday.',channel:'Website Chat',time:'now'},
  {name:'David Shah',text:'Delivery is late again.',channel:'WhatsApp',time:'4m'},
  {name:'Emily Carter',text:'I was charged twice.',channel:'Email',time:'6m'},
  {name:'Aisha Khan',text:'Can you approve my refund?',channel:'Instagram',time:'9m'},
];

export function ProductVisual({onExplore,compact=false}:{onExplore?:(id?:string)=>void;compact?:boolean}){
  const step=useStoryStep(5);
  const human=step>=3;
  return <div className={'rx-stage'+(compact?' compact':'')} aria-label="ResolveAI Inbox preview: an AI conversation handed to a human agent">
    <div className="rx-window">
      <div className="rx-window-bar">
        <Brand small/>
        <span className="rx-crumb">NovaWear <i>/</i> <b>Inbox</b></span>
        <span className="rx-window-search"><Search size={12}/>Search</span>
        <Avatar name="Ryan Smith" size={24}/>
      </div>
      <div className="rx-window-body">
        <div className="rx-list">
          <div className="rx-list-head"><b>Open</b><span>248</span></div>
          {people.map((p,i)=><button key={p.name} className={'rx-row'+(i===0?' active':'')} onClick={()=>onExplore?.(['conv-19','conv-20','conv-1','conv-3'][i])}>
            <Avatar name={p.name} size={26}/>
            <span className="rx-row-copy"><b>{p.name}</b><small>{p.text}</small></span>
            <span className="rx-row-meta"><ChannelIcon channel={p.channel} size={12}/><small>{p.time}</small></span>
          </button>)}
        </div>
        <div className="rx-convo">
          <div className="rx-convo-head">
            <div><b>Sarah Miller</b><small><ChannelIcon channel="Website Chat" size={11}/> Website Chat · #NW-4821</small></div>
            <span className={'rx-handler '+(human?'human':'ai')}>{human?<><Headphones size={11}/>Maya Patel</>:<><Sparkles size={11}/>AI Handling</>}</span>
          </div>
          <div className="rx-context-strip"><Package size={12}/><span>Classic Denim Jacket (L)</span><i/><span>₹2,499</span><i/><span className="warn">Delayed in transit</span></div>
          <div className="rx-thread">
            <div className="rx-msg customer">My order was supposed to arrive yesterday. Can you help?</div>
            {step===0&&<div className="rx-typing" aria-hidden="true"><span/><span/><span/></div>}
            {step>=1&&<div className="rx-msg ai"><span className="rx-author"><Sparkles size={10}/>NovaWear AI</span>Tracking shows #NW-4821 is delayed at your local hub. I don’t have a confirmed new date yet.</div>}
            {step>=2&&<div className="rx-msg customer">This is the second delay. I need it for Saturday.</div>}
            {step>=3&&<div className="rx-event"><ArrowRightLeft size={11}/>AI handed off to Maya · context kept</div>}
            {step>=4&&<div className="rx-msg human"><span className="rx-author"><Headphones size={10}/>Maya · Human</span>Hi Sarah, I’m Maya. I have your order and messages, so no need to repeat anything.</div>}
          </div>
          <button className="rx-composer" onClick={()=>onExplore?.('conv-19')}><Paperclip size={13}/><span>{human?'Reply to Sarah…':'AI is handling · Take Over to reply'}</span><Send size={13}/></button>
        </div>
      </div>
    </div>
    <div className={'rx-float rx-summary'+(step>=2?' on':'')}>
      <div className="rx-float-head"><span>AI Handoff Summary</span><em className={step>=2?'low':''}>Confidence {step>=2?'Low':'High'}</em></div>
      <dl><div><dt>Issue</dt><dd>Delayed order</dd></div><div><dt>Order</dt><dd>#NW-4821</dd></div><div><dt>Next step</dt><dd>Confirm latest ETA</dd></div></dl>
    </div>
    <div className={'rx-float rx-human'+(human?' on':'')}>
      <span className="rx-human-avatar"><Avatar name="Maya Patel" size={30}/></span>
      <div><b>Maya joined the conversation</b><small>Same thread · full context</small></div>
      <Check size={14}/>
    </div>
    <div className="rx-float rx-metric">
      <small>Resolved today</small>
      <b>394</b>
      <svg viewBox="0 0 90 26" aria-hidden="true"><path d="M1 22 C12 20 16 13 26 15 S40 7 50 10 S66 4 74 6 S84 2 89 2"/></svg>
    </div>
  </div>
}

export function Hero({go}:{go:(path:string)=>void}){
  return <section className="rx-hero">
    <div className="rx-hero-bg" aria-hidden="true"><div className="rx-glow"/><div className="rx-ribs"/><div className="rx-beam"/><div className="rx-grain"/></div>
    <div className="rx-hero-inner">
      <div className="rx-hero-copy">
        <span className="rx-pill"><span className="rx-pill-dot"/>AI assists · Humans stay in control</span>
        <h1>AI-powered customer support, <span>with humans when it matters.</span></h1>
        <p>ResolveAI brings every channel, order and conversation into one workspace. AI handles the routine. Your team handles the moments that need judgment.</p>
        <div className="rx-ctas">
          <Button className="rx-btn-primary" onClick={()=>go('/start-trial')}>Start Free Trial<ArrowRight size={16}/></Button>
          <Button className="rx-btn-glass" onClick={()=>go('/book-demo')}>Book Demo</Button>
        </div>
        <ul className="rx-proof">
          <li><Check size={14}/>No credit card required</li>
          <li><Clock3 size={14}/>Set up in an afternoon</li>
          <li><ShieldCheck size={14}/>Refunds always need a human</li>
        </ul>
      </div>
      <ProductVisual onExplore={id=>go('/app/inbox?id='+(id||'conv-19'))}/>
    </div>
  </section>
}
