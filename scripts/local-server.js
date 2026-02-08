const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.join(__dirname, '..');

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
    
    const queryIndex = urlPath.indexOf('?');
    if (queryIndex !== -1) {
        urlPath = urlPath.substring(0, queryIndex);
    }

    let filePath = path.join(ROOT, urlPath);
    let ext = path.extname(filePath);

    if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        serveFile(res, filePath);
        return;
    }

    const htmlPath = filePath + '.html';
    if (!ext && fs.existsSync(htmlPath)) {
        serveFile(res, htmlPath);
        return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const indexPath = path.join(filePath, 'index.html');
        if (fs.existsSync(indexPath)) {
            serveFile(res, indexPath);
            return;
        }
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');

}).listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}/`);
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
