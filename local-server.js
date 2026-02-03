const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain',
    '.ico': 'image/x-icon'
};

http.createServer((req, res) => {
    let urlPath = req.url;
    
    // Remove query string
    const queryIndex = urlPath.indexOf('?');
    if (queryIndex !== -1) {
        urlPath = urlPath.substring(0, queryIndex);
    }

    // specific fix for /downloads because of the folder conflict
    // and general clean URL support
    let filePath = path.join(ROOT, urlPath);
    let ext = path.extname(filePath);

    // 1. Try serving exact file (e.g. style.css, script.js)
    if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(res, filePath);
        return;
    }

    // 2. Try adding .html (e.g. /faq -> /faq.html)
    // We prioritize this over directory to fix the /downloads issue
    const htmlPath = filePath + '.html';
    if (!ext && fs.existsSync(htmlPath)) {
        serveFile(res, htmlPath);
        return;
    }

    // 3. Try directory index (e.g. / -> /index.html)
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
            serveFile(res, indexPath);
            return;
        }
    }

    // 404  
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>');

}).listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop.');
});

function serveFile(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}
