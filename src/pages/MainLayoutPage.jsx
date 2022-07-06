import { Outlet } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';


const MainLayout = ({ currentUser }) => {
  return (
    <>
      <Outlet />
      <NavbarBottom {...{currentUser}} />
    </>
  )
}

export default MainLayout;