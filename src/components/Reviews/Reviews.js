import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import serviceTmdbAPI from '../Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviewsItems, setReviewsItems] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    function fetchReviewsItems(movieId) {
      serviceTmdbAPI(`movie/${movieId}/reviews`)
        .then(data => {
          console.log(data);
          setReviewsItems([...data.results]);
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

    fetchReviewsItems(movieId);
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {!error && (
        <ul>
          {reviewsItems.map(item => {
            return (
              <li key={item.id}>
                <h2>Author: {item.author}</h2>
                <p>{item.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
