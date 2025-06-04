import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get('/api/items/' + id).then((res) => setItem(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Eintrag wirklich löschen?')) {
      try {
        await axios.delete('/api/items/' + id);
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Fehler beim Löschen');
      }
    }
  };

  if (!item) return <p>Lade...</p>;

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
      <h2>{item.name}</h2>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: '40%',
            objectFit: 'cover',
            marginBottom: '1rem',
            borderRadius: 4,
          }}
        />
      )}

      <p>{item.description}</p>
      <p>
        <strong>Status:</strong>{' '}
        {item.status === 'lost' ? 'Verloren' : 'Gefunden'}
      </p>
      {item.location && (
        <p>
          <strong>Ort:</strong> {item.location}
        </p>
      )}
      {item.contact && (
        <p>
          <strong>Kontakt:</strong> {item.contact}
        </p>
      )}
      <small>{new Date(item.createdAt).toLocaleString('de-DE')}</small>

      <button
        style={{
          marginTop: '1rem',
          background: '#dc3545',
          padding: '.5rem 1rem',
          borderRadius: 4,
          color: '#fff',
          border: 'none',
        }}
        onClick={handleDelete}
      >
        Löschen
      </button>
    </div>
  );
}
