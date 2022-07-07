import { Navigate, Outlet } from 'react-router-dom';


const ProtectedLayout = ({ authToken }) => {
  return (
    <>
      {
        authToken
          ?
          <Outlet />
          :
          <Navigate to="/login" />
      }
    </>
  )
}

export default ProtectedLayout;