"use client";
import {useMemo,useRef,useState} from 'react';
import {Slider} from '@/components/ui/slider';
import {Button,Input} from './product-ui';

function toHSV(hex:string){
  const rgb=hex.match(/[a-f\d]{2}/gi)?.map(x=>parseInt(x,16)/255)||[0,0,0];
  const [r,g,b]=rgb,max=Math.max(...rgb),min=Math.min(...rgb),d=max-min;
  let h=d===0?0:max===r?((g-b)/d)%6:max===g?(b-r)/d+2:(r-g)/d+4;
  return {h:(h*60+360)%360,s:max?d/max*100:0,v:max*100};
}
function toHex(h:number,s:number,v:number){
  const c=v/100*s/100,x=c*(1-Math.abs((h/60)%2-1)),m=v/100-c;
  const rgb=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];
  return '#'+rgb.map(n=>Math.round((n+m)*255).toString(16).padStart(2,'0')).join('');
}
export function WidgetColorPicker({value,onChange,recent}:{value:string;onChange:(value:string)=>void;recent:string[]}){
  const valid=/^#[a-f\d]{6}$/i.test(value);
  const hsv=useMemo(()=>toHSV(valid?value:'#155d55'),[value,valid]);
  const [selectedHue,setSelectedHue]=useState(hsv.h);
  const hue=hsv.s===0?selectedHue:hsv.h;
  const field=useRef<HTMLDivElement>(null);
  const change=(h:number,s:number,v:number)=>{setSelectedHue(h);onChange(toHex(h,s,v))};
  const point=(e:React.PointerEvent<HTMLDivElement>)=>{
    const bounds=field.current!.getBoundingClientRect();
    change(hue,Math.max(0,Math.min(100,(e.clientX-bounds.left)/bounds.width*100)),Math.max(0,Math.min(100,100-(e.clientY-bounds.top)/bounds.height*100)));
  };
  return <div className="widget-color-picker">
    <span className="form-label">Brand color</span>
    <div ref={field} className="saturation-field" role="slider" tabIndex={0} aria-label="Saturation and brightness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(hsv.s)} aria-valuetext={'Saturation '+Math.round(hsv.s)+'%, brightness '+Math.round(hsv.v)+'%. Left and right adjust saturation; up and down adjust brightness.'} style={{backgroundColor:toHex(hue,100,100)}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);point(e)}} onPointerMove={e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))point(e)}} onKeyDown={e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const step=e.shiftKey?10:1;change(hue,Math.max(0,Math.min(100,hsv.s+(e.key==='ArrowRight'?step:e.key==='ArrowLeft'?-step:0))),Math.max(0,Math.min(100,hsv.v+(e.key==='ArrowUp'?step:e.key==='ArrowDown'?-step:0))))}}>
      <span className="color-cursor" style={{left:hsv.s+'%',top:100-hsv.v+'%'}}/>
    </div>
    <div className="hue-control"><span>Hue</span><Slider className="hue-slider" aria-label="Color hue" min={0} max={359} step={1} value={[Math.round(hue)]} onValueChange={([h])=>change(h,hsv.s,hsv.v)}/></div>
    <div className="color-controls"><span className="color-preview" style={{background:valid?value:'#155d55'}} aria-label="Selected color preview"/><Input aria-label="Widget color hexadecimal" value={value} maxLength={7} onChange={e=>onChange(e.target.value)}/></div>
    <div className="recent-colors"><span>Recent colors</span>{recent.map(c=><button type="button" key={c} aria-label={'Use '+c} aria-pressed={value.toLowerCase()===c.toLowerCase()} style={{background:c}} onClick={()=>onChange(c)}/>)}<Button size="sm" variant="ghost" onClick={()=>onChange('#155d55')}>Reset</Button></div>
  </div>;
}
