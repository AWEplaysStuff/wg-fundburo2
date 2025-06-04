import express from 'express';
import Item from '../models/Item.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// __dirname in ES-Modul
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer-Storage konfigurieren: speichert in /server/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// 1) POST /api/items  → Neues Item inkl. optionalem Bild anlegen
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      // Bild-URL relativ zum Server (statisch verfügbar unter /uploads)
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const item = await Item.create(data);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2) GET /api/items?since=<YYYY-MM-DD>  → Alle Items ab Datum
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.since) {
      const sinceDate = new Date(req.query.since);
      if (!isNaN(sinceDate)) {
        filter.createdAt = { $gte: sinceDate };
      }
    }
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3) GET /api/items/:id  → Einzelnes Item holen
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Nicht gefunden' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4) PATCH /api/items/:id  → Item aktualisieren (inkl. neuem Bild möglich)
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const item = await Item.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) return res.status(404).json({ error: 'Nicht gefunden' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5) DELETE /api/items/:id  → Item löschen
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Nicht gefunden' });
    res.json({ message: 'Gelöscht' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
