import { Navigate, Outlet } from 'react-router-dom'
import AuthIndex from '../Auth/AuthIndex';

const FilterStudentRoute = () => {

  const { isLogedIn, userIs } = AuthIndex();
  console.log('----Student route...status',isLogedIn)
  console.log('----Student route...useris',userIs)

  return (

    //If loged in user is Student
    isLogedIn && userIs === 1 ? <Outlet /> : <Navigate to='/' />
  )
}

export default FilterStudentRoute;