import { useEffect, useState, useRef, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import serviceTmdbAPI from '../components/Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

const MovieDetails = () => {
  const [movieItem, setMovieItem] = useState({});
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(true);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    function fetchTendingItems(movieId) {
      serviceTmdbAPI(`movie/${movieId}`)
        .then(data => {
          setMovieItem({ ...data });
          setGenres([...data.genres]);
        })
        .catch(error => {
          console.error(error);
          setError(true);
        })
        .finally(() => {
          setError(false);
        });
    }
    fetchTendingItems(movieId);
  }, [movieId]);

  return (
    <>
      <Link to={backLinkLocationRef.current}>--- Go back</Link>
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
                {genres.length !== 0 ? (
                  genres.map(genre => {
                    return <span key={genre.name}>{genre.name}</span>;
                  })
                ) : (
                  <span>Unknown genre</span>
                )}
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
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>{' '}
        </div>
      )}
    </>
  );
};

export default MovieDetails;
