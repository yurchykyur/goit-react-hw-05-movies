import { Link, useLocation } from 'react-router-dom';

export const SearchItems = ({ items }) => {
  const location = useLocation();

  return items.length !== 0 ? (
    items.map(item => {
      return (
        <li key={item.id}>
          <Link to={`/movies/${item.id}`} state={{ from: location }}>
            {item.title || item.name}
          </Link>
        </li>
      );
    })
  ) : (
    <li>
      <p>Nothing was found for your request. Change it, search again</p>
    </li>
  );
};
