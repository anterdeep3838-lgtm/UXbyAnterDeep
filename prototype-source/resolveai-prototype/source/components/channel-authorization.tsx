"use client";
import {useEffect,useRef,useState} from 'react';
import {ShieldCheck} from 'lucide-react';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Button,Field,Picker} from './product-ui';

export function ChannelAuthorization({channel,onClose,onConnected,onWidget,widgetLabel='Open installation settings'}:{channel:string;onClose:()=>void;onConnected:(channel:string)=>void;onWidget:()=>void;widgetLabel?:string}){
  const generation=useRef(0);
  const [stage,setStage]=useState(0);
  const [busy,setBusy]=useState(false);
  useEffect(()=>{generation.current++;setStage(0);setBusy(false);return()=>{generation.current++}},[channel]);
  return <Dialog open={!!channel} onOpenChange={open=>!open&&onClose()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Connect {channel}</DialogTitle>
        <DialogDescription>{channel==='Instagram'?'Authorize your business account through Meta. Never enter an Instagram password here.':'Preview the channel authorization and permission flow. All connections are simulated.'}</DialogDescription>
      </DialogHeader>
      {channel==='Website Chat'?<>
        <p>Website Chat requires an installed script, not account authorization. Preparing onboarding does not install it.</p>
        <Button onClick={()=>{onClose();onWidget()}}>{widgetLabel}</Button>
      </>:stage===0?<>
        <div className="safety-note"><ShieldCheck/><p>Read incoming messages and reply on behalf of NovaWear. No payment or account-security actions.</p></div>
        <Button onClick={()=>setStage(1)}>{channel==='Instagram'?'Continue with Meta (demo)':'Continue authorization (demo)'}</Button>
      </>:<>
        <Field label="Business account"><Picker value="NovaWear" onChange={()=>{}} options={['NovaWear']}/></Field>
        <p className="helper">{channel==='Instagram'?'@novawear · Instagram business account':'NovaWear support account'}</p>
        <Button disabled={busy} onClick={async()=>{setBusy(true);const chosen=channel;const request=generation.current;await new Promise(r=>setTimeout(r,650));if(request!==generation.current)return;onConnected(chosen);setBusy(false);onClose()}}>{busy?'Connecting…':'Confirm permissions & connect'}</Button>
      </>}
    </DialogContent>
  </Dialog>;
}
