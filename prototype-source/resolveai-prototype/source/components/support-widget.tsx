"use client";
import {useState,useEffect,useRef} from 'react';
import {usePathname} from 'next/navigation';
import {MessageSquare,Send,Paperclip,Headphones} from 'lucide-react';
import {toast} from 'sonner';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Button,Input,Loading} from './product-ui';
import {useProduct} from './product-state';
import {useDemoState} from '@/hooks/use-demo-state';
import {defaultWidgetPreferences,type Message} from '@/lib/product';
export function SupportWidget(){
 const {widgetOpen,setWidgetOpen,widgetColor,widgetGreeting,data,update,notify}=useProduct();
 const path=usePathname()||'/';const corporate=path.startsWith('/app/help');
 const [preferences]=useDemoState('widget-preferences',defaultWidgetPreferences);
 const [position]=useDemoState('widget-position','Bottom right');
 const [aiEnabled]=useDemoState('ai-enabled',true);
 const [draft,setDraft]=useState('');const [busy,setBusy]=useState(false);
 const [corporateMessages,setCorporateMessages]=useState<Message[]>([]);
 const [file,setFile]=useState('');const fileRef=useRef<HTMLInputElement>(null);const scrollRef=useRef<HTMLDivElement>(null);
 const sarah=data.find(c=>c.id==='conv-19')!;const latest=useRef(data);latest.current=data;
 const messages=corporate?corporateMessages:sarah.messages.filter(m=>m.kind!=='note'&&(m.kind!=='event'||/took over|handed|joined|human reply is pending|resolved the conversation/i.test(m.text))&&!/Internal note:/i.test(m.text));
 const human=!corporate&&sarah.handler!=='AI';const agent=sarah.handler==='Unassigned'?'Our support team':sarah.handler;
 const authPath=['/sign-in','/start-trial','/sign-up','/forgot-password','/reset-password','/book-demo','/onboarding','/demo'].includes(path);const visible=corporate||(!path.startsWith('/app')&&!authPath&&preferences.visibility!=='Hidden');
 const rgb=widgetColor.match(/[a-f\d]{2}/gi)?.map(x=>parseInt(x,16))||[21,93,85];const ink=(rgb[0]*299+rgb[1]*587+rgb[2]*114)/1000>160?'#153a32':'#fff';
 useEffect(()=>{scrollRef.current?.scrollTo(0,scrollRef.current.scrollHeight)},[sarah.messages,corporateMessages,busy]);
 const send=async(text:string)=>{
  if(!text.trim()||busy)return;
  const customer:Message={id:crypto.randomUUID(),kind:'customer',text:text.trim(),attachment:file||undefined,time:'Just now'};
  setDraft('');setFile('');setBusy(true);
  if(corporate)setCorporateMessages(m=>[...m,customer]);else update(sarah.id,{preview:customer.text,status:'Open',unread:true,messages:[customer]});
  try{
   await new Promise(r=>setTimeout(r,750));
   if(corporate){setCorporateMessages(m=>[...m,{id:crypto.randomUUID(),kind:'ai',author:'ResolveAI Support',text:'I can help with your workspace. Your request stays in this demo support session. For '+text.toLowerCase()+', use the related Help guide or Contact Support form; no external request has been sent.',time:'Just now'}]);return}
   const current=latest.current.find(c=>c.id===sarah.id)!;
   if(current.handler!=='AI'){
    update(current.id,{messages:[{id:crypto.randomUUID(),kind:'event',text:agent+' has your message and order context. A human reply is pending in this demo.',time:'Just now'}]});return;
   }
   const handoff=!aiEnabled||/human|talk to support|charged|fraud|security|approve.*refund|payment dispute/i.test(text);
   if(handoff){update(current.id,{handler:'Maya Patel',handoff:true,confidence:'Low'},'AI handed the conversation to Maya Patel. Order context and conversation history preserved. Maya joined; a human reply is pending in this demo.');notify('Sarah Miller handed to Maya Patel');return}
   const reply=/refund|return/i.test(text)?'I can explain the policy and prepare a request for '+current.order+'. Any refund needs human approval; I won’t issue one automatically.':/address/i.test(text)?'I have '+current.order+'. Since it has shipped, an address change needs a support review. I can bring in our team.':'Order '+current.order+' is delayed in transit. There is no confirmed new delivery date in the available tracking. Our team can review the next update with you.';
   update(current.id,{messages:[{id:crypto.randomUUID(),kind:'ai',author:preferences.assistantName,text:reply,time:'Just now'}]});
  }catch{toast.error('Message could not be processed. Please try again.')}finally{setBusy(false)}
 };
 return <>{visible&&<button className="widget-launcher" onClick={()=>setWidgetOpen(true)} style={{background:widgetColor,color:ink,...(position==='Bottom left'?{left:23,right:'auto'}:{right:23,left:'auto'})}} aria-label={corporate?'Contact ResolveAI Support':'Open NovaWear Support'}>{preferences.launcher==='Headphones'?<Headphones size={23}/>:<MessageSquare size={23}/>}</button>}
 <Dialog open={widgetOpen} onOpenChange={setWidgetOpen}><DialogContent className={'support-dialog '+(position==='Bottom left'?'widget-left':'')}><div className="support-header" style={{background:widgetColor,color:ink,'--widget-ink':ink} as React.CSSProperties}><span className="widget-logo">{!corporate&&preferences.logo?<img src={preferences.logo} alt=""/>:corporate?'R':'N'}</span><div><DialogTitle>{corporate?'ResolveAI Support':'NovaWear Support'}</DialogTitle><DialogDescription className="support-header-caption">{corporate?'Workspace support · demo':human?agent+' · Human support':preferences.assistantName+' · Human support available'}</DialogDescription></div></div>
 <div className="support-scroll" ref={scrollRef}><h3>Hi {corporate?'Ryan':'Sarah'} 👋</h3><p>{corporate?'How can we help?':widgetGreeting}</p>
 {!corporate&&<><div className="support-order"><b>Need help with Order {sarah.order}?</b><span>{sarah.orderStatus} · {sarah.product}</span></div><p className="widget-hours">Human support · {preferences.supportHours}</p></>}
 <div className="support-quick">{(corporate?['Account & Billing','Channels','AI & Automation','Technical Issue','Something Else']:preferences.quickActions).map(t=><Button variant="outline" key={t} disabled={busy} onClick={()=>send(t)}>{t}</Button>)}</div>
 {messages.map(m=>m.kind==='event'?<p className="widget-system-event" key={m.id}>{m.text}</p>:<div className={'widget-message '+(m.kind==='customer'?'customer':'support')} key={m.id}><span>{m.kind==='customer'?'You':corporate?'ResolveAI Support':m.author|| (m.kind==='human'?'Ryan · Support':preferences.assistantName)}</span><p>{m.text}</p>{m.attachment&&<span className="attachment-chip"><Paperclip size={13}/>{m.attachment}</span>}</div>)}
 {busy&&<Loading label={human?'Passing your message to the team':'Checking your context'}/>}</div>
 <form className="support-composer" onSubmit={e=>{e.preventDefault();send(draft|| (file?'Attachment':''))}}>{file&&<span className="attachment-chip">{file}<button type="button" onClick={()=>setFile('')}>Remove</button></span>}<div><input ref={fileRef} type="file" className="hidden" onChange={e=>{const selected=e.target.files?.[0];if(selected&&selected.size>10*1024*1024){toast.error('Attachment is too large. Choose a file under 10 MB.');return}setFile(selected?.name||'');e.target.value=''}}/><Button type="button" size="icon" variant="ghost" aria-label="Attach a file" disabled={busy} onClick={()=>fileRef.current?.click()}><Paperclip size={17}/></Button><Input aria-label="Type your question" placeholder="Type your question…" value={draft} onChange={e=>setDraft(e.target.value)}/><Button size="icon" type="submit" disabled={!draft.trim()&&!file||busy} aria-label="Send question"><Send size={17}/></Button></div><small>Powered by ResolveAI · Interactive demo</small></form></DialogContent></Dialog></>;
}
