const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
  // Manejo del envío del formulario (POST)
  if (req.method === 'POST' && req.url === '/enviar-contacto') {
    res.writeHead(302, { 'Location': '/confirmacion' });
    res.end();
    return;
  }

  // Resolver la ruta del archivo estático
  let filePath = req.url === '/' ? '/index.html' : req.url;
  if (!path.extname(filePath)) filePath += '.html';

  const absolutePath = path.join(__dirname, 'public', filePath);
  const ext = path.extname(absolutePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(absolutePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1 style="text-align:center; margin-top:50px;">404 - Página no encontrada</h1>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('Error interno del servidor');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 ¡Servidor a toda marcha en http://localhost:${PORT}!`);
});