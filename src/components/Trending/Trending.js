import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import serviceTmdbAPI from '../Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';
import { Title, Wrapper, Item } from './Trending.styled';

export const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(true);
  const location = useLocation();

  useEffect(() => {
    function fetchTendingItems() {
      serviceTmdbAPI('trending/all/day')
        .then(data => {
          setTrendingItems([...data.results]);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setError(false);
          setIsloading(false);
        });
    }
    fetchTendingItems();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!error && (
        <Wrapper>
          <Title>Trending today</Title>
          <ul>
            {trendingItems.map(item => {
              return (
                <Item key={item.id}>
                  <Link to={`movies/${item.id}`} state={{ from: location }}>
                    {item.title || item.name}
                  </Link>
                </Item>
              );
            })}
          </ul>
        </Wrapper>
      )}
    </>
  );
};
