import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import itemsRouter from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname in ES-Modul-Umgebung
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload-Ordner anlegen, falls nicht vorhanden
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());

// Statische Dateien ausliefer’n: /uploads/<filename>
app.use('/uploads', express.static(uploadDir));

// API-Routen
app.use('/api/items', itemsRouter);

app.get('/', (req, res) => res.send('Fundbüro-API läuft'));

// MongoDB verbinden & Server starten
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB verbunden');
    app.listen(PORT, () => console.log('Server läuft auf Port', PORT));
  })
  .catch((err) => console.error('DB-Verbindung fehlgeschlagen:', err));
