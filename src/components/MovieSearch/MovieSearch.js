import { useEffect, useRef, useState } from 'react';

import { FaSistrix } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const MovieSearchBar = props => {
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const findMovie = searchParams.get('findMovie') ?? '';

  const isFirstLoad = useRef(true);

  const updateQueryString = e => {
    if (e.currentTarget.value === '') {
      return setSearchParams({});
    }

    setSearchParams({ findMovie: e.currentTarget.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!findMovie) {
      toast.info('Please write search query.');
      return;
    }

    if (findMovie === prevSearchQuery) {
      toast.info(
        `"${findMovie}" search completed. Enter a different search query`
      );
      return;
    }

    setPrevSearchQuery(findMovie);
    props.formSubmitHandler(findMovie);
    console.log(e);
  };

  useEffect(() => {
    if (findMovie && isFirstLoad.current) {
      isFirstLoad.current = false;
      setPrevSearchQuery(findMovie);
      props.formSubmitHandler(findMovie);
    }
  }, [setPrevSearchQuery, props, findMovie, isFirstLoad]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          onChange={updateQueryString}
          value={findMovie}
        />
        <button type="submit">
          <FaSistrix style={{ width: 20, height: 20 }} />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};
