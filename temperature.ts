import mqtt from "mqtt";

// Connexion au broker Mosquitto
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("Connecté au broker MQTT");

    setInterval(() => {
        // Génère une température aléatoire entre 20 et 35
        const temperature = (20 + Math.random() * 15).toFixed(2);

        console.log("Température:", temperature);

        // Publie la température sur le topic "maison/temperature"
        client.publish("maison/temperature", temperature);

        // Vérifie le seuil et affiche un message
        if (parseFloat(temperature) > 30) {
            console.log("⚠️ ALERTE : température élevée !", temperature);
        }

    }, 3000); // toutes les 3 secondes
});