console.log("Hello World!");

// Create an MQTT client instance
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'web_client'
    // username: 'emqx_test',
    // password: 'emqx_test',
}
// const url = "ws://95.208.10.86:9001";
const url = "ws://localhost:9001";
// const url = 'ws://broker.emqx.io:8083/mqtt'

const client = mqtt.connect(url, options);

client.on("connect", () => {
    console.log("Connected");
    //Subscribe to Topic
    client.subscribe("car/speed");
})

let pubBtn = document.getElementById("publish-btn");
pubBtn.addEventListener("click", () => {
    // client.publish("car/speed", '{"speed": 54}');
    client.publish("car/gear", '{"gear": "N"}');
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