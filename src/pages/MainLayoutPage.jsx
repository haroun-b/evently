import { Outlet } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';


const MainLayout = ({ currentUser }) => {
  return (
    <div
    style={{marginBottom: '5rem'}}
    >
      <Outlet />
      <NavbarBottom {...{currentUser}} />
    </div>
  )
}

export default MainLayout;