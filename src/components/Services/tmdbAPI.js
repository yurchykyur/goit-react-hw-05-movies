import axios from 'axios';
// import PropTypes from 'prop-types';

export default async function serviceTmdbAPI(searchQuery, param = {}) {
  const API_KEY = '3d1fae92642db152fb96a11121415088';

  const config = {
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3/',
    headers: { accept: 'application/json' },
    params: {
      api_key: API_KEY,
      ...param,
    },
  };

  const response = await axios.get(searchQuery, config);
  return response.data;
}

// serviceTmdbAPI.propTypes = {
//   searchQuery: PropTypes.string.isRequired,
//   page: PropTypes.number.isRequired,
//   hitsPerPage: PropTypes.number,
// };
