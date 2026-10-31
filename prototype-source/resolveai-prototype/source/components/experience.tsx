"use client";
import {usePathname} from 'next/navigation';
import {lazy,Suspense,useEffect,useState} from 'react';
import {ProductProvider} from './product-state';
import {Marketing} from './marketing';
import {AuthExperience} from './onboarding';
const Workspace=lazy(()=>import('./workspace').then(module=>({default:module.Workspace})));
function LoadingSkeleton(){return <main id="main-content" className="app-skeleton" aria-busy="true"><p className="sr-only" role="status">Loading your workspace…</p><aside className="sk-side" aria-hidden="true"><i className="sk sk-logo"/>{Array.from({length:8},(_,i)=><i key={i} className="sk sk-nav"/>)}</aside><section className="sk-main" aria-hidden="true"><i className="sk sk-bar"/><i className="sk sk-title"/><div className="sk-kpis">{Array.from({length:6},(_,i)=><i key={i} className="sk sk-kpi"/>)}</div><i className="sk sk-panel"/><i className="sk sk-panel short"/></section></main>}
function WorkspaceSession(){const [ready,setReady]=useState(false);useEffect(()=>setReady(true),[]);return ready?<Workspace/>:<LoadingSkeleton/>}
import {SupportWidget} from './support-widget';
export function ProductApp(){return <ProductProvider><Suspense fallback={<LoadingSkeleton/>}><Experience/></Suspense><SupportWidget/></ProductProvider>}
export function Experience(){const path=usePathname()||'/';return <><a href="#main-content" className="skip-link">Skip to content</a>{path.startsWith('/app')?<WorkspaceSession/>:['/sign-in','/start-trial','/sign-up','/forgot-password','/reset-password','/book-demo','/onboarding'].includes(path)?<AuthExperience path={path}/>:<Marketing path={path}/>}</>}
