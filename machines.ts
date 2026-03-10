import mqtt from "mqtt";

// Connexion au broker
const client = mqtt.connect("mqtt://localhost:1883");

const machines = [1,2,3]; // 3 machines simulées

client.on("connect", () => {
    console.log("Connecté au broker MQTT");

    setInterval(() => {
        machines.forEach(machine => {
            const data = {
                temperature: +(20 + Math.random() * 15).toFixed(2), // 20-35°C
                humidity: +(40 + Math.random() * 30).toFixed(2),    // 40-70%
                vibration: +(Math.random() * 10).toFixed(2),       // 0-10
                flamme: Math.random() > 0.95 ? 1 : 0,             // 5% de chance
                fumee: Math.random() > 0.9 ? 1 : 0                // 10% de chance
            };

            const topic = `machine/${machine}`;
            client.publish(topic, JSON.stringify(data));
            console.log(`Machine ${machine} →`, data);
        });
    }, 3000); // toutes les 3 secondes
});