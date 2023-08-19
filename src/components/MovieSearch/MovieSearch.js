import { useEffect, useRef, useState } from 'react';

import { FaSistrix } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const MovieSearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const findMovie = searchParams.get('findMovie') ?? '';

  const isFirstLoad = useRef(true);

  const updateQueryString = e => {
    const value = e.currentTarget.value;
    if (value === '') {
      setSearchQuery('');
      setSearchParams({});
      return;
    }

    setSearchParams({ findMovie: value });
    setSearchQuery(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!searchQuery) {
      toast.info('Please write search query.');
      return;
    }

    if (searchQuery === prevSearchQuery) {
      toast.info(
        `"${searchQuery}" search completed. Enter a different search query`
      );
      return;
    }

    setPrevSearchQuery(searchQuery);
    props.formSubmitHandler(searchQuery);
    setSearchQuery('');
  };

  useEffect(() => {
    if (findMovie && isFirstLoad.current) {
      setPrevSearchQuery(findMovie);
      props.formSubmitHandler(findMovie);
    }
    isFirstLoad.current = false;
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
          value={searchQuery}
        />
        <button type="submit">
          <FaSistrix style={{ width: 20, height: 20 }} />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};
