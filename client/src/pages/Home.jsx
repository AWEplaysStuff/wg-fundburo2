import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';

export default function Home() {
  const [items, setItems] = useState([]);
  const [since, setSince] = useState('');

  useEffect(() => {
    // Wenn „since“ gesetzt ist, als Query-Parameter übergeben
    const fetchItems = async () => {
      let url = '/api/items';
      if (since) {
        url += `?since=${since}`;
      }
      const res = await axios.get(url);
      setItems(res.data);
    };
    fetchItems();
  }, [since]);

  return (
    <div>
      {/* Datumsauswahl */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Seit:{' '}
          <input
            type="date"
            value={since}
            onChange={(e) => setSince(e.target.value)}
          />
        </label>
        {/* Optional: Filter zurücksetzen */}
        {since && (
          <button
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.9rem',
            }}
            onClick={() => setSince('')}
          >
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Item-Liste */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
        {items.length === 0 && <p>Keine Einträge vorhanden.</p>}
      </div>
    </div>
  );
}
