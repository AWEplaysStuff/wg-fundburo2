# Fundbüro Wilhelm Gymnasium Braunschweig

Dies ist ein vollständiges MERN-Stack-System (MongoDB, Express, React, Node) für das digitale Fundbüro des Wilhelm-Gymnasiums in Braunschweig.

## Voraussetzungen
* Node.js ≥ 18  
* Ein laufender MongoDB-Server oder MongoDB Atlas

## Schnellstart

```bash
# ZIP entpacken und Ordner betreten
npm run setup        # installiert Server- & Client-Abhängigkeiten
cp server/.env.example server/.env   # Verbindungskette eintragen
npm run dev          # startet Server (Port 5000) & Frontend (Port 5173)
```

- Frontend: <http://localhost:5173>  
- API-Endpoint: <http://localhost:5000/api/items>

## Konfiguration
Trage in `server/.env` deine MongoDB-Verbindungs-URI ein, z. B.  
```
MONGO_URI=mongodb://127.0.0.1:27017/fundbuero
```

## Ordnerstruktur
```
fundbuero-wilhelm-gymnasium/
├─ server/   # Express-API
└─ client/   # React-Frontend (Vite)
```

## Lizenz
MIT
