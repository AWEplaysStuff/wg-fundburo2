import { Link } from 'react-router-dom';

export default function ItemCard({ item }) {
  const date = new Date(item.createdAt).toLocaleDateString('de-DE');
  return (
    <Link
      to={`/item/${item._id}`}
      style={{
        background: '#fff',
        padding: '1rem',
        borderRadius: 8,
        boxShadow: '0 1px 4px rgba(0,0,0,.1)',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: 60,
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
      )}
      <div>
        <h2 style={{ margin: 0 }}>{item.name}</h2>
        {item.description && (
          <p style={{ margin: '.5rem 0' }}>
            {item.description.slice(0, 120)}
          </p>
        )}
        <small>{date}</small>
      </div>
    </Link>
  );
}
