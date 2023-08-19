import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from 'components/Loader/Loader';

export const Layout = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
      </ul>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        <ToastContainer />
      </main>
    </div>
  );
};
