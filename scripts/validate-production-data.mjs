import fs from 'node:fs';
const seed = fs.readFileSync('database/seed.sql', 'utf8');
const forbidden = [/INSERT\s+INTO\s+(users|providers|orders|bookings|reviews|payments|payouts)/i,/DEMO_ONLY/i,/demo:true/i,/test restaurant/i,/example chef/i];
const failures = forbidden.filter(pattern => pattern.test(seed)).map(String);
if (failures.length) { console.error('Production seed validation failed:', failures); process.exit(1); }
console.log('Production seed validation passed: reference configuration only.');
