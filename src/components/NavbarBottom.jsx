import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchIcon from "@mui/icons-material/Search";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const NavbarBottom = () => {
  const [current, setCurrent] = React.useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();


  React.useEffect(() => {
    switch (pathname) {
      case '/events/mine':
        setCurrent('myEvents');
        break;
      case '/events/find':
        setCurrent('find');
        break;
      case '/events/create':
        setCurrent('create');
        break;
      default:
        setCurrent('profile');
        break;
    }
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setCurrent(newValue);

    switch (newValue) {
      case 'myEvents':
        navigate(`/events/mine`);
        break;
      case 'find':
        navigate(`/events/find`);
        break;
      case 'create':
        navigate(`/events/create`);
        break;
      case 'profile':
        const { username } = localStorage;

        localStorage.authToken ? navigate(`/${username}`) : navigate(`/login`);
        break;
    }
  };

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      border: '1px solid #000'
    }}>
      <BottomNavigation
        value={current}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="My Events"
          value="myEvents"
          icon={<CalendarMonthIcon />}
        />

        <BottomNavigationAction
          label="Find"
          value="find"
          icon={<SearchIcon />}
        />

        <BottomNavigationAction
          label="Create"
          value="create"
          icon={<AddCircleOutlineIcon />}
        />

        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<PermIdentityIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};


export default NavbarBottom;