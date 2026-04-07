const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const ROOT = __dirname;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.pdf':  'application/pdf',
    '.woff': 'font/woff',
    '.woff2':'font/woff2',
    '.ttf':  'font/ttf',
    '.csv':  'text/csv',
};

const server = http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(ROOT, urlPath);

    if (filePath.endsWith('/') || filePath === ROOT) filePath = path.join(filePath, 'index.html');
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<html dir="rtl"><body style="font-family:Cairo,sans-serif;background:#0a0b10;color:#e0e0e0;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center"><h1 style="color:#00d2ff;font-size:4rem">404</h1></div></body></html>`);
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*' });
        res.end(data);
    });
});

server.listen(PORT, '127.0.0.1', () => {
    const url = `http://localhost:${PORT}`;
    console.log('\x1b[32m╔══════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[32m║   🚀 AbdulRaheem Portfolio - Local Server    ║\x1b[0m');
    console.log('\x1b[32m╚══════════════════════════════════════════════╝\x1b[0m');
    console.log(`\x1b[36m🌐 ${url}\x1b[0m`);
    console.log('\x1b[33m⬆  اضغط Ctrl+C لإيقاف الخادم\x1b[0m');
    exec(`start ${url}`);
});
