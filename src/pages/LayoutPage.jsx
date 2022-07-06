import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';


const Layout = () => {
  const { username, authToken } = useMemo(() => localStorage, [localStorage]);

  return (
    <>
      {
        authToken
          ?
          <>
            <Outlet />
            <NavbarBottom currentUser={username} />
          </>
          :
          <Navigate to="/login" />
      }
    </>
  )
}

export default Layout