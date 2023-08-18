import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import serviceTmdbAPI from '../Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

export const Cast = () => {
  const { movieId } = useParams();
  const [castItems, setCastItems] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    function fetchCastItems(movieId) {
      serviceTmdbAPI(`movie/${movieId}/credits`)
        .then(data => {
          console.log(data);
          setCastItems([...data.cast]);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        })
        .finally(() => {
          setError(false);
          setIsloading(false);
        });
    }

    fetchCastItems(movieId);
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {!error && (
        <ul>
          {castItems.map(item => {
            return (
              <li key={item.id}>
                <div>
                  <img
                    width="150px"
                    src={
                      item.profile_path
                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                        : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
                    }
                    alt={item.name}
                  />
                </div>
                <p>{item.name}</p>
                <p>
                  Character: <span>{item.character}</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
