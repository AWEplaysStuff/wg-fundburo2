import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    status: 'lost',
    location: '',
    contact: '',
    image: null, // für die Datei
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData → multipart/form-data
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('status', form.status);
    formData.append('location', form.location);
    formData.append('contact', form.contact);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await axios.post('/api/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Fehler beim Speichern');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'grid', gap: '.75rem', maxWidth: 500 }}
    >
      <input
        name="name"
        placeholder="Gegenstand"
        required
        value={form.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Beschreibung"
        value={form.description}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="lost">Verloren</option>
        <option value="found">Gefunden</option>
      </select>
      <input
        name="location"
        placeholder="Ort"
        value={form.location}
        onChange={handleChange}
      />
      <input
        name="contact"
        placeholder="Kontakt (E-Mail/Telefon)"
        value={form.contact}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <button>Speichern</button>
    </form>
  );
}
