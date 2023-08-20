import { useEffect, useState, useRef, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import serviceTmdbAPI from '../../components/Services/tmdbAPI';
import { Loader } from 'components/Loader/Loader';

import {
  WrapperBackLink,
  MovieWrapper,
  MovieTitle,
  GenreItem,
  GenreUnknown,
  StyledLink,
} from './MovieDetails.styled';

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
      <WrapperBackLink>
        <StyledLink to={backLinkLocationRef.current}>
          <FiArrowLeft /> Go back
        </StyledLink>
      </WrapperBackLink>
      {!error && (
        <div>
          <MovieWrapper>
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
              <MovieTitle>{movieItem.title || movieItem.name}</MovieTitle>

              <h3>Overview</h3>
              <p>{movieItem.overview}</p>

              <h3>Genres</h3>
              <p>
                {genres.length !== 0 ? (
                  genres.map(genre => {
                    return <GenreItem key={genre.name}>{genre.name}</GenreItem>;
                  })
                ) : (
                  <GenreUnknown>Unknown genre</GenreUnknown>
                )}
              </p>
            </div>
          </MovieWrapper>
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
