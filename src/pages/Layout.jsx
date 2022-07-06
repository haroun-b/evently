import { Outlet } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';


const Layout = () => {
  return (
    <>
    <Outlet />
    <NavbarBottom />
    </>
  )
}

export default Layout