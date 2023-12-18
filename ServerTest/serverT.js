import { createServer } from 'http';
import { parse } from 'querystring';

const hostname = '192.168.178.101';
const port = 3001;

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/message') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = parse(body);
      const receivedMessage = parsedBody.message || 'Keine Nachricht erhalten';

      console.log('Empfangene Nachricht:', receivedMessage);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Nachricht erhalten\n');
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Seite nicht gefunden\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server läuft unter http://${hostname}:${port}/`);
});
