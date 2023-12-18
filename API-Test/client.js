const apiUrl = 'https://dlmazk.github.io/Web_Client/API-Test/serverAPI.js/send-mqtt-message';

// Daten für die MQTT-Nachricht
const data = {
    topic: 'car/speed',
    message: '{"speed":52}'
};

let sendbtn = document.getElementById("send");
sendbtn.addEventListener("click", sendingMsg);

function sendingMsg() {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                console.log('MQTT-Nachricht erfolgreich gesendet');
            } else {
                console.error('Fehler beim Senden der MQTT-Nachricht');
            }
        })
        .catch(error => {
            console.error('Fehler:', error);
        });
}