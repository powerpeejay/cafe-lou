import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.mjs':  'text/javascript',
  '.jsx':  'text/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
};

createServer(async (req, res) => {
  let path = req.url.split('?')[0];
  if (path === '/' || path === '') path = '/index.html';

  const file = join(__dir, path);
  const ext  = extname(file).toLowerCase();

  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Café Lou → http://localhost:${PORT}`);
});
