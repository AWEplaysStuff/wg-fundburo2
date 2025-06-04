import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import ItemDetails from './pages/ItemDetails';

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <header style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ flexGrow: 1 }}>🏫 Fundbüro WG</h1>
        <Link to="/">Alle Gegenstände</Link>
        <Link to="/neu">Melden</Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/neu" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </div>
  );
}
