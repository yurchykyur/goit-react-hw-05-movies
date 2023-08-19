import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import serviceTmdbAPI from '../Services/tmdbAPI';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviewsItems, setReviewsItems] = useState([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    function fetchReviewsItems(movieId) {
      serviceTmdbAPI(`movie/${movieId}/reviews`)
        .then(data => {
          setReviewsItems([...data.results]);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        })
        .finally(() => {
          setError(false);
        });
    }

    fetchReviewsItems(movieId);
  }, [movieId]);

  return (
    <div>
      {!error && (
        <ul>
          {reviewsItems.length !== 0 ? (
            reviewsItems.map(item => {
              return (
                <li key={item.id}>
                  <h2>Author: {item.author}</h2>
                  <p>{item.content}</p>
                </li>
              );
            })
          ) : (
            <li>
              <p>We don't have any reviews for this movie.</p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
