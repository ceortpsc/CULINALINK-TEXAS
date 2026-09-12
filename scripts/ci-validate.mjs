import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['package.json','next.config.ts','tsconfig.json','pages/index.tsx','pages/_app.tsx','components/SiteHeader.tsx','components/HomeExperience.tsx','backend/index.ts','backend/routes.ts','backend/workflows.ts','backend/platform-v1.ts','backend/platform-blueprint.ts','tests/tests.txt','evidence/production-v13.json','docs/PRODUCTION-LIVE-CHECKLIST.md'];
const failures=[];
for(const f of required)if(!fs.existsSync(path.join(root,f)))failures.push('missing:'+f);
for(const f of ['package.json','appdeploy.auth-login.json','evidence/production-v13.json']){try{JSON.parse(fs.readFileSync(path.join(root,f),'utf8'))}catch(e){failures.push('invalid_json:'+f)}}
const tests=fs.existsSync(path.join(root,'tests/tests.txt'))?fs.readFileSync(path.join(root,'tests/tests.txt'),'utf8'):'';
if(!tests.startsWith('# Tests'))failures.push('tests_header');
const sanity=(tests.match(/\[sanity\]/g)||[]).length;if(sanity!==1)failures.push('tests_sanity_count:'+sanity);
for(const key of ['Viewport:','Covers:','Description:','Steps:','Expected:'])if(!tests.includes(key))failures.push('tests_missing_section:'+key);
const textExt=new Set(['.ts','.tsx','.js','.mjs','.json','.md','.txt','.yml','.yaml','.css','.xml','.sql','.sh']);
const secretPatterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,/\bsk_live_[A-Za-z0-9]+/i,/DOORDASH_SIGNING_SECRET\s*=\s*[^\s#]+/i,/PAYMENT_SECRET_KEY\s*=\s*[^\s#]+/i];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(['node_modules','.git','out','.next'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())walk(p);else if(textExt.has(path.extname(e.name))){const s=fs.readFileSync(p,'utf8');for(const re of secretPatterns)if(re.test(s))failures.push('secret_pattern:'+path.relative(root,p));}}}
walk(root);
const evidence=JSON.parse(fs.readFileSync(path.join(root,'evidence/production-v13.json'),'utf8'));if(evidence.runtime_evidence?.e2e_tests!=='NOT_EXECUTED_BY_DEPLOYMENT_HARNESS')failures.push('e2e_truth_state_changed');
if(failures.length){console.error('VALIDATION FAILED');for(const f of failures)console.error(' - '+f);process.exit(1)}
console.log('SOURCE VALIDATION PASSED');console.log('Note: this is source-control validation, not proof of AppDeploy E2E execution or external-provider readiness.');
