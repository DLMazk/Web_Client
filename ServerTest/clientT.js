import { request } from 'http';
import { stringify } from 'querystring';

const postData = stringify({
  message: 'Hallo Server! Ich bin ein Client.'
});

const options = {
  hostname: '192.168.178.101', // Ersetze SERVER_IP_ADRESSE mit der IP-Adresse deines Servers
  port: 3001, // Der Port, auf dem der Server läuft
  path: '/message',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = request(options, (res) => {
  console.log(`Statuscode: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`Problem mit der Anfrage: ${e.message}`);
});

req.write(postData);
req.end();
