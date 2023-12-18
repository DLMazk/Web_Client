import express from 'express';
import { connect } from 'mqtt';
import { json } from 'body-parser';

const app = express();
const mqttBrokerUrl = 'mqtt://192.168.178.101:9001'; // MQTT-Broker-URL

// Middleware für den Umgang mit JSON-Daten
app.use(json());

// POST-Endpunkt für den Empfang von MQTT-Nachrichten von der HTTPS-Seite
app.post('/send-mqtt-message', (req, res) => {
    try {
        const { topic, message } = req.body;

        // Verbindung zum MQTT-Broker herstellen
        const client = connect(mqttBrokerUrl);

        client.on('connect', () => {
            // Nachricht an das gewünschte Thema senden
            res.send("Connected");
            client.publish(topic, message, (err) => {
                if (err) {
                    console.error('Fehler beim Senden der MQTT-Nachricht:', err);
                    res.status(500).send('Fehler beim Senden der MQTT-Nachricht');
                } else {
                    console.log('MQTT-Nachricht erfolgreich gesendet');
                    res.status(200).send('MQTT-Nachricht erfolgreich gesendet');
                }
                // Verbindung schließen, nachdem die Nachricht gesendet wurde
                client.end();
            });
        });
    } catch (error) {
        console.error('Fehler:', error);
        res.status(500).send('Interner Serverfehler');
    }
});

// Starten Sie den Server auf einem bestimmten Port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
