import { Link, useLocation } from 'react-router-dom';

import { Item } from './SearchItems.styled';

export const SearchItems = ({ items }) => {
  const location = useLocation();

  return items.length !== 0 ? (
    items.map(item => {
      return (
        <Item key={item.id}>
          <Link to={`/movies/${item.id}`} state={{ from: location }}>
            {item.title || item.name}
          </Link>
        </Item>
      );
    })
  ) : (
    <li>
      <p>Nothing was found for your request. Change it, search again</p>
    </li>
  );
};
