import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';

const url = process.argv[2] || 'http://localhost:3000';
const fullPage = process.argv[3] === '--full';
const dir = 'screenshots';
if (!existsSync(dir)) mkdirSync(dir);

const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const out = `${dir}/snap-${ts}.png`;

const fullFlag = fullPage ? '--full-page' : '';
execSync(
  `npx playwright screenshot --browser chromium --viewport-size 1440,900 --wait-for-timeout 1500 ${fullFlag} "${url}" "${out}"`,
  { stdio: 'inherit' }
);
console.log('Saved:', out);
