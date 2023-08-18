import { useEffect, useState } from 'react';

import { FaSistrix } from 'react-icons/fa';
import { toast } from 'react-toastify';

export const MovieSearchBar = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setSearchQuery(value.toLowerCase().trim());
  };

  const reset = () => {
    setSearchQuery('');
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(searchQuery);

    if (!searchQuery) {
      toast.info('Please write search query.');
      return;
    }

    if (searchQuery === prevSearchQuery) {
      toast.info(
        `"${searchQuery}" search completed. Enter a different search query`
      );
      reset();
      return;
    }

    setPrevSearchQuery(searchQuery);
    props.formSubmitHandler(searchQuery);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          onChange={handleInputChange}
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
