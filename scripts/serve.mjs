/** Minimal static server for dist/, mounted under the site base (/me). Used by postbuild and tests. */
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

export const DIST = join(process.cwd(), 'dist');
export const BASE = '/me';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json',
};

/** Starts the server on a free port; resolves with { origin, close }. Unknown paths get 404.html, like GitHub Pages. */
export function serve() {
  const server = createServer((req, res) => {
    const url = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = url.startsWith(BASE) ? normalize(join(DIST, url.slice(BASE.length))) : '';
    if (file && !file.startsWith(DIST)) return void res.writeHead(403).end();
    if (file && existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!file || !existsSync(file)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      return void createReadStream(join(DIST, '404.html')).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () =>
      resolve({ origin: `http://127.0.0.1:${server.address().port}${BASE}`, close: () => server.close() }),
    ),
  );
}
