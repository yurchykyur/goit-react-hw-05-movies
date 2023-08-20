import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';

import { Container, NavList, NavLiItem } from './Layout.styled';

export const Layout = () => {
  return (
    <Container>
      <NavList>
        <NavLiItem>
          <NavLink to="/">Home</NavLink>
        </NavLiItem>

        <NavLiItem>
          <NavLink to="/movies">Movies</NavLink>
        </NavLiItem>
      </NavList>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <ToastContainer />
      </main>
    </Container>
  );
};
