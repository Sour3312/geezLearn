import { Navigate, Outlet } from 'react-router-dom'
import AuthIndex from '../Auth/AuthIndex';

const ProtectedRoute = () => {

  const { isLogedIn, userIs } = AuthIndex();


  console.log("user", userIs)

  return (
    isLogedIn && (userIs === 9 || userIs === 2) ? <Outlet /> : <Navigate to='/' />
  )
}

export default ProtectedRoute;