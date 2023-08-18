import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import serviceTmdbAPI from '../components/Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

const MovieDetails = () => {
  const [movieItem, setMovieItem] = useState({});
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    function fetchTendingItems(movieId) {
      serviceTmdbAPI(`movie/${movieId}`)
        .then(data => {
          console.log(data);
          setMovieItem({ ...data });
          setGenres([...data.genres]);
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
    fetchTendingItems(movieId);
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {!error && (
        <div>
          <div>
            <div>
              <img
                width="300px"
                src={
                  movieItem.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieItem.poster_path}`
                    : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
                }
                alt={movieItem.title || movieItem.name}
              />
            </div>
            <div>
              <h2>{movieItem.title || movieItem.name}</h2>

              <h3>Overview</h3>
              <p>{movieItem.overview}</p>

              <h3>Genres</h3>
              <p>
                {genres.map(genre => {
                  return <span key={genre.name}>{genre.name}</span>;
                })}
              </p>
            </div>
          </div>

          <h3>Additionsl information</h3>
          <ul>
            <li>
              <Link to="Cast">Cast</Link>
            </li>
            <li>
              <Link to="Reviews">Reviews</Link>
            </li>
          </ul>

          <Outlet />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
