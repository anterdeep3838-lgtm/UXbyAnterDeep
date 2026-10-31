// Portable fallback when the Sites publishing helper is not installed.
// Short-lived credentials are accepted over stdin and never written to disk.
import {spawnSync} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const project=process.cwd();
const hosting=JSON.parse(readFileSync(resolve(project,'.openai/hosting.json'),'utf8'));
console.log('Ready for short-lived repository credential on stdin.');
let input='';
for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n'))break;if(input.length>100000)throw Error('Input too large')}
const credential=JSON.parse(input.trim());
if(!credential.remote_url?.endsWith('/'+hosting.project_id+'.git'))throw Error('Credential does not match this project');
function run(command,args,env=process.env){const result=spawnSync(command,args,{cwd:project,env,encoding:'utf8',windowsHide:true,maxBuffer:10*1024*1024});if(result.stdout)process.stdout.write(result.stdout);if(result.stderr)process.stderr.write(result.stderr);if(result.status!==0)throw Error(command+' failed with status '+result.status);return result.stdout.trim()}
if(!existsSync(resolve(project,'.git')))run('git',['init','-b',credential.branch]);
run('git',['config','user.name','ResolveAI Studio']);
run('git',['config','user.email','prototype@resolveai.example']);
const remote=spawnSync('git',['remote','get-url','origin'],{cwd:project,encoding:'utf8',windowsHide:true});
if(remote.status===0&&remote.stdout.trim()!==credential.remote_url)throw Error('Existing origin is not the selected Sites project');
if(remote.status!==0)run('git',['remote','add','origin',credential.remote_url]);
run('git',['add','--all']);
const staged=spawnSync('git',['diff','--cached','--quiet'],{cwd:project,windowsHide:true});
if(staged.status===1)run('git',['commit','-m','Build ResolveAI connected support prototype']);
run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit']);
run(process.execPath,['scripts/run-framework.mjs','build']);
const status=run('git',['status','--porcelain']);
if(status)throw Error('Build changed tracked source. Review before publication.');
const authEnv={...process.env,GIT_TERMINAL_PROMPT:'0',GIT_CONFIG_COUNT:'1',GIT_CONFIG_KEY_0:'http.extraHeader',GIT_CONFIG_VALUE_0:'Authorization: Bearer '+credential.token};
run('git',['push','origin','HEAD:'+credential.branch],authEnv);
const commit=run('git',['rev-parse','HEAD']);
const archive=resolve(project,'../resolveai-studio-output.tar.gz');
if(!existsSync(resolve(project,'dist/.openai/hosting.json'))||!existsSync(resolve(project,'dist/server/index.js')))throw Error('Missing deployment configuration or Worker output');
run('tar',['-czf',archive,'-C',resolve(project,'dist'),'.']);
console.log('PUBLISH_RESULT '+JSON.stringify({project_id:hosting.project_id,commit_sha:commit,archive}));
