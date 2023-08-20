import { Link } from 'react-router-dom';

import styled from 'styled-components';

const WrapperBackLink = styled.div`
  padding: 15px 0;
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  padding: 5px;
  border: 2px solid burlywood;
  border-radius: 4px;
`;

const MovieTitle = styled`
font-size:24px;
  
`;

const MovieWrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

const GenreItem = styled.span`
  margin-right: 10px;
`;

const GenreUnknown = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

export {
  WrapperBackLink,
  MovieWrapper,
  MovieTitle,
  GenreItem,
  GenreUnknown,
  StyledLink,
};
