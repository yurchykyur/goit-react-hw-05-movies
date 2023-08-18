import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const SearchItems = ({ items }) => {
  const location = useLocation();

  return items.map(item => {
    return (
      <li key={item.id}>
        <Link to={`/movies/${item.id}`} state={{ from: location }}>
          {item.title || item.name}
        </Link>
      </li>
    );
  });
};
