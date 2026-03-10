import mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

const machines = [1, 2, 3];

// État initial des machines pour assurer la continuité
const states = machines.map(id => ({
    id,
    temperature: 25.0,
    humidity: 50.0,
    vibration: 2.0,
    flamme: 0,
    fumee: 0
}));

// Helper pour garder une valeur dans les bornes
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

client.on("connect", () => {
    console.log("🚀 Simulateur industriel connecté au broker MQTT");

    setInterval(() => {
        states.forEach(m => {
            // 1. GÉNÉRATION DES DONNÉES (Continuité avec dérive légère)
            // On ajoute ou soustrait une petite valeur (ex: -1.5 à +1.5)
            const tempDrift = (Math.random() - 0.5) * 3;
            const humDrift = (Math.random() - 0.5) * 4;
            const vibDrift = (Math.random() - 0.5) * 1.5;

            // Possibilité de changement brusque (2% de chance)
            const spike = Math.random() > 0.98 ? 15 : 1;

            m.temperature = clamp(m.temperature + (tempDrift * spike), 15, 55);
            m.humidity = clamp(m.humidity + humDrift, 30, 90);
            m.vibration = clamp(m.vibration + vibDrift, 0, 10);

            // 2. LOGIQUE THERMIQUE (Seuils de sécurité)
            // Si T > 40°C : Fumée
            // Si T > 48°C : Fumée + Flamme
            if (m.temperature > 48) {
                m.fumee = 1;
                m.flamme = 1;
            } else if (m.temperature > 40) {
                m.fumee = 1;
                m.flamme = 0;
            } else {
                // Redescente sous les 40°C : retour à la normale
                m.fumee = 0;
                m.flamme = 0;
            }

            // 3. LOGIQUE DES ALERTES (Pour le texte en haut du dashboard)
            let alertMsg = "SYSTEM OK";
            if (m.vibration > 8) alertMsg = "VIBRATION CRITIQUE";
            if (m.fumee) alertMsg = "DÉTECTION FUMÉE";
            if (m.flamme) alertMsg = "ALERTE INCENDIE";

            const data = {
                machine: m.id,
                temperature: +m.temperature.toFixed(2),
                humidity: +m.humidity.toFixed(2),
                vibration: +m.vibration.toFixed(2),
                flamme: m.flamme,
                fumee: m.fumee,
                alerts: alertMsg
            };

            const topic = `machine/${m.id}`;
            client.publish(topic, JSON.stringify(data));
            
            // Log coloré pour debug rapide
            const statusEmoji = m.flamme ? "🔥" : m.fumee ? "💨" : "✅";
            console.log(`${statusEmoji} Machine ${m.id} | T: ${data.temperature}°C | V: ${data.vibration} | Msg: ${alertMsg}`);
        });
    }, 3000);
});