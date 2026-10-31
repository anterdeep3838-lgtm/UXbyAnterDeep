import type {Conversation} from './product';
type PageTool={name:string;description:string;inputSchema:object;execute:(input:Record<string,unknown>)=>Promise<string>};
type ModelContext={registerTool:(tool:PageTool,options?:{signal:AbortSignal})=>void;unregisterTool?:(name:string)=>void};
export function registerProductTools(data:Conversation[],go:(path:string)=>void,update:(id:string,patch:Partial<Conversation>,event?:string)=>void){
  const api=(navigator as Navigator&{modelContext?:ModelContext}).modelContext;
  if(!api?.registerTool)return()=>{};
  const controller=new AbortController();
  const find=(input:Record<string,unknown>)=>{const c=data.find(c=>c.id===input.conversationId);if(!c)throw new Error('Conversation not found');return c};
  const schema={type:'object',properties:{conversationId:{type:'string',description:'Exact conversation id from search'}},required:['conversationId'],additionalProperties:false};
  const definitions:PageTool[]=[
    {name:'search_conversations',description:'Search the fictional NovaWear conversation dataset by customer, order or issue. Read-only; sends no external messages.',inputSchema:{type:'object',properties:{query:{type:'string'}},required:['query'],additionalProperties:false},execute:async input=>{if(typeof input.query!=='string')throw new Error('Query must be a string');return JSON.stringify(data.filter(c=>(c.name+' '+c.order+' '+c.issue).toLowerCase().includes(String(input.query).toLowerCase())).slice(0,20).map(({id,name,order,issue,status,handler})=>({id,name,order,issue,status,handler}))) }},
    {name:'open_conversation',description:'Open an existing fictional conversation in the ResolveAI Inbox.',inputSchema:schema,execute:async input=>{const c=find(input);go('/app/inbox?id='+encodeURIComponent(c.id));return JSON.stringify({opened:c.id})}},
    {name:'take_over_conversation',description:'Assign an open AI-handled demo conversation to Ryan Smith and stop autonomous AI replies. Preserves its history. No external message or financial action.',inputSchema:schema,execute:async input=>{const c=find(input);if(c.status==='Resolved'||c.handler!=='AI')throw new Error('Only an open AI-handled conversation can be taken over');update(c.id,{handler:'Ryan Smith'},'Ryan took over from AI. Autonomous AI responses stopped.');return JSON.stringify({id:c.id,handler:'Ryan Smith',autonomousReplies:false})}}
  ];
  const registered:string[]=[];
  for(const definition of definitions)try{api.registerTool(definition,{signal:controller.signal});registered.push(definition.name)}catch(error){console.warn('Optional page tool unavailable:',definition.name,error)}
  return()=>{controller.abort();for(const name of registered)try{api.unregisterTool?.(name)}catch{}}
}
