"use client";
import {useCallback,useRef,useSyncExternalStore,type SetStateAction} from 'react';
const values=new Map<string,unknown>();
const listeners=new Map<string,Set<()=>void>>();
// A single session-local store keeps settings consistent across mounted screens.
// No real customer records, provider credentials, or authentication are stored.
export function useDemoState<T>(key:string,initial:T){
  const fallback=useRef(initial);
  const snapshot=useCallback(()=>{
    if(typeof window==='undefined')return fallback.current;
    if(!values.has(key)){
      let value=fallback.current;
      try{const saved=sessionStorage.getItem('resolveai-demo-'+key);if(saved)value=JSON.parse(saved)}catch{}
      values.set(key,value);
    }
    return values.get(key) as T;
  },[key]);
  const subscribe=useCallback((listener:()=>void)=>{
    if(!listeners.has(key))listeners.set(key,new Set());
    listeners.get(key)!.add(listener);
    return()=>{listeners.get(key)?.delete(listener)};
  },[key]);
  const value=useSyncExternalStore(subscribe,snapshot,()=>fallback.current);
  const setValue=useCallback((next:SetStateAction<T>)=>{
    const updated=typeof next==='function'?(next as (previous:T)=>T)(snapshot()):next;
    values.set(key,updated);
    try{sessionStorage.setItem('resolveai-demo-'+key,JSON.stringify(updated))}catch{}
    listeners.get(key)?.forEach(listener=>listener());
  },[key,snapshot]);
  return [value,setValue] as const;
}
