# Projet IoT - Supervision de Machines

Ce projet simule la surveillance en temps réel de machines industrielles à l'aide de MQTT, Node-RED et un dashboard web. Les machines génèrent des données simulées : température, humidité, vibration, flamme et fumée.

## Outils nécessaires

1. **Node.js**

   * Installer depuis : [https://nodejs.org/](https://nodejs.org/)
   * Vérifier l'installation :

     ```bash
     node -v
     npm -v
     ```

2. **Mosquitto (Broker MQTT)**

   * Télécharger Windows : [https://mosquitto.org/download/](https://mosquitto.org/download/)
   * Installer et démarrer le service :

     ```powershell
     net start mosquitto
     ```
   * Vérifier le broker :

     ```powershell
     mosquitto_sub -t test
     ```

3. **Node-RED**

   * Installer globalement :

     ```powershell
     npm install -g node-red
     ```
   * Lancer Node-RED :

     ```powershell
     node-red
     ```
   * Accéder au dashboard : [http://127.0.0.1:1880/](http://127.0.0.1:1880/)

4. **Node-RED Dashboard**

   * Depuis le dossier Node-RED :

     ```powershell
     cd C:\Users\<votre_user>\.node-red
     npm install @flowfuse/node-red-dashboard
     ```

## Structure du projet

```
Projet_IoT/
│
├─ machines.ts           # Script TypeScript simulant 3 machines
├─ flux_node_red/        # JSON des flux Node-RED à importer
├─ README.md
└─ package.json          # si nécessaire pour tsx
```

## Installation et configuration

1. Cloner le projet :

   ```bash
   git clone <url-du-repo>
   cd Projet_IoT
   ```

2. Installer les dépendances pour TypeScript :

   ```bash
   npm install mqtt tsx
   ```

3. Importer les flux Node-RED :

   * Ouvrir Node-RED dans le navigateur : [http://127.0.0.1:1880/](http://127.0.0.1:1880/)
   * Menu `☰` → `Import` → `Clipboard` ou `File` → sélectionner le fichier JSON dans `flux_node_red`
   * Déployer les flux

4. Lancer le script TypeScript simulant les machines :

   ```bash
   npx tsx machines.ts
   ```

## Visualisation

* Dashboard Node-RED :
  [http://127.0.0.1:1880/dashboard/](http://127.0.0.1:1880/dashboard/)
* Les pages affichent :

  * Température
  * Humidité
  * Vibration
  * Flamme (booléen)
  * Fumée (booléen)
* Les alertes apparaissent lorsque les seuils sont dépassés.

## Notes

* Les données sont simulées et publiées toutes les 3 secondes par `machines.ts`
* Node-RED sépare les machines avec un node `Switch` pour router les données vers les widgets correspondants.
* Chaque machine a 5 widgets : Température, Humidité, Vibration, Flamme et Fumée.
* Pour ajouter plus de machines, il suffit de les ajouter dans le tableau `machines` du script TypeScript et ajouter une sortie correspondante sur le node `Switch`.

## Commandes utiles

* Redémarrer Mosquitto :

  ```powershell
  net stop mosquitto
  net start mosquitto
  ```
* Lancer Node-RED :

  ```powershell
  node-red
  ```
* Lancer le script TypeScript :

  ```bash
  npx tsx machines.ts
  ```
* Vérifier le broker MQTT :

  ```bash
  mosquitto_sub -t machine/1
  ```
