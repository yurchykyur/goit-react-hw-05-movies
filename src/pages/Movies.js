import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { MovieSearchBar } from '../components/MovieSearch/MovieSearch';
import { Loader } from 'components/Loader/Loader';
import serviceTmdbAPI from '../components/Services/tmdbAPI';
import { SearchItems } from '../components/SearchItems/SearchItems';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    function fetchGalleryItems(searchQuery) {
      setLoading(true);
      setError(false);

      serviceTmdbAPI('search/movie', { query: searchQuery })
        .then(data => {
          console.log(data);
          setSearchItems([...data.results]);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
          setError(false);
        });
    }

    fetchGalleryItems(searchQuery);
  }, [searchQuery]);

  const handlerSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <MovieSearchBar formSubmitHandler={handlerSearchQuery} />
      {loading && <Loader />}
      <ul>{!error && <SearchItems items={searchItems} />}</ul>
    </div>
  );
};

export default Movies;
