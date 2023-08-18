import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import serviceTmdbAPI from '../Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

export const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(true);
  const location = useLocation();

  useEffect(() => {
    function fetchTendingItems() {
      serviceTmdbAPI('trending/all/day')
        .then(data => {
          console.log(data);
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
        <div>
          <h2>Trending today</h2>
          <ul>
            {trendingItems.map(item => {
              return (
                <li key={item.id}>
                  <Link to={`movies/${item.id}`} state={{ from: location }}>
                    {item.title || item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
