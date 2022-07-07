import { Outlet } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';


const MainLayout = ({ username }) => {
  return (
    <>
      <Outlet />
      <NavbarBottom currentUser={username} />
    </>
  )
}

export default MainLayout;