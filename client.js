console.log("Hello World!");

// Create an MQTT client instance
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'web_client',
    username: 'DL_Client',
    password: 'litterst17'
}
// const url = "ws://95.208.10.86:9001";
// const url = "ws://10.136.2.179:9001";
const url = "mqtt://localhost:9001";
// const url = 'ws://broker.emqx.io:8083/mqtt'
console.log(url);

const client = mqtt.connect(url, options);

client.on("connect", () => {
    console.log("Connected");
    //Subscribe to Topic
    client.subscribe("car/speed");
})

let neutralBtn = document.getElementById("publish-N");
neutralBtn.addEventListener("click", () => {
    // client.publish("car/speed", '{"speed": 54}');
    client.publish("car/gear", '{"gear": "N"}');
    console.log("Message published");
})

let driveBtn = document.getElementById("publish-D");
driveBtn.addEventListener("click", () => {
    // client.publish("car/speed", '{"speed": 54}');
    client.publish("car/gear", '{"gear": "D"}');
    console.log("Message published");
})

let reverseBtn = document.getElementById("publish-R");
reverseBtn.addEventListener("click", () => {
    // client.publish("car/speed", '{"speed": 54}');
    client.publish("car/gear", '{"gear": "R"}');
    console.log("Message published");
})

let speedEle = document.getElementById("speed");
let speedString = "";

// receive message
client.on("message", (topic, message) => {
    speedString = JSON.parse(message);
    speedEle.innerHTML = speedString.speed;
    // client.end();
})